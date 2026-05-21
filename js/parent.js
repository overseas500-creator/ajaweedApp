// ================================================
//  بوابة أولياء الأمور — تطبيق الأجاويد
//  منطق المصادقة وعرض الإخوة والجلسة الدائمة
// ================================================

const SESSION_KEY = "ajaweed_parent_session";
const STUDENTS_KEY = "ajaweed_students";

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
        triggerParentGamification(parentSession.parentPhone);
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
                });
            }
            if (repaired) {
                localStorage.setItem(STUDENTS_KEY, JSON.stringify(allStudents));
            }
        } else if (typeof INITIAL_STUDENTS !== "undefined") {
            allStudents = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
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
function handleParentLogin(e) {
    e.preventDefault();

    const enteredId    = document.getElementById("p-student-id").value.trim();
    const enteredPhone = normalizePhone(document.getElementById("p-phone").value.trim());

    if (!enteredId || !enteredPhone) {
        showLoginError("يرجى إدخال رقم الهوية ورقم الجوال.");
        return;
    }

    // البحث عن الطالب بالهوية
    const student = allStudents.find(s => String(s.id).trim() === enteredId);
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

    // جمع جميع الأبناء المشتركين في نفس رقم الجوال
    const siblings = allStudents.filter(s => normalizePhone(s.parentPhone || s.phone || "") === enteredPhone);

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
    triggerParentGamification(enteredPhone);
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
    document.getElementById("p-welcome-name").textContent = `مرحباً، أبو ${parentFirstName}`;
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

    // عداد التأخر
    renderDelayWidget(student);

    // بطاقة تثبيت PWA
    const pwaCard = document.getElementById("p-pwa-card");
    if (pwaCard) {
        pwaCard.style.display = student.status === "installed" ? "none" : "flex";
    }

    // الإشعارات الخاصة
    renderPrivateMessages(student);

    // الإعلانات العامة
    renderGeneralMessages();
}

// بطاقة الحضور
function renderAttendanceCard(student) {
    const label = document.getElementById("p-att-label");
    const desc  = document.getElementById("p-att-desc");
    const card  = document.getElementById("p-att-card");
    if (!label || !desc || !card) return;

    card.className = "p-attendance-card";
    const att = student.attendance || "present";
    const delayMins = student.morningDelayMinutes || student.delayMinutes || 0;

    const configs = {
        present:  { cls: "att-present",  icon: "✅", text: "حاضر اليوم",    desc: "تم رصد الحضور في الموعد المحدد." },
        absent:   { cls: "att-absent",   icon: "❌", text: "غائب اليوم",    desc: "لم يتم رصد حضور الطالب اليوم. يُرجى التواصل مع المدرسة." },
        late:     { cls: "att-late",     icon: "⏰", text: "متأخر صباحاً",  desc: `تأخر الطالب ${delayMins} دقيقة عن موعد الدراسة.` },
        excused:  { cls: "att-excused",  icon: "📋", text: "غياب بعذر",    desc: "تم توثيق الغياب بعذر رسمي." }
    };

    const cfg = configs[att] || configs.present;
    card.classList.add(cfg.cls);
    label.textContent = cfg.icon + " " + cfg.text;
    desc.textContent  = cfg.desc;
}

// عداد التأخر الدائري
function renderDelayWidget(student) {
    const minutes = student.morningDelayMinutes || student.delayMinutes || 0;
    const circle  = document.getElementById("p-delay-circle");
    const text    = document.getElementById("p-delay-text");
    const desc    = document.getElementById("p-delay-desc");
    if (!circle || !text) return;

    const maxMinutes = 60;
    const pct = Math.min((minutes / maxMinutes) * 100, 100);
    circle.setAttribute("stroke-dasharray", `${pct.toFixed(1)}, 100`);
    text.textContent = minutes + " د";

    if (desc) {
        if (minutes === 0)       desc.textContent = "ملتزم بالحضور المبكر. ممتاز! 🌟";
        else if (minutes <= 10)  desc.textContent = `تأخر ${minutes} دقائق. يُنصح بالمزيد من الانتظام.`;
        else if (minutes <= 30)  desc.textContent = `تأخر ${minutes} دقيقة. يرجى متابعة المواعيد.`;
        else                     desc.textContent = `تأخر ${minutes} دقيقة هذه الفترة. يستلزم التدخل.`;
    }
}

// إشعارات الطالب الخاصة
function renderPrivateMessages(student) {
    const feed  = document.getElementById("p-private-feed");
    const badge = document.getElementById("p-private-badge");
    if (!feed) return;

    const msgList = student.privateMessages || student.messages || [];
    const messages = msgList.slice().reverse();
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
    // تعليم الرسائل كمقروءة
    if (student.privateMessages) {
        student.privateMessages.forEach(m => m.read = true);
        syncStudentData(student);
    } else if (student.messages) {
        student.messages.forEach(m => m.read = true);
        syncStudentData(student);
    }
}

// الإعلانات العامة للمدرسة
function renderGeneralMessages() {
    const feed = document.getElementById("p-general-feed");
    if (!feed) return;

    let generalMessages = [];
    try {
        const raw = localStorage.getItem("ajaweed_general_messages");
        if (raw) generalMessages = JSON.parse(raw);
        else if (typeof INITIAL_GENERAL_MESSAGES !== "undefined") {
            generalMessages = INITIAL_GENERAL_MESSAGES;
        }
    } catch {}

    const msgs = generalMessages.slice().reverse();
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

// بناء HTML بطاقة رسالة واحدة
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

    let attachmentHtml = "";
    if (msg.attachment) {
        if (msg.attachment.type === "image") {
            attachmentHtml = `<img src="${msg.attachment.data}" class="p-msg-image" onclick="this.requestFullscreen && this.requestFullscreen()">`;
        } else if (msg.attachment.type === "pdf") {
            attachmentHtml = `
                <a href="${msg.attachment.data}" download="${msg.attachment.name}" class="p-msg-pdf">
                    <span>📎</span><span>${msg.attachment.name}</span>
                </a>`;
        }
    }

    return `
        <div class="p-msg-card" style="border-right-color: ${cfg.border}; background: ${cfg.bg};">
            <div class="p-msg-header">
                <span class="p-msg-icon">${cfg.icon}</span>
                <span class="p-msg-title">${msg.title || "إشعار"}</span>
                <span class="p-msg-date">${dateStr}</span>
            </div>
            <p class="p-msg-body">${msg.body || msg.message || ""}</p>
            ${attachmentHtml}
        </div>`;
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
}

// ==========================================
// 9. تسجيل الخروج (اختياري بيد ولي الأمر)
// ==========================================
function parentLogout() {
    if (!confirm("هل تريد تسجيل الخروج من حساب أبنائك؟")) return;
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

function triggerParentGamification(parentPhone) {
    if (!parentPhone) return;
    const statsKey = `ajaweed_parent_stats_${parentPhone}`;
    let stats = { lastLoginDate: "", loginCountToday: 0, starCount: 0 };
    
    try {
        const stored = localStorage.getItem(statsKey);
        if (stored) stats = JSON.parse(stored);
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
        stats.starCount = (stats.starCount || 0) + 1; // زيادة النجوم
        rewardStar = true;

        if (daysDiff === -1) {
            greeting = "أهلاً بك ، أنت ولي أمر رائع";
        } else if (daysDiff === 1) {
            greeting = "أهلاً بك ، مر يوم واحد ياغالي ما زرتنا";
        } else if (daysDiff === 2) {
            greeting = "أهلاً بك ، مر يومين ياغالي ما زرتنا لا تحرمنا من متابعتك";
        } else {
            greeting = "أهلاً بك ، مر وقت طويل ياغالي ما زرتنا , اشتقنا لزيارتك ومتابعتك";
        }
    }

    // حفظ البيانات المحدثة
    try {
        localStorage.setItem(statsKey, JSON.stringify(stats));
    } catch (e) {}

    // تحديث النجمة في لوحة المعلومات
    const countEl = document.getElementById("p-stars-count");
    if (countEl) countEl.textContent = stats.starCount;

    // إظهار نافذة المكافأة إذا حصل على نجمة جديدة اليوم
    if (rewardStar) {
        setTimeout(() => {
            showRewardModal(greeting, stats.starCount);
        }, 800);
    }
}

function showRewardModal(greeting, starCount) {
    const modal = document.getElementById("p-reward-modal");
    if (!modal) return;

    const titleEl = document.getElementById("p-reward-title");
    const countEl = document.getElementById("p-reward-star-count");

    if (titleEl) titleEl.textContent = greeting;
    if (countEl) countEl.textContent = starCount;

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
