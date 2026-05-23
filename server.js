const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const vm = require('vm');
const { Pool } = require('pg');

// تحميل متغيرات البيئة من ملف .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// الميدلوير الأساسية (زيادة حجم الطلبات المقبولة لتفادي مشاكل المرفقات الكبيرة كـ Base64)
app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// ==========================================================================
// 1. فئة قاعدة بيانات PostgreSQL (Supabase Driver)
// ==========================================================================
class PostgresDatabase {
    constructor(connectionString) {
        this.pool = new Pool({
            connectionString: connectionString,
            connectionTimeoutMillis: 4000, // مهلة الاتصال 4 ثوانٍ
            ssl: {
                rejectUnauthorized: false // مطلوب للاتصال الآمن بـ Supabase
            }
        });
    }

    async connect() {
        const client = await this.pool.connect();
        try {
            const res = await client.query('SELECT NOW()');
            console.log('✅ تم الاتصال بقاعدة بيانات Supabase (PostgreSQL) بنجاح في:', res.rows[0].now);
        } finally {
            client.release();
        }
    }

    async getStudents() {
        const query = 'SELECT * FROM students ORDER BY name ASC';
        const res = await this.pool.query(query);
        return res.rows.map(row => this.mapStudentFromDb(row));
    }

    async getStudentById(id) {
        const query = 'SELECT * FROM students WHERE id = $1';
        const res = await this.pool.query(query, [id]);
        if (res.rows.length === 0) return null;
        return this.mapStudentFromDb(res.rows[0]);
    }

    async getStudentsByParentPhone(phone) {
        if (!phone) return [];
        // تطهير الرقم واستخلاص آخر 9 أرقام (مثال: 559479015)
        const digits = phone.replace(/\D/g, '');
        if (digits.length < 9) return [];
        const suffix = digits.slice(-9); // آخر 9 أرقام
        
        const query = `
            SELECT * FROM students 
            WHERE right(regexp_replace(parent_phone, '\\D', '', 'g'), 9) = $1 
            ORDER BY name ASC
        `;
        const res = await this.pool.query(query, [suffix]);
        return res.rows.map(row => this.mapStudentFromDb(row));
    }

    async resetTodayAttendance() {
        // إعادة تعيين حالة حضور اليوم لجميع الطلاب إلى "none" (للاستخدام اليدوي من الإدارة أو التلقائي)
        const query = `UPDATE students SET attendance = 'none', attendance_time = '', morning_delay_minutes = 0`;
        await this.pool.query(query);
        return { message: 'تم إعادة تعيين حالة الحضور لجميع الطلاب بنجاح' };
    }

