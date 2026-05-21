// منطق عمل تطبيق الأجاويد (Ajaweed Notification System)
// مدرسة الأجاويد الأولى المتوسطة

// ==========================================================================
// 1. إدارة البيانات والاتصال المباشر (State & Local Storage)
// ==========================================================================

let students = [];
let generalMessages = [];
let currentStudentId = null; // الطالب النشط حالياً في محاكي الجوال
let sentNotificationsTodayCount = 0;
let currentAttachment = null; // المرفق الحالي (صورة أو PDF)

// تحميل البيانات عند بدء تشغيل المنصة
document.addEventListener("DOMContentLoaded", () => {
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

// تهيئة قاعدة البيانات المحلية
function initDatabase() {
    const storedStudents = localStorage.getItem("ajaweed_students");
    const storedGeneral = localStorage.getItem("ajaweed_general_messages");
    const storedCount = localStorage.getItem("ajaweed_sent_count");

    if (storedStudents) {
        students = JSON.parse(storedStudents);
    } else {
        students = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
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
}

// مزامنة البيانات مع الـ Local Storage
function syncData() {
    localStorage.setItem("ajaweed_students", JSON.stringify(students));
    localStorage.setItem("ajaweed_general_messages", JSON.stringify(generalMessages));
    localStorage.setItem("ajaweed_sent_count", sentNotificationsTodayCount.toString());
}

// إعادة ضبط النظام كاملاً للقيم الأولية
function resetDatabase() {
    if (confirm("هل أنت متأكد من رغبتك في إعادة ضبط بيانات النظام للوضع الافتراضي؟")) {
        localStorage.removeItem("ajaweed_students");
        localStorage.removeItem("ajaweed_general_messages");
        localStorage.setItem("ajaweed_sent_count", "0");
        
        showToast("success", "تم إعادة تعيين النظام بنجاح للقيم الافتراضية.");
        initDatabase();
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
    const currentValue = select.value;
    
    // الاحتفاظ بالخيارين الأولين
    select.innerHTML = `
        <option value="" disabled selected>اختر الطالب المستلم...</option>
        <option value="all">📢 إرسال للجميع (إعلان عام بمدرسة الأجاويد)</option>
    `;

    students.forEach(student => {
        const option = document.createElement("option");
        option.value = student.id;
        option.textContent = `${student.name} (${student.id}) - ${student.grade}`;
        select.appendChild(option);
    });

    if (currentValue && select.querySelector(`option[value="${currentValue}"]`)) {
        select.value = currentValue;
    }
}

// رندرة جدول الطلاب ودليل المدرسة
function renderStudentsTable() {
    const tbody = document.getElementById("students-table-body");
    tbody.innerHTML = "";

    const searchVal = document.getElementById("student-search").value.toLowerCase();
    const filterVal = document.getElementById("status-filter").value;

    const filtered = students.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchVal) || s.id.includes(searchVal);
        const matchesFilter = filterVal === "all" || s.status === filterVal;
        return matchesSearch && matchesFilter;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; color: #888; padding: 30px;">
                    <i data-lucide="users-round" style="width: 32px; height: 32px; margin-bottom: 8px;"></i>
                    <p>لا يوجد طلاب يطابقون خيارات البحث الحالية.</p>
                </td>
            </tr>
        `;
        lucide.createIcons();
        return;
    }

    filtered.forEach(s => {
        const tr = document.createElement("tr");

        // شارة الحضور اليوم
        let attClass = "present";
        let attLabel = "حاضر";
        let attIcon = "smile";
        if (s.attendance === "absent") {
            attClass = "absent";
            attLabel = "غائب";
            attIcon = "frown";
        } else if (s.attendance === "delayed") {
            attClass = "delayed";
            attLabel = `متأخر (${s.morningDelayMinutes}د)`;
            attIcon = "clock";
        }

        tr.innerHTML = `
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
        `;
        tbody.appendChild(tr);
    });
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

// رندرة أزرار التبديل السريع للمستخدمين بجانب الموبايل
function renderQuickTestUsers() {
    const container = document.getElementById("quick-test-users");
    container.innerHTML = "";

    students.forEach(s => {
        const btn = document.createElement("button");
        btn.className = `btn-helper-user ${s.id === currentStudentId ? 'active' : ''}`;
        
        let indicator = s.status === 'installed' ? '🟢' : '🔴';
        btn.textContent = `${indicator} ${s.name.split(' ')[0]}`;
        
        btn.onclick = () => {
            currentStudentId = s.id;
            refreshUI();
            
            // اهتزاز بصري خفيف للهاتف ليدل على التبديل
            const phone = document.getElementById("phone-frame");
            phone.classList.add("shake-anim");
            setTimeout(() => phone.classList.remove("shake-anim"), 400);
        };
        container.appendChild(btn);
    });
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

    if (student.attendance === "present") {
        newAtt = "absent";
    } else if (student.attendance === "absent") {
        newAtt = "delayed";
        newMinutes = 20; // قيمة افتراضية للتأخر الصباحي
    } else {
        newAtt = "present";
    }

    student.attendance = newAtt;
    student.morningDelayMinutes = newMinutes;
    
    syncData();
    refreshUI();
    showToast("success", `تم تحديث حضور الطالب ${student.name} إلى (${newAtt === 'present' ? 'حاضر' : newAtt === 'absent' ? 'غائب' : 'متأخر'})`);
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

    } else {
        // إرسال إشعار لطالب محدد
        const student = students.find(s => s.id === recipientVal);
        if (!student) return;

        if (type === "attendance") {
            subType = document.querySelector('input[name="att-status"]:checked').value;
            student.attendance = subType;
            if (subType === "delayed") {
                student.morningDelayMinutes = parseInt(document.getElementById("minutes-late").value) || 15;
            } else {
                student.morningDelayMinutes = 0;
            }
            logTitle = subType === "present" ? "حضور الطالب" : (subType === "absent" ? "غياب الطالب" : "تأخر صباحي");
        } else {
            logTitle = "رسالة خاصة";
        }

        // إدراج الرسالة الخاصة بقائمة رسائل الطالب
        const newMsg = {
            id: "msg_" + Date.now(),
            text: text,
            date: timestamp,
            read: false,
            attachment: currentAttachment ? { ...currentAttachment } : null
        };
        student.privateMessages.unshift(newMsg);

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
    const parentPhone = document.getElementById("new-parent-phone").value.trim();
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
        attendance: "present",
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
                let mobile = String(rawMobile || '').trim();
                if (mobile.startsWith("966")) {
                    mobile = "0" + mobile.substring(3);
                } else if (mobile.startsWith("5")) {
                    mobile = "0" + mobile;
                }
                // التحقق من صحة الرقم وإلا وضع رقم افتراضي منظم
                if (!mobile || !/^05\d{8}$/.test(mobile)) {
                    mobile = "05" + Math.floor(10000000 + Math.random() * 90000000); 
                }

                // 2. استخلاص اسم الأب/العائلة لولي الأمر من اسم الطالب رباعياً
                const nameParts = studentName.split(/\s+/);
                let parentName = "أبو " + nameParts[0];
                if (nameParts.length > 2) {
                    parentName = nameParts.slice(1).join(" ");
                } else if (nameParts.length === 2) {
                    parentName = nameParts[1];
                }

                // 3. مواءمة الصف والفصل مع الخيارات الستة المتاحة بالتطبيق
                const grade = mapExcelGrade(rawGrade, rawDivision);

                // تجهيز كائن الطالب الجديد
                const studentObj = {
                    id: studentId,
                    name: studentName,
                    grade: grade,
                    parentName: parentName,
                    parentPhone: mobile,
                    status: Math.random() > 0.4 ? "installed" : "not_installed", // حالة عشوائية
                    lastActive: Math.random() > 0.3 ? "منذ دقيقتين" : "غير نشط حالياً"
                };

                // التحقق مما إذا كان الطالب موجوداً مسبقاً برقم الهوية
                const existingIdx = students.findIndex(s => s.id === studentId);
                if (existingIdx !== -1) {
                    // تحديث بيانات الطالب القائم
                    students[existingIdx] = { ...students[existingIdx], ...studentObj };
                    updatedCount++;
                } else {
                    // إضافة طالب جديد
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
                refreshMobileSimulator();
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
    const divStr = String(divisionVal || '').trim();
    
    let gradeNum = 1; // الافتراضي الأول المتوسط
    if (gradeStr.includes("ثاني") || gradeStr.includes("الثاني") || gradeStr.includes("2")) {
        gradeNum = 2;
    } else if (gradeStr.includes("ثالث") || gradeStr.includes("الثالث") || gradeStr.includes("3")) {
        gradeNum = 3;
    }
    
    let divLetter = "أ"; // الافتراضي الفصل أ
    if (divStr.includes("ب") || divStr.includes("2") || divStr.includes("بنين") || divStr.includes("ب ")) {
        divLetter = "ب";
    }
    
    const arabicGrades = ["الأول", "الثاني", "الثالث"];
    return `الصف ${arabicGrades[gradeNum - 1]} المتوسط - ${divLetter}`;
}
