// ================================================
//  بوابة أولياء الأمور — تطبيق الأجاويد
//  منطق المصادقة وعرض الإخوة والجلسة الدائمة
// ================================================

// تحديد عنوان URL الأساسي للاتصال بالخادم سحابياً/محلياً
const API_BASE = (window.location.protocol === 'file:' || !window.location.host) 
    ? 'http://localhost:3000' 
    : '';

const SESSION_KEY = "ajaweed_parent_session";
const STUDENTS_KEY = "ajaweed_parent_students";
const GENERAL_MSGS_KEY = "ajaweed_parent_general_messages";

let parentSession = null;   // بيانات الجلسة النشطة
let activeChildId = null;   // الطالب المعروض حالياً من بين الإخوة
let allStudents = [];       // قاعدة بيانات الطلاب

// ==========================================
// 1. التهيئة — يُشغَّل عند تحميل الصفحة
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    loadStudents();
    prefillFromUrl();
    lucide.createIcons();
    setLogoImage();
    updatePhoneClock();
    setInterval(updatePhoneClock, 60000);

    const saved = loadSession();
    if (saved) {
        parentSession = saved;
        activeChildId = saved.studentIds[0];
        showHome();
        initParentGamification(parentSession.parentPhone);
        initCloudSyncAndNotifications();
    } else {
        showLogin();
    }
});

// ==========================================
// 2. بيانات الطلاب من localStorage
// ==========================================
function loadStudents() {
    try {
        const raw = localStorage.getItem(STUDENTS_KEY);
        if (raw) {
            allStudents = JSON.parse(raw);
            
            // إصلاح وتطبيع أرقام الهواتف التالفة أو العشوائية تلقائياً من البيانات المرجعية الأولية
            let repaired = false;
            if (typeof INITIAL_STUDENTS !== "undefined") {
                allStudents.forEach(s => {
                    const refStudent = INITIAL_STUDENTS.find(ref => String(ref.id) === String(s.id));
                    if (refStudent && refStudent.parentPhone) {
                        const normRef = normalizePhone(refStudent.parentPhone);
                        const normCurrent = normalizePhone(s.parentPhone);
                        if (normRef && normRef !== normCurrent) {
                            s.parentPhone = normRef;
                            repaired = true;
                        }
                    }
                    if ((s.attendance === "present" || !s.attendance) && !s.attendanceTime) {
                        s.attendance = "none";
                        repaired = true;
                    }
                    // تهيئة سجل الحضور التاريخي إن لم يكن موجوداً
                    if (!s.attendanceHistory) {
                        s.attendanceHistory = [];
                        repaired = true;
                    }
                    // تصفير العدادات القديمة المبنية على الهاش لتتطابق مع الأرشيف الفعلي
                    const correctEarly  = s.attendanceHistory.filter(r => r.status === "present").length;
                    const correctLate   = s.attendanceHistory.filter(r => r.status === "delayed" || r.status === "late").length;
                    const correctAbsent = s.attendanceHistory.filter(r => r.status === "absent").length;
                    if (s.earlyDaysCount !== correctEarly || s.lateDaysCount !== correctLate || s.absentDaysCount !== correctAbsent) {
                        s.earlyDaysCount  = correctEarly;
                        s.lateDaysCount   = correctLate;
                        s.absentDaysCount = correctAbsent;
                        repaired = true;
                    }
                });
            }
            if (repaired) {
                localStorage.setItem(STUDENTS_KEY, JSON.stringify(allStudents));
            }
        } else if (typeof INITIAL_STUDENTS !== "undefined") {
            allStudents = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
            allStudents.forEach(s => {
                s.attendance = "none";
                s.attendanceTime = "";
                s.attendanceHistory = [];
                s.earlyDaysCount    = 0;
                s.lateDaysCount     = 0;
                s.absentDaysCount   = 0;
            });
            localStorage.setItem(STUDENTS_KEY, JSON.stringify(allStudents));
        }
    } catch (e) {
        console.error("خطأ في تحميل بيانات الطلاب:", e);
        allStudents = [];
    }
}

// ==========================================
// 3. قراءة رقم الهوية من URL (?id=XXXX)
// ==========================================
function prefillFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) {
        const input = document.getElementById("p-student-id");
        if (input) {
            input.value = id.trim();
            input.focus();
            document.getElementById("p-phone").focus();
        }
    }
}

// ==========================================
// 4. نظام المصادقة المزدوجة
// ==========================================
async function handleParentLogin(e) {
    e.preventDefault();

    const enteredId    = document.getElementById("p-student-id").value.trim();
    const enteredPhone = normalizePhone(document.getElementById("p-phone").value.trim());

    if (!enteredId || !enteredPhone) {
        showLoginError("يرجى إدخال رقم الهوية ورقم الجوال.");
        return;
    }

    // عرض تنبيه بالتحقق السحابي
    const errorEl = document.getElementById("login-error");
    const errorSpan = document.getElementById("login-error-text");
    if (errorEl && errorSpan) {
        errorSpan.textContent = "جاري التحقق من البيانات والاتصال بالسحابة...";
        errorEl.className = "login-error-box info"; // كلاس معلومات جميل
        errorEl.style.display = "flex";
    }

    let student = null;
    try {
        // محاولة جلب الطالب مباشرة من السيرفر لضمان دقة البيانات والطلاب الجدد
        const res = await fetch(API_BASE + `/api/students/${enteredId}`);
        if (res.ok) {
            const cloudStudent = await res.json();
            if (cloudStudent) {
                student = cloudStudent;
                // تحديث أو إضافة الطالب في القائمة المحلية
                const idx = allStudents.findIndex(s => String(s.id) === String(enteredId));
                if (idx !== -1) {
                    allStudents[idx] = cloudStudent;
                } else {
                    allStudents.push(cloudStudent);
                }
                localStorage.setItem(STUDENTS_KEY, JSON.stringify(allStudents));
            }
        }
    } catch (err) {
        console.warn("❌ تعذر الاتصال بالسيرفر للمصادقة السحابية، سيتم استخدام البيانات المحلية:", err);
    }

    // إذا فشل جلب الطالب من السيرفر، نبحث عنه محلياً
    if (!student) {
        student = allStudents.find(s => String(s.id).trim() === enteredId);
    }

    if (!student) {
        showLoginError("رقم الهوية غير مسجل في قاعدة بيانات المدرسة.");
        return;
    }

    // التحقق من رقم الجوال
    const storedPhone = normalizePhone(student.parentPhone || student.phone || "");
    if (!storedPhone || storedPhone !== enteredPhone) {
        showLoginError("رقم الجوال غير متطابق مع بيانات المدرسة. تأكد من الرقم المسجل.");
        return;
    }

    // إخفاء رسالة التحقق المؤقتة
    if (errorEl) errorEl.style.display = "none";

    // جلب جميع الأبناء الآخرين المرتبطين بهذا الهاتف سحابياً ومحلياً
    let siblings = [];
    try {
        const res = await fetch(API_BASE + `/api/students/by-phone/${encodeURIComponent(enteredPhone)}`);
        if (res.ok) {
            const cloudSiblings = await res.json();
            if (Array.isArray(cloudSiblings) && cloudSiblings.length > 0) {
                siblings = cloudSiblings;
                // دمجهم وتحديثهم في القائمة المحلية
                cloudSiblings.forEach(cs => {
                    const idx = allStudents.findIndex(s => String(s.id) === String(cs.id));
                    if (idx !== -1) {
                        allStudents[idx] = cs;
                    } else {
                        allStudents.push(cs);
                    }
                });
                localStorage.setItem(STUDENTS_KEY, JSON.stringify(allStudents));
            }
        }
    } catch (err) {
        console.warn("❌ فشل جلب الأبناء من السيرفر:", err);
    }

    // إذا لم ينجح جلب الأبناء سحابياً، نعتمد على التصفية المحلية كاحتياطي آمن
    if (siblings.length === 0) {
        siblings = allStudents.filter(s => normalizePhone(s.parentPhone || s.phone || "") === enteredPhone);
    }

    // استخراج اسم ولي الأمر من بيانات الطالب
    const parentName = student.parentName || extractParentName(student.name);

    // إنشاء الجلسة وحفظها
    parentSession = {
        parentPhone:  enteredPhone,
        parentName:   parentName,
        studentIds:   siblings.map(s => String(s.id)),
        loginTime:    Date.now()
    };
    saveSession(parentSession);

    activeChildId = String(student.id);
    showHome();
    initParentGamification(enteredPhone);
    initCloudSyncAndNotifications();
}

// تطبيع رقم الجوال بشكل متقدم ومقاوم للخطأ (يتعامل مع الفراغات، الشرطات، العشرية .0، والأرقام الهندية)
function normalizePhone(phone) {
    if (!phone) return "";
    let p = String(phone).trim();
    if (p.endsWith(".0")) {
        p = p.slice(0, -2);
    }
    p = p.replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
    p = p.replace(/\D/g, "");
    if (p.startsWith("9665") && p.length === 12) {
        p = "0" + p.slice(3);
    } else if (p.startsWith("5") && p.length === 9) {
        p = "0" + p;
    }
    return p;
}

// استخراج اسم ولي الأمر من الاسم الرباعي (الاسم الثاني)
function extractParentName(fullName) {
    if (!fullName) return "ولي الأمر";
    const parts = fullName.trim().split(/\s+/);
    return parts.length >= 2 ? parts[1] : parts[0];
}