    async bulkUpsertStudents(studentsList) {
        if (!studentsList || studentsList.length === 0) {
            return { matchedCount: 0, modifiedCount: 0, upsertedCount: 0 };
        }

        const normalizePhone = (phone) => {
            if (!phone) return "";
            let p = String(phone).trim();
            if (p.endsWith(".0")) p = p.slice(0, -2);
            p = p.replace(/\D/g, "");
            if (p.startsWith("9665") && p.length === 12) {
                p = "0" + p.slice(3);
            } else if (p.startsWith("5") && p.length === 9) {
                p = "0" + p;
            }
            return p;
        };

        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            
            // تقسيم الطلاب إلى مجموعات مكونة من 100 طالب لتحقيق أعلى سرعة مع استقرار تام
            const chunkSize = 100;
            for (let i = 0; i < studentsList.length; i += chunkSize) {
                const chunk = studentsList.slice(i, i + chunkSize);
                
                const valueClauses = [];
                const params = [];
                let paramIndex = 1;
                
                for (const s of chunk) {
                    const rowParams = [
                        s.id,
                        s.name,
                        s.grade || "",
                        s.attendance || "none",
                        s.attendanceTime || "",
                        s.morningDelayMinutes || 0,
                        s.earlyDaysCount || 0,
                        s.lateDaysCount || 0,
                        s.absentDaysCount || 0,
                        JSON.stringify(s.attendanceHistory || []),
                        JSON.stringify(s.privateMessages || []),
                        s.parentName || "",
                        normalizePhone(s.parentPhone)
                    ];
                    
                    const placeholders = [];
                    for (let j = 0; j < rowParams.length; j++) {
                        placeholders.push(`$${paramIndex++}`);
                    }
                    valueClauses.push(`(${placeholders.join(', ')})`);
                    params.push(...rowParams);
                }
                
                const query = `
                    INSERT INTO students (
                        id, name, grade, attendance, attendance_time, morning_delay_minutes,
                        early_days_count, late_days_count, absent_days_count,
                        attendance_history, private_messages, parent_name, parent_phone
                    )
                    VALUES ${valueClauses.join(', ')}
                    ON CONFLICT (id) DO UPDATE SET
                        name = EXCLUDED.name,
                        grade = EXCLUDED.grade,
                        attendance = EXCLUDED.attendance,
                        attendance_time = EXCLUDED.attendance_time,
                        morning_delay_minutes = EXCLUDED.morning_delay_minutes,
                        early_days_count = EXCLUDED.early_days_count,
                        late_days_count = EXCLUDED.late_days_count,
                        absent_days_count = EXCLUDED.absent_days_count,
                        attendance_history = CASE 
                            WHEN EXCLUDED.attendance_history = '[]'::jsonb THEN COALESCE(students.attendance_history, '[]'::jsonb) 
                            ELSE EXCLUDED.attendance_history 
                        END,
                        private_messages = CASE 
                            WHEN EXCLUDED.private_messages = '[]'::jsonb THEN COALESCE(students.private_messages, '[]'::jsonb) 
                            ELSE EXCLUDED.private_messages 
                        END,
                        parent_name = COALESCE(NULLIF(EXCLUDED.parent_name, ''), students.parent_name),
                        parent_phone = COALESCE(NULLIF(EXCLUDED.parent_phone, ''), students.parent_phone)
                `;
                
                await client.query(query, params);
            }
            
            await client.query('COMMIT');
            return {
                matchedCount: studentsList.length,
                modifiedCount: studentsList.length,
                upsertedCount: studentsList.length
            };
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }

    async updateStudentAttendance(id, fields) {
        const setClauses = [];
        const params = [id];
        let paramIdx = 2;

        if (fields.attendance !== undefined) {
            setClauses.push(`attendance = $${paramIdx++}`);
            params.push(fields.attendance);
        }
        if (fields.attendanceTime !== undefined) {
            setClauses.push(`attendance_time = $${paramIdx++}`);
            params.push(fields.attendanceTime);
        }
        if (fields.morningDelayMinutes !== undefined) {
            setClauses.push(`morning_delay_minutes = $${paramIdx++}`);
            params.push(fields.morningDelayMinutes);
        }
        if (fields.attendanceHistory !== undefined) {
            setClauses.push(`attendance_history = $${paramIdx++}`);
            params.push(JSON.stringify(fields.attendanceHistory));
            
            // إعادة حساب العدادات
            const history = fields.attendanceHistory || [];
            const early = history.filter(r => r.status === "present").length;
            const late = history.filter(r => r.status === "delayed" || r.status === "late").length;
            const absent = history.filter(r => r.status === "absent").length;

            setClauses.push(`early_days_count = $${paramIdx++}`);
            params.push(early);
            setClauses.push(`late_days_count = $${paramIdx++}`);
            params.push(late);
            setClauses.push(`absent_days_count = $${paramIdx++}`);
            params.push(absent);
        }

        if (setClauses.length === 0) return null;

        const query = `
            UPDATE students
            SET ${setClauses.join(', ')}
            WHERE id = $1
            RETURNING *
        `;
        const res = await this.pool.query(query, params);
        if (res.rows.length === 0) return null;
        return this.mapStudentFromDb(res.rows[0]);
    }

    async addStudentPrivateMessage(id, message) {
        const student = await this.getStudentById(id);
        if (!student) return null;

        const attachment = message.attachment ? {
            type: message.attachment.type || "image",
            name: message.attachment.name || "",
            data: message.attachment.data || ""
        } : null;

        const newMsg = {
            id: message.id,
            text: message.text || "",
            date: message.date || new Date().toISOString(),
            read: message.read || false,
            attachment: attachment
        };

        const updatedMessages = [newMsg, ...student.privateMessages];

        const query = `
            UPDATE students
            SET private_messages = $1
            WHERE id = $2
            RETURNING *
        `;
        const res = await this.pool.query(query, [JSON.stringify(updatedMessages), id]);
        if (res.rows.length === 0) return null;
        return this.mapStudentFromDb(res.rows[0]);
    }

