// منطق عمل تطبيق الأجاويد (Ajaweed Notification System)
// مدرسة الأجاويد الأولى المتوسطة

// تحديد عنوان URL الأساسي للاتصال بالخادم سحابياً/محلياً
const API_BASE = (() => {
    if (window.location.protocol === 'file:') return 'http://localhost:3000';
    if (!window.location.hostname) return 'http://localhost:3000';
    
    const host = window.location.hostname.toLowerCase();
    const port = window.location.port;
    
    // فحص ما إذا كان العنوان محلياً ويعمل على منفذ مختلف عن 3000
    const isLocalHost = host === 'localhost' || 
                        host === '127.0.0.1' || 
                        host.startsWith('192.168.') || 
                        host.startsWith('10.') || 
                        /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host);
                        
    if (isLocalHost && port !== '3000') {
        return 'http://localhost:3000';
    }
    return '';
})();



// ==========================================================================
// 0. نظام قفل لوحة الإدارة بالرمز السري (Admin PIN Lock)
// ==========================================================================

const ADMIN_PIN          = "125140";          // الرمز السري للإدارة
const ADMIN_SESSION_KEY  = "ajaweed_admin_session";
const ADMIN_SESSION_HOURS = 8;                 // مدة الجلسة بالساعات

let pinBuffer = ""; // الأرقام المدخلة حتى الآن

// التحقق من جلسة إدارية نشطة
function isAdminSessionValid() {
    try {
        const raw = localStorage.getItem(ADMIN_SESSION_KEY);
        if (!raw) return false;
        const session = JSON.parse(raw);
        const elapsed = Date.now() - session.loginTime;
        return elapsed < ADMIN_SESSION_HOURS * 3600 * 1000;
    } catch { return false; }
}

// حفظ جلسة المشرف
function saveAdminSession() {
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ loginTime: Date.now() }));
}

// تحديث نقاط مؤشر الإدخال
function updatePinDots() {
    const dots = document.querySelectorAll(".pin-dot");
    dots.forEach((dot, i) => {
        if (i < pinBuffer.length) {
            dot.style.background = "#c5a880";
            dot.style.borderColor = "#c5a880";
            dot.style.transform = "scale(1.15)";
        } else {
            dot.style.background = "transparent";
            dot.style.borderColor = "rgba(197,168,128,0.5)";
            dot.style.transform = "scale(1)";
        }
    });
}

// ضغط رقم على لوحة المفاتيح
function pinPress(digit) {
    if (pinBuffer.length >= 6) return;
    pinBuffer += digit;
    updatePinDots();

    if (pinBuffer.length === 6) {
        setTimeout(checkPin, 120); // تأخير بسيط لرؤية آخر نقطة
    }
}

// حذف آخر رقم
function pinDelete() {
    if (pinBuffer.length === 0) return;
    pinBuffer = pinBuffer.slice(0, -1);
    updatePinDots();
}

// مسح الكل
function pinClear() {
    pinBuffer = "";
    updatePinDots();
    document.getElementById("pin-error").style.display = "none";
}

// التحقق من الرمز
function checkPin() {
    if (pinBuffer === ADMIN_PIN) {
        // ✅ صحيح — فتح اللوحة
        saveAdminSession();
        const overlay = document.getElementById("admin-pin-overlay");
        overlay.classList.add("pin-unlocking");
        setTimeout(() => { overlay.style.display = "none"; }, 400);
    } else {
        // ❌ خطأ — اهتزاز + رسالة
        const card = document.getElementById("pin-keypad").parentElement;
        card.classList.add("pin-shake");
        setTimeout(() => card.classList.remove("pin-shake"), 500);

        const errorEl = document.getElementById("pin-error");
        errorEl.style.display = "block";
        setTimeout(() => { errorEl.style.display = "none"; }, 3000);

        // مسح البافر للمحاولة من جديد
        pinBuffer = "";
        updatePinDots();
    }
}

// دعم لوحة المفاتيح الفعلية (keyboard)
document.addEventListener("keydown", (e) => {
    const overlay = document.getElementById("admin-pin-overlay");
    if (!overlay || overlay.style.display === "none") return;
    if (e.key >= "0" && e.key <= "9") pinPress(e.key);
    else if (e.key === "Backspace") pinDelete();
    else if (e.key === "Escape")    pinClear();
});

// ==========================================================================
// 1. إدارة البيانات والاتصال المباشر (State & Local Storage)
// ==========================================================================

let students = [];
let generalMessages = [];
let currentStudentId = null; // الطالب النشط حالياً في محاكي الجوال
let sentNotificationsTodayCount = 0;
let currentAttachment = null; // المرفق الحالي (صورة أو PDF)
let accordionStates = {}; // حالة الأكورديونات للصفوف (مفتوح/مغلق)

// تحميل البيانات عند بدء تشغيل المنصة
document.addEventListener("DOMContentLoaded", () => {

    // --- فحص الجلسة الإدارية ---
    const overlay = document.getElementById("admin-pin-overlay");
    if (isAdminSessionValid()) {
        // الجلسة نشطة — أخفِ شاشة القفل مباشرة
        if (overlay) overlay.style.display = "none";
    }
    // إذا لم تكن الجلسة صالحة تبقى شاشة القفل ظاهرة
    // وسيتم تحميل البيانات بعد فتح القفل (initDatabase تعمل دائماً)

    initDatabase();
    updateLiveClock();
    setInterval(updateLiveClock, 1000);
    
    // محاكاة توقيت الهاتف ليتطابق مع النظام
    updatePhoneTime();
    setInterval(updatePhoneTime, 60000);

    // تفعيل الأيقونات المتميزة
    lucide.createIcons();
    
    // تعيين الصورة التوضيحية للشعار المولد
    setAppLogo();
});

// تعيين الشعار المولد في الهيدر والجوال
function setAppLogo() {
    const logoImgPath = "ajaweed_logo_1779318974019.png"; 
    // مصفوفة العناصر
    const headerLogo = document.getElementById("school-logo-img");
    const appLogo = document.getElementById("app-logo-img");
    const headerPlaceholder = document.getElementById("logo-placeholder");
    const appPlaceholder = document.getElementById("app-logo-placeholder");

    // التحقق من تفعيل الصورة
    const img = new Image();
    img.src = logoImgPath;
    img.onload = () => {
        headerLogo.src = logoImgPath;
        headerLogo.style.display = "block";
        headerPlaceholder.style.display = "none";

        appLogo.src = logoImgPath;
        appLogo.style.display = "block";
        appPlaceholder.style.display = "none";
    };
    img.onerror = () => {
        // في حال عدم توفر الصورة لأي سبب، نستخدم الأيقونة الافتراضية
        headerLogo.style.display = "none";
        headerPlaceholder.style.display = "flex";
        appLogo.style.display = "none";
        appPlaceholder.style.display = "flex";
    };
}

// تطبيع رقم الجوال بشكل متقدم ومقاوم للخطأ (يتعامل مع الفراغات، الشرطات، العشرية .0، والأرقام الهندية)
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

// رصد الوقت والتاريخ باللغة العربية
function getFormattedArabicDateTime(dateObj = new Date()) {
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    
    let hours = dateObj.getHours();
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'م' : 'ص';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hr = String(hours).padStart(2, '0');
    
    return `${yyyy}-${mm}-${dd} ${hr}:${minutes} ${ampm}`;
}

// توحيد وتطبيع صيغ التاريخ المتنوعة لـ YYYY-MM-DD
function normalizeDateString(rawDateStr) {
    if (!rawDateStr) return "";
    let str = String(rawDateStr).trim();
    if (str.includes("T")) {
        str = str.split("T")[0];
    }
    // إزالة أسماء الأيام باللغة العربية أو أي نصوص أخرى
    str = str.replace(/[أ-يa-zA-Z\s]/g, "");
    // تحويل الأرقام الهندية/العربية إلى الإنجليزية
    str = str.replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
    
    // تقسيم النص بناءً على الفواصل الشائعة (dash, slash, dot, underscore)
    const parts = str.split(/[-/._]/).filter(Boolean);
    if (parts.length === 3) {
        let day, month, year;
        if (parts[0].length === 4) {
            // YYYY-MM-DD
            year = parts[0];
            month = parts[1];
            day = parts[2];
        } else if (parts[2].length === 4) {
            // DD-MM-YYYY
            day = parts[0];
            month = parts[1];
            year = parts[2];
        } else {
            return str;
        }
        
        const yyyy = year;
        const mm = String(parseInt(month, 10)).padStart(2, '0');
        const dd = String(parseInt(day, 10)).padStart(2, '0');
        
        if (yyyy && mm && dd && !isNaN(yyyy) && !isNaN(mm) && !isNaN(dd)) {
            return `${yyyy}-${mm}-${dd}`;
        }
    }
    return str;
}

// تحليل دقيق للتاريخ والوقت الفعلي القادم من الإكسل
function parseExcelDateTime(rawDate, rawTime) {
    let dateStr = "";
    let timeStr = "";

    // 1. تحليل التاريخ (عمود A)
    if (rawDate !== null && rawDate !== undefined) {
        if (typeof rawDate === "number") {
            const excelEpoch = new Date(Date.UTC(1899, 11, 30));
            const dateObj = new Date(excelEpoch.getTime() + rawDate * 24 * 60 * 60 * 1000);
            if (!isNaN(dateObj.getTime())) {
                const yyyy = dateObj.getFullYear();
                const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
                const dd = String(dateObj.getDate()).padStart(2, '0');
                dateStr = `${yyyy}-${mm}-${dd}`;
            }
        } else if (rawDate instanceof Date && !isNaN(rawDate.getTime())) {
            const yyyy = rawDate.getFullYear();
            const mm = String(rawDate.getMonth() + 1).padStart(2, '0');
            const dd = String(rawDate.getDate()).padStart(2, '0');
            dateStr = `${yyyy}-${mm}-${dd}`;
        } else {
            dateStr = normalizeDateString(rawDate);
        }
    }

    // 2. تحليل الوقت (عمود G)
    if (rawTime !== null && rawTime !== undefined) {
        if (typeof rawTime === "number") {
            let totalSeconds = Math.round(rawTime * 24 * 60 * 60);
            let hours = Math.floor(totalSeconds / 3600);
            let minutes = Math.floor((totalSeconds % 3600) / 60);
            let ampm = hours >= 12 ? 'م' : 'ص';
            hours = hours % 12;
            hours = hours ? hours : 12;
            timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
        } else {
            let str = String(rawTime).trim();
            if (str.includes(":") && !str.includes("ص") && !str.includes("م")) {
                const parts = str.split(":");
                let hours = parseInt(parts[0]) || 0;
                const minutes = parseInt(parts[1]) || 0;
                const ampm = hours >= 12 ? 'م' : 'ص';
                hours = hours % 12;
                hours = hours ? hours : 12;
                timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
            } else {
                timeStr = str;
            }
        }
    }

    if (dateStr && timeStr) {
        return `${dateStr} ${timeStr}`;
    } else if (dateStr) {
        return dateStr;
    } else if (timeStr) {
        return timeStr;
    }
    return "";
}