// عرض رسالة خطأ في نموذج الدخول
function showLoginError(msg) {
    const el   = document.getElementById("login-error");
    const span = document.getElementById("login-error-text");
    if (!el) return;
    if (span) span.textContent = msg;
    else el.textContent = msg;
    el.style.display = "flex";
    setTimeout(() => { el.style.display = "none"; }, 5000);
}

// ==========================================
// 5. الجلسة الدائمة في localStorage
// ==========================================
function saveSession(session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function loadSession() {
    try {
        const raw = localStorage.getItem(SESSION_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    parentSession = null;
    activeChildId = null;
}

// ==========================================
// 6. تبديل الشاشات (Login ↔ Home)
// ==========================================
function showLogin() {
    document.getElementById("screen-login").style.display = "flex";
    document.getElementById("screen-home").style.display  = "none";
}

function showHome() {
    document.getElementById("screen-login").style.display = "none";
    document.getElementById("screen-home").style.display  = "flex";
    renderHome();
}

// ==========================================
// 7. رسم شاشة الرئيسية الكاملة
// ==========================================
function renderHome() {
    if (!parentSession) return;

    // ترحيب ولي الأمر
    const parentFirstName = parentSession.parentName.split(/\s+/)[0];
    document.getElementById("p-welcome-name").textContent = `مرحباً، ${parentFirstName}`;
    document.getElementById("p-parent-phone-display").textContent = parentSession.parentPhone;

    // تحديث عدد النجوم على لوحة المعلومات من الـ localStorage
    const statsKey = `ajaweed_parent_stats_${parentSession.parentPhone}`;
    let starCount = 0;
    try {
        const stored = localStorage.getItem(statsKey);
        if (stored) {
            const stats = JSON.parse(stored);
            starCount = stats.starCount || 0;
        }
    } catch (e) {}
    const countEl = document.getElementById("p-stars-count");
    if (countEl) countEl.textContent = starCount;

    const rankInfo = getParentRank(starCount);
    const rankEl = document.getElementById("p-stars-rank");
    if (rankEl) {
        rankEl.textContent = rankInfo.text;
        rankEl.style.color = rankInfo.color;
    }

    // إظهار قسم الأبناء فقط إذا كان هناك أكثر من طالب
    const siblingsSection = document.getElementById("siblings-section");
    if (siblingsSection) {
        siblingsSection.style.display = parentSession.studentIds.length > 1 ? "block" : "none";
    }

    // رسم تبويبات الأبناء
    renderSiblingTabs();

    // عرض بيانات الطالب النشط
    renderChildData(activeChildId);

    // إعادة تشغيل الأيقونات
    lucide.createIcons();
}

// رسم تبويبات الأبناء أفقياً
function renderSiblingTabs() {
    const container = document.getElementById("sibling-tabs");
    if (!container) return;
    container.innerHTML = "";

    parentSession.studentIds.forEach(sid => {
        const student = allStudents.find(s => String(s.id) === sid);
        if (!student) return;

        const firstName = student.name.split(/\s+/)[0];
        const isActive  = sid === activeChildId;
        const indicator = student.status === "installed" ? "🟢" : "🔴";

        const tab = document.createElement("button");
        tab.className = `sibling-tab ${isActive ? "active" : ""}`;
        tab.innerHTML = `
            <span class="sibling-indicator">${indicator}</span>
            <span class="sibling-name">${firstName}</span>
        `;
        tab.onclick = () => switchChild(sid);
        container.appendChild(tab);
    });
}

// تبديل الطالب النشط
function switchChild(studentId) {
    activeChildId = studentId;
    renderSiblingTabs();
    renderChildData(studentId);
    lucide.createIcons();

    // مكافأة تفاعل ولي الأمر عند تبديل الأبناء لمراجعة تفاصيل حضورهم
    if (parentSession && parentSession.parentPhone) {
        awardParentEngagementStar("attendance_check", parentSession.parentPhone);
    }
}

// رسم بيانات الطالب المحدد
function renderChildData(studentId) {
    const student = allStudents.find(s => String(s.id) === studentId);
    if (!student) return;

    const firstName = student.name.split(/\s+/)[0];

    // اسم الطالب والصف
    document.getElementById("p-child-name").textContent  = student.name;
    document.getElementById("p-child-grade").textContent = (student.grade || "") + " " + (student.class || "");
    document.getElementById("p-child-id").textContent    = "الهوية: " + student.id;

    // الحرف الأول للأفاتار
    document.getElementById("p-avatar-letter").textContent = firstName.charAt(0);

    // بطاقة الحضور
    renderAttendanceCard(student);

    // عداد الأيام
    renderDaysCounters(student);

    // بطاقة تثبيت PWA
    const pwaCard = document.getElementById("p-pwa-card");
    if (pwaCard) {
        pwaCard.style.display = student.status === "installed" ? "none" : "flex";
    }

    // الإشعارات الخاصة
    renderPrivateMessages(student);

    // الإعلانات العامة
    renderGeneralMessages();

    // أرشيف الحضور التاريخي
    renderAttendanceArchive(student);
}

// ==========================================================================
// أرشيف الحضور والانضباط التاريخي
// ==========================================================================

let archiveCollapsed = true;

function toggleArchiveCollapse() {
    const listEl    = document.getElementById("p-archive-list");
    const chevronEl = document.getElementById("archive-chevron");
    if (!listEl) return;
    archiveCollapsed = !archiveCollapsed;
    if (archiveCollapsed) {
        listEl.style.display = "none";
        if (chevronEl) chevronEl.style.transform = "rotate(0deg)";
    } else {
        listEl.style.display = "flex";
        if (chevronEl) chevronEl.style.transform = "rotate(180deg)";

        // مكافأة تفاعل ولي الأمر عند مراجعة أرشيف الحضور التاريخي الكامل لأول مرة في الجلسة
        if (parentSession && parentSession.parentPhone) {
            awardParentEngagementStar("attendance_check", parentSession.parentPhone);
        }
    }
}

// دالة لاستخراج وقت الوصول فقط بدون التاريخ لتقديمه بشكل مبسط
function extractTimeOnly(dateTimeStr) {
    if (!dateTimeStr) return "";
    const parts = dateTimeStr.trim().split(/\s+/);
    if (parts.length >= 2) {
        // e.g. "2026-01-21 07:17 ص" -> "07:17 ص"
        return parts.slice(1).join(" ");
    }
    return dateTimeStr;
}

function renderAttendanceArchive(student) {
    const listEl = document.getElementById("p-archive-list");
    if (!listEl) return;

    const history = (student.attendanceHistory || []);
    if (history.length === 0) {
        listEl.innerHTML = `<div style="text-align:center; color:var(--muted); font-size:0.8rem; padding:12px;">لا توجد سجلات حضور سابقة حتى الآن</div>`;
        return;
    }

    const statusConfig = {
        present: { icon: "✅", label: "حضور مبكر",    color: "#2ecc71" },
        absent:  { icon: "❌", label: "غياب",         color: "#e74c3c" },
        delayed: { icon: "⏰", label: "حضور متأخر",  color: "#f39c12" },
        late:    { icon: "⏰", label: "حضور متأخر",  color: "#f39c12" }
    };

    listEl.innerHTML = history.slice(0, 60).map(record => {
        const cfg = statusConfig[record.status] || { icon: "⚠️", label: record.status, color: "var(--muted)" };
        const delayBadge = (record.status === "delayed" || record.status === "late") && record.delay
            ? `<span style="margin-right:4px; background:rgba(243,156,18,0.15); color:#f39c12; font-size:0.72rem; padding:1px 5px; border-radius:4px;">${record.delay} د.</span>`
            : "";
        
        let labelShow = cfg.label;
        if (record.time && (record.status === "present" || record.status === "delayed" || record.status === "late")) {
            const arrivalTime = extractTimeOnly(record.time);
            if (arrivalTime) {
                labelShow += ` - وقت الوصول الساعة ${arrivalTime}`;
            }
        }

        return `<div style="display:flex; justify-content:space-between; align-items:center; background:var(--card-bg); border-radius:8px; padding:7px 10px; border-right:3px solid ${cfg.color};">
            <span style="font-size:0.78rem; color:var(--muted);">${record.date}</span>
            <span style="display:flex; align-items:center; gap:4px; font-size:0.8rem; font-weight:600; color:${cfg.color};">${cfg.icon} ${labelShow}${delayBadge}</span>
        </div>`;
    }).join("");

    if (!archiveCollapsed) {
        listEl.style.display = "flex";
    }
    if (typeof lucide !== "undefined") lucide.createIcons();
}

// بطاقة الحضور
function renderAttendanceCard(student) {
    const label = document.getElementById("p-att-label");
    const desc  = document.getElementById("p-att-desc");
    const card  = document.getElementById("p-att-card");
    if (!label || !desc || !card) return;

    card.className = "p-attendance-card";
    const att = student.attendance || "none";
    const delayMins = student.morningDelayMinutes || student.delayMinutes || 0;

    const configs = {
        none:     { cls: "att-none",     icon: "⚠️", text: "لم يتم رصد الحضور", desc: "لم يتم تسجيل حضور الطلاب اليوم" },
        present:  { cls: "att-present",  icon: "✅", text: "حضور مبكر",    desc: "تم رصد الحضور في الموعد المحدد." },
        absent:   { cls: "att-absent",   icon: "❌", text: "غائب اليوم",    desc: "لم يتم رصد حضور الطالب اليوم. يُرجى التواصل مع المدرسة." },
        delayed:  { cls: "att-late",     icon: "⏰", text: "حضور متأخر",  desc: `تأخر الطالب ${delayMins} دقيقة عن موعد الدراسة.` },
        late:     { cls: "att-late",     icon: "⏰", text: "حضور متأخر",  desc: `تأخر الطالب ${delayMins} دقيقة عن موعد الدراسة.` },
        excused:  { cls: "att-excused",  icon: "📋", text: "غياب بعذر",    desc: "تم توثيق الغياب بعذر رسمي." }
    };

    const cfg = configs[att] || configs.none;
    card.classList.add(cfg.cls);

    let labelText = cfg.icon + " " + cfg.text;
    if (student.attendanceTime && (att === "present" || att === "delayed" || att === "late")) {
        const arrivalTime = extractTimeOnly(student.attendanceTime);
        if (arrivalTime) {
            labelText += ` - وقت الوصول الساعة ${arrivalTime}`;
        }
    }
    label.textContent = labelText;
    
    if (student.attendanceTime && att !== "none") {
        desc.innerHTML = `${cfg.desc}<br><span style="display:inline-block; margin-top:8px; font-size:0.9em; opacity:0.85;">📅 وقت رصد الحضور: ${student.attendanceTime}</span>`;
    } else {
        desc.textContent  = cfg.desc;
    }
}

// رسم عدادات الأيام الثلاثة
function renderDaysCounters(student) {
    // تهيئة سجل الأرشيف إن لم يكن موجوداً
    if (!student.attendanceHistory) {
        student.attendanceHistory = [];
    }

    // حساب العدادات من سجل الأرشيف الفعلي فقط
    const earlyCount  = student.attendanceHistory.filter(r => r.status === "present").length;
    const lateCount   = student.attendanceHistory.filter(r => r.status === "delayed" || r.status === "late").length;
    const absentCount = student.attendanceHistory.filter(r => r.status === "absent").length;

    const countEarly  = document.getElementById("p-count-early");
    const countLate   = document.getElementById("p-count-late");
    const countAbsent = document.getElementById("p-count-absent");

    if (countEarly)  countEarly.textContent  = earlyCount;
    if (countLate)   countLate.textContent   = lateCount;
    if (countAbsent) countAbsent.textContent = absentCount;
}

// إشعارات الطالب الخاصة
function renderPrivateMessages(student) {
    const feed  = document.getElementById("p-private-feed");
    const badge = document.getElementById("p-private-badge");
    if (!feed) return;

    const msgList = student.privateMessages || student.messages || [];
    // ترتيب تنازلي حسب التاريخ (الأحدث أولاً) لتظهر الرسائل الجديدة في الأعلى
    const messages = msgList.slice().sort((a, b) => {
        const timeA = a.date ? new Date(a.date).getTime() : 0;
        const timeB = b.date ? new Date(b.date).getTime() : 0;
        return timeB - timeA;
    });
    const unread   = messages.filter(m => !m.read).length;

    if (badge) {
        badge.textContent = unread > 0 ? unread : "";
        badge.style.display = unread > 0 ? "flex" : "none";
    }

    if (messages.length === 0) {
        feed.innerHTML = `
            <div class="p-empty-state">
                <i data-lucide="bell-off"></i>
                <p>لا توجد إشعارات خاصة حتى الآن</p>
            </div>`;
        return;
    }

    feed.innerHTML = messages.map(m => renderMessageCard(m, false)).join("");
}

// الإعلانات العامة للمدرسة
function renderGeneralMessages() {
    const feed = document.getElementById("p-general-feed");
    const badge = document.getElementById("p-general-badge");
    if (!feed) return;

    let generalMessages = [];
    try {
        const raw = localStorage.getItem(GENERAL_MSGS_KEY);
        if (raw) generalMessages = JSON.parse(raw);
        else if (typeof INITIAL_GENERAL_MESSAGES !== "undefined") {
            generalMessages = INITIAL_GENERAL_MESSAGES;
        }
    } catch {}

    // حساب الرسائل العامة غير المقروءة
    let readIds = [];
    try {
        const rawRead = localStorage.getItem("ajaweed_read_general_ids");
        if (rawRead) readIds = JSON.parse(rawRead);
    } catch {}

    const unreadCount = generalMessages.filter(m => !readIds.includes(String(m.id))).length;

    if (badge) {
        badge.textContent = unreadCount > 0 ? unreadCount : "";
        badge.style.display = unreadCount > 0 ? "flex" : "none";
    }

    // ترتيب تنازلي حسب التاريخ (الأحدث أولاً) لتظهر الإعلانات الجديدة في الأعلى
    const msgs = generalMessages.slice().sort((a, b) => {
        const timeA = a.date ? new Date(a.date).getTime() : 0;
        const timeB = b.date ? new Date(b.date).getTime() : 0;
        return timeB - timeA;
    });
    if (msgs.length === 0) {
        feed.innerHTML = `
            <div class="p-empty-state">
                <i data-lucide="megaphone"></i>
                <p>لا توجد إعلانات من المدرسة حالياً</p>
            </div>`;
        return;
    }
    feed.innerHTML = msgs.map(m => renderMessageCard(m, true)).join("");
}

// دالة تقصير النص مع إضافة علامة الحذف
function truncateText(text, maxLen = 80) {
    if (!text) return "";
    if (text.length <= maxLen) return text;
    return text.substring(0, maxLen) + "...";
}

// بناء HTML بطاقة رسالة واحدة قابلة للضغط والفتح بمودال تفصيلي
function renderMessageCard(msg, isGeneral) {
    const typeColors = {
        attendance: { bg: "#e8f5e9", border: "#4caf50", icon: "📋" },
        late:       { bg: "#fff8e1", border: "#ffc107", icon: "⏰" },
        absent:     { bg: "#ffebee", border: "#f44336", icon: "❌" },
        general:    { bg: "#e3f2fd", border: "#2196f3", icon: "📢" },
        message:    { bg: "#f3e5f5", border: "#9c27b0", icon: "💬" }
    };
    const type = msg.type || (isGeneral ? "general" : "message");
    const cfg  = typeColors[type] || typeColors.general;
    const dateStr = msg.date ? new Date(msg.date).toLocaleDateString("ar-SA") : "اليوم";

    // التحقق من قراءة الرسالة
    let isRead = false;
    if (isGeneral) {
        let readIds = [];
        try {
            const rawRead = localStorage.getItem("ajaweed_read_general_ids");
            if (rawRead) readIds = JSON.parse(rawRead);
        } catch {}
        isRead = readIds.includes(String(msg.id));
    } else {
        isRead = !!msg.read;
    }

    const readClass = isRead ? "read" : "";
    const cardBg = isRead ? "#f1f5f9" : cfg.bg;
    const cardBorder = isRead ? "#cbd5e1" : cfg.border;

    // تقصير النص للحفاظ على تنسيق موحد للقائمة
    const rawBody = msg.body || msg.message || msg.text || "";
    const truncatedBody = truncateText(rawBody, 80);

    let attachBadge = "";
    if (msg.attachment) {
        attachBadge = `
            <div style="font-size: 0.75rem; color: #666; display: flex; align-items: center; gap: 4px; margin-top: 8px;">
                <span>📎</span><span>مرفق (${msg.attachment.type === 'image' ? 'صورة' : 'ملف PDF'})</span>
            </div>`;
    }

    const msgId = msg.id || Date.now().toString();

    return `
        <div class="p-msg-card ${readClass}" style="border-right-color: ${cardBorder}; background: ${cardBg}; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;" onclick="openMessageDetail('${msgId}', ${isGeneral})">
            <div class="p-msg-header">
                <span class="p-msg-icon">${cfg.icon}</span>
                <span class="p-msg-title">${msg.title || (isGeneral ? "إعلان عام" : "إشعار خاص")}</span>
                <span class="p-msg-date">${dateStr}</span>
            </div>
            <p class="p-msg-body">${truncatedBody}</p>
            ${attachBadge}
        </div>`;
}

// دالة لحل ومعالجة بيانات المرفق ديناميكياً (خاصة عند تخفيض حجم الصور إلى [Base64] في السحابة)
function resolveAttachmentData(msg, isGeneral, studentId = null) {
    if (!msg || !msg.attachment) return "";
    let data = msg.attachment.data;
    
    // إذا كانت البيانات عبارة عن مؤشر [Base64] أو شعار افتراضي، نحاول جلب البيانات الأصلية الكاملة من تخزين الإدارة المحلي (في حال التشغيل على نفس المتصفح)
    if (!data || data === "[Base64]" || data === "ajaweed_logo_1779318974019.png") {
        if (isGeneral) {
            try {
                const rawAdmin = localStorage.getItem("ajaweed_general_messages");
                if (rawAdmin) {
                    const adminMsgs = JSON.parse(rawAdmin);
                    const found = adminMsgs.find(m => String(m.id) === String(msg.id));
                    if (found && found.attachment && found.attachment.data && found.attachment.data !== "[Base64]" && found.attachment.data !== "ajaweed_logo_1779318974019.png") {
                        return found.attachment.data;
                    }
                }
            } catch (e) {
                console.warn("Failed to resolve general message attachment:", e);
            }
        } else {
            try {
                const rawAdminSt = localStorage.getItem("ajaweed_students");
                if (rawAdminSt) {
                    const adminStudents = JSON.parse(rawAdminSt);
                    // البحث في جميع الطلاب بالإدارة أو تحديد طالب معين
                    const search = studentId ? adminStudents.filter(s => String(s.id) === String(studentId)) : adminStudents;
                    for (const s of search) {
                        const messages = s.privateMessages || s.messages || [];
                        const found = messages.find(m => String(m.id) === String(msg.id));
                        if (found && found.attachment && found.attachment.data && found.attachment.data !== "[Base64]" && found.attachment.data !== "ajaweed_logo_1779318974019.png") {
                            return found.attachment.data;
                        }
                    }
                }
            } catch (e) {
                console.warn("Failed to resolve private message attachment:", e);
            }
        }
        
        // شعار افتراضي راقٍ كخيار بديل لتفادي ظهور أيقونة صورة مكسورة
        return "ajaweed_logo_1779318974019.png";
    }
    
    return data;
}

// دالة فتح تفاصيل الرسالة بمودال جميل
function openMessageDetail(msgId, isGeneral) {
    let msg = null;
    if (isGeneral) {
        let generalMessages = [];
        try {
            const raw = localStorage.getItem(GENERAL_MSGS_KEY);
            if (raw) generalMessages = JSON.parse(raw);
            else if (typeof INITIAL_GENERAL_MESSAGES !== "undefined") {
                generalMessages = INITIAL_GENERAL_MESSAGES;
            }
        } catch {}
        msg = generalMessages.find(m => String(m.id) === String(msgId));

        // تعليم الرسالة كـ مقروءة في localStorage
        if (msg) {
            let readIds = [];
            try {
                const rawRead = localStorage.getItem("ajaweed_read_general_ids");
                if (rawRead) readIds = JSON.parse(rawRead);
            } catch {}
            if (!readIds.includes(String(msgId))) {
                readIds.push(String(msgId));
                localStorage.setItem("ajaweed_read_general_ids", JSON.stringify(readIds));
            }
        }
    } else {
        if (!activeChildId) return;
        const student = allStudents.find(s => String(s.id) === String(activeChildId));
        if (student) {
            const privateMessages = student.privateMessages || student.messages || [];
            msg = privateMessages.find(m => String(m.id) === String(msgId));

            // تعليم الرسالة كـ مقروءة
            if (msg && !msg.read) {
                msg.read = true;
                syncStudentData(student);
                // تحديث حالة قراءة الرسائل الخاصة سحابياً في Supabase (PostgreSQL)
                fetch(API_BASE + `/api/students/${student.id}/private-messages/read`, { method: "PATCH" })
                    .catch(err => console.warn("فشل تحديث حالة قراءة الرسائل سحابياً:", err));
            }
        }
    }

    if (!msg) return;

    // مكافأة تفاعل ولي الأمر عند فتح وقراءة تفاصيل رسالة أو إعلان
    if (parentSession && parentSession.parentPhone) {
        awardParentEngagementStar("read_msg", parentSession.parentPhone, { messageId: msgId });
    }

    // تحديث فوري للقوائم والشارات قبل فتح المودال مباشرة
    if (activeChildId) {
        const student = allStudents.find(s => String(s.id) === String(activeChildId));
        if (student) {
            renderPrivateMessages(student);
        }
    }
    renderGeneralMessages();

    // ملء بيانات المودال
    const typeLabel = document.getElementById("p-modal-msg-type");
    const typeIcon = document.getElementById("p-modal-msg-type-icon");
    const titleEl = document.getElementById("p-modal-msg-title");
    const dateEl = document.getElementById("p-modal-msg-date");
    const bodyEl = document.getElementById("p-modal-msg-body");
    const attachSec = document.getElementById("p-modal-msg-attachment-section");
    const attachContent = document.getElementById("p-modal-msg-attachment-content");

    if (typeLabel) {
        typeLabel.textContent = isGeneral ? "إعلان عام" : "إشعار خاص";
        typeLabel.style.color = isGeneral ? "#0f5132" : "#9c27b0";
        typeLabel.style.background = isGeneral ? "rgba(15, 81, 50, 0.08)" : "rgba(156, 39, 176, 0.08)";
    }
    if (typeIcon) {
        typeIcon.textContent = isGeneral ? "📢" : "💬";
    }

    if (titleEl) titleEl.textContent = msg.title || "تفاصيل الإشعار";
    if (dateEl) {
        const d = msg.date ? new Date(msg.date).toLocaleString("ar-SA") : "اليوم";
        dateEl.textContent = `📅 تاريخ النشر: ${d}`;
    }
    if (bodyEl) {
        bodyEl.textContent = msg.body || msg.message || msg.text || "";
    }

    // المرفقات
    if (attachSec && attachContent) {
        if (msg.attachment && msg.attachment.data) {
            attachSec.style.display = "block";
            const attachmentUrl = resolveAttachmentData(msg, isGeneral, activeChildId);
            if (msg.attachment.type === "image") {
                attachContent.innerHTML = `
                    <div style="text-align:center;">
                        <img src="${attachmentUrl}" style="max-width:100%; border-radius:8px; border:1px solid #ddd; max-height:200px; object-fit:contain; cursor:zoom-in;" onclick="this.requestFullscreen && this.requestFullscreen()">
                        <p style="font-size:0.75rem; color:#888; margin-top:4px;">انقر على الصورة لتكبيرها</p>
                    </div>`;
            } else if (msg.attachment.type === "pdf") {
                attachContent.innerHTML = `
                    <a href="${attachmentUrl}" download="${msg.attachment.name || 'document.pdf'}" style="display:flex; align-items:center; gap:8px; background:#f5f5f5; border:1px solid #e0e0e0; border-radius:6px; padding:10px 14px; text-decoration:none; color:#2196f3; font-weight:600; font-size:0.9rem; transition:background 0.2s;">
                        <span>📎</span><span>تحميل المرفق: ${msg.attachment.name || 'ملف PDF'}</span>
                    </a>`;
            } else {
                attachSec.style.display = "none";
                attachContent.innerHTML = "";
            }
        } else {
            attachSec.style.display = "none";
            attachContent.innerHTML = "";
        }
    }

    // إظهار المودال
    const modal = document.getElementById("p-message-modal");
    if (modal) {
        modal.style.display = "flex";
    }
}

function closeMessageModal() {
    const modal = document.getElementById("p-message-modal");
    if (modal) {
        modal.style.display = "none";
    }
}

// مزامنة بيانات الطالب في localStorage
function syncStudentData(student) {
    try {
        const idx = allStudents.findIndex(s => String(s.id) === String(student.id));
        if (idx !== -1) {
            allStudents[idx] = student;
            localStorage.setItem(STUDENTS_KEY, JSON.stringify(allStudents));
        }
    } catch {}
}

// ==========================================
// 8. تبديل تبويبات الرسائل داخل الصفحة
// ==========================================
function switchParentTab(tabName) {
    document.querySelectorAll(".p-tab-view").forEach(v => {
        v.style.display = "none";
        v.classList.remove("active-view");
    });
    document.querySelectorAll(".p-nav-tab").forEach(b => b.classList.remove("active"));

    const view = document.getElementById("p-view-" + tabName);
    const btn  = document.getElementById("p-tab-btn-" + tabName);
    if (view) { view.style.display = "block"; view.classList.add("active-view"); }
    if (btn)  btn.classList.add("active");
    
    // إذا كان قسم الرسائل مطوياً، نفتحه تلقائياً عند الضغط على أي تبويب لمشاهدة المحتوى
    const content = document.getElementById("p-msg-collapse-content");
    const icon = document.getElementById("p-msg-toggle-icon");
    if (content && content.classList.contains("collapsed")) {
        content.classList.remove("collapsed");
        if (icon) icon.style.transform = "rotate(0deg)";
    }
}

// دالة لفتح وإغلاق (طيّ) قسم الإشعارات والرسائل بالضغط على العنوان في الأعلى
function toggleMessagesDropdown() {
    const content = document.getElementById("p-msg-collapse-content");
    const icon = document.getElementById("p-msg-toggle-icon");
    if (!content) return;
    
    const isCollapsed = content.classList.contains("collapsed");
    if (isCollapsed) {
        content.classList.remove("collapsed");
        if (icon) icon.style.transform = "rotate(0deg)";
    } else {
        content.classList.add("collapsed");
        if (icon) icon.style.transform = "rotate(-90deg)";
    }
}

// ==========================================
// 9. تسجيل الخروج (اختياري بيد ولي الأمر)
// ==========================================
function parentLogout() {
    if (!confirm("هل تريد تسجيل الخروج من حساب أبنائك؟")) return;
    if (pollingIntervalId) {
        clearInterval(pollingIntervalId);
        pollingIntervalId = null;
    }
    clearSession();
    showLogin();
}

// ==========================================
// 10. تثبيت التطبيق الفعلي والمحاكاة PWA
// ==========================================
let deferredPrompt = null;

// التقاط حدث تثبيت PWA من المتصفح
window.addEventListener('beforeinstallprompt', (e) => {
    // منع المتصفح من إظهار التلقين التلقائي
    e.preventDefault();
    // حفظ الحدث ليتم تفعيله عند نقر المستخدم
    deferredPrompt = e;
    
    // إظهار بطاقة تثبيت PWA إذا كان الطالب الحالي غير مفعل / غير نشط
    if (activeChildId) {
        const student = allStudents.find(s => String(s.id) === activeChildId);
        if (student && student.status !== "installed") {
            const pwaCard = document.getElementById("p-pwa-card");
            if (pwaCard) pwaCard.style.display = "flex";
        }
    }
});

function simulateParentPWAInstall() {
    const student = allStudents.find(s => String(s.id) === activeChildId);
    if (!student) return;

    // فحص ما إذا كان المستخدم يستخدم جهاز iOS (iPhone/iPad)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (deferredPrompt) {
        // إظهار نافذة التثبيت الأصلية للمتصفح (أندرويد / كروم)
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                student.status = "installed";
                student.lastActive = "نشط الآن";
                syncStudentData(student);
                
                const pwaCard = document.getElementById("p-pwa-card");
                if (pwaCard) pwaCard.style.display = "none";
                
                showParentToast("✨ تم تثبيت تطبيق الأجاويد بنجاح على هاتفك!");
            }
            deferredPrompt = null;
        });
    } else if (isIOS) {
        // إذا كان آيفون، إظهار المودال الخاص بالتعليمات
        const modal = document.getElementById("p-ios-install-modal");
        if (modal) modal.style.display = "flex";
    } else {
        // محاكاة التثبيت التلقائي كخطوة واحدة للأنظمة الأخرى للتسهيل
        student.status = "installed";
        student.lastActive = "نشط الآن";
        syncStudentData(student);

        const pwaCard = document.getElementById("p-pwa-card");
        if (pwaCard) pwaCard.style.display = "none";

        showParentToast("✨ تم حفظ وتثبيت تطبيق الأجاويد بنجاح على الشاشة الرئيسية!");
    }
}