    async markStudentPrivateMessagesRead(id) {
        const student = await this.getStudentById(id);
        if (!student) return null;

        const updatedMessages = student.privateMessages.map(msg => ({
            ...msg,
            read: true
        }));

        const query = `
            UPDATE students
            SET private_messages = $1
            WHERE id = $2
            RETURNING *
        `;
        const res = await this.pool.query(query, [JSON.stringify(updatedMessages), id]);
        if (res.rows.length === 0) return null;
        return this.mapStudentFromDb(res.rows[0]);
    }

    async getGeneralMessages() {
        const query = 'SELECT * FROM general_messages ORDER BY date DESC, created_at DESC';
        const res = await this.pool.query(query);
        return res.rows.map(row => this.mapGeneralMessageFromDb(row));
    }

    async createGeneralMessage(m) {
        const attachment = m.attachment ? {
            type: m.attachment.type || "image",
            name: m.attachment.name || "",
            data: m.attachment.data || ""
        } : null;

        const query = `
            INSERT INTO general_messages (id, title, text, date, attachment)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const res = await this.pool.query(query, [
            m.id,
            m.title,
            m.text,
            m.date || new Date().toISOString(),
            JSON.stringify(attachment)
        ]);
        return this.mapGeneralMessageFromDb(res.rows[0]);
    }

    async getParentStats(phone) {
        const query = 'SELECT * FROM parent_stats WHERE phone = $1';
        const res = await this.pool.query(query, [phone]);
        if (res.rows.length === 0) {
            const defaultStats = {
                phone: phone,
                starCount: 1,
                lastLoginDate: new Date().toLocaleDateString('en-US'),
                loginCountToday: 1,
                dailyOpensCount: 1,
                dailyReadsCount: 0,
                dailyAttendanceChecks: 0,
                dailyOpensStarsAwarded: 0,
                dailyReadsStarsAwarded: 0,
                dailyAttendanceStarsAwarded: 0,
                readMessageIds: []
            };
            return await this.updateParentStats(phone, defaultStats);
        }
        return this.mapParentStatsFromDb(res.rows[0]);
    }

    async updateParentStats(phone, s) {
        const query = `
            INSERT INTO parent_stats (
                phone, star_count, last_login_date, login_count_today, daily_opens_count,
                daily_reads_count, daily_attendance_checks, daily_opens_stars_awarded,
                daily_reads_stars_awarded, daily_attendance_stars_awarded, read_message_ids
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            ON CONFLICT (phone) DO UPDATE SET
                star_count = EXCLUDED.star_count,
                last_login_date = EXCLUDED.last_login_date,
                login_count_today = EXCLUDED.login_count_today,
                daily_opens_count = EXCLUDED.daily_opens_count,
                daily_reads_count = EXCLUDED.daily_reads_count,
                daily_attendance_checks = EXCLUDED.daily_attendance_checks,
                daily_opens_stars_awarded = EXCLUDED.daily_opens_stars_awarded,
                daily_reads_stars_awarded = EXCLUDED.daily_reads_stars_awarded,
                daily_attendance_stars_awarded = EXCLUDED.daily_attendance_stars_awarded,
                read_message_ids = EXCLUDED.read_message_ids
            RETURNING *
        `;
        const res = await this.pool.query(query, [
            phone,
            s.starCount || 1,
            s.lastLoginDate || "",
            s.loginCountToday || 0,
            s.dailyOpensCount || 0,
            s.dailyReadsCount || 0,
            s.dailyAttendanceChecks || 0,
            s.dailyOpensStarsAwarded || 0,
            s.dailyReadsStarsAwarded || 0,
            s.dailyAttendanceStarsAwarded || 0,
            JSON.stringify(s.readMessageIds || [])
        ]);
        return this.mapParentStatsFromDb(res.rows[0]);
    }

    async resetDatabase(confirmCode) {
        if (confirmCode !== "AJAWEED_RESET_2026") {
            throw new Error('Unauthorized reset code');
        }
        await this.pool.query('DELETE FROM students');
        await this.pool.query('DELETE FROM general_messages');
        await this.pool.query('DELETE FROM parent_stats');
        return { message: 'Database reset successfully' };
    }

    mapStudentFromDb(row) {
        return {
            id: row.id,
            name: row.name,
            grade: row.grade,
            attendance: row.attendance,
            attendanceTime: row.attendance_time,
            morningDelayMinutes: row.morning_delay_minutes,
            earlyDaysCount: row.early_days_count,
            lateDaysCount: row.late_days_count,
            absentDaysCount: row.absent_days_count,
            attendanceHistory: typeof row.attendance_history === 'string' ? JSON.parse(row.attendance_history) : row.attendance_history,
            privateMessages: typeof row.private_messages === 'string' ? JSON.parse(row.private_messages) : row.private_messages,
            parentName: row.parent_name,
            parentPhone: row.parent_phone,
            createdAt: row.created_at,
            updatedAt: row.updated_at
        };
    }

    mapGeneralMessageFromDb(row) {
        return {
            id: row.id,
            title: row.title,
            text: row.text,
            date: row.date,
            attachment: typeof row.attachment === 'string' ? JSON.parse(row.attachment) : row.attachment,
            createdAt: row.created_at,
            updatedAt: row.updated_at
        };
    }

    mapParentStatsFromDb(row) {
        return {
            phone: row.phone,
            starCount: row.star_count,
            lastLoginDate: row.last_login_date,
            loginCountToday: row.login_count_today,
            dailyOpensCount: row.daily_opens_count,
            dailyReadsCount: row.daily_reads_count,
            dailyAttendanceChecks: row.daily_attendance_checks,
            dailyOpensStarsAwarded: row.daily_opens_stars_awarded,
            dailyReadsStarsAwarded: row.daily_reads_stars_awarded,
            dailyAttendanceStarsAwarded: row.daily_attendance_stars_awarded,
            readMessageIds: typeof row.read_message_ids === 'string' ? JSON.parse(row.read_message_ids) : row.read_message_ids,
            createdAt: row.created_at,
            updatedAt: row.updated_at
        };
    }
}

// ==========================================================================
// 2. فئة قاعدة البيانات المحلية (Local JSON Fallback Driver)
// ==========================================================================
class LocalDatabase {
    constructor() {
        this.filePath = path.join(__dirname, 'db_local.json');
        this.data = {
            students: [],
            generalMessages: [],
            parentStats: []
        };
    }

    async connect() {
        console.log('📂 جاري تهيئة خادم البيانات المحلي الذكي (JSON Database)...');
        if (!fs.existsSync(this.filePath)) {
            console.log('📝 ملف قاعدة البيانات المحلي غير موجود. جاري إنشاء ملف جديد واستيراد البيانات من js/data.js...');
            this.autoPopulateFromDataJs();
            this.save();
        } else {
            try {
                const raw = fs.readFileSync(this.filePath, 'utf8');
                this.data = JSON.parse(raw);
                console.log(`✅ تم تحميل البيانات المحلية بنجاح! (${this.data.students.length} طالب، ${this.data.generalMessages.length} إعلان عام، ${this.data.parentStats.length} إحصائيات أولياء أمور).`);
            } catch (err) {
                console.error('❌ خطأ في قراءة ملف قاعدة البيانات المحلي، جاري إعادة الاستيراد كخيار بديل...', err);
                this.autoPopulateFromDataJs();
                this.save();
            }
        }
    }

    autoPopulateFromDataJs() {
        try {
            const dataJsPath = path.join(__dirname, 'js', 'data.js');
            if (fs.existsSync(dataJsPath)) {
                let content = fs.readFileSync(dataJsPath, 'utf8');
                
                // استبدال const بـ var لكي تلتصق بالمتغير sandbox في محرك vm
                content = content.replace(/const\s+INITIAL_STUDENTS/g, 'var INITIAL_STUDENTS');
                content = content.replace(/const\s+INITIAL_GENERAL_MESSAGES/g, 'var INITIAL_GENERAL_MESSAGES');
                
                const sandbox = {};
                vm.createContext(sandbox);
                vm.runInNewContext(content, sandbox);

                this.data.students = (sandbox.INITIAL_STUDENTS || []).map(s => ({
                    id: s.id,
                    name: s.name,
                    grade: s.grade || "",
                    attendance: s.attendance || "none",
                    attendanceTime: s.attendanceTime || "",
                    morningDelayMinutes: s.morningDelayMinutes || 0,
                    earlyDaysCount: s.earlyDaysCount || 0,
                    lateDaysCount: s.lateDaysCount || 0,
                    absentDaysCount: s.absentDaysCount || 0,
                    attendanceHistory: s.attendanceHistory || [],
                    privateMessages: s.privateMessages || [],
                    parentName: s.parentName || "",
                    parentPhone: s.parentPhone || ""
                }));

                this.data.generalMessages = (sandbox.INITIAL_GENERAL_MESSAGES || []).map(gm => ({
                    id: gm.id,
                    title: gm.title,
                    text: gm.text,
                    date: gm.date || new Date().toISOString(),
                    attachment: gm.attachment || null
                }));

                console.log(`⭐ تم استيراد وتعبئة ${this.data.students.length} طالب و ${this.data.generalMessages.length} إعلان عام من data.js بنجاح!`);
            } else {
                console.warn('⚠️ ملف js/data.js غير موجود لتعبئة البيانات التلقائية.');
            }
        } catch (e) {
            console.error('❌ فشل تشغيل محاكي استيراد البيانات التلقائي:', e);
        }
    }

    save() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf8');
        } catch (err) {
            console.error('❌ فشل حفظ ملف البيانات المحلي:', err);
        }
    }

    async getStudents() {
        return [...this.data.students].sort((a, b) => a.name.localeCompare(b.name, 'ar'));
    }

    async getStudentById(id) {
        return this.data.students.find(s => s.id === id) || null;
    }

    async getStudentsByParentPhone(phone) {
        if (!phone) return [];
        const digits = String(phone).replace(/\D/g, '');
        if (digits.length < 9) return [];
        const suffix = digits.slice(-9);
        
        return this.data.students.filter(s => {
            if (!s.parentPhone) return false;
            const sDigits = String(s.parentPhone).replace(/\D/g, '');
            return sDigits.slice(-9) === suffix;
        });
    }

    async resetTodayAttendance() {
        this.data.students.forEach(s => {
            s.attendance = 'none';
            s.attendanceTime = '';
            s.morningDelayMinutes = 0;
        });
        this.save();
        return { message: 'تم إعادة تعيين حالة الحضور لجميع الطلاب بنجاح' };
    }



    async bulkUpsertStudents(studentsList) {
        let matchedCount = 0;
        let modifiedCount = 0;
        let upsertedCount = 0;

        const normalizePhone = (phone) => {
            if (!phone) return "";
            let p = String(phone).trim();
            if (p.endsWith(".0")) p = p.slice(0, -2);
            p = p.replace(/\D/g, "");
            if (p.startsWith("9665") && p.length === 12) {
                p = "0" + p.slice(3);
            } else if (p.startsWith("5") && p.length === 9) {
                p = "0" + p;
            }
            return p;
        };

        for (const s of studentsList) {
            const index = this.data.students.findIndex(x => x.id === s.id);
            const updateData = {
                id: s.id,
                name: s.name,
                grade: s.grade || "",
                attendance: s.attendance || "none",
                attendanceTime: s.attendanceTime || "",
                morningDelayMinutes: s.morningDelayMinutes || 0,
                earlyDaysCount: s.earlyDaysCount || 0,
                lateDaysCount: s.lateDaysCount || 0,
                absentDaysCount: s.absentDaysCount || 0,
                parentName: s.parentName !== undefined ? s.parentName : "",
                parentPhone: normalizePhone(s.parentPhone)
            };

            if (s.attendanceHistory !== undefined) {
                updateData.attendanceHistory = s.attendanceHistory;
            }
            if (s.privateMessages !== undefined) {
                updateData.privateMessages = s.privateMessages;
            }

            if (index !== -1) {
                matchedCount++;
                modifiedCount++;
                this.data.students[index] = {
                    ...this.data.students[index],
                    ...updateData
                };
            } else {
                upsertedCount++;
                this.data.students.push({
                    attendanceHistory: [],
                    privateMessages: [],
                    ...updateData
                });
            }
        }
        this.save();
        return { matchedCount, modifiedCount, upsertedCount };
    }

    async updateStudentAttendance(id, fields) {
        const index = this.data.students.findIndex(s => s.id === id);
        if (index === -1) return null;

        const s = this.data.students[index];
        const updateFields = { ...fields };

        if (fields.attendanceHistory && Array.isArray(fields.attendanceHistory)) {
            updateFields.earlyDaysCount = fields.attendanceHistory.filter(r => r.status === "present").length;
            updateFields.lateDaysCount = fields.attendanceHistory.filter(r => r.status === "delayed" || r.status === "late").length;
            updateFields.absentDaysCount = fields.attendanceHistory.filter(r => r.status === "absent").length;
        }

        this.data.students[index] = {
            ...s,
            ...updateFields
        };
        this.save();
        return this.data.students[index];
    }

    async addStudentPrivateMessage(id, message) {
        const index = this.data.students.findIndex(s => s.id === id);
        if (index === -1) return null;

        const s = this.data.students[index];
        const attachment = message.attachment ? {
            type: message.attachment.type || "image",
            name: message.attachment.name || "",
            data: message.attachment.data || ""
        } : null;

        const newMsg = {
            id: message.id,
            text: message.text || "",
            date: message.date || new Date().toISOString(),
            read: message.read || false,
            attachment: attachment
        };

        const currentMessages = s.privateMessages || [];
        this.data.students[index] = {
            ...s,
            privateMessages: [newMsg, ...currentMessages]
        };
        this.save();
        return this.data.students[index];
    }

    async markStudentPrivateMessagesRead(id) {
        const index = this.data.students.findIndex(s => s.id === id);
        if (index === -1) return null;

        const s = this.data.students[index];
        const updatedMessages = (s.privateMessages || []).map(msg => ({
            ...msg,
            read: true
        }));

        this.data.students[index] = {
            ...s,
            privateMessages: updatedMessages
        };
        this.save();
        return this.data.students[index];
    }

    async getGeneralMessages() {
        return [...this.data.generalMessages].sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    async createGeneralMessage(m) {
        const attachment = m.attachment ? {
            type: m.attachment.type || "image",
            name: m.attachment.name || "",
            data: m.attachment.data || ""
        } : null;

        const newMsg = {
            id: m.id,
            title: m.title,
            text: m.text,
            date: m.date || new Date().toISOString(),
            attachment: attachment,
            createdAt: new Date().toISOString()
        };

        this.data.generalMessages.push(newMsg);
        this.save();
        return newMsg;
    }

    async getParentStats(phone) {
        let stats = this.data.parentStats.find(p => p.phone === phone);
        if (!stats) {
            stats = {
                phone: phone,
                starCount: 1,
                lastLoginDate: new Date().toLocaleDateString('en-US'),
                loginCountToday: 1,
                dailyOpensCount: 1,
                dailyReadsCount: 0,
                dailyAttendanceChecks: 0,
                dailyOpensStarsAwarded: 0,
                dailyReadsStarsAwarded: 0,
                dailyAttendanceStarsAwarded: 0,
                readMessageIds: []
            };
            this.data.parentStats.push(stats);
            this.save();
        }
        return stats;
    }

    async updateParentStats(phone, s) {
        const index = this.data.parentStats.findIndex(p => p.phone === phone);
        const updateData = {
            phone: phone,
            starCount: s.starCount || 1,
            lastLoginDate: s.lastLoginDate || "",
            loginCountToday: s.loginCountToday || 0,
            dailyOpensCount: s.dailyOpensCount || 0,
            dailyReadsCount: s.dailyReadsCount || 0,
            dailyAttendanceChecks: s.dailyAttendanceChecks || 0,
            dailyOpensStarsAwarded: s.dailyOpensStarsAwarded || 0,
            dailyReadsStarsAwarded: s.dailyReadsStarsAwarded || 0,
            dailyAttendanceStarsAwarded: s.dailyAttendanceStarsAwarded || 0,
            readMessageIds: s.readMessageIds || []
        };

        if (index !== -1) {
            this.data.parentStats[index] = updateData;
        } else {
            this.data.parentStats.push(updateData);
        }
        this.save();
        return updateData;
    }

    async resetDatabase(confirmCode) {
        if (confirmCode !== "AJAWEED_RESET_2026") {
            throw new Error('Unauthorized reset code');
        }
        this.data.students = [];
        this.data.generalMessages = [];
        this.data.parentStats = [];
        this.save();
        return { message: 'Database reset successfully' };
    }
}

// ==========================================================================
// 3. مدير قواعد البيانات (Database Hub Selector)
// ==========================================================================
let db;

async function initDatabase() {
    const dbUrl = process.env.DATABASE_URL;
    if (dbUrl && dbUrl.trim() !== "" && !dbUrl.includes("<")) {
        console.log('🔌 جاري محاولة الاتصال بقاعدة بيانات Supabase (PostgreSQL)...');
        const pgDb = new PostgresDatabase(dbUrl);
        try {
            await pgDb.connect();
            db = pgDb;
            console.log('🚀 تم تنشيط محرك Supabase بنجاح، التطبيق يعمل سحابياً الآن!');
            return;
        } catch (err) {
            console.error('❌ فشل الاتصال بـ Supabase:', err.message);
            console.log('⚠️ جاري التنشيط التلقائي لخادم البيانات المحلي (JSON Fallback)...');
        }
    } else {
        console.log('ℹ️ لم يتم العثور على DATABASE_URL في متغيرات البيئة أو أنه غير مهيأ بعد.');
        console.log('📂 جاري تنشيط خادم البيانات المحلي (JSON Fallback)...');
    }
    
    // تفعيل المحرك المحلي كخيار افتراضي آمن
    const localDb = new LocalDatabase();
    await localDb.connect();
    db = localDb;
}

// تشغيل وتهيئة اتصال قاعدة البيانات
initDatabase();

// ==========================================================================
// 4. مسارات الـ API (RESTful Backend Endpoints)
// ==========================================================================

// --- أ) الطلاب (Students) ---

// جلب جميع الطلاب (للإدارة)
app.get('/api/students', async (req, res) => {
    try {
        const students = await db.getStudents();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: 'حدث خطأ أثناء جلب قائمة الطلاب من السيرفر', details: err.message });
    }
});

// جلب طلاب ولي أمر محدد برقم جواله (للبوابة الإلكترونية لأولياء الأمور)
app.get('/api/students/by-phone/:phone', async (req, res) => {
    try {
        const students = await db.getStudentsByParentPhone(req.params.phone);
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: 'فشل جلب بيانات الطلاب برقم الجوال', details: err.message });
    }
});

// إعادة تعيين حضور اليوم لجميع الطلاب (يُشغَّل في بداية كل يوم دراسي)
app.post('/api/attendance/reset-today', async (req, res) => {
    try {
        const result = await db.resetTodayAttendance();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'فشل إعادة تعيين حضور اليوم', details: err.message });
    }
});

// جلب بيانات طالب محدد بالـ ID (لولي الأمر)
app.get('/api/students/:id', async (req, res) => {
    try {
        const student = await db.getStudentById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'الطالب غير موجود بقاعدة البيانات' });
        }
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: 'حدث خطأ أثناء جلب بيانات الطالب من السيرفر', details: err.message });
    }
});

// مزامنة ورفع وتحديث مجموعة من الطلاب دفعة واحدة (Bulk Upsert - للرفع من الإكسل)
app.post('/api/students/bulk', async (req, res) => {
    try {
        const { students } = req.body;
        if (!Array.isArray(students)) {
            return res.status(400).json({ error: 'تنسيق البيانات غير صحيح، يجب إرسال مصفوفة طلاب' });
        }

        if (students.length === 0) {
            return res.json({ message: 'المصفوفة المرسلة فارغة، لم يتم تحديث شيء.' });
        }

        const result = await db.bulkUpsertStudents(students);
        res.json({
            message: 'تمت مزامنة وحفظ الطلاب بنجاح في قاعدة البيانات سحابياً',
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount,
            upsertedCount: result.upsertedCount
        });
    } catch (err) {
        res.status(500).json({ error: 'فشلت مزامنة وحفظ الطلاب بقاعدة البيانات سحابياً', details: err.message });
    }
});

// تحديث حالة حضور محددة لطالب معين (رصد فوري)
app.patch('/api/students/:id/attendance', async (req, res) => {
    try {
        const student = await db.updateStudentAttendance(req.params.id, req.body);
        if (!student) {
            return res.status(404).json({ error: 'الطالب غير موجود بقاعدة البيانات لتعديل حضوره' });
        }
        res.json({ message: 'تم تحديث حالة حضور الطالب بنجاح', student });
    } catch (err) {
        res.status(500).json({ error: 'فشل تحديث حالة حضور الطالب سحابياً', details: err.message });
    }
});

// إرسال رسالة خاصة لطالب محدد
app.post('/api/students/:id/private-messages', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message || !message.id) {
            return res.status(400).json({ error: 'بيانات الرسالة غير مكتملة أو مفقودة' });
        }

        const student = await db.addStudentPrivateMessage(req.params.id, message);
        if (!student) {
            return res.status(404).json({ error: 'الطالب غير موجود لإرسال رسالة خاصة له' });
        }

        res.status(201).json({ message: 'تم حفظ وإرسال الرسالة الخاصة للطالب بنجاح', student });
    } catch (err) {
        res.status(500).json({ error: 'فشل إرسال الرسالة الخاصة سحابياً', details: err.message });
    }
});

// تحديث حالة قراءة الرسائل الخاصة
app.patch('/api/students/:id/private-messages/read', async (req, res) => {
    try {
        const student = await db.markStudentPrivateMessagesRead(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'الطالب غير موجود بقاعدة البيانات' });
        }
        res.json({ message: 'تم تعليم كل الرسائل كـ مقروءة بنجاح', privateMessages: student.privateMessages });
    } catch (err) {
        res.status(500).json({ error: 'فشل تحديث حالة قراءة الرسائل سحابياً', details: err.message });
    }
});

// --- ب) الرسائل العامة (General Messages) ---

// جلب كل الإعلانات والرسائل العامة
app.get('/api/general-messages', async (req, res) => {
    try {
        const messages = await db.getGeneralMessages();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: 'فشل جلب الرسائل العامة من السيرفر', details: err.message });
    }
});

// إنشاء ونشر إعلان عام جديد (للإدارة)
app.post('/api/general-messages', async (req, res) => {
    try {
        const { id, title, text } = req.body;
        if (!id || !title || !text) {
            return res.status(400).json({ error: 'الحقول (id, title, text) مطلوبة لإنشاء إعلان عام' });
        }

        const newMsg = await db.createGeneralMessage(req.body);
        res.status(201).json({ message: 'تم نشر وحفظ الإعلان العام بنجاح سحابياً', generalMessage: newMsg });
    } catch (err) {
        res.status(500).json({ error: 'فشل نشر وحفظ الإعلان العام سحابياً', details: err.message });
    }
});

// --- ج) نظام النجوم والترقيات لأولياء الأمور (Parent Star Stats) ---

// جلب إحصائيات ولي الأمر برقم الهاتف
app.get('/api/parent-stats/:phone', async (req, res) => {
    try {
        const stats = await db.getParentStats(req.params.phone);
        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: 'فشل جلب إحصائيات ولي الأمر من السيرفر', details: err.message });
    }
});

// تحديث وحفظ إحصائيات ونجوم ولي الأمر
app.post('/api/parent-stats/:phone', async (req, res) => {
    try {
        const updatedStats = req.body;
        if (!updatedStats) {
            return res.status(400).json({ error: 'بيانات التحديث مفقودة' });
        }

        const stats = await db.updateParentStats(req.params.phone, updatedStats);
        res.json({ message: 'تمت مزامنة وحفظ نجوم ولي الأمر بنجاح سحابياً', stats });
    } catch (err) {
        res.status(500).json({ error: 'فشل حفظ ومزامنة نجوم ولي الأمر سحابياً', details: err.message });
    }
});

// مسح بيانات قاعدة البيانات بالكامل وإعادتها للتهيئة الافتراضية
app.post('/api/database/reset', async (req, res) => {
    try {
        const { confirmCode } = req.body;
        const result = await db.resetDatabase(confirmCode);
        res.json({ message: 'تم تصفير ومسح قاعدة البيانات السحابية/المحلية بالكامل بنجاح!', result });
    } catch (err) {
        res.status(err.message === 'Unauthorized reset code' ? 403 : 500).json({ error: 'فشل تصفير قاعدة البيانات', details: err.message });
    }
});

// ==========================================================================
// 5. تقديم الملفات الساكنة لتسهيل الاستضافة (Static File Hosting)
// ==========================================================================

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/parent', (req, res) => {
    res.sendFile(path.join(__dirname, 'parent.html'));
});

// تشغيل الخادم
app.listen(PORT, () => {
    console.log(`==================================================================`);
    console.log(`🚀 خادم تطبيق الأجاويد يعمل بنجاح!`);
    console.log(`🔗 رابط لوحة تحكم الإدارة: http://localhost:${PORT}`);
    console.log(`🔗 رابط بوابة أولياء الأمور: http://localhost:${PORT}/parent`);
    console.log(`==================================================================`);
});