// تهيئة قاعدة البيانات المحلية
function initDatabase() {
    const storedStudents = localStorage.getItem("ajaweed_students");
    const storedGeneral = localStorage.getItem("ajaweed_general_messages");
    const storedCount = localStorage.getItem("ajaweed_sent_count");

    if (storedStudents) {
        students = JSON.parse(storedStudents);
        // ترحيل الفصول القديمة من الحروف إلى الأرقام + إصلاح أرقام الجوالات
        let migrated = false;
        
        // 1. إصلاح أرقام الهواتف من واقع قاعدة البيانات الأولية إذا تم تصفيرها أو تدميرها بالرفع
        if (typeof INITIAL_STUDENTS !== "undefined") {
            students.forEach(s => {
                const refStudent = INITIAL_STUDENTS.find(ref => String(ref.id) === String(s.id));
                if (refStudent && refStudent.parentPhone) {
                    const normRef = normalizePhone(refStudent.parentPhone);
                    const normCurrent = normalizePhone(s.parentPhone);
                    if (normRef && normRef !== normCurrent) {
                        s.parentPhone = normRef;
                        migrated = true;
                    }
                }
            });
        }

        // 2. ترحيل الفصول القديمة من الحروف إلى الأرقام
        students.forEach(s => {
            if (s.grade && s.grade.includes(" - ")) {
                const parts = s.grade.split(" - ");
                let div = parts[1];
                if (div === "أ") { div = "1"; migrated = true; }
                else if (div === "ب") { div = "2"; migrated = true; }
                else if (div === "ج") { div = "3"; migrated = true; }
                else if (div === "د") { div = "4"; migrated = true; }
                s.grade = parts[0] + " - " + div;
            }
        });

        // 3. تحويل الحضور التلقائي القديم بدون وقت رصد إلى "لم يرصد" (none) إن لم يكن هناك أرشيف
        students.forEach(s => {
            if ((s.attendance === "present" || !s.attendance) && !s.attendanceTime && (!s.attendanceHistory || s.attendanceHistory.length === 0)) {
                s.attendance = "none";
                migrated = true;
            }
            // تهيئة سجل الحضور التاريخي إن لم يكن موجوداً
            if (!s.attendanceHistory) {
                s.attendanceHistory = [];
                migrated = true;
            }
            // تصفير العدادات القديمة المبنية على الهاش لتتطابق مع الأرشيف الفعلي
            const correctEarly  = s.attendanceHistory.filter(r => r.status === "present").length;
            const correctLate   = s.attendanceHistory.filter(r => r.status === "delayed" || r.status === "late").length;
            const correctAbsent = s.attendanceHistory.filter(r => r.status === "absent").length;
            if (s.earlyDaysCount !== correctEarly || s.lateDaysCount !== correctLate || s.absentDaysCount !== correctAbsent) {
                s.earlyDaysCount  = correctEarly;
                s.lateDaysCount   = correctLate;
                s.absentDaysCount = correctAbsent;
                migrated = true;
            }
        });

        if (migrated) {
            localStorage.setItem("ajaweed_students", JSON.stringify(students));
        }
    } else {
        students = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
        // ترحيل الفصول القديمة من الحروف إلى الأرقام للبيانات الأولية أيضاً
        students.forEach(s => {
            if (s.grade && s.grade.includes(" - ")) {
                const parts = s.grade.split(" - ");
                let div = parts[1];
                if (div === "أ") { div = "1"; }
                else if (div === "ب") { div = "2"; }
                else if (div === "ج") { div = "3"; }
                else if (div === "د") { div = "4"; }
                s.grade = parts[0] + " - " + div;
            }
            if (s.parentPhone) {
                s.parentPhone = normalizePhone(s.parentPhone);
            }
            s.attendance = "none"; // القيمة الافتراضية للطلاب الجدد
            s.attendanceTime = "";
            s.attendanceHistory = [];
            s.earlyDaysCount    = 0;
            s.lateDaysCount     = 0;
            s.absentDaysCount   = 0;
        });
        localStorage.setItem("ajaweed_students", JSON.stringify(students));
    }

    if (storedGeneral) {
        generalMessages = JSON.parse(storedGeneral);
    } else {
        generalMessages = JSON.parse(JSON.stringify(INITIAL_GENERAL_MESSAGES));
        localStorage.setItem("ajaweed_general_messages", JSON.stringify(generalMessages));
    }

    if (storedCount) {
        sentNotificationsTodayCount = parseInt(storedCount);
    } else {
        sentNotificationsTodayCount = 2; // قيمة افتراضية لتبدو المنصة نشطة
        localStorage.setItem("ajaweed_sent_count", sentNotificationsTodayCount.toString());
    }

    // تعيين الطالب الأول بالجدول كافتراضي للجوال للتسهيل والسرعة
    if (students.length > 0) {
        const firstInstalled = students.find(s => s.status === "installed") || students[0];
        currentStudentId = firstInstalled.id;
    }

    // تحديث كافة عناصر واجهة المستخدم
    refreshUI();
    
    // جلب البيانات الأحدث من السيرفر (قاعدة بيانات Supabase (PostgreSQL)) فور فتح التطبيق
    fetch(API_BASE + "/api/students")
        .then(res => {
            if (res.ok) return res.json();
            throw new Error("API error");
        })
        .then(cloudStudents => {
            if (cloudStudents && cloudStudents.length > 0) {
                students = cloudStudents;
                localStorage.setItem("ajaweed_students", JSON.stringify(students));
                refreshUI();
                
                // تعيين الطالب النشط مجدداً بعد تحميل البيانات من السيرفر
                if (students.length > 0) {
                    const firstInstalled = students.find(s => s.status === "installed") || students[0];
                    currentStudentId = firstInstalled.id;
                    renderMobileApp();
                }
            }
        })
        .catch(err => console.warn("تعذر جلب الطلاب من السيرفر، تم استخدام النسخة الاحتياطية المحلية:", err));

    fetch(API_BASE + "/api/general-messages")
        .then(res => {
            if (res.ok) return res.json();
            throw new Error("API error");
        })
        .then(cloudGeneral => {
            if (cloudGeneral && cloudGeneral.length > 0) {
                generalMessages = cloudGeneral;
                localStorage.setItem("ajaweed_general_messages", JSON.stringify(generalMessages));
                refreshUI();
            }
        })
        .catch(err => console.warn("تعذر جلب الرسائل العامة من السيرفر، تم استخدام النسخة الاحتياطية المحلية:", err));
}

// مزامنة البيانات مع الـ Local Storage
function syncData() {
    localStorage.setItem("ajaweed_students", JSON.stringify(students));
    localStorage.setItem("ajaweed_general_messages", JSON.stringify(generalMessages));
    localStorage.setItem("ajaweed_sent_count", sentNotificationsTodayCount.toString());
}

// إعادة مزامنة شاملة لجميع الطلاب إلى السحابة (لضمان وصول البيانات لأولياء الأمور)
function forceResyncAllToCloud() {
    if (!students || students.length === 0) return Promise.resolve();
    
    // مزامنة الإعلانات العامة أولاً
    if (typeof syncGeneralMessagesToCloud === "function") {
        syncGeneralMessagesToCloud();
    }
    
    // تأمين العدادات لجميع الطلاب قبل الإرسال المجمع
    students.forEach(s => ensureStudentCounters(s));
    
    // رفع كامل قائمة الطلاب إلى الخادم دفعة واحدة لتحسين الأداء
    return fetch(API_BASE + '/api/students/bulk', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ students: students })
    })
    .then(res => {
        if (!res.ok) {
            console.error("❌ فشلت المزامنة الشاملة للطلاب سحابياً:", res.statusText);
            throw new Error("فشلت المزامنة السحابية: " + res.statusText);
        }
        return res.json();
    })
    .catch(err => {
        console.error("❌ خطأ في الاتصال للمزامنة الشاملة للطلاب:", err);
        throw err;
    });
}

// مزامنة قائمة محددة من الطلاب إلى السحابة (تُستخدم لتحديث الحضور اليومي للمعدلين فقط بشكل فائق السرعة)
function syncStudentsListToCloud(list) {
    if (!list || list.length === 0) return Promise.resolve();
    
    // تأمين العدادات للطلاب المحددين قبل الإرسال
    list.forEach(s => ensureStudentCounters(s));
    
    return fetch(API_BASE + '/api/students/bulk', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ students: list })
    })
    .then(res => {
        if (!res.ok) {
            console.error("❌ فشلت المزامنة السحابية للطلاب:", res.statusText);
            throw new Error("فشلت المزامنة السحابية: " + res.statusText);
        }
        return res.json();
    })
    .catch(err => {
        console.error("❌ خطأ في الاتصال لمزامنة الطلاب:", err);
        throw err;
    });
}

// إعادة ضبط النظام كاملاً للقيم الأولية
function resetDatabase() {
    if (confirm("هل أنت متأكد من رغبتك في إعادة ضبط بيانات النظام للوضع الافتراضي؟")) {
        localStorage.removeItem("ajaweed_students");
        localStorage.removeItem("ajaweed_general_messages");
        localStorage.setItem("ajaweed_sent_count", "0");
        
        // إرسال طلب تصفير قاعدة البيانات السحابية
        fetch(API_BASE + '/api/database/reset', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ confirmCode: "AJAWEED_RESET_2026" })
        })
        .then(res => {
            if (res.ok) {
                showToast("success", "تم إعادة ضبط النظام للقيم الافتراضية محلياً وسحابياً.");
            } else {
                showToast("success", "تم إعادة تعيين النظام محلياً.");
            }
            initDatabase();
        })
        .catch(err => {
            showToast("success", "تم إعادة تعيين النظام محلياً.");
            initDatabase();
        });
    }
}

// تصفير حضور اليوم لجميع الطلاب (يُستخدم في بداية كل يوم دراسي قبل رفع ملف الحضور)
async function resetTodayAttendance() {
    if (!confirm("هل تريد تصفير حالة حضور اليوم لجميع الطلاب؟\nسيتم إعادة تعيين جميع الطلاب إلى حالة (لم يُرصد) تمهيداً لرفع ملف الحضور الجديد.")) {
        return;
    }
    try {
        // 1. تصفير السجل المحلي
        students.forEach(s => {
            s.attendance    = "none";
            s.attendanceTime = "";
            s.morningDelayMinutes = 0;
        });
        syncData();
        refreshUI();

        // 2. تصفير قاعدة البيانات السحابية
        const res = await fetch(API_BASE + '/api/attendance/reset-today', { method: "POST" });
        if (res.ok) {
            showToast("success", "✅ تم تصفير حضور اليوم لجميع الطلاب بنجاح! يمكنك الآن رفع ملف الحضور.");
        } else {
            showToast("warning", "تم التصفير محلياً، لكن فشل التصفير السحابي. تحقق من الاتصال.");
        }
    } catch (err) {
        console.error("خطأ في تصفير حضور اليوم:", err);
        showToast("error", "حدث خطأ في تصفير الحضور: " + err.message);
    }
}


// تحديث الساعة المباشرة
function updateLiveClock() {
    const clock = document.getElementById("live-clock");
    if (!clock) return;
    const now = new Date();
    clock.textContent = now.toLocaleTimeString("ar-SA", { hour12: true });
}

// تحديث ساعة شاشة الهاتف
function updatePhoneTime() {
    const phoneTime = document.getElementById("phone-time");
    if (!phoneTime) return;
    const now = new Date();
    phoneTime.textContent = now.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: false });
}

// ==========================================================================
// 2. تحديثات شاشات لوحة التحكم (Admin UI Rendering)
// ==========================================================================

function refreshUI() {
    renderStats();
    populateRecipientsDropdown();
    renderStudentsTable();
    renderLogs();
    renderQuickTestUsers();
    
    // تحديث شاشة الهاتف المحاكي وفقاً للطالب النشط
    renderMobileApp();

    // إعادة تحميل الأيقونات
    lucide.createIcons();
}

// رندرة إحصائيات لوحة التحكم
function renderStats() {
    const total = students.length;
    const installed = students.filter(s => s.status === "installed").length;
    const notInstalled = total - installed;
    const pct = total > 0 ? Math.round((installed / total) * 100) : 0;

    document.getElementById("stat-total-students").textContent = total;
    document.getElementById("stat-active-users").textContent = `${installed} / ${total}`;
    document.getElementById("stat-active-pct").textContent = `${pct}%`;
    document.getElementById("stat-active-bar").style.width = `${pct}%`;
    document.getElementById("stat-inactive-users").textContent = notInstalled;
    document.getElementById("stat-sent-today").textContent = sentNotificationsTodayCount;
}

// ملء قائمة مستلمي الإشعارات
function populateRecipientsDropdown() {
    const select = document.getElementById("notif-recipient");
    if (!select) return;
    
    const searchInput = document.getElementById("recipient-search");
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const currentValue = select.value;
    
    // الاحتفاظ بالخيارين الأولين
    select.innerHTML = `
        <option value="" disabled ${!currentValue ? "selected" : ""}>${query ? "نتائج البحث..." : "اختر الطالب المستلم..."}</option>
        <option value="all">📢 إرسال للجميع (إعلان عام بمدرسة الأجاويد)</option>
    `;

    // تصفية الطلاب بناءً على نص البحث
    const filteredStudents = students.filter(student => {
        if (!query) return true;
        const nameMatch = student.name && student.name.toLowerCase().includes(query);
        const idMatch = student.id && String(student.id).includes(query);
        return nameMatch || idMatch;
    });

    filteredStudents.forEach(student => {
        const option = document.createElement("option");
        option.value = student.id;
        option.textContent = `${student.name} (${student.id}) - ${student.grade}`;
        select.appendChild(option);
    });

    // الحفاظ على القيمة المحددة مسبقاً إذا كانت لا تزال موجودة في خيارات الـ select
    if (currentValue && select.querySelector(`option[value="${currentValue}"]`)) {
        select.value = currentValue;
    } else {
        // إذا كان "إرسال للجميع" محدداً مسبقاً، نحافظ عليه
        if (currentValue === "all") {
            select.value = "all";
        } else {
            select.value = "";
        }
    }
}