function closeIOSInstallModal() {
    const modal = document.getElementById("p-ios-install-modal");
    if (modal) modal.style.display = "none";
}

// ==========================================
// 11. توست إشعار خفيف
// ==========================================
function showParentToast(msg) {
    const toast = document.getElementById("p-toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3500);
}

// ==========================================
// 12. الأدوات المساعدة
// ==========================================
function updatePhoneClock() {
    const el = document.getElementById("p-clock");
    if (!el) return;
    const now  = new Date();
    const h    = now.getHours().toString().padStart(2, "0");
    const m    = now.getMinutes().toString().padStart(2, "0");
    el.textContent = `${h}:${m}`;
}

function setLogoImage() {
    const logoImg  = document.getElementById("p-logo-img");
    const logoPath = "ajaweed_logo_1779318974019.png";
    if (!logoImg) return;
    const img = new Image();
    img.src = logoPath;
    img.onload = () => {
        logoImg.src = logoPath;
        logoImg.style.display = "block";
        const placeholder = document.getElementById("p-logo-placeholder");
        if (placeholder) placeholder.style.display = "none";
    };
    img.onerror = () => {
        logoImg.style.display = "none";
    };
}

// ==========================================
// 13. نظام التحفيز وجائزة النجوم لأولياء الأمور
// ==========================================
let canvasAnimId = null;

// حاسب رتبة ولي الأمر بناء على عدد النجوم
function getParentRank(starCount) {
    const stars = starCount || 0;
    if (stars <= 5) return { text: "🛡️ متابع مستجد", color: "var(--gold-light)" };
    if (stars <= 15) return { text: "🤝 ولي أمر متعاون", color: "#85e3b3" }; // أخضر فاتح جميل
    if (stars <= 30) return { text: "🚀 ولي أمر مبادر", color: "#ffd460" }; // ذهبي مشع
    if (stars <= 50) return { text: "👑 ولي أمر متميز", color: "#f39c12" }; // برتقالي ملكي
    return { text: "🌟 ولي أمر مثالي", color: "#f1c40f" }; // أصفر مشع
}

// عرض معلومات النجوم والتفاعل عند الضغط على كرت النجوم
function showEngagementStarsInfo() {
    const info = `✨ نظام النجوم التفاعلي لأولياء الأمور ✨\n\n` +
                 `تفاعل يومياً مع التطبيق لترقية رتبتك والحصول على أوسمة جديدة:\n` +
                 `• أول دخول للتطبيق يومياً: +1 نجمة ⭐\n` +
                 `• تصفح/تحديث التطبيق (كل 3 مرات): +1 نجمة ⭐ (بحد أقصى 3 نجوم يومياً)\n` +
                 `• قراءة إعلان أو رسالة جديدة: +1 نجمة ⭐ (بحد أقصى 3 نجوم يومياً)\n` +
                 `• متابعة حضور الأبناء والأرشيف: +1 نجمة ⭐ (بحد أقصى نجمتين يومياً)\n\n` +
                 `🏆 الرتب المتاحة:\n` +
                 `• 0 - 5 نجوم: 🛡️ متابع مستجد\n` +
                 `• 6 - 15 نجمة: 🤝 ولي أمر متعاون\n` +
                 `• 16 - 30 نجمة: 🚀 ولي أمر مبادر\n` +
                 `• 31 - 50 نجمة: 👑 ولي أمر متميز\n` +
                 `• 51+ نجمة: 🌟 ولي أمر مثالي`;
    alert(info);
}

function awardParentEngagementStar(reason, phone, extra = {}) {
    if (!phone) return;
    const statsKey = `ajaweed_parent_stats_${phone}`;
    let stats = {
        lastLoginDate: "",
        loginCountToday: 0,
        starCount: 0,
        dailyOpensCount: 0,
        dailyReadsCount: 0,
        dailyAttendanceChecks: 0,
        dailyOpensStarsAwarded: 0,
        dailyReadsStarsAwarded: 0,
        dailyAttendanceStarsAwarded: 0,
        readMessageIds: []
    };

    try {
        const stored = localStorage.getItem(statsKey);
        if (stored) {
            const parsed = JSON.parse(stored);
            stats = { ...stats, ...parsed };
        }
    } catch (e) {
        console.error("خطأ في قراءة إحصائيات التفاعل:", e);
    }

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;

    // إذا تغير اليوم، نقوم بتصفير العدادات اليومية
    if (stats.lastLoginDate !== todayStr) {
        stats.lastLoginDate = todayStr;
        stats.loginCountToday = 0;
        stats.dailyOpensCount = 0;
        stats.dailyReadsCount = 0;
        stats.dailyAttendanceChecks = 0;
        stats.dailyOpensStarsAwarded = 0;
        stats.dailyReadsStarsAwarded = 0;
        stats.dailyAttendanceStarsAwarded = 0;
        // ملاحظة: لا نصفر readMessageIds لكي لا يحصل على نجوم لنفس الرسالة مرة أخرى في الغد
    }

    let starAwarded = 0;
    let description = "";

    if (reason === "login") {
        // تم التعامل معها في triggerParentGamification عند أول دخول لليوم
    } else if (reason === "app_open") {
        if (!stats.dailyOpensCount) stats.dailyOpensCount = 0;
        stats.dailyOpensCount++;
        // كل 3 فتحات تعطي نجمة واحدة، بحد أقصى 3 نجوم يومياً
        if (stats.dailyOpensCount % 3 === 0 && (stats.dailyOpensStarsAwarded || 0) < 3) {
            starAwarded = 1;
            stats.dailyOpensStarsAwarded = (stats.dailyOpensStarsAwarded || 0) + 1;
            description = "متابعتك اليومية المستمرة للتطبيق تمنحك نجماً إضافياً!";
        }
    } else if (reason === "read_msg") {
        const msgId = extra.messageId;
        if (msgId) {
            if (!stats.readMessageIds) stats.readMessageIds = [];
            // التحقق من أن الرسالة لم تُكافئ من قبل
            if (!stats.readMessageIds.includes(String(msgId))) {
                stats.readMessageIds.push(String(msgId));
                // المكافأة إذا لم يتم تجاوز الحد اليومي (3 نجوم)
                if ((stats.dailyReadsStarsAwarded || 0) < 3) {
                    starAwarded = 1;
                    stats.dailyReadsStarsAwarded = (stats.dailyReadsStarsAwarded || 0) + 1;
                    description = "شكراً لاهتمامك بقراءة تحديثات المدرسة وإعلاناتها!";
                }
            }
        }
    } else if (reason === "attendance_check") {
        if (!stats.dailyAttendanceChecks) stats.dailyAttendanceChecks = 0;
        stats.dailyAttendanceChecks++;
        // كل فحصين يعطي نجمة واحدة، بحد أقصى نجمتين يومياً
        if (stats.dailyAttendanceChecks % 2 === 0 && (stats.dailyAttendanceStarsAwarded || 0) < 2) {
            starAwarded = 1;
            stats.dailyAttendanceStarsAwarded = (stats.dailyAttendanceStarsAwarded || 0) + 1;
            description = "رائع! حرصك على متابعة انضباط حضور أبنائك يمنحك نجماً جديداً!";
        }
    }

    if (starAwarded > 0) {
        stats.starCount = (stats.starCount || 0) + starAwarded;

        // حفظ البيانات محلياً وسحابياً
        try {
            localStorage.setItem(statsKey, JSON.stringify(stats));
        } catch (e) {}
        uploadParentStatsToCloud(phone, stats);

        // تحديث الواجهة
        const countEl = document.getElementById("p-stars-count");
        if (countEl) countEl.textContent = stats.starCount;

        const rankInfo = getParentRank(stats.starCount);
        const rankEl = document.getElementById("p-stars-rank");
        if (rankEl) {
            rankEl.textContent = rankInfo.text;
            rankEl.style.color = rankInfo.color;
        }

        // إظهار الاحتفال
        setTimeout(() => {
            showRewardModal(description || "حصلت على نجمة تفاعل تشجيعية جديدة!", stats.starCount);
        }, 300);
    } else {
        // تحديث فقط في حال تغيرت العدادات دون الحصول على نجمة لضمان استمرارية الحفظ
        try {
            localStorage.setItem(statsKey, JSON.stringify(stats));
        } catch (e) {}
        uploadParentStatsToCloud(phone, stats);
    }
}

function triggerParentGamification(parentPhone) {
    if (!parentPhone) return;
    const statsKey = `ajaweed_parent_stats_${parentPhone}`;
    let stats = {
        lastLoginDate: "",
        loginCountToday: 0,
        starCount: 0,
        dailyOpensCount: 0,
        dailyReadsCount: 0,
        dailyAttendanceChecks: 0,
        dailyOpensStarsAwarded: 0,
        dailyReadsStarsAwarded: 0,
        dailyAttendanceStarsAwarded: 0,
        readMessageIds: []
    };
    
    try {
        const stored = localStorage.getItem(statsKey);
        if (stored) {
            const parsed = JSON.parse(stored);
            stats = { ...stats, ...parsed };
        }
    } catch (e) {
        console.error("خطأ في قراءة إحصائيات التفاعل:", e);
    }

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;

    // حساب فرق الأيام بين اليوم وآخر زيارة
    let daysDiff = -1;
    if (stats.lastLoginDate) {
        const lastDate = new Date(stats.lastLoginDate + "T12:00:00");
        const currDate = new Date(todayStr + "T12:00:00");
        const timeDiff = currDate.getTime() - lastDate.getTime();
        daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    }

    let greeting = "";
    let rewardStar = false;

    if (stats.lastLoginDate === todayStr) {
        // زيارة متكررة في نفس اليوم
        stats.loginCountToday++;
        greeting = "أهلاً بك ، أنت ولي أمر رائع ، أنت قدوة في اهتمامك ومتابعتك";
    } else {
        // أول دخول في هذا اليوم الجديد
        stats.loginCountToday = 1;
        stats.lastLoginDate = todayStr;
        
        // تصفير العدادات اليومية للأنشطة
        stats.dailyOpensCount = 0;
        stats.dailyReadsCount = 0;
        stats.dailyAttendanceChecks = 0;
        stats.dailyOpensStarsAwarded = 0;
        stats.dailyReadsStarsAwarded = 0;
        stats.dailyAttendanceStarsAwarded = 0;

        stats.starCount = (stats.starCount || 0) + 1; // زيادة النجوم لدخول اليوم الأول
        rewardStar = true;

        if (daysDiff === -1) {
            greeting = "أهلاً بك ، أنت ولي أمر رائع ومتابع متميز لأبنائك!";
        } else if (daysDiff === 1) {
            greeting = "أهلاً بك مجدداً! يسعدنا جداً متابعتك اليومية المستمرة لأبنائك.";
        } else if (daysDiff === 2) {
            greeting = "أهلاً بك ، مر يومين يا غالي ما زرتنا، لا تحرمنا من متابعتك وحرصك!";
        } else {
            greeting = "أهلاً بك ، مر وقت طويل يا غالي ما زرتنا، اشتقنا لمتابعتك وتفاعلك معنا!";
        }
    }

    // حفظ البيانات المحدثة محلياً وسحابياً
    try {
        localStorage.setItem(statsKey, JSON.stringify(stats));
    } catch (e) {}
    uploadParentStatsToCloud(parentPhone, stats);

    // تحديث النجمة في لوحة المعلومات
    const countEl = document.getElementById("p-stars-count");
    if (countEl) countEl.textContent = stats.starCount;

    // تحديث الرتبة في لوحة المعلومات
    const rankInfo = getParentRank(stats.starCount);
    const rankEl = document.getElementById("p-stars-rank");
    if (rankEl) {
        rankEl.textContent = rankInfo.text;
        rankEl.style.color = rankInfo.color;
    }

    // إظهار نافذة المكافأة إذا حصل على نجمة دخول اليوم الجديد
    if (rewardStar) {
        setTimeout(() => {
            showRewardModal(greeting, stats.starCount);
        }, 800);
    }

    // تشغيل مكافأة تصفح التطبيق وفتحه
    awardParentEngagementStar("app_open", parentPhone);
}

function showRewardModal(greeting, starCount) {
    const modal = document.getElementById("p-reward-modal");
    if (!modal) return;

    const titleEl = document.getElementById("p-reward-title");
    const countEl = document.getElementById("p-reward-star-count");
    const descEl = document.getElementById("p-reward-desc");

    if (titleEl) titleEl.textContent = greeting;
    if (countEl) countEl.textContent = starCount;

    const rankInfo = getParentRank(starCount);
    if (descEl) {
        descEl.innerHTML = `أنت قدوة في اهتمامك ومتابعتك لأبنائك. لقد حصلت على نجمة تشجيعية جديدة!<br>` +
                           `<span style="display:inline-block; margin-top:8.px; font-weight:bold; color:var(--accent-color);">رتبتك الحالية: ${rankInfo.text}</span>`;
    }

    modal.style.display = "flex";
    
    // تشغيل أيقونات لوسيد داخل المودال للتأكد من ظهور النجمة
    lucide.createIcons();

    // بدء تأثير الألعاب النارية والنجوم المتساقطة
    initStarburstAnimation();
}

function closeRewardModal() {
    const modal = document.getElementById("p-reward-modal");
    if (modal) modal.style.display = "none";
    if (canvasAnimId) {
        cancelAnimationFrame(canvasAnimId);
        canvasAnimId = null;
    }
}

function initStarburstAnimation() {
    const canvas = document.getElementById("p-reward-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const container = canvas.parentElement;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    const particles = [];
    // لوحة ألوان ذهبية مع لمسات خضراء فاخرة متماشية مع هوية الأجاويد الملكية
    const colors = ["#c5a880", "#e6ca97", "#f3e1b9", "#ffffff", "#0f5132", "#198754"];

    const particleCount = 80;
    const centerX = canvas.width / 2;
    // نقطة الانطلاق هي منتصف أيقونة النجمة الكبيرة بالمودال
    const centerY = 30 + 40; 

    class Particle {
        constructor() {
            this.x = centerX;
            this.y = centerY;
            this.size = Math.random() * 4 + 2.5;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2.5;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed - 1.5; // توجيهها للأعلى قليلاً لتأثير نافورة
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.alpha = 1;
            this.decay = Math.random() * 0.015 + 0.008;
            this.gravity = 0.08;
            this.isStar = Math.random() > 0.4;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += this.gravity;
            this.alpha -= this.decay;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color;

            if (this.isStar) {
                // رسم نجمة ذهبية خماسية فائدة الدقة
                ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                    ctx.lineTo(
                        this.x + Math.cos(((18 + i * 72) * Math.PI) / 180) * this.size,
                        this.y + Math.sin(((18 + i * 72) * Math.PI) / 180) * this.size
                    );
                    ctx.lineTo(
                        this.x + Math.cos(((54 + i * 72) * Math.PI) / 180) * (this.size / 2.2),
                        this.y + Math.sin(((54 + i * 72) * Math.PI) / 180) * (this.size / 2.2)
                    );
                }
                ctx.closePath();
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    let frame = 0;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.update();
            p.draw();
            if (p.alpha <= 0) {
                particles.splice(i, 1);
            }
        }

        // إضافة بريق إضافي ناعم ومستمر خلال العرض
        if (frame % 8 === 0 && particles.length < 120) {
            for (let k = 0; k < 3; k++) {
                particles.push(new Particle());
            }
        }

        frame++;
        canvasAnimId = requestAnimationFrame(animate);
    }

    animate();
}

// \u062f\u0627\u0644\u0629 \u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0625\u062d\u0635\u0627\u0626\u064a\u0627\u062a \u0648\u0646\u062c\u0648\u0645 \u0648\u0644\u064a \u0627\u0644\u0623\u0645\u0631 \u0645\u0639 \u0642\u0627\u0639\u062f\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0633\u062d\u0627\u0628\u064a\u0629
async function syncParentStatsWithCloud(phone) {
    if (!phone) return null;
    const statsKey = `ajaweed_parent_stats_${phone}`;
    
    // 1. \u062c\u0644\u0628 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0645\u062d\u0644\u064a\u0629 \u0623\u0648\u0644\u0627\u064b
    let localStats = null;
    try {
        const stored = localStorage.getItem(statsKey);
        if (stored) {
            localStats = JSON.parse(stored);
        }
    } catch (e) {
        console.error("\u062e\u0637\u0623 \u0641\u064a \u0642\u0631\u0627\u0621\u0629 \u0625\u062d\u0635\u0627\u0626\u064a\u0627\u062a \u0627\u0644\u062a\u0641\u0627\u0639\u0644 \u0627\u0644\u0645\u062d\u0644\u064a\u0629:", e);
    }

    try {
        // 2. جلب البيانات من السيرفر
        const res = await fetch(API_BASE + `/api/parent-stats/${phone}`);
        if (res.ok) {
            const cloudStats = await res.json();
            
            if (cloudStats) {
                // دمج البيانات: نأخذ القيمة الأكبر لعدد النجوم لضمان عدم ضياع أي تقدم
                let mergedStats = { ...cloudStats };
                
                if (localStats) {
                    if ((localStats.starCount || 0) > (cloudStats.starCount || 0)) {
                        // إذا كانت النجوم المحلية أكبر (مثلاً كسب نجمة في وضع عدم الاتصال)، نعتمدها ونقوم برفعها للسيرفر
                        mergedStats.starCount = localStats.starCount;
                        mergedStats.dailyOpensStarsAwarded = Math.max(localStats.dailyOpensStarsAwarded || 0, cloudStats.dailyOpensStarsAwarded || 0);
                        mergedStats.dailyReadsStarsAwarded = Math.max(localStats.dailyReadsStarsAwarded || 0, cloudStats.dailyReadsStarsAwarded || 0);
                        mergedStats.dailyAttendanceStarsAwarded = Math.max(localStats.dailyAttendanceStarsAwarded || 0, cloudStats.dailyAttendanceStarsAwarded || 0);
                        
                        // دمج قائمة الرسائل المقروءة
                        const localReadIds = localStats.readMessageIds || [];
                        const cloudReadIds = cloudStats.readMessageIds || [];
                        mergedStats.readMessageIds = [...new Set([...localReadIds, ...cloudReadIds])];
                        
                        // رفع التحديث للسيرفر
                        await uploadParentStatsToCloud(phone, mergedStats);
                    } else {
                        // إذا كانت النجوم السحابية أكبر أو متساوية، نعتمد السحابية ودعم دمج الرسائل المقروءة
                        const localReadIds = localStats.readMessageIds || [];
                        const cloudReadIds = cloudStats.readMessageIds || [];
                        mergedStats.readMessageIds = [...new Set([...localReadIds, ...cloudReadIds])];
                    }
                }
                
                // حفظ النتيجة في localStorage
                localStorage.setItem(statsKey, JSON.stringify(mergedStats));
                
                // تحديث الواجهة الرسومية بالرتبة والنجوم الجديدة
                const countEl = document.getElementById("p-stars-count");
                if (countEl) countEl.textContent = mergedStats.starCount;

                const rankInfo = getParentRank(mergedStats.starCount);
                const rankEl = document.getElementById("p-stars-rank");
                if (rankEl) {
                    rankEl.textContent = rankInfo.text;
                    rankEl.style.color = rankInfo.color;
                }
                
                return mergedStats;
            }
        }
    } catch (err) {
        console.warn("فشل الاتصال بالسيرفر لمزامنة النجوم، سيتم الاستمرار محلياً:", err);
    }
    
    return localStats;
}

// دالة لرفع إحصائيات ولي الأمر للسيرفر
async function uploadParentStatsToCloud(phone, stats) {
    try {
        await fetch(API_BASE + `/api/parent-stats/${phone}`, {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify(stats)
        });
    } catch (e) {
        console.warn("فشل رفع إحصائيات ولي الأمر للسيرفر:", e);
    }
}

// دالة تهيئة وبدء التفاعل اليومي
async function initParentGamification(parentPhone) {
    if (!parentPhone) return;
    // 1. مزامنة النجوم من السحابية أولاً
    await syncParentStatsWithCloud(parentPhone);
    // 2. تشغيل منطق التفاعل ومكافأة الدخول اليومي
    triggerParentGamification(parentPhone);
}

function initCloudSyncAndNotifications() {
    // طلب صلاحية الإشعارات
    if ("Notification" in window) {
        if (Notification.permission === "default") {
            Notification.requestPermission();
        }
    }

    // بدء المزامنة الفورية ثم تكرارها كل 5 ثوانٍ
    pollCloudSync();
    if (!pollingIntervalId) {
        pollingIntervalId = setInterval(pollCloudSync, 5000);
    }
}

async function pollCloudSync() {
    if (!parentSession || !parentSession.parentPhone) {
        if (pollingIntervalId) {
            clearInterval(pollingIntervalId);
            pollingIntervalId = null;
        }
        return;
    }

    try {
        // 1. مزامنة وجلب الإعلانات العامة من السيرفر
        const genRes = await fetch(API_BASE + "/api/general-messages");
        if (genRes.ok) {
            const cloudMsgs = await genRes.json();
            if (Array.isArray(cloudMsgs)) {
                processSyncedGeneralMessages(cloudMsgs);
            }
        }

        // 2. جلب جميع أبناء ولي الأمر باستخدام رقم الجوال مباشرةً من السيرفر (أكثر دقة وشمولًا)
        const byPhoneRes = await fetch(API_BASE + `/api/students/by-phone/${encodeURIComponent(parentSession.parentPhone)}`);
        if (byPhoneRes.ok) {
            const cloudChildren = await byPhoneRes.json();
            if (Array.isArray(cloudChildren) && cloudChildren.length > 0) {
                // تحديث قائمة معرفات الأبناء في الجلسة بالبيانات السحابية
                const cloudIds = cloudChildren.map(s => String(s.id));
                let sessionUpdated = false;
                cloudIds.forEach(cid => {
                    if (!parentSession.studentIds.includes(cid)) {
                        parentSession.studentIds.push(cid);
                        sessionUpdated = true;
                    }
                });
                if (sessionUpdated) {
                    saveSession(parentSession);
                }

                // معالجة كل طالب بشكل منفصل
                cloudChildren.forEach(cloudStudent => {
                    processSyncedStudent(String(cloudStudent.id), cloudStudent);
                });
            }
        } else {
            // احتياطي: جلب كل طالب من القائمة المحفوظة بالمعرف إن فشل المسار الجديد
            if (parentSession.studentIds && parentSession.studentIds.length > 0) {
                const fetchPromises = parentSession.studentIds.map(async (sid) => {
                    const res = await fetch(API_BASE + `/api/students/${sid}`);
                    if (res.ok) {
                        const cloudStudent = await res.json();
                        if (cloudStudent) return { id: sid, data: cloudStudent };
                    }
                    return { id: sid, data: null };
                });
                const results = await Promise.all(fetchPromises);
                results.forEach(result => {
                    if (result.data) processSyncedStudent(result.id, result.data);
                });
            }
        }

        // 3. مزامنة نقاط النجوم لولي الأمر في الخلفية
        if (parentSession.parentPhone) {
            await syncParentStatsWithCloud(parentSession.parentPhone);
        }

    } catch (err) {
        console.warn("خطأ في المزامنة السحابية مع قاعدة البيانات:", err);
    }
}

function processSyncedGeneralMessages(cloudMsgs) {
    if (!Array.isArray(cloudMsgs)) return;

    // تمديد وتوحيد المفاتيح لتتطابق مع النظام المحلي
    const formattedMsgs = cloudMsgs.map(m => {
        let attachment = null;
        const att = m.attachment || m.att;
        if (att) {
            attachment = {
                type: att.type || att.t || "image",
                name: att.name || att.n || "",
                data: att.data || att.d || "[Base64]"
            };
        }
        return {
            id: m.id,
            title: m.title || m.t || "إعلان عام",
            text: m.text || m.txt || m.body || m.message || "",
            date: m.date || m.dt,
            attachment: attachment
        };
    });

    let localMsgs = [];
    try {
        const raw = localStorage.getItem(GENERAL_MSGS_KEY);
        if (raw) localMsgs = JSON.parse(raw);
        else if (typeof INITIAL_GENERAL_MESSAGES !== "undefined") {
            localMsgs = INITIAL_GENERAL_MESSAGES;
        }
    } catch {}

    let updated = false;
    
    // فحص الرسائل القادمة وعرض الإشعار للجديد منها
    formattedMsgs.reverse().forEach(cm => {
        const exists = localMsgs.some(lm => String(lm.id) === String(cm.id));
        if (!exists) {
            localMsgs.unshift(cm);
            updated = true;

            showScreenNotification(
                "📢 إعلان عام جديد من إدارة المدرسة",
                cm.title + ": " + (cm.text || "")
            );
        }
    });

    if (updated) {
        localStorage.setItem(GENERAL_MSGS_KEY, JSON.stringify(localMsgs));
        if (parentSession) {
            renderGeneralMessages();
        }
    }
}

function processSyncedStudent(studentId, cloudStudentShort) {
    if (!cloudStudentShort || String(cloudStudentShort.id) !== String(studentId)) return;

    // تمديد وتوحيد المفاتيح لتتطابق مع قاعدة البيانات المحلية
    const cloudStudent = {
        id: cloudStudentShort.id,
        name: cloudStudentShort.name || '',
        grade: cloudStudentShort.grade || '',
        parentName: cloudStudentShort.parentName || cloudStudentShort.parent_name || '',
        parentPhone: cloudStudentShort.parentPhone || cloudStudentShort.parent_phone || '',
        attendance: cloudStudentShort.attendance || cloudStudentShort.att || "none",
        attendanceTime: cloudStudentShort.attendanceTime || cloudStudentShort.time || "",
        morningDelayMinutes: cloudStudentShort.morningDelayMinutes || cloudStudentShort.delay || 0,
        earlyDaysCount: cloudStudentShort.earlyDaysCount || cloudStudentShort.early || 0,
        lateDaysCount: cloudStudentShort.lateDaysCount || cloudStudentShort.late || 0,
        absentDaysCount: cloudStudentShort.absentDaysCount || cloudStudentShort.absent || 0,
        attendanceHistory: (cloudStudentShort.attendanceHistory || cloudStudentShort.hist || []).map(h => ({
            date: h.date || h.d,
            status: h.status || h.s,
            time: h.time || h.t,
            delay: h.delay || h.dy || 0
        })),
        privateMessages: (cloudStudentShort.privateMessages || cloudStudentShort.msgs || []).map(m => {
            let attachment = null;
            const att = m.attachment || m.att;
            if (att) {
                attachment = {
                    type: att.type || att.t || "image",
                    name: att.name || att.n || "",
                    data: att.data || att.d || "[Base64]"
                };
            }
            return {
                id: m.id,
                text: m.text || m.txt || m.message || "",
                date: m.date || m.dt,
                read: m.read !== undefined ? m.read : (m.rd !== undefined ? m.rd : false),
                attachment: attachment
            };
        })
    };

    const localIdx = allStudents.findIndex(s => String(s.id) === String(studentId));
    if (localIdx === -1) {
        // الطالب غير موجود في localStorage — أضفه ببيانات السحابية مع بيانات مبدئية من INITIAL_STUDENTS
        const initialRef = typeof INITIAL_STUDENTS !== "undefined"
            ? INITIAL_STUDENTS.find(s => String(s.id) === String(studentId))
            : null;
        const newEntry = Object.assign({}, initialRef || {}, {
            id: String(studentId),
            attendance: cloudStudent.attendance || "none",
            attendanceTime: cloudStudent.attendanceTime || "",
            morningDelayMinutes: cloudStudent.morningDelayMinutes || 0,
            earlyDaysCount: cloudStudent.earlyDaysCount || 0,
            lateDaysCount: cloudStudent.lateDaysCount || 0,
            absentDaysCount: cloudStudent.absentDaysCount || 0,
            attendanceHistory: cloudStudent.attendanceHistory || [],
            privateMessages: cloudStudent.privateMessages || []
        });
        allStudents.push(newEntry);
        localStorage.setItem(STUDENTS_KEY, JSON.stringify(allStudents));
        if (String(activeChildId) === String(studentId)) {
            renderChildData(activeChildId);
        }
        return;
    }

    const localStudent = allStudents[localIdx];
    let updated = false;

    // 0. مزامنة البيانات التعريفية للطالب في حال تحديثها من قبل الإدارة
    if (cloudStudent.name && cloudStudent.name !== localStudent.name) {
        localStudent.name = cloudStudent.name;
        updated = true;
    }
    if (cloudStudent.grade && cloudStudent.grade !== localStudent.grade) {
        localStudent.grade = cloudStudent.grade;
        updated = true;
    }
    if (cloudStudent.parentName && cloudStudent.parentName !== localStudent.parentName) {
        localStudent.parentName = cloudStudent.parentName;
        updated = true;
    }
    if (cloudStudent.parentPhone && cloudStudent.parentPhone !== localStudent.parentPhone) {
        localStudent.parentPhone = cloudStudent.parentPhone;
        updated = true;
    }

    // 1. مقارنة حالة الحضور والوقت
    if (cloudStudent.attendance && cloudStudent.attendance !== localStudent.attendance) {
        const oldAtt = localStudent.attendance;
        localStudent.attendance = cloudStudent.attendance;
        localStudent.attendanceTime = cloudStudent.attendanceTime || "";
        localStudent.morningDelayMinutes = cloudStudent.morningDelayMinutes || 0;
        updated = true;

        if (oldAtt === "none" || !oldAtt) {
            let attTitle = "";
            let attBody = "";
            const delayMins = localStudent.morningDelayMinutes;
            
            if (localStudent.attendance === "present") {
                attTitle = `✅ رصد حضور: ${localStudent.name}`;
                attBody = `تم تسجيل حضور الابن للمدرسة بنجاح اليوم.`;
            } else if (localStudent.attendance === "absent") {
                attTitle = `❌ تنبيه غياب: ${localStudent.name}`;
                attBody = `لم يتم رصد حضور الابن في المدرسة اليوم. يرجى التواصل مع الإدارة.`;
            } else if (localStudent.attendance === "delayed") {
                attTitle = `⏰ تنبيه تأخر صباحي: ${localStudent.name}`;
                attBody = `تأخر الابن عن الطابور الصباحي بمقدار ${delayMins} دقيقة اليوم.`;
            }
            
            if (attTitle) {
                showScreenNotification(attTitle, attBody);
                playNotificationChime();
            }
        }
    } else {
        if (cloudStudent.attendanceTime !== localStudent.attendanceTime) {
            localStudent.attendanceTime = cloudStudent.attendanceTime;
            updated = true;
        }
        if (cloudStudent.morningDelayMinutes !== localStudent.morningDelayMinutes) {
            localStudent.morningDelayMinutes = cloudStudent.morningDelayMinutes;
            updated = true;
        }
    }

    // 1.5 مزامنة سجل الأرشيف التاريخي من السحابة
    if (Array.isArray(cloudStudent.attendanceHistory) && cloudStudent.attendanceHistory.length > 0) {
        if (!localStudent.attendanceHistory) {
            localStudent.attendanceHistory = [];
        }
        let histUpdated = false;
        cloudStudent.attendanceHistory.forEach(cloudRecord => {
            const existIdx = localStudent.attendanceHistory.findIndex(r => r.date === cloudRecord.date);
            if (existIdx === -1) {
                localStudent.attendanceHistory.push(cloudRecord);
                histUpdated = true;
            } else if (localStudent.attendanceHistory[existIdx].status !== cloudRecord.status) {
                localStudent.attendanceHistory[existIdx] = cloudRecord;
                histUpdated = true;
            }
        });
        if (histUpdated) {
            localStudent.attendanceHistory.sort((a, b) => b.date.localeCompare(a.date));
            // إعادة حساب العدادات من الأرشيف المدمج
            localStudent.earlyDaysCount  = localStudent.attendanceHistory.filter(r => r.status === "present").length;
            localStudent.lateDaysCount   = localStudent.attendanceHistory.filter(r => r.status === "delayed" || r.status === "late").length;
            localStudent.absentDaysCount = localStudent.attendanceHistory.filter(r => r.status === "absent").length;
            updated = true;
        }
    } else {
        // إذا لم يكن هناك أرشيف، نزامن العدادات المباشرة فقط
        if (cloudStudent.earlyDaysCount !== undefined && cloudStudent.earlyDaysCount !== localStudent.earlyDaysCount) {
            localStudent.earlyDaysCount = cloudStudent.earlyDaysCount;
            updated = true;
        }
        if (cloudStudent.lateDaysCount !== undefined && cloudStudent.lateDaysCount !== localStudent.lateDaysCount) {
            localStudent.lateDaysCount = cloudStudent.lateDaysCount;
            updated = true;
        }
        if (cloudStudent.absentDaysCount !== undefined && cloudStudent.absentDaysCount !== localStudent.absentDaysCount) {
            localStudent.absentDaysCount = cloudStudent.absentDaysCount;
            updated = true;
        }
    }

    // 2. مقارنة الإشعارات والرسائل الخاصة للابن
    if (Array.isArray(cloudStudent.privateMessages)) {
        if (!localStudent.privateMessages) {
            localStudent.privateMessages = [];
        }
        
        cloudStudent.privateMessages.reverse().forEach(cm => {
            const exists = localStudent.privateMessages.some(lm => String(lm.id) === String(cm.id));
            if (!exists) {
                // وضع رابط افتراضي راقٍ إذا كان المرفق فارغاً أو محذوفاً
                if (cm.attachment && cm.attachment.data === "[Base64]") {
                    cm.attachment.data = "ajaweed_logo_1779318974019.png";
                }
                
                localStudent.privateMessages.unshift(cm);
                updated = true;

                showScreenNotification(
                    `💬 رسالة خاصة جديدة: ${localStudent.name}`,
                    cm.text || ""
                );
                playNotificationChime();
            }
        });
    }

    if (updated) {
        allStudents[localIdx] = localStudent;
        localStorage.setItem(STUDENTS_KEY, JSON.stringify(allStudents));
        
        if (String(activeChildId) === String(studentId)) {
            renderChildData(activeChildId);
        }
    }
}

function showScreenNotification(title, body) {
    // 1. عرض إشعار النظام إذا منحه ولي الأمر الإذن
    if ("Notification" in window && Notification.permission === "granted") {
        try {
            new Notification(title, {
                body: body,
                icon: "ajaweed_logo_1779318974019.png"
            });
        } catch (e) {
            console.warn("إشعار النظام غير مسموح في الخلفية:", e);
        }
    }

    // 2. إشعار منبثق توست داخل التطبيق كبديل إضافي مبهر ومقروء
    showParentToast(`✨ ${title}\n${body}`);
}

function playNotificationChime() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        
        // النوتة الأولى (C5)
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(523.25, ctx.currentTime);
        gain1.gain.setValueAtTime(0.12, ctx.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start();
        osc1.stop(ctx.currentTime + 0.35);

        // النوتة الثانية (E5) بعد تأخر خفيف لتعطي رنيناً موسيقياً
        setTimeout(() => {
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.type = "sine";
            osc2.frequency.setValueAtTime(659.25, ctx.currentTime);
            gain2.gain.setValueAtTime(0.12, ctx.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.start();
            osc2.stop(ctx.currentTime + 0.4);
        }, 120);

    } catch (e) {
        console.warn("الصوت غير مدعوم أو يتطلب تفاعل المستخدم أولاً:", e);
    }
}