// رندرة جدول الطلاب ودليل المدرسة على هيئة أكورديونات مجمعة حسب الصفوف
function renderStudentsTable() {
    const container = document.getElementById("students-accordion-container");
    if (!container) return; // safety check
    container.innerHTML = "";

    const searchVal = document.getElementById("student-search").value.toLowerCase();
    const filterVal = document.getElementById("status-filter").value;

    const filtered = students.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchVal) || s.id.includes(searchVal);
        const matchesFilter = filterVal === "all" || s.status === filterVal;
        return matchesSearch && matchesFilter;
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; color: #888; padding: 40px; background: var(--card-bg); border: 1px dashed var(--border-color); border-radius: 10px; margin: 16px 24px;">
                <i data-lucide="users-round" style="width: 48px; height: 48px; margin-bottom: 12px; color: var(--gold-primary);"></i>
                <p style="font-family: 'Tajawal', sans-serif; font-size: 1rem; font-weight: 500;">لا يوجد طلاب يطابقون خيارات البحث أو التصفية الحالية.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    // تجميع الطلاب حسب الصف الدراسي
    const grouped = {};
    filtered.forEach(s => {
        const grade = s.grade || "غير مححدد";
        if (!grouped[grade]) {
            grouped[grade] = [];
        }
        grouped[grade].push(s);
    });

    // ترتيب الصفوف ترتيباً أبجدياً رقمياً
    const grades = Object.keys(grouped).sort((a, b) => {
        return a.localeCompare(b, "ar", { numeric: true });
    });

    // في حال وجود كلمة بحث أو تصفية معينة، يتم إجبار جميع الأكورديونات على الفتح تلقائياً للتسهيل
    const forceExpand = (searchVal.length > 0) || (filterVal !== "all");

    grades.forEach((grade, index) => {
        const gradeStudents = grouped[grade];
        const totalCount = gradeStudents.length;
        const activeCount = gradeStudents.filter(s => s.status === 'installed').length;
        const inactiveCount = totalCount - activeCount;

        // تهيئة الحالة الافتراضية إذا لم تكن موجودة
        if (accordionStates[grade] === undefined) {
            accordionStates[grade] = true; // الافتراضي مفتوح
        }

        const isExpanded = forceExpand || accordionStates[grade];

        // إنشاء كارد الأكورديون
        const accordionDiv = document.createElement("div");
        accordionDiv.className = `grade-accordion ${isExpanded ? 'expanded' : ''}`;
        
        // توليد صفوف الجدول لهذا الصف الدراسي
        let rowsHtml = "";
        gradeStudents.forEach(s => {
            let attClass = "present";
            let attLabel = "حاضر";
            let attIcon = "smile";
            if (s.attendance === "none") {
                attClass = "none";
                attLabel = "لم يرصد";
                attIcon = "alert-circle";
            } else if (s.attendance === "absent") {
                attClass = "absent";
                attLabel = "غائب";
                attIcon = "frown";
            } else if (s.attendance === "delayed") {
                attClass = "delayed";
                attLabel = `متأخر (${s.morningDelayMinutes}د)`;
                attIcon = "clock";
            }

            rowsHtml += `
                <tr>
                    <td>
                        <div class="student-meta-cell">
                            <span class="student-name">${s.name}</span>
                            <span class="student-grade">${s.grade}</span>
                        </div>
                    </td>
                    <td><span class="id-code">${s.id}</span></td>
                    <td>
                        <div class="parent-info-cell">
                            <span class="parent-name">${s.parentName}</span>
                            <span class="parent-phone">${s.parentPhone}</span>
                        </div>
                    </td>
                    <td>
                        <span class="status-badge ${s.status === 'installed' ? 'active' : 'inactive'}">
                            <i data-lucide="${s.status === 'installed' ? 'smartphone' : 'smartphone-off'}"></i>
                            ${s.status === 'installed' ? 'نشط (تم التنزيل)' : 'غير نشط (لم ينزل)'}
                        </span>
                    </td>
                    <td>
                        <span class="table-att-badge ${attClass}" onclick="cycleStudentAttendance('${s.id}')" title="انقر لتغيير التحضير فوراً">
                            <i data-lucide="${attIcon}"></i> ${attLabel}
                        </span>
                    </td>
                    <td>
                        <div class="table-actions">
                            <button class="btn-action btn-send-notif" onclick="selectStudentForNotification('${s.id}')" title="إرسال إشعار مباشر">
                                <i data-lucide="bell"></i>
                            </button>
                            <button class="btn-action btn-delete" onclick="handleDeleteStudent('${s.id}')" title="حذف الطالب">
                                <i data-lucide="trash-2"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        });

        // تركيب هيكل الأكورديون
        accordionDiv.innerHTML = `
            <div class="grade-accordion-header" onclick="toggleAccordion('${grade}')">
                <div class="accordion-header-left">
                    <i data-lucide="chevron-down" class="accordion-chevron"></i>
                    <span class="grade-title">${grade}</span>
                </div>
                <div class="accordion-header-stats">
                    <span class="stat-badge total">إجمالي الطلاب: ${totalCount}</span>
                    <span class="stat-badge active">نشط: ${activeCount} 🟢</span>
                    <span class="stat-badge inactive">غير نشط: ${inactiveCount} 🔴</span>
                </div>
            </div>
            <div class="grade-accordion-content-wrapper">
                <div class="grade-accordion-content" style="min-height: 0;">
                    <div class="grade-accordion-inner-content">
                        <div class="table-container">
                            <table class="students-table">
                                <thead>
                                    <tr>
                                        <th>الطالب / الصف</th>
                                        <th>هوية الطالب</th>
                                        <th>ولي الأمر / الهاتف</th>
                                        <th>حالة التطبيق</th>
                                        <th>تحضير اليوم</th>
                                        <th>إجراءات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${rowsHtml}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(accordionDiv);
    });

    lucide.createIcons();
}

// تبديل حالة فتح/إغلاق الأكورديون للصف الدراسي
function toggleAccordion(grade) {
    // تحديث الحالة في الذاكرة
    accordionStates[grade] = !accordionStates[grade];
    
    // البحث عن الأكورديون وتغيير الكلاس فوراً لتأثير بصري فائق السرعة
    const accordions = document.querySelectorAll(".grade-accordion");
    accordions.forEach(acc => {
        const titleEl = acc.querySelector(".grade-title");
        if (titleEl && titleEl.textContent.trim() === grade.trim()) {
            acc.classList.toggle("expanded");
        }
    });
}

// توسيع كافة الصفوف الدراسية
function expandAllAccordions() {
    for (const key in accordionStates) {
        accordionStates[key] = true;
    }
    renderStudentsTable();
}

// طي كافة الصفوف الدراسية
function collapseAllAccordions() {
    for (const key in accordionStates) {
        accordionStates[key] = false;
    }
    renderStudentsTable();
}

// تصدير قوائم الطلاب المفعلين أو غير المفعلين إلى ملف Excel باللغة العربية وتنسيق RTL
function exportStudentsToExcel(statusFilter) {
    const filtered = students.filter(s => s.status === statusFilter);
    if (filtered.length === 0) {
        showToast("error", "لا يوجد طلاب يطابقون هذه الحالة لتصديرهم.");
        return;
    }
    
    // تحويل البيانات للأعمدة العربية الأنيقة
    const data = filtered.map((s, idx) => {
        let attLabel = "حاضر";
        if (s.attendance === "absent") {
            attLabel = "غائب";
        } else if (s.attendance === "delayed") {
            attLabel = `متأخر (${s.morningDelayMinutes} دقيقة)`;
        }

        return {
            "م": idx + 1,
            "رقم الهوية الوطنية": s.id,
            "اسم الطالب رباعياً": s.name,
            "الصف الدراسي / الفصل": s.grade,
            "اسم ولي الأمر": s.parentName,
            "رقم جوال ولي الأمر": s.parentPhone,
            "حالة الحضور اليوم": attLabel,
            "حالة تفعيل التطبيق": s.status === 'installed' ? 'نشط (مفعل)' : 'غير نشط (غير مفعل)'
        };
    });
    
    // إنشاء ورقة العمل والمصنف
    const ws = XLSX.utils.json_to_sheet(data);
    ws['!dir'] = 'rtl'; // محاذاة من اليمين إلى اليسار للعربية
    
    // ضبط قياسات الأعمدة لتكون احترافية وسهلة القراءة والطباعة
    const wscols = [
        { wch: 6 },   // م
        { wch: 18 },  // رقم الهوية
        { wch: 30 },  // اسم الطالب
        { wch: 25 },  // الصف الدراسي
        { wch: 25 },  // اسم ولي الأمر
        { wch: 18 },  // رقم الجوال
        { wch: 20 },  // حالة الحضور
        { wch: 18 }   // حالة التفعيل
    ];
    ws['!cols'] = wscols;
    
    const wb = XLSX.utils.book_new();
    const sheetName = statusFilter === 'installed' ? "الطلاب النشطين" : "الطلاب غير النشطين";
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    
    const fileName = statusFilter === 'installed' ? "الطلاب_النشطين_المفعلين.xlsx" : "الطلاب_غير_النشطين.xlsx";
    XLSX.writeFile(wb, fileName);
    showToast("success", "تم تصدير ملف الإكسل بنجاح!");
}

// رندرة سجل الإشعارات الصادرة
function renderLogs() {
    const logsContainer = document.getElementById("notification-logs");
    const storedLogs = localStorage.getItem("ajaweed_notif_logs");
    
    if (!storedLogs || JSON.parse(storedLogs).length === 0) {
        logsContainer.innerHTML = `
            <div class="log-empty-state">
                <i data-lucide="clipboard-list"></i>
                <p>لا توجد إشعارات مرسلة اليوم حتى الآن. قم بإرسال أول إشعار!</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    const logs = JSON.parse(storedLogs).reverse(); // عرض الأحدث أولاً
    logsContainer.innerHTML = "";

    logs.forEach(log => {
        const item = document.createElement("div");
        
        let typeClass = "general";
        let typeIcon = "megaphone";
        if (log.type === "attendance") {
            typeClass = `att-${log.subType}`;
            typeIcon = log.subType === "present" ? "smile" : (log.subType === "absent" ? "frown" : "clock");
        } else if (log.type === "private") {
            typeClass = "private";
            typeIcon = "mail";
        }

        const dateStr = new Date(log.timestamp).toLocaleTimeString("ar-SA", {hour: '2-digit', minute: '2-digit'});

        let attachmentHtml = "";
        if (log.attachment) {
            const isImg = log.attachment.type.startsWith("image/");
            attachmentHtml = `
                <div class="log-attachment-preview">
                    <a href="${log.attachment.data}" download="${log.attachment.name}" class="log-attachment-badge" onclick="event.stopPropagation();">
                        <i data-lucide="${isImg ? 'image' : 'file-text'}"></i>
                        <span>${log.attachment.name} (${log.attachment.size})</span>
                    </a>
                </div>
            `;
        }

        item.className = `log-item ${typeClass}`;
        item.innerHTML = `
            <div class="log-item-details">
                <div class="log-item-icon">
                    <i data-lucide="${typeIcon}"></i>
                </div>
                <div class="log-text-box">
                    <h4>${log.title} - ${log.recipientName}</h4>
                    <p>${log.text}</p>
                    ${attachmentHtml}
                </div>
            </div>
            <div class="log-item-time">
                <span class="log-time-stamp">${dateStr}</span>
                <span class="log-delivered-badge"><i data-lucide="check-check"></i> تم التوصيل</span>
            </div>
        `;
        logsContainer.appendChild(item);
    });
}

let helperSearchQuery = "";
let helperFilter = "all";

// تطبيع النص العربي للبحث المرن (تجاهل الهمزات والتاء المربوطة والألف المقصورة)
function normalizeArabic(text) {
    if (!text) return "";
    return text
        .toString()
        .replace(/[أإآا]/g, "ا")
        .replace(/ة/g, "ه")
        .replace(/ى/g, "ي")
        .trim()
        .toLowerCase();
}

// تغيير قيمة الفلتر للمساعدين السريعين
function setHelperFilter(filterType) {
    helperFilter = filterType;
    
    // تحديث التبويب النشط بصرياً
    document.querySelectorAll(".helper-filter-tabs .filter-tab").forEach(tab => {
        tab.classList.remove("active");
    });
    
    const activeTab = document.getElementById(`btn-filter-${filterType === 'not_installed' ? 'not-installed' : filterType}`);
    if (activeTab) activeTab.classList.add("active");
    
    renderQuickTestUsers();
}

// تغيير نص البحث للمساعدين السريعين
function onHelperSearchChange(value) {
    helperSearchQuery = value;
    renderQuickTestUsers();
}

// رندرة أزرار التبديل السريع للمستخدمين بجانب الموبايل
function renderQuickTestUsers() {
    const container = document.getElementById("quick-test-users");
    if (!container) return;
    container.innerHTML = "";

    // تصفية الطلاب بناءً على البحث والفلتر النشط
    const query = normalizeArabic(helperSearchQuery);
    
    const filtered = students.filter(s => {
        // فلترة بالتبويب
        if (helperFilter === "installed" && s.status !== "installed") return false;
        if (helperFilter === "not_installed" && s.status === "installed") return false;
        
        // فلترة بالبحث
        if (query) {
            const nameNorm = normalizeArabic(s.name);
            const idNorm = normalizeArabic(s.id);
            return nameNorm.includes(query) || idNorm.includes(query);
        }
        
        return true;
    });

    // تحديث شارة العدد الكلي
    const countBadge = document.getElementById("helpers-count");
    if (countBadge) {
        countBadge.textContent = `${filtered.length} طالب`;
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="helper-no-results">
                <span>🔍 لا توجد نتائج مطابقة</span>
                <span style="font-size: 0.65rem; color: #999;">جرب البحث بكلمة أخرى أو تغيير التصفية</span>
            </div>
        `;
        return;
    }

    // لتجنب إرهاق المتصفح والحفاظ على المظهر الأنيق والمختصر، نعرض أول 24 طالباً فقط
    const MAX_DISPLAY = 24;
    const toDisplay = filtered.slice(0, MAX_DISPLAY);

    toDisplay.forEach(s => {
        const btn = document.createElement("button");
        btn.className = `btn-helper-user ${s.id === currentStudentId ? 'active' : ''}`;
        
        let indicator = s.status === 'installed' ? '🟢' : '🔴';
        btn.textContent = `${indicator} ${s.name.split(' ')[0]}`;
        btn.title = `${s.name} (${s.id})`;
        
        btn.onclick = () => {
            currentStudentId = s.id;
            refreshUI();
            
            // اهتزاز بصري خفيف للهاتف ليدل على التبديل
            const phone = document.getElementById("phone-frame");
            if (phone) {
                phone.classList.add("shake-anim");
                setTimeout(() => phone.classList.remove("shake-anim"), 400);
            }
        };
        container.appendChild(btn);
    });

    // إذا كان هناك طلاب آخرين لم يتم عرضهم، نضع شارة تدل على ذلك
    if (filtered.length > MAX_DISPLAY) {
        const moreBadge = document.createElement("div");
        moreBadge.style.width = "100%";
        moreBadge.style.textAlign = "center";
        moreBadge.style.fontSize = "0.7rem";
        moreBadge.style.color = "#888";
        moreBadge.style.marginTop = "6px";
        moreBadge.style.borderTop = "1px dashed rgba(0,0,0,0.05)";
        moreBadge.style.paddingTop = "6px";
        moreBadge.textContent = `+ وعدد ${filtered.length - MAX_DISPLAY} طالب آخرين (استخدم البحث أعلاه للوصول إليهم)`;
        container.appendChild(moreBadge);
    }
}

// ==========================================================================
// 3. التفاعل مع نموذج الإرسال والقوالب (Dispatcher Logic)
// ==========================================================================

// التبديل بين خيارات الإشعارات المختلفة
function onNotifTypeChange() {
    const selectedType = document.querySelector('input[name="notif-type"]:checked').value;
    const attFields = document.getElementById("attendance-fields");
    const genFields = document.getElementById("general-fields");
    
    // إخفاء/إظهار عناصر التحكم
    attFields.style.display = selectedType === "attendance" ? "block" : "none";
    genFields.style.display = selectedType === "general" ? "block" : "none";

    // تفعيل فئات أزرار الراديو بصرياً
    document.querySelectorAll(".notif-types-grid label").forEach(lbl => lbl.classList.remove("active"));
    const activeLabelId = `type-label-${selectedType}`;
    document.getElementById(activeLabelId).classList.add("active");

    updateMessageTemplate();
}

// تغيير الطالب المستلم لتحديث القالب تلقائياً
function onRecipientChange() {
    updateMessageTemplate();
}

// تغيير حالة التحضير
function onAttendanceStatusChange() {
    const status = document.querySelector('input[name="att-status"]:checked').value;
    const minutesGroup = document.getElementById("minutes-late-group");
    
    // إظهار حقل دقائق التأخير فقط عند اختيار "متأخر"
    minutesGroup.style.display = status === "delayed" ? "block" : "none";

    // تحديث الحالة بصرياً
    document.querySelectorAll(".attendance-status-radios label").forEach(lbl => lbl.classList.remove("active"));
    const selectedRadioLabel = document.querySelector(`.attendance-status-radios label.${status}`);
    if (selectedRadioLabel) selectedRadioLabel.classList.add("active");

    updateMessageTemplate();
}

// تغيير دقائق التأخير
function onMinutesLateChange() {
    updateMessageTemplate();
}

// تحديث نص الإشعار تلقائياً بناءً على البيانات والقوالب
function updateMessageTemplate() {
    const recipientVal = document.getElementById("notif-recipient").value;
    const type = document.querySelector('input[name="notif-type"]:checked').value;
    const textBox = document.getElementById("notif-text");
    
    if (!recipientVal) {
        textBox.value = "";
        return;
    }

    // إعداد متغيرات النص واليوم
    let recipientName = "جميع الطلاب الكرام";
    if (recipientVal !== "all") {
        const student = students.find(s => s.id === recipientVal);
        if (student) recipientName = student.name;
    }

    const todayDays = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
    const todayName = todayDays[new Date().getDay()];
    const todayDate = new Date().toLocaleDateString("ar-SA");

    // استخراج القالب
    let template = "";
    if (type === "attendance") {
        const status = document.querySelector('input[name="att-status"]:checked').value;
        template = NOTIFICATION_TEMPLATES[`attendance_${status}`].text;
        
        if (status === "delayed") {
            const minutes = document.getElementById("minutes-late").value;
            template = template.replace("[minutes]", minutes);
        }
    } else {
        template = NOTIFICATION_TEMPLATES[type].text;
    }

    // تعويض البيانات
    let result = template
        .replace("[name]", recipientName)
        .replace("[day]", todayName)
        .replace("[date]", todayDate);

    textBox.value = result;
}

// إعداد نموذج الإرسال عند النقر على إرسال إشعار لطالب معين من الجدول
function selectStudentForNotification(studentId) {
    const searchInput = document.getElementById("recipient-search");
    if (searchInput) {
        searchInput.value = "";
    }
    populateRecipientsDropdown();

    document.getElementById("notif-recipient").value = studentId;
    
    // التحويل لتبويب لوحة التحكم تلقائياً على الشاشات الصغيرة لتسهيل الاستخدام
    if (window.innerWidth <= 1024) {
        switchMobileTab('dashboard');
    }

    onRecipientChange();
    
    // سكرول للنموذج
    document.getElementById("dispatch-form").scrollIntoView({ behavior: 'smooth' });
}

// تغيير سريع لحضور وغياب الطالب بالضغط المباشر بالجدول
function cycleStudentAttendance(studentId) {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    let newAtt = "present";
    let newMinutes = 0;
    let newTime = "";

    if (student.attendance === "present") {
        newAtt = "absent";
        newTime = "";
    } else if (student.attendance === "absent") {
        newAtt = "delayed";
        newMinutes = 20; // قيمة افتراضية للتأخر الصباحي
        newTime = getFormattedArabicDateTime();
    } else if (student.attendance === "delayed") {
        newAtt = "none";
        newTime = "";
    } else {
        newAtt = "present";
        newTime = getFormattedArabicDateTime();
    }

    // الحصول على تاريخ اليوم للأرشيف
    const todayNow = new Date();
    const todayStr = `${todayNow.getFullYear()}-${String(todayNow.getMonth() + 1).padStart(2, '0')}-${String(todayNow.getDate()).padStart(2, '0')}`;

    // تهيئة سجل الأرشيف إن لم يكن موجوداً
    if (!student.attendanceHistory) {
        student.attendanceHistory = [];
    }

    if (newAtt === "none") {
        // إزالة سجل اليوم من الأرشيف إذا تم التراجع
        const idx = student.attendanceHistory.findIndex(r => r.date === todayStr);
        if (idx !== -1) student.attendanceHistory.splice(idx, 1);
    } else {
        // إضافة أو تحديث سجل اليوم في الأرشيف
        const historyRecord = { date: todayStr, status: newAtt, time: newTime, delay: newMinutes };
        const existIdx = student.attendanceHistory.findIndex(r => r.date === todayStr);
        if (existIdx !== -1) {
            student.attendanceHistory[existIdx] = historyRecord;
        } else {
            student.attendanceHistory.push(historyRecord);
            student.attendanceHistory.sort((a, b) => b.date.localeCompare(a.date));
        }
    }

    student.attendance = newAtt;
    student.morningDelayMinutes = newMinutes;
    student.attendanceTime = newTime;

    // إعادة حساب العدادات من الأرشيف المحدّث
    ensureStudentCounters(student);

    syncData();
    refreshUI();
    
    // نشر التغييرات الفورية للسحابة لمزامنة جوال ولي الأمر
    if (typeof syncStudentToCloud === "function") {
        syncStudentToCloud(student);
    }
    
    showToast("success", `تم تحديث حضور الطالب ${student.name} إلى (${newAtt === 'present' ? 'حاضر' : newAtt === 'absent' ? 'غائب' : newAtt === 'delayed' ? 'متأخر' : 'لم يرصد'})`);
}

// ==========================================================================
// إدارة المرفقات (Attachment Handling - صور و PDF)
// ==========================================================================

function triggerAttachmentSelect() {
    document.getElementById("attachment-file-input").click();
}

function handleAttachmentSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    // حد أقصى 5 ميجابايت لمنع امتلاء سعة التخزين المحلي
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        showToast("error", "حجم الملف كبير جداً! الحد الأقصى المسموح به هو 5 ميجابايت.");
        event.target.value = "";
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const base64Data = e.target.result;
        
        let formattedSize = "";
        if (file.size < 1024 * 1024) {
            formattedSize = (file.size / 1024).toFixed(1) + " KB";
        } else {
            formattedSize = (file.size / (1024 * 1024)).toFixed(1) + " MB";
        }

        currentAttachment = {
            name: file.name,
            type: file.type,
            size: formattedSize,
            data: base64Data
        };

        const previewContainer = document.getElementById("attachment-preview");
        const previewImg = document.getElementById("preview-img");
        const previewPdfIcon = document.getElementById("preview-pdf-icon");
        const previewFilename = document.getElementById("preview-filename");
        const previewFilesize = document.getElementById("preview-filesize");

        if (previewFilename) previewFilename.textContent = file.name;
        if (previewFilesize) previewFilesize.textContent = formattedSize;
        if (previewContainer) previewContainer.style.display = "block";

        if (file.type.startsWith("image/")) {
            if (previewImg) {
                previewImg.src = base64Data;
                previewImg.style.display = "block";
            }
            if (previewPdfIcon) previewPdfIcon.style.display = "none";
        } else if (file.type === "application/pdf") {
            if (previewImg) previewImg.style.display = "none";
            if (previewPdfIcon) previewPdfIcon.style.display = "flex";
        } else {
            if (previewImg) previewImg.style.display = "none";
            if (previewPdfIcon) previewPdfIcon.style.display = "flex";
        }

        showToast("success", "تم إرفاق الملف بنجاح للمعاينة!");
        lucide.createIcons();
    };

    reader.onerror = function() {
        showToast("error", "فشل قراءة الملف. الرجاء المحاولة مرة أخرى.");
    };

    reader.readAsDataURL(file);
}

function removeAttachment(silent = false) {
    currentAttachment = null;
    const fileInput = document.getElementById("attachment-file-input");
    if (fileInput) fileInput.value = "";

    const previewContainer = document.getElementById("attachment-preview");
    if (previewContainer) previewContainer.style.display = "none";

    const previewImg = document.getElementById("preview-img");
    if (previewImg) previewImg.src = "";

    if (!silent) {
        showToast("success", "تم إزالة المرفق.");
    }
}

// ==========================================================================
// 4. معالجة الإرسال الفعلي والتفاعل الصوتي/البصري (Dispatch & Audio Chime)
// ==========================================================================

function handleSendNotification(e) {
    e.preventDefault();

    const recipientVal = document.getElementById("notif-recipient").value;
    const type = document.querySelector('input[name="notif-type"]:checked').value;
    const text = document.getElementById("notif-text").value.trim();

    if (!recipientVal) {
        alert("الرجاء اختيار الطالب المستقبل أولاً.");
        return;
    }
    if (!text) {
        alert("الرجاء كتابة نص الرسالة.");
        return;
    }

    const timestamp = new Date().toISOString();
    let logTitle = "";
    let subType = "";

    // إعداد السجل والإرسال
    if (recipientVal === "all") {
        // إرسال إعلان عام للجميع
        logTitle = document.getElementById("notif-title").value.trim() || "إعلان عام هام";
        
        const newAnn = {
            id: "gen_" + Date.now(),
            title: logTitle,
            text: text,
            date: timestamp,
            attachment: currentAttachment ? { ...currentAttachment } : null
        };

        generalMessages.unshift(newAnn); // إضافة للأمام في قائمة الإعلانات المدرسية
        
        // إرسال الإشعار لولي الأمر النشط حالياً بالجوال لمحاكاة الاستقبال
        triggerSimulatedPushNotification(logTitle, text);
        
        // حفظ السجل الفوري
        saveNotifLog({
            type: "general",
            subType: "",
            title: logTitle,
            recipientName: "جميع الطلاب",
            text: text,
            timestamp: timestamp,
            attachment: currentAttachment ? { ...currentAttachment } : null
        });

        // المزامنة السحابية للإعلان العام
        if (typeof syncGeneralMessagesToCloud === "function") {
            syncGeneralMessagesToCloud();
        }

    } else {
        // إرسال إشعار لطالب محدد
        const student = students.find(s => s.id === recipientVal);
        if (!student) return;

        if (type === "attendance") {
            subType = document.querySelector('input[name="att-status"]:checked').value;
            student.attendance = subType;
            
            // تهيئة العدادات وتحديثها للأرشيف
            if (!student.attendanceHistory) {
                student.attendanceHistory = [];
            }
            
            const todayNow = new Date();
            const todayStr = `${todayNow.getFullYear()}-${String(todayNow.getMonth() + 1).padStart(2, '0')}-${String(todayNow.getDate()).padStart(2, '0')}`;

            student.attendanceTime = getFormattedArabicDateTime();

            if (subType === "delayed") {
                student.morningDelayMinutes = parseInt(document.getElementById("minutes-late").value) || 15;
            } else {
                student.morningDelayMinutes = 0;
            }
            
            // إضافة أو تحديث السجل التاريخي اليومي في الأرشيف
            const historyRecord = {
                date: todayStr,
                status: subType,
                time: student.attendanceTime,
                delay: student.morningDelayMinutes
            };
            
            const existIdx = student.attendanceHistory.findIndex(r => r.date === todayStr);
            if (existIdx !== -1) {
                student.attendanceHistory[existIdx] = historyRecord;
            } else {
                student.attendanceHistory.push(historyRecord);
                student.attendanceHistory.sort((a, b) => b.date.localeCompare(a.date));
            }
            
            // إعادة حساب العدادات بدقة من الأرشيف المحدث
            ensureStudentCounters(student);

            logTitle = subType === "present" ? "حضور الطالب" : (subType === "absent" ? "غياب الطالب" : "تأخر صباحي");
        } else {
            logTitle = "رسالة خاصة";
        }

        // إدراج الرسالة الخاصة بقائمة رسائل الطالب (فقط إذا لم يكن نوع الإشعار حضور أو تأخر أو غياب)
        if (type !== "attendance") {
            if (!student.privateMessages) {
                student.privateMessages = [];
            }
            const newMsg = {
                id: "msg_" + Date.now(),
                text: text,
                date: timestamp,
                read: false,
                attachment: currentAttachment ? { ...currentAttachment } : null
            };
            student.privateMessages.unshift(newMsg);
        }

        // محاكاة الاستقبال المباشر إذا كان هذا الطالب مسجل دخول بالجوال حالياً
        if (student.id === currentStudentId) {
            triggerSimulatedPushNotification(logTitle, text);
        } else {
            // تحديث شارة التنبيهات المفقودة
            const mobileBadge = document.getElementById("mobile-badge");
            mobileBadge.style.display = "block";
        }

        saveNotifLog({
            type: type,
            subType: subType,
            title: logTitle,
            recipientName: student.name,
            text: text,
            timestamp: timestamp,
            attachment: currentAttachment ? { ...currentAttachment } : null
        });

        // المزامنة السحابية للطالب
        if (typeof syncStudentToCloud === "function") {
            syncStudentToCloud(student);
        }
    }

    sentNotificationsTodayCount++;
    syncData();
    refreshUI();

    // إعادة تصفير النموذج جزئياً
    document.getElementById("notif-text").value = "";
    if (recipientVal === "all") {
        document.getElementById("notif-title").value = "";
    }
    
    // إزالة المرفق بصمت
    removeAttachment(true);
    
    showToast("success", "تم إرسال الإشعار الفوري بنجاح ووصوله لجوال ولي الأمر!");
}

// حفظ الإشعار بسجل الإرسال لليوم
function saveNotifLog(logObj) {
    let logs = [];
    const stored = localStorage.getItem("ajaweed_notif_logs");
    if (stored) logs = JSON.parse(stored);
    
    logs.push(logObj);
    localStorage.setItem("ajaweed_notif_logs", JSON.stringify(logs));
}

// محاكاة إشعار فوري بالجوال مع الصوت والاهتزاز والشارة (WOW Trigger)
function triggerSimulatedPushNotification(title, content) {
    // 1. تشغيل صوت الرنين الفاخر للإشعار باستخدام Web Audio API
    playNotificationChime();

    // 2. اهتزاز الهاتف بصرياً (CSS Shake)
    const phoneFrame = document.getElementById("phone-frame");
    phoneFrame.classList.add("shake-anim");
    setTimeout(() => phoneFrame.classList.remove("shake-anim"), 500);

    // 3. اهتزاز الهواتف الحقيقية باستخدام منفذ الاهتزاز إذا توفر
    if ("vibrate" in navigator) {
        navigator.vibrate([100, 50, 100]);
    }

    // 4. إظهار البانر العلوي بالهاتف
    const banner = document.getElementById("push-banner");
    document.getElementById("push-title").textContent = title;
    document.getElementById("push-content").textContent = content;

    banner.classList.add("active");

    // إخفاء الإشعار المنبثق بعد 6 ثوانٍ تلقائياً
    setTimeout(() => {
        banner.classList.remove("active");
    }, 6000);
}

// تشغيل جرس تنبيه رائع دون أي ملفات خارجية (Web Audio Synthesis)
function playNotificationChime() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        
        // النوتة الأولى (C5)
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        gain1.gain.setValueAtTime(0.12, ctx.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start();
        osc1.stop(ctx.currentTime + 0.35);

        // النوتة الثانية (E5) بعد تأخر خفيف لتعطي جرساً موسيقياً
        setTimeout(() => {
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.type = "sine";
            osc2.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
            gain2.gain.setValueAtTime(0.12, ctx.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.start();
            osc2.stop(ctx.currentTime + 0.4);
        }, 120);

    } catch (e) {
        console.warn("الصوت غير مدعوم في هذا المتصفح حتى يتم التفاعل معه أولاً:", e);
    }
}

// ==========================================================================
// 5. محاكي تطبيق هاتف ولي الأمر (Smartphone App Simulation Views)
// ==========================================================================

// رندرة واجهات تطبيق الهاتف الذكي بالكامل بناء على الطالب النشط
function renderMobileApp() {
    const screenLogin = document.getElementById("screen-login");
    const screenHome = document.getElementById("screen-home");

    if (!currentStudentId) {
        // حالة عدم تسجيل دخول
        screenLogin.style.display = "flex";
        screenHome.style.display = "none";
        return;
    }

    const student = students.find(s => s.id === currentStudentId);
    if (!student) {
        screenLogin.style.display = "flex";
        screenHome.style.display = "none";
        return;
    }

    // تسجيل الدخول بنجاح - إظهار الواجهة الرئيسية للجوال
    screenLogin.style.display = "none";
    screenHome.style.display = "flex";

    // 1. تعبئة البيانات والترحيب بولي الأمر
    document.getElementById("app-parent-welcome").textContent = `مرحباً، أ. ${student.parentName}`;
    document.getElementById("app-student-name").textContent = `الطالب: ${student.name}`;
    document.getElementById("app-student-grade").textContent = student.grade;
    document.getElementById("app-avatar-initial").textContent = student.parentName.split(" ").pop()[0] || "و";

    // 2. تحديث بطاقة الحضور والغياب اليوم بالهاتف
    const attCard = document.getElementById("app-att-card");
    const attIndicator = document.getElementById("app-att-indicator");
    const attIcon = document.getElementById("app-att-icon");
    const attLabel = document.getElementById("app-att-status-label");
    const attDesc = document.getElementById("app-att-desc");

    // تنظيف الكلاسات
    attIndicator.className = "att-status-indicator";

    if (student.attendance === "present") {
        attIndicator.classList.add("indicator-present");
        attIcon.setAttribute("data-lucide", "check-circle");
        attLabel.textContent = "حاضر اليوم";
        attDesc.textContent = "تم تحضير الطالب ودخوله للمدرسة في الموعد المحدد. نشكر لكم انضباطه.";
    } else if (student.attendance === "absent") {
        attIndicator.classList.add("indicator-absent");
        attIcon.setAttribute("data-lucide", "alert-circle");
        attLabel.textContent = "غائب اليوم ⚠️";
        attDesc.textContent = "تنبيه: تم رصد غياب الطالب عن مقاعد الدراسة اليوم. نرجو التواصل لتوضيح العذر.";
    } else if (student.attendance === "delayed") {
        attIndicator.classList.add("indicator-delayed");
        attIcon.setAttribute("data-lucide", "clock");
        attLabel.textContent = "متأخر صباحاً 🕒";
        attDesc.textContent = `تنبيه: تم رصد تأخر الطالب عن طابور الصباح اليوم بمقدار (${student.morningDelayMinutes}) دقيقة.`;
    }

    // 3. تحديث ودجت دقائق التأخر التراكمي
    const delayWidget = document.getElementById("app-delay-widget");
    const delayCircle = document.getElementById("app-delay-circle");
    const delayText = document.getElementById("app-delay-text");
    const delayDesc = document.getElementById("app-delay-desc");

    const totalDelay = student.morningDelayMinutes || 0;
    delayText.textContent = `${totalDelay} د`;

    // حساب نسبة وتعبئة الدائرة (الحد الأقصى الافتراضي المقارن 60 دقيقة)
    const maxCompareMinutes = 60;
    const percentage = Math.min((totalDelay / maxCompareMinutes) * 100, 100);
    const strokeDash = `${percentage}, 100`;
    delayCircle.setAttribute("stroke-dasharray", strokeDash);

    if (totalDelay === 0) {
        delayDesc.textContent = "الطالب ملتزم بالوصول المبكر والحضور المتميز. شكراً لكم!";
    } else if (totalDelay <= 20) {
        delayDesc.textContent = "تأخر بسيط. نرجو الحرص على التبكير تجنباً لتفويت التوجيهات الصباحية.";
    } else {
        delayDesc.textContent = "عدد دقائق التأخر مرتفع! نرجو الحرص التام على حضور طابور الصباح.";
    }

    // 4. شريط تثبيت التطبيق PWA للمحاكاة
    const pwaInstallCard = document.getElementById("pwa-install-card");
    pwaInstallCard.style.display = student.status === "installed" ? "none" : "flex";

    // 5. تحديث قائمة الرسائل الخاصة بالطالب
    const privateFeed = document.getElementById("app-private-feed");
    const privateBadge = document.getElementById("app-private-badge");
    const unreadCount = student.privateMessages.filter(m => !m.read).length;

    if (unreadCount > 0) {
        privateBadge.textContent = unreadCount;
        privateBadge.style.display = "flex";
    } else {
        privateBadge.style.display = "none";
    }

    if (student.privateMessages.length === 0) {
        privateFeed.innerHTML = `
            <div class="message-empty">
                <i data-lucide="mail-question"></i>
                <p>لا توجد رسائل خاصة مرسلة لهذا الحساب حالياً.</p>
            </div>
        `;
    } else {
        privateFeed.innerHTML = "";
        student.privateMessages.forEach(msg => {
            const card = document.createElement("div");
            card.className = `message-item-card ${msg.read ? '' : 'unread'}`;
            card.onclick = () => markMessageAsRead(student.id, msg.id);

            const timeStr = new Date(msg.date).toLocaleDateString("ar-SA", {month: 'short', day: 'numeric'});

            let attachmentHtml = "";
            if (msg.attachment) {
                if (msg.attachment.type.startsWith("image/")) {
                    attachmentHtml = `<img src="${msg.attachment.data}" class="app-image-attachment" onclick="event.stopPropagation(); window.open(this.src)">`;
                } else if (msg.attachment.type === "application/pdf") {
                    attachmentHtml = `
                        <a href="${msg.attachment.data}" download="${msg.attachment.name}" class="app-pdf-attachment-link" onclick="event.stopPropagation();">
                            <i data-lucide="file-text"></i>
                            <div class="pdf-info">
                                <span class="pdf-name">${msg.attachment.name}</span>
                                <span class="pdf-size">${msg.attachment.size}</span>
                            </div>
                            <i data-lucide="download" class="pdf-download-icon"></i>
                        </a>
                    `;
                }
            }

            card.innerHTML = `
                <div class="message-card-top">
                    <h4>إدارة مدرسة الأجاويد</h4>
                    <span class="message-card-date">${timeStr}</span>
                </div>
                <p>${msg.text}</p>
                ${attachmentHtml}
            `;
            privateFeed.appendChild(card);
        });
    }

    // 6. تحديث قائمة الأخبار والإعلانات العامة
    const generalFeed = document.getElementById("app-general-feed");
    if (generalMessages.length === 0) {
        generalFeed.innerHTML = `
            <div class="message-empty">
                <i data-lucide="megaphone"></i>
                <p>لا توجد إعلانات عامة من المدرسة حالياً.</p>
            </div>
        `;
    } else {
        generalFeed.innerHTML = "";
        generalMessages.forEach(msg => {
            const card = document.createElement("div");
            card.className = "message-item-card";

            const timeStr = new Date(msg.date).toLocaleDateString("ar-SA", {month: 'short', day: 'numeric'});

            let attachmentHtml = "";
            if (msg.attachment) {
                if (msg.attachment.type.startsWith("image/")) {
                    attachmentHtml = `<img src="${msg.attachment.data}" class="app-image-attachment" onclick="event.stopPropagation(); window.open(this.src)">`;
                } else if (msg.attachment.type === "application/pdf") {
                    attachmentHtml = `
                        <a href="${msg.attachment.data}" download="${msg.attachment.name}" class="app-pdf-attachment-link" onclick="event.stopPropagation();">
                            <i data-lucide="file-text"></i>
                            <div class="pdf-info">
                                <span class="pdf-name">${msg.attachment.name}</span>
                                <span class="pdf-size">${msg.attachment.size}</span>
                            </div>
                            <i data-lucide="download" class="pdf-download-icon"></i>
                        </a>
                    `;
                }
            }

            card.innerHTML = `
                <div class="message-card-top">
                    <h4>📢 ${msg.title}</h4>
                    <span class="message-card-date">${timeStr}</span>
                </div>
                <p>${msg.text}</p>
                ${attachmentHtml}
            `;
            generalFeed.appendChild(card);
        });
    }

    // إعادة تنشيط الأيقونات المستحدثة
    lucide.createIcons();
}

// اسم بديل احتياطي لـ renderMobileApp لتفادي أي أخطاء في الاستدعاء
function refreshMobileSimulator() {
    renderMobileApp();
}

// التبديل بين تبويبات الهاتف المحاكي (إشعارات خاصة / إعلانات عامة)
function switchAppTab(tabName) {
    document.querySelectorAll(".app-nav-tab").forEach(tab => tab.classList.remove("active"));
    document.querySelectorAll(".app-tab-view").forEach(view => view.style.display = "none");

    document.getElementById(`app-tab-btn-${tabName}`).classList.add("active");
    document.getElementById(`app-view-${tabName}`).style.display = "block";
}

// الانتقال المباشر للتبويب المختار عند الضغط على البانر الفوري
function openTargetTab(tabName) {
    // إخفاء البانر الفوري فوراً
    document.getElementById("push-banner").classList.remove("active");
    
    // التحويل لتبويب تطبيق الهاتف على الشاشات الصغيرة لرؤية الإشعار
    if (window.innerWidth <= 1024) {
        switchMobileTab('simulator');
    }

    switchAppTab(tabName);

    // إذا كانت إشعارات خاصة، نقوم بوضع علامة قراءة للكل تلقائياً للتسهيل
    if (tabName === "notifications" && currentStudentId) {
        const student = students.find(s => s.id === currentStudentId);
        if (student) {
            student.privateMessages.forEach(msg => msg.read = true);
            syncData();
            refreshUI();
        }
    }
}

// قراءة رسالة خاصة محددة لإخفاء الشارة المضيئة
function markMessageAsRead(studentId, messageId) {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    const msg = student.privateMessages.find(m => m.id === messageId);
    if (msg && !msg.read) {
        msg.read = true;
        syncData();
        refreshUI();
    }
}

// تسجيل الدخول لمحاكي الجوال
function handleMobileLogin(e) {
    e.preventDefault();
    const idVal = document.getElementById("login-student-id").value.trim();
    
    const student = students.find(s => s.id === idVal);
    
    if (student) {
        currentStudentId = student.id;
        
        // تحديث آخر نشاط للطالب
        student.lastActive = "نشط الآن";
        syncData();
        
        refreshUI();
        showToast("success", `مرحباً بك! تم تسجيل الدخول بنجاح لحساب الطالب: ${student.name}`);
    } else {
        alert("⚠️ عذراً! رقم هوية الطالب غير مسجل بقاعدة بيانات مدرسة الأجاويد. يرجى مراجعة الجدول في اليسار وتجربة أحد الأرقام المسجلة.");
    }
}

// تسجيل الخروج من الجوال
function handleMobileLogout() {
    if (currentStudentId) {
        const student = students.find(s => s.id === currentStudentId);
        if (student) {
            student.lastActive = "يوم أمس";
        }
    }
    currentStudentId = null;
    syncData();
    refreshUI();
    showToast("success", "تم تسجيل الخروج من المحاكي بنجاح.");
}

// محاكاة تثبيت التطبيق كـ PWA
function simulatePWAInstall() {
    if (!currentStudentId) return;

    const student = students.find(s => s.id === currentStudentId);
    if (!student) return;

    // ترقية حالة التطبيق إلى installed
    student.status = "installed";
    student.lastActive = "نشط الآن";
    syncData();
    refreshUI();

    showToast("success", `✨ تهانينا! تم تثبيت تطبيق الأجاويد ajaweed على شاشتك الرئيسية بنجاح، وتسجيل هاتفك كنشط بجدول المدرسة!`);
}

// ==========================================================================
// 6. إدارة إضافة وحذف الطلاب (Student Management)
// ==========================================================================

function openAddStudentModal() {
    document.getElementById("add-student-modal").classList.add("active");
}

function closeAddStudentModal() {
    document.getElementById("add-student-modal").classList.remove("active");
    document.getElementById("add-student-form").reset();
}

function handleAddStudentSubmit(e) {
    e.preventDefault();

    const id = document.getElementById("new-student-id").value.trim();
    const name = document.getElementById("new-student-name").value.trim();
    const grade = document.getElementById("new-student-grade").value;
    const parentName = document.getElementById("new-parent-name").value.trim();
    const parentPhone = normalizePhone(document.getElementById("new-parent-phone").value.trim());
    const status = document.getElementById("new-student-status").value;

    // التحقق من تكرار رقم الهوية
    if (students.some(s => s.id === id)) {
        alert("⚠️ رقم هوية الطالب هذا مسجل مسبقاً بقاعدة البيانات!");
        return;
    }

    const newStudent = {
        id: id,
        name: name,
        grade: grade,
        parentName: parentName,
        parentPhone: parentPhone,
        status: status,
        attendance: "none",
        attendanceTime: "",
        morningDelayMinutes: 0,
        lastActive: status === "installed" ? "نشط الآن" : "لم يسجل دخول بعد",
        privateMessages: []
    };

    students.push(newStudent);
    syncData();
    refreshUI();
    closeAddStudentModal();
    
    showToast("success", `تم إضافة الطالب الجديد: ${name} بنجاح وقابل للاستخدام الآن!`);
}

function handleDeleteStudent(studentId) {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    if (confirm(`هل أنت متأكد من حذف الطالب ${student.name} نهائياً من دليل المدرسة؟`)) {
        students = students.filter(s => s.id !== studentId);
        
        // إذا كان هذا الطالب هو المفتوح حالياً بالجوال نقوم بتسجيل خروجه
        if (currentStudentId === studentId) {
            currentStudentId = null;
        }

        syncData();
        refreshUI();
        showToast("success", "تم حذف الطالب بنجاح من قاعدة البيانات.");
    }
}

// تصفية وقائمة البحث في جدول الطلاب
function filterStudents() {
    renderStudentsTable();
    lucide.createIcons();
}

// ==========================================================================
// 7. تحويل التبويبات والتنبيهات المساعدة (Navigation & Toast Helpers)
// ==========================================================================

// التبديل بين لوحة التحكم والمحاكي في شاشات الجوال/التابلت
function switchMobileTab(targetView) {
    document.querySelectorAll(".mobile-tab-btn").forEach(btn => btn.classList.remove("active"));
    
    const dashboardView = document.getElementById("admin-view");
    const simulatorView = document.getElementById("simulator-view");

    if (targetView === 'dashboard') {
        dashboardView.classList.add("active");
        simulatorView.classList.remove("active");
        document.querySelector(".mobile-tab-btn[onclick*='dashboard']").classList.add("active");
    } else {
        dashboardView.classList.remove("active");
        simulatorView.classList.add("active");
        document.querySelector(".mobile-tab-btn[onclick*='simulator']").classList.add("active");
        
        // إخفاء شارة النوتيف المفقودة عند فتح المحاكي
        document.getElementById("mobile-badge").style.display = "none";
    }
}

// إظهار التنبيه المنبثق الصغير (Toast Alert)
function showToast(type, message) {
    const toast = document.getElementById("app-toast");
    const icon = document.getElementById("toast-icon");
    const msgSpan = document.getElementById("toast-msg");

    msgSpan.textContent = message;
    
    if (type === "success") {
        toast.style.backgroundColor = "var(--primary-color)";
        icon.setAttribute("data-lucide", "check-circle");
    } else {
        toast.style.backgroundColor = "var(--danger-color)";
        icon.setAttribute("data-lucide", "alert-triangle");
    }

    lucide.createIcons();
    toast.classList.add("active");

    setTimeout(() => {
        toast.classList.remove("active");
    }, 4000);
}

// ==========================================================================
// 8. ميزة استيراد الطلاب الذكية من ملف Excel (Excel Import Logic)
// ==========================================================================

// تشغيل اختيار ملف الإكسل
function triggerExcelImport() {
    document.getElementById("excel-file-input").click();
}

// معالجة استيراد ملف الإكسل
function handleExcelImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    // إعادة تصفير حقل الإدخال حتى يمكن رفع نفس الملف مجدداً
    event.target.value = '';

    showToast("success", "جاري قراءة وتحليل ملف الإكسل...");

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            
            // تحديد الورقة المستهدفة (Sheet2 أو الورقة الثانية)
            let sheetName = workbook.SheetNames[1]; // الورقة الثانية (الفهرس 1)
            if (!sheetName) {
                // محاولة البحث عن اسم يحتوي على sheet2
                sheetName = workbook.SheetNames.find(name => name.toLowerCase().includes("sheet2"));
            }
            if (!sheetName) {
                // إذا لم توجد ورقة ثانية، نستخدم الورقة الأولى افتراضياً
                sheetName = workbook.SheetNames[0];
            }

            if (!sheetName) {
                throw new Error("لا توجد أوراق عمل في ملف الإكسل المرفق.");
            }

            const worksheet = workbook.Sheets[sheetName];
            // تحويل الورقة إلى مصفوفة صفوف (مصفوفة من المصفوفات)
            const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null });

            if (!rows || rows.length === 0) {
                throw new Error("ورقة العمل المحددة فارغة.");
            }

            let importedCount = 0;
            let updatedCount = 0;

            // استعراض الصفوف
            // الأعمدة بالترتيب حسب تحديد المستخدم:
            // عمود B (فهرس 1): الجوال
            // عمود C (فهرس 2): الفصل
            // عمود D (فهرس 3): الصف
            // عمود E (فهرس 4): اسم الطالب
            // عمود F (فهرس 5): رقم الهوية

            rows.forEach((row, idx) => {
                // نتخطى العناوين إذا كانت تحتوي على نصوص تصف الأعمدة
                if (idx === 0) {
                    const firstRowStr = JSON.stringify(row).toLowerCase();
                    if (firstRowStr.includes("الهوية") || firstRowStr.includes("الاسم") || firstRowStr.includes("جوال") || firstRowStr.includes("هوية")) {
                        return; // تخطي صف العنوان الأساسي
                    }
                }

                // قراءة البيانات من الأعمدة المحددة
                const rawMobile = row[1]; // عمود B
                const rawDivision = row[2]; // عمود C
                const rawGrade = row[3]; // عمود D
                const rawName = row[4]; // عمود E
                const rawId = row[5]; // عمود F

                // التحقق من صلاحية البيانات الأساسية
                if (!rawName || !rawId) {
                    return; // تخطي الصفوف الفارغة أو غير المكتملة
                }

                const studentId = String(rawId).trim();
                const studentName = String(rawName).trim();
                
                // تخطي العناوين المتأخرة إن وجدت
                if (studentId === "رقم الهوية" || studentName === "اسم الطالب") {
                    return;
                }

                // 1. تطبيع رقم الهاتف (Mobile Normalization)
                let mobile = normalizePhone(rawMobile);

                // 2. استخلاص اسم الأب/العائلة لولي الأمر من اسم الطالب رباعياً
                const nameParts = studentName.split(/\s+/);
                let parentName = nameParts[0];
                if (nameParts.length > 2) {
                    parentName = nameParts.slice(1).join(" ");
                } else if (nameParts.length === 2) {
                    parentName = nameParts[1];
                }

                // 3. مواءمة الصف والفصل مع الخيارات الستة المتاحة بالتطبيق
                const grade = mapExcelGrade(rawGrade, rawDivision);

                // التحقق مما إذا كان الطالب موجوداً مسبقاً برقم الهوية
                const existingIdx = students.findIndex(s => s.id === studentId);

                // التحقق من صحة الرقم وإلا الحفاظ على رقم الجوال القديم إذا وجد، وإلا توليد رقم عشوائي
                if (!mobile || !/^05\d{8}$/.test(mobile)) {
                    if (existingIdx !== -1 && students[existingIdx].parentPhone) {
                        mobile = students[existingIdx].parentPhone;
                    } else {
                        mobile = "05" + Math.floor(10000000 + Math.random() * 90000000); 
                    }
                }

                if (existingIdx !== -1) {
                    // تحديث بيانات الطالب القائم مع الحفاظ على حالته وتاريخه
                    students[existingIdx].name = studentName;
                    students[existingIdx].grade = grade;
                    students[existingIdx].parentName = parentName;
                    students[existingIdx].parentPhone = mobile;
                    // لا يتم تغيير الحقول التاريخية (status, lastActive, attendance, morningDelayMinutes, privateMessages)
                    updatedCount++;
                } else {
                    // تجهيز كائن طالب جديد بنسبة 100% وبقيم افتراضية نظيفة
                    const studentObj = {
                        id: studentId,
                        name: studentName,
                        grade: grade,
                        parentName: parentName,
                        parentPhone: mobile,
                        status: "not_installed",
                        attendance: "none",
                        attendanceTime: "",
                        morningDelayMinutes: 0,
                        lastActive: "غير نشط",
                        privateMessages: []
                    };
                    students.push(studentObj);
                    importedCount++;
                }
            });

            if (importedCount === 0 && updatedCount === 0) {
                showToast("error", "لم يتم العثور على بيانات طلاب صالحة للاستيراد في الملف.");
                return;
            }

            // حفظ التغييرات وتحديث الواجهة
            syncData();
            refreshUI();
            
            // تعيين أول طالب مستورد كطالب نشط في الجوال
            if (students.length > 0) {
                const justImported = students.find(s => s.status === "installed") || students[0];
                currentStudentId = justImported.id;
                renderMobileApp();
            }

            showToast("success", `تم الاستيراد بنجاح! مضاف: ${importedCount}، محدث: ${updatedCount}`);

        } catch (error) {
            console.error(error);
            showToast("error", "خطأ في قراءة الملف: " + error.message);
        }
    };
    reader.onerror = function() {
        showToast("error", "خطأ في قراءة ملف الإكسل.");
    };
    reader.readAsArrayBuffer(file);
}

// دالة ذكية لمواءمة الصف والفصل من ملف الإكسل
function mapExcelGrade(gradeVal, divisionVal) {
    const gradeStr = String(gradeVal || '').trim();
    let divStr = String(divisionVal || '').trim();
    
    let gradeNum = 1; // الافتراضي الأول المتوسط
    if (gradeStr.includes("ثاني") || gradeStr.includes("الثاني") || gradeStr.includes("2")) {
        gradeNum = 2;
    } else if (gradeStr.includes("ثالث") || gradeStr.includes("الثالث") || gradeStr.includes("3")) {
        gradeNum = 3;
    }
    
    // إرجاع الفصل لأرقام
    let divNum = "1";
    if (divStr.includes("أ") || divStr.includes("1") || divStr.includes("اول") || divStr.includes("الأول")) {
        divNum = "1";
    } else if (divStr.includes("ب") || divStr.includes("2") || divStr.includes("ثاني") || divStr.includes("الثاني") || divStr.includes("بنين")) {
        divNum = "2";
    } else if (divStr.includes("ج") || divStr.includes("3") || divStr.includes("ثالث") || divStr.includes("الثالث")) {
        divNum = "3";
    } else if (divStr.includes("د") || divStr.includes("4") || divStr.includes("رابع") || divStr.includes("الرابع")) {
        divNum = "4";
    } else {
        const match = divStr.match(/\d+/);
        if (match) {
            divNum = match[0];
        } else if (divStr) {
            divNum = divStr;
        }
    }
    
    const arabicGrades = ["الأول", "الثاني", "الثالث"];
    return `الصف ${arabicGrades[gradeNum - 1]} المتوسط - ${divNum}`;
}

// ==========================================================================
// 9. رصد الحضور اليومي الذكي من 3 ملفات إكسل (Daily Attendance Importer)
// ==========================================================================

let dailyAttendanceFiles = { early: null, absent: null, late: null };

function openDailyAttendanceModal() {
    resetDailyAttendanceFiles();
    document.getElementById("daily-attendance-modal").classList.add("active");
}

function closeDailyAttendanceModal() {
    document.getElementById("daily-attendance-modal").classList.remove("active");
    resetDailyAttendanceFiles();
}

function resetDailyAttendanceFiles() {
    dailyAttendanceFiles = { early: null, absent: null, late: null };
    
    // إعادة تعيين عناصر حقول اختيار الملفات
    const inputs = ['early', 'absent', 'late'];
    inputs.forEach(type => {
        const input = document.getElementById(`file-${type}`);
        if (input) input.value = '';
        
        // إعادة بطاقة الرفع لشكلها الطبيعي
        const card = document.getElementById(`card-${type}`);
        if (card) {
            card.className = `daily-upload-card ${type}`;
            // إزالة زر حذف الملف المرفق إن وجد
            const btn = card.querySelector('.btn-remove-daily-file');
            if (btn) btn.remove();
        }
        
        // إعادة تسمية الزر
        const statusLabel = document.getElementById(`status-${type}`);
        if (statusLabel) {
            statusLabel.innerHTML = `<i data-lucide="upload" style="width: 12px; height: 12px;"></i>اختر الملف...`;
        }
    });
    lucide.createIcons();
}

function triggerDailyFileSelect(type) {
    document.getElementById(`file-${type}`).click();
}

function handleDailyFileSelect(event, type) {
    event.stopPropagation(); // منع نشر الحدث حتى لا يتم الضغط على الكارد مجدداً
    const file = event.target.files[0];
    if (!file) return;

    dailyAttendanceFiles[type] = file;

    // تحديث نمط بطاقة الرفع
    const card = document.getElementById(`card-${type}`);
    if (card) {
        card.classList.add('has-file');
        
        // منع التكرار في إضافة زر الحذف
        let btn = card.querySelector('.btn-remove-daily-file');
        if (!btn) {
            btn = document.createElement('button');
            btn.className = 'btn-remove-daily-file';
            btn.title = 'إلغاء المرفق';
            btn.innerHTML = `<i data-lucide="x"></i>`;
            btn.onclick = function(e) {
                removeDailyFile(type, e);
            };
            card.appendChild(btn);
        }
    }

    // تحديث شارة الرفع باسم وحجم الملف المختار
    const statusLabel = document.getElementById(`status-${type}`);
    if (statusLabel) {
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        const shortName = file.name.length > 15 ? file.name.substring(0, 12) + "..." : file.name;
        statusLabel.innerHTML = `<i data-lucide="check-circle-2" style="width: 12px; height: 12px;"></i> ${shortName} (${fileSizeMB} م.ب)`;
    }
    
    lucide.createIcons();
}

function removeDailyFile(type, event) {
    if (event) event.stopPropagation(); // منع نشر الحدث
    
    dailyAttendanceFiles[type] = null;
    
    const input = document.getElementById(`file-${type}`);
    if (input) input.value = '';
    
    const card = document.getElementById(`card-${type}`);
    if (card) {
        card.classList.remove('has-file');
        const btn = card.querySelector('.btn-remove-daily-file');
        if (btn) btn.remove();
    }
    
    const statusLabel = document.getElementById(`status-${type}`);
    if (statusLabel) {
        statusLabel.innerHTML = `<i data-lucide="upload" style="width: 12px; height: 12px;"></i>اختر الملف...`;
    }
    lucide.createIcons();
}

function processDailyAttendance() {
    const promises = [];
    const types = ['early', 'absent', 'late'];
    
    // التحقق من رفع ملف واحد على الأقل للرصد
    if (!dailyAttendanceFiles.early && !dailyAttendanceFiles.absent && !dailyAttendanceFiles.late) {
        showToast("error", "يرجى تحديد ملف واحد على الأقل لرصد الحضور والغياب.");
        return;
    }

    showToast("success", "جاري قراءة ملفات الإكسل ورصد الحالات...");

    types.forEach(type => {
        const file = dailyAttendanceFiles[type];
        if (file) {
            promises.push(new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = function(e) {
                    try {
                        const data = new Uint8Array(e.target.result);
                        const workbook = XLSX.read(data, { type: 'array' });
                        const sheetName = workbook.SheetNames[0];
                        if (!sheetName) {
                            resolve({ type: type, rows: [] });
                            return;
                        }
                        const worksheet = workbook.Sheets[sheetName];
                        // تحويل الورقة إلى مصفوفة صفوف
                        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null });
                        resolve({ type: type, rows: rows });
                    } catch (err) {
                        reject(new Error(`خطأ في قراءة ملف ${type}: ${err.message}`));
                    }
                };
                reader.onerror = () => reject(new Error(`خطأ في رفع وقراءة ملف ${type}`));
                reader.readAsArrayBuffer(file);
            }));
        } else {
            promises.push(Promise.resolve({ type: type, rows: null }));
        }
    });

    Promise.all(promises).then(results => {
        let updatedCount = 0;
        let importedCount = 0;
        let stats = { early: 0, absent: 0, late: 0 };
        const modifiedStudents = [];

        // استخراج تاريخ اليوم كنص لمقارنة السجلات في الأرشيف
        function getDateStr(rawDate) {
            if (rawDate !== null && rawDate !== undefined) {
                if (typeof rawDate === "number") {
                    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
                    const dateObj = new Date(excelEpoch.getTime() + rawDate * 24 * 60 * 60 * 1000);
                    if (!isNaN(dateObj.getTime())) {
                        const yyyy = dateObj.getFullYear();
                        const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
                        const dd = String(dateObj.getDate()).padStart(2, '0');
                        return `${yyyy}-${mm}-${dd}`;
                    }
                } else if (rawDate instanceof Date && !isNaN(rawDate.getTime())) {
                    const yyyy = rawDate.getFullYear();
                    const mm = String(rawDate.getMonth() + 1).padStart(2, '0');
                    const dd = String(rawDate.getDate()).padStart(2, '0');
                    return `${yyyy}-${mm}-${dd}`;
                } else {
                    const str = String(rawDate).trim();
                    if (str) return normalizeDateString(str);
                }
            }
            // تاريخ اليوم كاحتياطي
            const now = new Date();
            return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        }

        results.forEach(res => {
            const { type, rows } = res;
            if (!rows || rows.length === 0) return;

            // الصفوف والأعمدة حسب المخطط:
            // عمود A (مؤشر 0): اليوم الدراسي / تاريخ الغياب
            // عمود B (مؤشر 1): اسم الطالب
            // عمود C (مؤشر 2): رقم الطالب (الهوية الوطنية)
            // عمود D (مؤشر 3): الصف
            // عمود E (مؤشر 4): الفصل
            // عمود F (مؤشر 5): رقم الهاتف
            // عمود G (مؤشر 6): وقت الحضور
            // عمود J (مؤشر 9): مقدار التأخر (فقط لملف المتأخرين)

            rows.forEach((row, idx) => {
                // تخطي صفوف العناوين والتوصيفات المبدئية
                if (idx === 0) {
                    const firstRowStr = JSON.stringify(row).toLowerCase();
                    if (firstRowStr.includes("الهوية") || firstRowStr.includes("الاسم") || firstRowStr.includes("الطالب") || firstRowStr.includes("حضور") || firstRowStr.includes("غياب")) {
                        return; 
                    }
                }

                const rawName = row[1];
                const rawId = row[2];
                const rawGrade = row[3];
                const rawDivision = row[4];
                const rawMobile = row[5];

                if (!rawName || !rawId) {
                    return; // تخطي الصفوف الفارغة أو غير المكتملة
                }

                const studentId = String(rawId).trim();
                const studentName = String(rawName).trim();

                // تجنب تكرار العناوين إن وجدت في صفوف متأخرة
                if (studentId === "رقم الطالب" || studentName === "اسم الطالب") {
                    return;
                }

                // 1. تطبيع رقم الهاتف بشكل متقدم ومقاومة الأرقام التالفة
                let mobile = normalizePhone(rawMobile);
                const existingIdx = students.findIndex(s => s.id === studentId);
                if (!mobile || !/^05\d{8}$/.test(mobile)) {
                    if (existingIdx !== -1 && students[existingIdx].parentPhone) {
                        mobile = students[existingIdx].parentPhone;
                    } else {
                        mobile = "05" + Math.floor(10000000 + Math.random() * 90000000); 
                    }
                }

                // 2. استخلاص اسم الأب لولي الأمر
                const nameParts = studentName.split(/\s+/);
                let parentName = nameParts[0];
                if (nameParts.length > 2) {
                    parentName = nameParts.slice(1).join(" ");
                } else if (nameParts.length === 2) {
                    parentName = nameParts[1];
                }

                // 3. مواءمة الصف الدراسي والفصل
                const grade = mapExcelGrade(rawGrade, rawDivision);

                // 4. تحليل وحساب دقائق التأخر
                let delayMinutes = 0;
                if (type === "late") {
                    const rawDelay = row[9]; // عمود J
                    if (rawDelay !== null && rawDelay !== undefined) {
                        if (typeof rawDelay === "number") {
                            if (rawDelay < 1) {
                                delayMinutes = Math.round(rawDelay * 1440);
                            } else {
                                delayMinutes = Math.round(rawDelay);
                            }
                        } else {
                            const delayStr = String(rawDelay).trim();
                            if (delayStr.includes(":")) {
                                const parts = delayStr.split(":");
                                const hours = parseInt(parts[0]) || 0;
                                const minutes = parseInt(parts[1]) || 0;
                                delayMinutes = hours * 60 + minutes;
                            } else {
                                delayMinutes = parseInt(delayStr) || 0;
                            }
                        }
                    }
                    if (delayMinutes <= 0) delayMinutes = 15;
                }

                // تحديد حالة الحضور الجديدة
                let attStatus = "present";
                if (type === "absent") attStatus = "absent";
                if (type === "late")   attStatus = "delayed";

                // استخراج وقت وتاريخ الحضور الفعلي من أعمدة إكسل
                let parsedTime = parseExcelDateTime(row[0], row[6]);
                if (!parsedTime) {
                    parsedTime = getFormattedArabicDateTime();
                }

                // استخراج تاريخ اليوم من العمود A (للأرشيف)
                const dateStr = getDateStr(row[0]);

                // بناء سجل الأرشيف لهذا اليوم
                const historyRecord = {
                    date:   dateStr,
                    status: attStatus,
                    time:   parsedTime,
                    delay:  delayMinutes
                };

                // التحقق مما إذا كان الطالب مسجل مسبقاً في الدليل (تم تحديده مسبقاً)
                if (existingIdx !== -1) {
                    const student = students[existingIdx];

                    // تهيئة سجل الأرشيف إن لم يكن موجوداً
                    if (!student.attendanceHistory) {
                        student.attendanceHistory = [];
                    }

                    // إضافة أو تحديث السجل لهذا اليوم في الأرشيف
                    const existingRecordIdx = student.attendanceHistory.findIndex(r => r.date === dateStr);
                    if (existingRecordIdx !== -1) {
                        student.attendanceHistory[existingRecordIdx] = historyRecord;
                    } else {
                        student.attendanceHistory.push(historyRecord);
                        // ترتيب تنازلي حسب التاريخ لعرض الأحدث أولاً
                        student.attendanceHistory.sort((a, b) => b.date.localeCompare(a.date));
                    }

                    // تحديث حالة الحضور اليومي للطالب الحالي
                    student.attendance = attStatus;
                    student.attendanceTime = parsedTime;
                    student.morningDelayMinutes = delayMinutes;

                    // تحديث بيانات الصف والاسم ورقم الجوال إن وجد أي تحديث بالإكسل
                    if (grade && grade !== student.grade) {
                        student.grade = grade;
                    }
                    if (parentName && parentName !== student.parentName) {
                        student.parentName = parentName;
                    }
                    if (mobile && mobile !== student.parentPhone) {
                        student.parentPhone = mobile;
                    }

                    // إعادة حساب العدادات من الأرشيف الكامل
                    ensureStudentCounters(student);

                    if (!modifiedStudents.some(ms => ms.id === student.id)) {
                        modifiedStudents.push(student);
                    }
                    updatedCount++;
                } else {
                    // إنشاء حساب طالب جديد تلقائياً وإضافته للدليل
                    const studentObj = {
                        id: studentId,
                        name: studentName,
                        grade: grade,
                        parentName: parentName,
                        parentPhone: mobile,
                        status: Math.random() > 0.4 ? "installed" : "not_installed",
                        lastActive: "لم يسجل دخول بعد",
                        attendance: attStatus,
                        attendanceTime: parsedTime,
                        morningDelayMinutes: delayMinutes,
                        privateMessages: [],
                        attendanceHistory: [historyRecord]
                    };

                    // حساب العدادات للطالب الجديد
                    ensureStudentCounters(studentObj);

                    students.push(studentObj);

                    if (!modifiedStudents.some(ms => ms.id === studentObj.id)) {
                        modifiedStudents.push(studentObj);
                    }
                    importedCount++;
                }

                if (type === "early")  stats.early++;
                if (type === "absent") stats.absent++;
                if (type === "late")   stats.late++;
            });
        });

        // مزامنة البيانات وحفظها محلياً
        syncData();
        refreshUI();
        closeDailyAttendanceModal();

        // تفعيل محاكاة الهاتف لأحد الطلاب النشطين الذين تم رصدهم
        if (students.length > 0) {
            const firstInstalled = students.find(s => s.status === "installed" && (s.attendance === "absent" || s.attendance === "delayed")) || students[0];
            currentStudentId = firstInstalled.id;
            renderMobileApp();
        }

        // إظهار تنبيه المزامنة السحابية الفورية
        showToast("success", "جاري المزامنة السحابية الفورية للطلاب الذين تم رصدهم...");
        
        syncStudentsListToCloud(modifiedStudents)
        .then(() => {
            showToast("success", `✅ تم الرصد والمزامنة السحابية بنجاح! حضور مبكر: ${stats.early}، غياب: ${stats.absent}، متأخرين: ${stats.late}. (محدّث: ${updatedCount}، مضاف جديد: ${importedCount})`);
        })
        .catch(err => {
            console.error("❌ فشلت المزامنة السحابية للرصد اليومي:", err);
            showToast("error", "⚠️ فشلت المزامنة السحابية التلقائية، ولكن تم حفظ البيانات محلياً بنجاح.");
        });

    }).catch(error => {
        console.error(error);
        showToast("error", "خطأ أثناء معالجة ملفات الرصد: " + error.message);
    });
}

// ==========================================================================
// 15. نظام المزامنة السحابية الفورية (Cloud Sync Backend)
// ==========================================================================


// طابور لتسلسل عمليات المزامنة السحابية ومنع المشاكل الناتجة عن الاتصالات المتزامنة بكثرة
let syncQueue = [];
let isProcessingSyncQueue = false;

function enqueueSync(type, data) {
    syncQueue.push({ type, data });
    processSyncQueue();
}

function processSyncQueue() {
    if (isProcessingSyncQueue || syncQueue.length === 0) return;
    isProcessingSyncQueue = true;

    const task = syncQueue.shift();
    const next = () => {
        setTimeout(() => {
            isProcessingSyncQueue = false;
            processSyncQueue();
        }, 150); // تأخير 150 مللي ثانية بين كل طلب والآخر
    };

    if (task.type === "student") {
        performSyncStudentToCloud(task.data, next);
    } else if (task.type === "general") {
        performSyncGeneralMessagesToCloud(next);
    } else {
        next();
    }
}

// مزامنة حالة طالب محدد إلى السحابة
function syncStudentToCloud(student) {
    if (!student || !student.id) return;
    const exists = syncQueue.some(q => q.type === "student" && q.data && q.data.id === student.id);
    if (!exists) {
        enqueueSync("student", student);
    }
}

// العملية الفعلية لمزامنة طالب محدد إلى السحابة (تخزين كامل البيانات بأمان تام ودقة 100%)
function performSyncStudentToCloud(student, callback) {
    if (!student || !student.id) {
        if (typeof callback === "function") callback();
        return;
    }
    
    ensureStudentCounters(student);

    // إرسال كائن الطالب كاملاً مع جميع رسائله وسجله دون أي اقتصاص أو ضياع للبيانات والمرفقات
    fetch(API_BASE + '/api/students/bulk', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ students: [student] })
    })
    .then(res => {
        if (!res.ok) console.error("❌ فشلت مزامنة الطالب بقاعدة البيانات سحابياً:", res.statusText);
    })
    .catch(err => console.error("❌ خطأ في الاتصال لمزامنة الطالب:", err))
    .finally(() => {
        if (typeof callback === "function") callback();
    });
}

// مزامنة الإعلانات العامة إلى السحابة
function syncGeneralMessagesToCloud() {
    const exists = syncQueue.some(q => q.type === "general");
    if (!exists) {
        enqueueSync("general", null);
    }
}

// العملية الفعلية لمزامنة الإعلانات العامة إلى السحابة (كامل الإعلان بدون اقتصاص مع مرفقاته)
function performSyncGeneralMessagesToCloud(callback) {
    if (!generalMessages || generalMessages.length === 0) {
        if (typeof callback === "function") callback();
        return;
    }
    
    // جلب الإعلان الأحدث المضاف حديثاً ونشره في خادم الـ API
    const latestAnn = generalMessages[0];
    
    fetch(API_BASE + '/api/general-messages', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(latestAnn)
    })
    .then(res => {
        if (!res.ok) console.error("❌ فشلت مزامنة الإعلان العام بقاعدة البيانات:", res.statusText);
    })
    .catch(err => console.error("❌ خطأ في الاتصال لمزامنة الإعلان العام:", err))
    .finally(() => {
        if (typeof callback === "function") callback();
    });
}

// تهيئة عدادات الأيام الثلاثة وحسابها ديناميكياً من سجل الحضور التاريخي
function ensureStudentCounters(student) {
    if (!student) return;
    // تهيئة سجل الأرشيف إن لم يكن موجوداً
    if (!student.attendanceHistory) {
        student.attendanceHistory = [];
    }
    // تهيئة قائمة الرسائل الخاصة إن لم تكن موجودة
    if (!student.privateMessages) {
        student.privateMessages = [];
    }
    // حساب العدادات من سجل الأرشيف الفعلي فقط
    student.earlyDaysCount  = student.attendanceHistory.filter(r => r.status === "present").length;
    student.lateDaysCount   = student.attendanceHistory.filter(r => r.status === "delayed" || r.status === "late").length;
    student.absentDaysCount = student.attendanceHistory.filter(r => r.status === "absent").length;
}

