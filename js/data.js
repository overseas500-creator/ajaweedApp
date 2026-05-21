// بيانات الطلاب الأولية وقوالب الإشعارات الجاهزة
// مدرسة الأجاويد الأولى المتوسطة
// تم توليد هذا الملف تلقائياً باستخدام سكربت الاستيراد المحلي لملفات Excel

const INITIAL_STUDENTS = [
    {
        "id": "1162378036",
        "name": "ابراهيم فيصل محمد كبير مزاق",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "فيصل محمد كبير",
        "parentPhone": "0567026707",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "2374320071",
        "name": "ابراهيم محمد نديم يونس",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "محمد نديم يونس",
        "parentPhone": "0538808044",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1163267642",
        "name": "أحمد عبدالله احمد الزهراني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "عبدالله احمد الزهراني",
        "parentPhone": "0502888330",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "0170792968",
        "name": "احمد فيصل محمد يحيى",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "فيصل محمد يحيى",
        "parentPhone": "0540264798",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1163243171",
        "name": "أحمد محمد احمد الزهراني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "محمد احمد الزهراني",
        "parentPhone": "0555696089",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1153093354",
        "name": "امجد احمد حسن صروي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "احمد حسن صروي",
        "parentPhone": "0534400741",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1167300811",
        "name": "أيمن انور بن احمد شعبي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "انور بن احمد",
        "parentPhone": "0551537333",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1167644507",
        "name": "ايمن سعيد بن حسن الشمراني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "سعيد بن حسن",
        "parentPhone": "0500728688",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1160428205",
        "name": "بتال سعد عبدالله الشيباني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "سعد عبدالله الشيباني",
        "parentPhone": "0559479015",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1162861908",
        "name": "تركي محمد ابن عويض العتيبي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "محمد ابن عويض",
        "parentPhone": "0537588160",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "3000090334",
        "name": "حسام زكريا جلال احمد امداد حسين",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "زكريا جلال احمد",
        "parentPhone": "0536752391",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_14",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1163610528",
        "name": "رشاد حسن ذيبان العزيزي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "حسن ذيبان العزيزي",
        "parentPhone": "0569976047",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "2377298233",
        "name": "زياد حسين حجي جعفر",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "حسين حجي جعفر",
        "parentPhone": "0561630001",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1165557578",
        "name": "سطام محمد ناصر سلطان",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "محمد ناصر سلطان",
        "parentPhone": "0503648096",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1164651455",
        "name": "سعد عبدل صالح القرني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "عبدل صالح القرني",
        "parentPhone": "0503636598",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "4122673504",
        "name": "سلطان حسن محمد بامسعود",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "حسن محمد بامسعود",
        "parentPhone": "0564816257",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_19",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1162875569",
        "name": "شويل احمد شويل العمري",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "احمد شويل العمري",
        "parentPhone": "0556581750",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_20",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1165225366",
        "name": "عبدالسلام صالح محمد القرني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "صالح محمد القرني",
        "parentPhone": "0505689721",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1166280972",
        "name": "عبدالعزيز محمد سالم غزواني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "محمد سالم غزواني",
        "parentPhone": "0548131307",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1164434910",
        "name": "عبدالله أحمد عبدالله الكثيري",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "أحمد عبدالله الكثيري",
        "parentPhone": "0563099898",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1164693432",
        "name": "عمار راجح محمد القرني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "راجح محمد القرني",
        "parentPhone": "0565121505",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1163552787",
        "name": "عمر ماجد بن احمد الغامدي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "ماجد بن احمد",
        "parentPhone": "0505669618",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1163092933",
        "name": "فارس احمد علي غزواني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "احمد علي غزواني",
        "parentPhone": "0568063055",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1163298605",
        "name": "فواز علي احمد الكثيري",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "علي احمد الكثيري",
        "parentPhone": "0554766702",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_27",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1165218841",
        "name": "فيصل ابراهيم منصور العلياني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "ابراهيم منصور العلياني",
        "parentPhone": "0560407064",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1161365448",
        "name": "فيصل محمد عمران الزهراني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "محمد عمران الزهراني",
        "parentPhone": "0555655348",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_29",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "2450922139",
        "name": "ماهر هزاع سرحان سعيد",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "هزاع سرحان سعيد",
        "parentPhone": "0504641106",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1162265340",
        "name": "مبارك حمزه ابن مبارك السيد",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "حمزه ابن مبارك",
        "parentPhone": "0563180081",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1166002061",
        "name": "محمد طلال محمد الاسمري",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "طلال محمد الاسمري",
        "parentPhone": "0543339921",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2337617696",
        "name": "محمد فايز عبدالله القظيم",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "فايز عبدالله القظيم",
        "parentPhone": "0555093990",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1165277755",
        "name": "معن محمد محنف بجوي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "محمد محنف بجوي",
        "parentPhone": "0509340385",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1151297031",
        "name": "مهدي طلال مهدي شنب",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "طلال مهدي شنب",
        "parentPhone": "0509057344",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_35",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1167614260",
        "name": "هاشم جمال عيسى النعمي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "جمال عيسى النعمي",
        "parentPhone": "0548183200",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1171258633",
        "name": "وليد ابراهيم علي الزبيدي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "ابراهيم علي الزبيدي",
        "parentPhone": "0509106021",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1164585158",
        "name": "يوسف عامر زين البارقي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "عامر زين البارقي",
        "parentPhone": "0595090809",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1162490708",
        "name": "أحمد حسن احمد هجام",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "حسن احمد هجام",
        "parentPhone": "0563634963",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1163640871",
        "name": "احمد عبدالله ابن احمد الزهراني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "عبدالله ابن احمد",
        "parentPhone": "0592794499",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "01019606556",
        "name": "احمد مساعد احمد الجهني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "مساعد احمد الجهني",
        "parentPhone": "0562664943",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1179197007",
        "name": "اديم علي محمد كريري",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "علي محمد كريري",
        "parentPhone": "0547826717",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1165774876",
        "name": "البراء علي بن ظيف الله الزهراني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "علي بن ظيف",
        "parentPhone": "0550604999",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1163099714",
        "name": "البراء علي صالح الزبيدي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "علي صالح الزبيدي",
        "parentPhone": "0530796741",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_44",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1165944115",
        "name": "الوليد محمد يحي القاسمي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "محمد يحي القاسمي",
        "parentPhone": "0501919756",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1166315877",
        "name": "بدر اسامه عباس يماني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "اسامه عباس يماني",
        "parentPhone": "0596055830",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1153930084",
        "name": "بندر فارس علي العمري",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "فارس علي العمري",
        "parentPhone": "0534333227",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "6101815857",
        "name": "جابر احمد فهيد الهماسي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "احمد فهيد الهماسي",
        "parentPhone": "0560846246",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_48",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "2366965032",
        "name": "جابر عبدالله حسين مخارش",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "عبدالله حسين مخارش",
        "parentPhone": "0501805631",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1165656347",
        "name": "حاتم عادل احمد الزهراني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "عادل احمد الزهراني",
        "parentPhone": "0556722998",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1162967572",
        "name": "حسام احمد حسن الزهراني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "احمد حسن الزهراني",
        "parentPhone": "0556661892",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2357515184",
        "name": "حسن خالد حسن طيب",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "خالد حسن طيب",
        "parentPhone": "0569271718",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_52",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1165973619",
        "name": "ريان احمد عبدالله المالكي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "احمد عبدالله المالكي",
        "parentPhone": "0558020350",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1167591179",
        "name": "ساري عبدالله محمد العمري",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "عبدالله محمد العمري",
        "parentPhone": "0503358525",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "6101815758",
        "name": "سليم احمد فهيد الهماسي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "احمد فهيد الهماسي",
        "parentPhone": "0560846246",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1160914931",
        "name": "عبدالرحمن ابراهيم عبده حكمي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "ابراهيم عبده حكمي",
        "parentPhone": "0531951299",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_56",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1164826644",
        "name": "عبدالله علي عبدالله الشهري",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "علي عبدالله الشهري",
        "parentPhone": "0506674008",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1164397406",
        "name": "عبدالله محمد مصلح الزهراني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "محمد مصلح الزهراني",
        "parentPhone": "0567749687",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2357399563",
        "name": "عدي عمر ولي حسين",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "عمر ولي حسين",
        "parentPhone": "0555696490",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1166016988",
        "name": "علي سعيد علي الزهراني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "سعيد علي الزهراني",
        "parentPhone": "0565618007",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1163836057",
        "name": "فهد جابر حسن قحل",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "جابر حسن قحل",
        "parentPhone": "0548533610",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1166268266",
        "name": "فيصل عبدالرحمن نافع السهلي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "عبدالرحمن نافع السهلي",
        "parentPhone": "0567336996",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_62",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1164479121",
        "name": "محمد حمدان محمد الغامدي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "حمدان محمد الغامدي",
        "parentPhone": "0599915670",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1165843317",
        "name": "محمد عبدالله محمد القرني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "عبدالله محمد القرني",
        "parentPhone": "0558363722",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1164224105",
        "name": "محمد مشيهف عطيه القرني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "مشيهف عطيه القرني",
        "parentPhone": "0509636741",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1162754889",
        "name": "مسفر محمد بن حمدان الشمراني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "محمد بن حمدان",
        "parentPhone": "0553111525",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1162587032",
        "name": "معاذ سعيد ابن علي الزهراني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "سعيد ابن علي",
        "parentPhone": "0544725782",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1163062274",
        "name": "منصور ناصر احمد الغامدي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "ناصر احمد الغامدي",
        "parentPhone": "0505678040",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "4143859900",
        "name": "نواف احمد حميد عثمان",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "احمد حميد عثمان",
        "parentPhone": "0593169535",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1166402865",
        "name": "وسام خالد يحى حكمي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "خالد يحى حكمي",
        "parentPhone": "0506667045",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_70",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1161750987",
        "name": "وسام عبدالسلام بن حسن ابن سعد ال حسن القرني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "عبدالسلام بن حسن",
        "parentPhone": "0555980811",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_71",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1165322320",
        "name": "يزن سليمان مصطفى ابويحي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "سليمان مصطفى ابويحي",
        "parentPhone": "0545856450",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1164148882",
        "name": "ابراهيم خليل ابراهيم الزهراني",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "خليل ابراهيم الزهراني",
        "parentPhone": "0530332241",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_73",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1165558279",
        "name": "احمد بن علي بن احمد كعبي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "بن علي بن",
        "parentPhone": "0566811375",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1190517704",
        "name": "اسامه خالد عائض الغامدي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "خالد عائض الغامدي",
        "parentPhone": "0555656649",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1164979567",
        "name": "أصيل خالد حسن الغامدي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "خالد حسن الغامدي",
        "parentPhone": "0564646667",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1163137746",
        "name": "باسل عبدالله قاسم سالم",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "عبدالله قاسم سالم",
        "parentPhone": "0566775131",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1178704233",
        "name": "تركي علي محمد كريري",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "علي محمد كريري",
        "parentPhone": "0546647427",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1162693467",
        "name": "جهاد خويتم فيصل المالكي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "خويتم فيصل المالكي",
        "parentPhone": "0560667775",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1168285581",
        "name": "حسام نايف مبارك الزهراني",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "نايف مبارك الزهراني",
        "parentPhone": "0599609609",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1162308819",
        "name": "خالد علي مسفر الغامدي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "علي مسفر الغامدي",
        "parentPhone": "0545673488",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "9683729467-1",
        "name": "راكان محفوظ علي فرحان",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "محفوظ علي فرحان",
        "parentPhone": "0566140779",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1165165950",
        "name": "سالم سليمان سالم الحربي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "سليمان سالم الحربي",
        "parentPhone": "0500247077",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "0191070109",
        "name": "صالح سليمان صالح الحاج",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "سليمان صالح الحاج",
        "parentPhone": "0592625494",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "2340136627",
        "name": "عامر محمد كليب النهدي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "محمد كليب النهدي",
        "parentPhone": "0555081381",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1166018760",
        "name": "عبدالرحمن علي ابراهيم الصمداني",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "علي ابراهيم الصمداني",
        "parentPhone": "0502469076",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1166132322",
        "name": "عبدالعزيز مساعد بن محمد الزهراني",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "مساعد بن محمد",
        "parentPhone": "0554668988",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "0160783852",
        "name": "عبدالله حاكم  الرويمي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "حاكم الرويمي",
        "parentPhone": "0538227671",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1165256494",
        "name": "عبدالله خالد محمد الكديسي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "خالد محمد الكديسي",
        "parentPhone": "0501434106",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1164689166",
        "name": "عبدالله راشد عويد المطيري",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "راشد عويد المطيري",
        "parentPhone": "0508333835",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1163217084",
        "name": "عبدالله سعيد بن ابوالراكه الزهراني",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "سعيد بن ابوالراكه",
        "parentPhone": "0555582390",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1161448582",
        "name": "عبدالله ظافر حسين الشهري",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "ظافر حسين الشهري",
        "parentPhone": "0551927355",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1164605337",
        "name": "عبدالله ماجد عبدالله المالكي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "ماجد عبدالله المالكي",
        "parentPhone": "0504440734",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_93",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1166132314",
        "name": "عبدالله مساعد بن محمد الزهراني",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "مساعد بن محمد",
        "parentPhone": "0558601006",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "2357757166",
        "name": "عبدالهادي أصغر علي كالو خان",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "أصغر علي كالو",
        "parentPhone": "0533790851",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1164771105",
        "name": "علي عبدالله علي الاسمري",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "عبدالله علي الاسمري",
        "parentPhone": "0568866226",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1163335597",
        "name": "عمر محمد مسلم الرحيلى",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "محمد مسلم الرحيلى",
        "parentPhone": "0503388113",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1164278457",
        "name": "فراس باسل جمهور العرياني",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "باسل جمهور العرياني",
        "parentPhone": "0560845795",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1168770780",
        "name": "لافي هاشم حسن الثوابي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "هاشم حسن الثوابي",
        "parentPhone": "0557571154",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1164482752",
        "name": "ماهر احمد خاظر الفهمي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "احمد خاظر الفهمي",
        "parentPhone": "0500086531",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "2353933647",
        "name": "محمد احمد غانم النبيه",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "احمد غانم النبيه",
        "parentPhone": "0503643850",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "2367039001",
        "name": "محمود ياسر محمود شاهين",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "ياسر محمود شاهين",
        "parentPhone": "0504659322",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1165626654",
        "name": "معاذ حسن احمد الزهراني",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "حسن احمد الزهراني",
        "parentPhone": "0505677599",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_103",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1163280132",
        "name": "معاذ عابد ناصر طالبي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "عابد ناصر طالبي",
        "parentPhone": "0559595195",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1161738503",
        "name": "نواف خالد مسعد ال مفلح",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "خالد مسعد ال",
        "parentPhone": "0553304440",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2358026090",
        "name": "وسام احمد محمد مغفوري",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "احمد محمد مغفوري",
        "parentPhone": "0567224201",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1182118602",
        "name": "وسام علي محمد الزهراني",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "علي محمد الزهراني",
        "parentPhone": "0596280139",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1166410470",
        "name": "احمد رامي محمد الغامدي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "رامي محمد الغامدي",
        "parentPhone": "0530377716",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1166337525",
        "name": "احمد سعد بن محمد الزهراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "سعد بن محمد",
        "parentPhone": "0503773157",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1161511108",
        "name": "اسامه عبدالله بن راجح الزهراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "عبدالله بن راجح",
        "parentPhone": "0544414574",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_110",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1166731040",
        "name": "اياد نايف علي الزهراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "نايف علي الزهراني",
        "parentPhone": "0558899904",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1163268004",
        "name": "أيمن علي فائع عسيري",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "علي فائع عسيري",
        "parentPhone": "0530506962",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1163465972",
        "name": "بدر نايف بن عبدالله الزهراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "نايف بن عبدالله",
        "parentPhone": "0556535225",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1159670163",
        "name": "جواد جابر خضر الشمراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "جابر خضر الشمراني",
        "parentPhone": "0555596089",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "2359403355",
        "name": "خالد فيصل عبود بن حيدره",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "فيصل عبود بن",
        "parentPhone": "0500076649",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1163080607",
        "name": "ريان محمد سالم الشهري",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "محمد سالم الشهري",
        "parentPhone": "0540443340",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2445113679",
        "name": "زياد صلاح احمد العامري",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "صلاح احمد العامري",
        "parentPhone": "0543960065",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1166740223",
        "name": "زياد غازي سليم الحربي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "غازي سليم الحربي",
        "parentPhone": "0590229122",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1166452241",
        "name": "سعود محمد عبده هاشمي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "محمد عبده هاشمي",
        "parentPhone": "0551544604",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_119",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1164077388",
        "name": "سعود يحيى ابراهيم خبراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "يحيى ابراهيم خبراني",
        "parentPhone": "0546177705",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1162190886",
        "name": "سعيد محمد سعيد الغامدي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "محمد سعيد الغامدي",
        "parentPhone": "0533533897",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "2377415613",
        "name": "سلطان علي سليمان حكمي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "علي سليمان حكمي",
        "parentPhone": "0533369665",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1165421742",
        "name": "طلال سعد بن حسن الاحمري",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "سعد بن حسن",
        "parentPhone": "0506680686",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1167063211",
        "name": "عبدالاله مسفر ابن محمد الزهراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "مسفر ابن محمد",
        "parentPhone": "0554763433",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1165678465",
        "name": "عبدالمجيد حسن بالغيث القرنى",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "حسن بالغيث القرنى",
        "parentPhone": "0555078950",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "0160483121",
        "name": "عبدالواحد بشير حسن جعره",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "بشير حسن جعره",
        "parentPhone": "0582696362",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1163141854",
        "name": "عزام محمد عبدالرحمن الغامدي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "محمد عبدالرحمن الغامدي",
        "parentPhone": "0566303337",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1166226322",
        "name": "فارس ماجد ابن حسن الفدح",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "ماجد ابن حسن",
        "parentPhone": "0500352235",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1162824278",
        "name": "فايز عبدالرحمن فايز الاسمري",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "عبدالرحمن فايز الاسمري",
        "parentPhone": "0501055800",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "N009231068",
        "name": "مجد عبدالكريم محمد الهديهد",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "عبدالكريم محمد الهديهد",
        "parentPhone": "0531058646",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1165684760",
        "name": "محمد صالح محمد القرني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "صالح محمد القرني",
        "parentPhone": "0506579071",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1168434981",
        "name": "مشاري رامي صالح الغامدي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "رامي صالح الغامدي",
        "parentPhone": "0500054562",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_132",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1167616695",
        "name": "نايف علي عبدالله الزهراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "علي عبدالله الزهراني",
        "parentPhone": "0555599268",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1167424066",
        "name": "نايف محمد غرم الله المالكي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "محمد غرم الله",
        "parentPhone": "0507874278",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1187037468",
        "name": "نضال حاتم علي مدخلي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "حاتم علي مدخلي",
        "parentPhone": "0500313096",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1193830203",
        "name": "هادي علي سرور دغريري",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "علي سرور دغريري",
        "parentPhone": "0567536930",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_136",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1168035499",
        "name": "وسام سهيل سعيد الشمراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "سهيل سعيد الشمراني",
        "parentPhone": "0509576659",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_137",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1166336584",
        "name": "يزيد احمد عويد الرشيدي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "احمد عويد الرشيدي",
        "parentPhone": "0505580447",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "2353807528",
        "name": "يزيد محمد صالح دجاي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "محمد صالح دجاي",
        "parentPhone": "0546259832",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1193797873",
        "name": "يوسف علي سرور دغريري",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "علي سرور دغريري",
        "parentPhone": "0567536930",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1172282327",
        "name": "احمد محمد سعيد الحارثي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "محمد سعيد الحارثي",
        "parentPhone": "0501163364",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_141",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1166394989",
        "name": "أزد عبدالرحمن بن مقبول الزهراني",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "عبدالرحمن بن مقبول",
        "parentPhone": "0566166536",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1163679705",
        "name": "اسماعيل احمد اسماعيل خميسي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "احمد اسماعيل خميسي",
        "parentPhone": "0592352272",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1160885040",
        "name": "أصيل عائض احمد الشهري",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "عائض احمد الشهري",
        "parentPhone": "0556700326",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1165193911",
        "name": "أنس علي احمد الزهراني",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "علي احمد الزهراني",
        "parentPhone": "0551342039",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_145",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1160428197",
        "name": "بسام سعد عبدالله الشيباني",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "سعد عبدالله الشيباني",
        "parentPhone": "0559479015",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1164743856",
        "name": "ثامر وائل حسن الشريف",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "وائل حسن الشريف",
        "parentPhone": "0500151672",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1165225150",
        "name": "جواد ابراهيم احمد البيشي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "ابراهيم احمد البيشي",
        "parentPhone": "0503655299",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "4143876565",
        "name": "جواد عفيف توفيق مفتاح",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "عفيف توفيق مفتاح",
        "parentPhone": "0530814871",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1166535631",
        "name": "حسن احمد حسن ابوطالب",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "احمد حسن ابوطالب",
        "parentPhone": "0543363880",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_150",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "9322200174",
        "name": "حمد عبدالكريم هادي الاثلة",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "عبدالكريم هادي الاثلة",
        "parentPhone": "0509714436",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2353797810",
        "name": "راكان اسامه غانم النبيه",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "اسامه غانم النبيه",
        "parentPhone": "0507168245",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "9683745077",
        "name": "رعد عاصم يحيى محمد",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "عاصم يحيى محمد",
        "parentPhone": "0501477068",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1160986368",
        "name": "ريان فواز مشبب الاسمرى",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "فواز مشبب الاسمرى",
        "parentPhone": "0565606055",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1164303289",
        "name": "زياد احمد عيدان الزهراني",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "احمد عيدان الزهراني",
        "parentPhone": "0506674210",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "0160222770",
        "name": "سالم ابراهيم سالم برعود",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "ابراهيم سالم برعود",
        "parentPhone": "0530627335",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "9322200176",
        "name": "سالم هادي فنيس الاثلة",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "هادي فنيس الاثلة",
        "parentPhone": "0536951382",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1178704068",
        "name": "سلطان علي محمد كريري",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "علي محمد كريري",
        "parentPhone": "0547826717",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2368902355",
        "name": "صالح طارق صالح حيدره",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "طارق صالح حيدره",
        "parentPhone": "0500904030",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_159",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1175269107",
        "name": "عبدالرحمن محمد عبدالله القرني",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "محمد عبدالله القرني",
        "parentPhone": "0558555433",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "9322200175",
        "name": "عبدالله عبدالكريم هادي الاثله",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "عبدالكريم هادي الاثله",
        "parentPhone": "0509714436",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_161",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1158190916",
        "name": "عزام كمال عيسى اسماعيل",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "كمال عيسى اسماعيل",
        "parentPhone": "0534424080",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "4146838455",
        "name": "عصام محمد عبدالله الديلمي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "محمد عبدالله الديلمي",
        "parentPhone": "0501194176",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1163314956",
        "name": "علي تركي علي الشهري",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "تركي علي الشهري",
        "parentPhone": "0567760963",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "0040772681",
        "name": "عمار ياسر ثواب معبوج",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "ياسر ثواب معبوج",
        "parentPhone": "0557035742",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1164189944",
        "name": "فهد فراج منصور العمري",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "فراج منصور العمري",
        "parentPhone": "0552999065",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1163158957",
        "name": "محمد ماجد ابن محمد الثقفي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "ماجد ابن محمد",
        "parentPhone": "0555547824",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1168514865",
        "name": "محمد ناصر فالح العنزي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "ناصر فالح العنزي",
        "parentPhone": "0530846664",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1162860793",
        "name": "مشعل يوسف عبدالرحمن الغامدي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "يوسف عبدالرحمن الغامدي",
        "parentPhone": "0504386036",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_169",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1163609389",
        "name": "معاذ احمد ابن عايض الخواري",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "احمد ابن عايض",
        "parentPhone": "0533365443",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1163916941",
        "name": "معاذ احمد عبدالله القرني",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "احمد عبدالله القرني",
        "parentPhone": "0562083888",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "2362775500",
        "name": "منير ياسر منير الدامغلي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "ياسر منير الدامغلي",
        "parentPhone": "0509457200",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "2354366920",
        "name": "نايف خالد علي عزالدين",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "خالد علي عزالدين",
        "parentPhone": "0500557999",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "9322200580",
        "name": "هادي عبدالكريم هادي الاثلة",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "عبدالكريم هادي الاثلة",
        "parentPhone": "0509714436",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "0160484329",
        "name": "هيثم ابراهيم ناصر الهدار",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "ابراهيم ناصر الهدار",
        "parentPhone": "0557709005",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1166543122",
        "name": "احمد فايز سعيد العرياني",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "فايز سعيد العرياني",
        "parentPhone": "0507790917",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1164804443",
        "name": "اسامه عبدالله خماش الزهراني",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "عبدالله خماش الزهراني",
        "parentPhone": "0540443394",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1167148608",
        "name": "امجد بن حسن بن راجح العقيل الزبيدي",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "بن حسن بن",
        "parentPhone": "0559147406",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1166434074",
        "name": "انس علي عمر المعشي",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "علي عمر المعشي",
        "parentPhone": "0555580260",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "2413227063",
        "name": "ايوب مصعب مصطفى يوسف",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "مصعب مصطفى يوسف",
        "parentPhone": "0542752452",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1164385898",
        "name": "باسل حماد معوض الخواري",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "حماد معوض الخواري",
        "parentPhone": "0506814552",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1165445931",
        "name": "باسم عبدالله بن جبر الزهراني",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "عبدالله بن جبر",
        "parentPhone": "0556555671",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_182",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "2365156153",
        "name": "راشد عبدالله علي حويل",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "عبدالله علي حويل",
        "parentPhone": "0531020460",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1163825878",
        "name": "رياض محمد مصلح الخواري",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "محمد مصلح الخواري",
        "parentPhone": "0565841492",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_184",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "2354933786",
        "name": "زياد اسماعيل محمد شيبه",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "اسماعيل محمد شيبه",
        "parentPhone": "0535554214",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1162956153",
        "name": "سامر رامى علي الغامدى",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "رامى علي الغامدى",
        "parentPhone": "0548490130",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1165238732",
        "name": "سعود عبدالعزيز محمد الزهراني",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "عبدالعزيز محمد الزهراني",
        "parentPhone": "0563038440",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1191568847",
        "name": "سعيد حسين علي المهري",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "حسين علي المهري",
        "parentPhone": "0564606474",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1163229972",
        "name": "سعيد عجلان سعيد الشهري",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "عجلان سعيد الشهري",
        "parentPhone": "0555359425",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1160098362",
        "name": "صالح عائض ابن عبدالله الشمراني",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "عائض ابن عبدالله",
        "parentPhone": "0553701185",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1166454478",
        "name": "طلال محمد علي مدخلي",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "محمد علي مدخلي",
        "parentPhone": "0505593185",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1163798729",
        "name": "عبدالرحمن نايف حسن الزهراني",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "نايف حسن الزهراني",
        "parentPhone": "0552044322",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1165622497",
        "name": "عبدالعزيز عدنان جميل ورو",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "عدنان جميل ورو",
        "parentPhone": "0547070501",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1163819418",
        "name": "عبدالكريم سعيد علي الزهراني",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "سعيد علي الزهراني",
        "parentPhone": "0565339394",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1162881112",
        "name": "عبدالله سعيد عبدالرحمن العرياني",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "سعيد عبدالرحمن العرياني",
        "parentPhone": "0567128852",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1164751818",
        "name": "علي عبدالله علي الزبيدي",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "عبدالله علي الزبيدي",
        "parentPhone": "0535888892",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "2377839473",
        "name": "علي محمد علي غفر",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "محمد علي غفر",
        "parentPhone": "0532692444",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1166065332",
        "name": "فارس علي عبده حردي",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "علي عبده حردي",
        "parentPhone": "0554461948",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_198",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "2363233079",
        "name": "فيصل محمد رمضان احمدعلي",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "محمد رمضان احمدعلي",
        "parentPhone": "0506651371",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_199",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1219566484",
        "name": "ماجد سلطان عدلان الشمراني",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "سلطان عدلان الشمراني",
        "parentPhone": "0533131532",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1160830244",
        "name": "متعب عبدالله بن عامر العسيري",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "عبدالله بن عامر",
        "parentPhone": "0563468681",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1165942747",
        "name": "محمد بن يحي بن عبدالرحمن حلوي",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "بن يحي بن",
        "parentPhone": "0566227699",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1163189291",
        "name": "محمد عبدالعزيز علي الشيخي",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "عبدالعزيز علي الشيخي",
        "parentPhone": "0551090636",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_203",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1167510278",
        "name": "معاذ مسفر عويض الحربي",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "مسفر عويض الحربي",
        "parentPhone": "0594392212",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "2369315953",
        "name": "مؤيد حسن حميد الوصابي",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "حسن حميد الوصابي",
        "parentPhone": "0530351040",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1162648420",
        "name": "وسام حسين سالم آل قايد",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "حسين سالم آل",
        "parentPhone": "0532991209",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "4126254780",
        "name": "يوسف مجدي شوعي جبلي",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "مجدي شوعي جبلي",
        "parentPhone": "0556386207",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1164470153",
        "name": "ابراهيم عبدالعزيز ابن ابراهيم جعوني",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "عبدالعزيز ابن ابراهيم",
        "parentPhone": "0504379683",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1163829300",
        "name": "أحمد سعيد حسن عسيري",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "سعيد حسن عسيري",
        "parentPhone": "0562579029",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_209",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1165472216",
        "name": "احمد صالح علي الحارثي",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "صالح علي الحارثي",
        "parentPhone": "0503866361",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_210",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1165228402",
        "name": "اياد أحمد ابن عارف الزهراني",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "أحمد ابن عارف",
        "parentPhone": "0504320891",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1165650027",
        "name": "باسل عبدالرحمن عطيه الزهراني",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "عبدالرحمن عطيه الزهراني",
        "parentPhone": "0541295766",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1164572206",
        "name": "جاد محمد صفر العسيري",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "محمد صفر العسيري",
        "parentPhone": "0503158134",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1179964513",
        "name": "جياد محمد علي الزهراني",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "محمد علي الزهراني",
        "parentPhone": "0531564948",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1175515566",
        "name": "خالد ابراهيم عبدالله والبي",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "ابراهيم عبدالله والبي",
        "parentPhone": "0549913006",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_215",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1164676080",
        "name": "عبدالاله علي مساعد الشمراني",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "علي مساعد الشمراني",
        "parentPhone": "0505793820",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1167378965",
        "name": "عبدالرحيم سعيد بن جمعان الغامدي",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "سعيد بن جمعان",
        "parentPhone": "0552829656",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1220920761",
        "name": "عبدالله سلطان عدلان الشمراني",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "سلطان عدلان الشمراني",
        "parentPhone": "0533131532",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2355962263",
        "name": "عبدالله يحي احمد حسين",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "يحي احمد حسين",
        "parentPhone": "0531989708",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "2439327053",
        "name": "عدي ايمن عبدالله نسيم",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "ايمن عبدالله نسيم",
        "parentPhone": "0544370894",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1182441822",
        "name": "علي سعد علي القرني",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "سعد علي القرني",
        "parentPhone": "0555637349",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2357518691",
        "name": "عمار ياسر محمد المصباحي",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "ياسر محمد المصباحي",
        "parentPhone": "0566559660",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_222",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1179791049",
        "name": "عيسى يحي عيسى حقوي",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "يحي عيسى حقوي",
        "parentPhone": "0501302590",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_223",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1164574442",
        "name": "غانم محمد بن سعد القحطاني",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "محمد بن سعد",
        "parentPhone": "0507190955",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_224",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1172348391",
        "name": "غيث ماجد مسلم المالكي",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "ماجد مسلم المالكي",
        "parentPhone": "0553717757",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "2361999077",
        "name": "فارس ماجد عبدالله القادري",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "ماجد عبدالله القادري",
        "parentPhone": "0500440424",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "061188139",
        "name": "ماجد عبدالكريم احمد معلم",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "عبدالكريم احمد معلم",
        "parentPhone": "0502125925",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1166691335",
        "name": "ماجد محمد علي الشيخي",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "محمد علي الشيخي",
        "parentPhone": "0503565440",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "2368119042",
        "name": "محمد ابراهيم مهيوب سالم",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "ابراهيم مهيوب سالم",
        "parentPhone": "0504385185",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1161145030",
        "name": "محمد حمد احمد عبدلي",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "حمد احمد عبدلي",
        "parentPhone": "0555954737",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1167955390",
        "name": "محمد دعلوج محمد آل منيع",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "دعلوج محمد آل",
        "parentPhone": "0554848491",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "0160766511",
        "name": "محمد عدنان محمد الشيخ",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "عدنان محمد الشيخ",
        "parentPhone": "0501702527",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1170181984",
        "name": "محمد علي محمد الاحمري",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "علي محمد الاحمري",
        "parentPhone": "0558788323",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "2354016871",
        "name": "محمد عمر محمد القاسمي",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "عمر محمد القاسمي",
        "parentPhone": "0530409937",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2081282790",
        "name": "محمود احمد عدنان عرار",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "احمد عدنان عرار",
        "parentPhone": "0557948164",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "2366464366",
        "name": "معاذ علي عبده محمد",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "علي عبده محمد",
        "parentPhone": "0557211860",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1193727078",
        "name": "مؤيد علي حسين ادم",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "علي حسين ادم",
        "parentPhone": "0599011731",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1168814802",
        "name": "هاني اسماعيل صدقه بحه",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "اسماعيل صدقه بحه",
        "parentPhone": "0563155060",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_238",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "2360634956",
        "name": "يزن خالد عثمان عوله",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "خالد عثمان عوله",
        "parentPhone": "0546848832",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1168026787",
        "name": "يوسف هادي بن شامي المعشي",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "هادي بن شامي",
        "parentPhone": "0533561620",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1164917633",
        "name": "ابراهيم صالح سعيد الغامدي",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "صالح سعيد الغامدي",
        "parentPhone": "0563903286",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1165101773",
        "name": "أحمد محمد احمد العماري",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "محمد احمد العماري",
        "parentPhone": "0509596667",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1164628842",
        "name": "الوليد خالد احمد الزهراني",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "خالد احمد الزهراني",
        "parentPhone": "0535222043",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1166765576",
        "name": "أمير صالح احمد بايحيى",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "صالح احمد بايحيى",
        "parentPhone": "0545254386",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1165246776",
        "name": "أنس يحي موسى الفيفي",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "يحي موسى الفيفي",
        "parentPhone": "0557666394",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1165111285",
        "name": "بتال احمد سعيد الشهري",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "احمد سعيد الشهري",
        "parentPhone": "0558755546",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1166878304",
        "name": "بتال حسن خلف الغامدي",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "حسن خلف الغامدي",
        "parentPhone": "0535543356",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1165770254",
        "name": "حسن محمد حسن حقوى",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "محمد حسن حقوى",
        "parentPhone": "0534387489",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1165209170",
        "name": "خالد صالح ابن علي الغامدي",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "صالح ابن علي",
        "parentPhone": "0535309988",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "4135662825",
        "name": "خالد محمد حسن هجاري",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "محمد حسن هجاري",
        "parentPhone": "0502237122",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2362355352",
        "name": "راكان محمد علي الخولاني",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "محمد علي الخولاني",
        "parentPhone": "0509933128",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1167058377",
        "name": "رائد ذاكر محمد السيد",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "ذاكر محمد السيد",
        "parentPhone": "0500520418",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "4720865171",
        "name": "سيف سعيد احمد عطيف",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "سعيد احمد عطيف",
        "parentPhone": "0560233830",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1164483362",
        "name": "سيف صالح سعيد الزهراني",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "صالح سعيد الزهراني",
        "parentPhone": "0547460181",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1169871652",
        "name": "عامر متعب محمد الزهراني",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "متعب محمد الزهراني",
        "parentPhone": "0552729292",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1162994634",
        "name": "عبدالاله ابراهيم محمد الزهراني",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "ابراهيم محمد الزهراني",
        "parentPhone": "0508383828",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1165476498",
        "name": "عبدالرحمن احمد بركات العرياني",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "احمد بركات العرياني",
        "parentPhone": "0503203417",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1165469113",
        "name": "عبدالرحمن صالح على الزهراني",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "صالح على الزهراني",
        "parentPhone": "0503157399",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1183938040",
        "name": "عبدالرحمن محمد حسن العماري",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "محمد حسن العماري",
        "parentPhone": "0564996294",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1167309812",
        "name": "عبدالله رشاد مشني الشمراني",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "رشاد مشني الشمراني",
        "parentPhone": "0549586080",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "4124648330",
        "name": "فهد عبدالناصر محمد باعوضة",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "عبدالناصر محمد باعوضة",
        "parentPhone": "0558585826",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2356932141",
        "name": "قسوره يوسف سالم باكور",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "يوسف سالم باكور",
        "parentPhone": "0592293222",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "2407015839",
        "name": "محمود محمدشاكر فقير احمد",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "محمدشاكر فقير احمد",
        "parentPhone": "0551067740",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1180051706",
        "name": "مويد عوض علي القرني",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "عوض علي القرني",
        "parentPhone": "0544021351",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1166424141",
        "name": "وسام احمد سالم فاهمي",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "احمد سالم فاهمي",
        "parentPhone": "0540452343",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "0160773455",
        "name": "وسيم عبدالإله  الوصابي",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "عبدالإله الوصابي",
        "parentPhone": "0501330460",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "2395778166",
        "name": "وليد عبدالله داود حيدره",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "عبدالله داود حيدره",
        "parentPhone": "0565506045",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "4146338431",
        "name": "وليد محمد محمد الأهدل",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "محمد محمد الأهدل",
        "parentPhone": "0540708076",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1162607244",
        "name": "ياسر احمد محمد الشهري",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "احمد محمد الشهري",
        "parentPhone": "0552252096",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "4123575732",
        "name": "ياسر محمد القاضي وجيه",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "محمد القاضي وجيه",
        "parentPhone": "0541466310",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1169272810",
        "name": "يزن ابراهيم بن محمد الشهري",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "ابراهيم بن محمد",
        "parentPhone": "0504676406",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "4480735580",
        "name": "يزن ضيف احمد قملان",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "ضيف احمد قملان",
        "parentPhone": "0556338737",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1158791465",
        "name": "يزيد عايض هزاع العرياني",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "عايض هزاع العرياني",
        "parentPhone": "0505684016",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_273",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1163481185",
        "name": "يوسف أحمد يوسف المنتشري",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "أحمد يوسف المنتشري",
        "parentPhone": "0530707940",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1167178092",
        "name": "احمد رمضان بدوي الحربي",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "رمضان بدوي الحربي",
        "parentPhone": "0506434037",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1164095695",
        "name": "امجد صالح احمد الزهراني",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "صالح احمد الزهراني",
        "parentPhone": "0505624797",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "6055825205",
        "name": "ايمن معاذ علي حسن",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "معاذ علي حسن",
        "parentPhone": "0568508781",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1168641817",
        "name": "بتال قاسم امحمد طنبشي",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "قاسم امحمد طنبشي",
        "parentPhone": "0554333314",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "2348417573",
        "name": "خالد سمير محمد وجيه",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "سمير محمد وجيه",
        "parentPhone": "0592152776",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1163595471",
        "name": "راكان نادر عمر بالخيور",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "نادر عمر بالخيور",
        "parentPhone": "0540409509",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2352374843",
        "name": "ريان فيصل محمد القليصي",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "فيصل محمد القليصي",
        "parentPhone": "0500673036",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1162754129",
        "name": "سامر فهد محيميد البقمي",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "فهد محيميد البقمي",
        "parentPhone": "0509995998",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1163255316",
        "name": "سعود ماجد سالم المسعود",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "ماجد سالم المسعود",
        "parentPhone": "0551608623",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_283",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "4142655101",
        "name": "سلطان محمد عبدالله الموقري",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "محمد عبدالله الموقري",
        "parentPhone": "0508383828",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1165488378",
        "name": "سيف عيسى احمد الزهراني",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "عيسى احمد الزهراني",
        "parentPhone": "0506693839",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "0160781151",
        "name": "عبدالحكيم عبد الرقيب محمد علي",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "عبد الرقيب محمد",
        "parentPhone": "0500878681",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1165167063",
        "name": "عبدالرحمن محسن جابر القرني",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "محسن جابر القرني",
        "parentPhone": "0504662196",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2377195892",
        "name": "عبدالعزيز عبد الله محمد صالح",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "عبد الله محمد",
        "parentPhone": "0550650076",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "0160248631",
        "name": "عبدالعزيز ماجد نصر عبدالقوي",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "ماجد نصر عبدالقوي",
        "parentPhone": "0559751651",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "0160202136",
        "name": "عبدالله عمار صالح السميني",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "عمار صالح السميني",
        "parentPhone": "0507962361",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1166148658",
        "name": "عقاب عبدالله عبده القاسمي",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "عبدالله عبده القاسمي",
        "parentPhone": "0531067367",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_291",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1167083425",
        "name": "عقيل طلال عقيل حلوي",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "طلال عقيل حلوي",
        "parentPhone": "0537705504",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1165262161",
        "name": "علي خضير علي الزهراني",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "خضير علي الزهراني",
        "parentPhone": "0551581909",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1166624856",
        "name": "علي فايز بن غرم الله الغامدي",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "فايز بن غرم",
        "parentPhone": "0553798066",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_294",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1190948628",
        "name": "عمار محمد عبدالله العيسى",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "محمد عبدالله العيسى",
        "parentPhone": "0555488547",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1167196946",
        "name": "فايز حسن حسين مشني",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "حسن حسين مشني",
        "parentPhone": "0551355248",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1166032902",
        "name": "فيصل محسن عامر العماري",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "محسن عامر العماري",
        "parentPhone": "0557340908",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1166434702",
        "name": "محمد خالد محمد الغامدي",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "خالد محمد الغامدي",
        "parentPhone": "0567779968",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "0160234012",
        "name": "محمد ماجد محمد احمد",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "ماجد محمد احمد",
        "parentPhone": "0501846166",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_299",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1165964030",
        "name": "معاذ علي يحي حمدي",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "علي يحي حمدي",
        "parentPhone": "0556677040",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "6055827088",
        "name": "معتصم معاذ علي حسن",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "معاذ علي حسن",
        "parentPhone": "0568508781",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1163001082",
        "name": "مؤيد حسين محمد العمري",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "حسين محمد العمري",
        "parentPhone": "0555622445",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1166026490",
        "name": "مؤيد محمود يوسف مقبول",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "محمود يوسف مقبول",
        "parentPhone": "0501521055",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1167352978",
        "name": "نايف ابراهيم حسن مباركي",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "ابراهيم حسن مباركي",
        "parentPhone": "0542669429",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "9683737098",
        "name": "هشام سيف ناجي يحيى",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "سيف ناجي يحيى",
        "parentPhone": "0532192032",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_305",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1166787950",
        "name": "وسيم عبدالله عوض الزهراني",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "عبدالله عوض الزهراني",
        "parentPhone": "0530452075",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_306",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1167597796",
        "name": "يامن ابراهيم محمد السلمي",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "ابراهيم محمد السلمي",
        "parentPhone": "0508055654",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_307",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1163136052",
        "name": "يزيد عيد عبدالله السني",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "عيد عبدالله السني",
        "parentPhone": "0599570738",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1164694455",
        "name": "الوليد عبدالعزيز محمد الزهراني",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "عبدالعزيز محمد الزهراني",
        "parentPhone": "0554434076",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1165845809",
        "name": "أنس عبدالله يحي الزهراني",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "عبدالله يحي الزهراني",
        "parentPhone": "0501121844",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "2332420366",
        "name": "انس يوسف - أزعيط",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "يوسف - أزعيط",
        "parentPhone": "0501475664",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1166093177",
        "name": "اياد زين علي بداحي",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "زين علي بداحي",
        "parentPhone": "0565781174",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1163541327",
        "name": "تركي بندر موسي الزهراني",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "بندر موسي الزهراني",
        "parentPhone": "0509688045",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1170253981",
        "name": "حسام صالح فيصل الشهري",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "صالح فيصل الشهري",
        "parentPhone": "0531956600",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "14410120063",
        "name": "حسام محمد قائد لطف",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "محمد قائد لطف",
        "parentPhone": "0535048473",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1163642430",
        "name": "حسن محمد حسن اريفل",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "محمد حسن اريفل",
        "parentPhone": "0548626289",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1164879189",
        "name": "خالد يوسف محمد الزهراني",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "يوسف محمد الزهراني",
        "parentPhone": "0558520800",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1165168293",
        "name": "ريان عبدالله عوض الحربي",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "عبدالله عوض الحربي",
        "parentPhone": "0533153850",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "6073730563",
        "name": "عوض عبدالله عوض صالح",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "عبدالله عوض صالح",
        "parentPhone": "0533186294",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1167461688",
        "name": "فهد محسن بن مسفر الغامدي",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "محسن بن مسفر",
        "parentPhone": "0550457974",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_320",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1178694491",
        "name": "مازن عادل محمد المسعري",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "عادل محمد المسعري",
        "parentPhone": "0534157104",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "10150903",
        "name": "محسن عبدالله عوض صالح",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "عبدالله عوض صالح",
        "parentPhone": "0533186294",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_322",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "2380677027",
        "name": "محمد ادهم علي حامد",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "ادهم علي حامد",
        "parentPhone": "0569924780",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1179458821",
        "name": "محمد صالح محمد الشيخي",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "صالح محمد الشيخي",
        "parentPhone": "0544174300",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1164691030",
        "name": "محمد عبدالله ناصر الزبيدي",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "عبدالله ناصر الزبيدي",
        "parentPhone": "0505594376",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1164891705",
        "name": "مراد سهلان عبدالله الكثيري",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "سهلان عبدالله الكثيري",
        "parentPhone": "0507057355",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1166517639",
        "name": "مشاري سعد احمد الزهراني",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "سعد احمد الزهراني",
        "parentPhone": "0538333248",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1166490001",
        "name": "مهند رائد محمد البشايري",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "رائد محمد البشايري",
        "parentPhone": "0553355717",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1166389807",
        "name": "مهند محمد ابن سعيد الغامدي",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "محمد ابن سعيد",
        "parentPhone": "0553664511",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_329",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1163711409",
        "name": "ناصر منصور محمد الزهراني",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "منصور محمد الزهراني",
        "parentPhone": "0540040541",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1163664947",
        "name": "نايف علي محمد حدادي",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "علي محمد حدادي",
        "parentPhone": "0506695935",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1161232929",
        "name": "نواف احمد سعيد ابراهيم",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "احمد سعيد ابراهيم",
        "parentPhone": "0509738836",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1165349000",
        "name": "هاني احمد مشرف الغامدي",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "احمد مشرف الغامدي",
        "parentPhone": "0560802482",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_333",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1165245976",
        "name": "هتان سعود علي القرني",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "سعود علي القرني",
        "parentPhone": "0536618066",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1166776425",
        "name": "وسام علي حسين اليعقوبي",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "علي حسين اليعقوبي",
        "parentPhone": "0556536836",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "0160236725",
        "name": "ياسر عبدالسلام سيف غالب",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "عبدالسلام سيف غالب",
        "parentPhone": "0506454038",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1167731791",
        "name": "يزيد احمد بريك الرشيدي",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "احمد بريك الرشيدي",
        "parentPhone": "0545050255",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2329594044",
        "name": "يوسف خالد داود الخضمي",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "خالد داود الخضمي",
        "parentPhone": "0571618110",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1165571439",
        "name": "يوسف عوض احمد المقعدي",
        "grade": "الصف الثاني المتوسط - 10",
        "parentName": "عوض احمد المقعدي",
        "parentPhone": "0548147257",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_339",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "05226172",
        "name": "اسيد يونس جازم مقبل",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "يونس جازم مقبل",
        "parentPhone": "0537591841",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1162520041",
        "name": "أكرم عادل عبده حمزي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "عادل عبده حمزي",
        "parentPhone": "0502095631",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2340899612",
        "name": "البراء عبدالله صالح بفلح",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "عبدالله صالح بفلح",
        "parentPhone": "0509391776",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1156893289",
        "name": "تركي عبدالرحمن عوض القحطاني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "عبدالرحمن عوض القحطاني",
        "parentPhone": "0533555048",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1160516843",
        "name": "جاد موسى عبدالرحمن الشمراني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "موسى عبدالرحمن الشمراني",
        "parentPhone": "0503383890",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_344",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "2387520923",
        "name": "جمعان محمد احمد العولقي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "محمد احمد العولقي",
        "parentPhone": "0552812535",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1160516751",
        "name": "جياد موسى عبدالرحمن الشمراني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "موسى عبدالرحمن الشمراني",
        "parentPhone": "0503383890",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_346",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1161079080",
        "name": "حسن سعيد بن حسن الشمراني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "سعيد بن حسن",
        "parentPhone": "0500728688",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_347",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1165336999",
        "name": "خالد سلطان سالم الزهراني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "سلطان سالم الزهراني",
        "parentPhone": "0559819993",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_348",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1162837858",
        "name": "زياد ناصر منصور العلياني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "ناصر منصور العلياني",
        "parentPhone": "0543291230",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1181855758",
        "name": "شار ابراهيم شار الشمراني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "ابراهيم شار الشمراني",
        "parentPhone": "0504645186",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1160873376",
        "name": "عبدالعزيز محمد ناصر الحكمى",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "محمد ناصر الحكمى",
        "parentPhone": "0561975445",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_351",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1170645780",
        "name": "عبدالله عبدالعزيز عبدالله الزهراني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "عبدالعزيز عبدالله الزهراني",
        "parentPhone": "0559819993",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1159533767",
        "name": "عبدالله عبدالكريم عبدالله الحارثي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "عبدالكريم عبدالله الحارثي",
        "parentPhone": "0509910171",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_353",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1160253587",
        "name": "عبدالله وليد عبدالله الزهراني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "وليد عبدالله الزهراني",
        "parentPhone": "0553670062",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1162334062",
        "name": "علي بن تركي بن علي الزهراني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "بن تركي بن",
        "parentPhone": "0506560580",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1157512136",
        "name": "علي ماجد علي الشيخي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "ماجد علي الشيخي",
        "parentPhone": "0553362621",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1157619535",
        "name": "علي هادي علي الحارثي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "هادي علي الحارثي",
        "parentPhone": "0507088890",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1158814689",
        "name": "عمار عطيه حسن الزهراني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "عطيه حسن الزهراني",
        "parentPhone": "0551806849",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1160232458",
        "name": "محمد ابراهيم ابن محمد الشاردي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "ابراهيم ابن محمد",
        "parentPhone": "0535997896",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1161181043",
        "name": "محمد احمد محمد الغامدي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "احمد محمد الغامدي",
        "parentPhone": "0548777020",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1157999556",
        "name": "محمد حسن محمد المنتشري",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "حسن محمد المنتشري",
        "parentPhone": "0564275028",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "2352052878",
        "name": "محمد ضيف الله حسن جمال",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "ضيف الله حسن",
        "parentPhone": "0505421637",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1163698333",
        "name": "محمد عبدالله خضر الصبحي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "عبدالله خضر الصبحي",
        "parentPhone": "0503649729",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "2340509609",
        "name": "محمد عبدالله محمد فتوح",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "عبدالله محمد فتوح",
        "parentPhone": "0537330553",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1162820938",
        "name": "مؤيد احمد ابن علي الربعي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "احمد ابن علي",
        "parentPhone": "0500362480",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_365",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1158001287",
        "name": "نواف خالد سعد العتيبي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "خالد سعد العتيبي",
        "parentPhone": "0564939844",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1159031952",
        "name": "نواف رزق الله بن محمد العمري",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "رزق الله بن",
        "parentPhone": "0506369040",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_367",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1162771263",
        "name": "وليد خالد سعد العتيبي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "خالد سعد العتيبي",
        "parentPhone": "0564939844",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1159575818",
        "name": "يزن احمد علي الغامدي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "احمد علي الغامدي",
        "parentPhone": "0538597066",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "2042024264",
        "name": "اكرم محمد شوقي احمد",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "محمد شوقي احمد",
        "parentPhone": "0559962933",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "4133287559",
        "name": "انس علي حسن علي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "علي حسن علي",
        "parentPhone": "0543841552",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1157661255",
        "name": "أنس محمد خميس الزهراني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "محمد خميس الزهراني",
        "parentPhone": "0546404008",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1159093713",
        "name": "اياد جابر سليم القرني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "جابر سليم القرني",
        "parentPhone": "0552210076",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1159601283",
        "name": "اياد حسين مطاعن البيشي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "حسين مطاعن البيشي",
        "parentPhone": "0502686934",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1152666911",
        "name": "باسل ابراهيم علي الشهري",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "ابراهيم علي الشهري",
        "parentPhone": "0554556708",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1163222662",
        "name": "باسل عبدالكريم عبدالرزاق الزهراني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "عبدالكريم عبدالرزاق الزهراني",
        "parentPhone": "0591663316",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1162139909",
        "name": "تركي هاني يحي حمدي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "هاني يحي حمدي",
        "parentPhone": "0561515471",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1162490179",
        "name": "جابر زكي جابر بلال",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "زكي جابر بلال",
        "parentPhone": "0553665524",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1160927701",
        "name": "حسام عصام مشني الغامدي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "عصام مشني الغامدي",
        "parentPhone": "0557721922",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1178867709",
        "name": "حسين علي محمد كريري",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "علي محمد كريري",
        "parentPhone": "0547826717",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "4123587307",
        "name": "حمزة محمد القاضي وجيه",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "محمد القاضي وجيه",
        "parentPhone": "0541466310",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "2409175128",
        "name": "حمزة محمد حمزه مغبش",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "محمد حمزه مغبش",
        "parentPhone": "0546960709",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_382",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1161000607",
        "name": "خالد ياسر عبدالله عبادي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "ياسر عبدالله عبادي",
        "parentPhone": "0530030223",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1166156610",
        "name": "راكان فايز على العتيبي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "فايز على العتيبي",
        "parentPhone": "0505629518",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2373958467",
        "name": "رائف عبدالرحمن سليمان جنيد",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "عبدالرحمن سليمان جنيد",
        "parentPhone": "0568581671",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1161244791",
        "name": "سالم احمد سالم القرني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "احمد سالم القرني",
        "parentPhone": "0593745331",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1160195879",
        "name": "سعيد سالم احمد الزهراني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "سالم احمد الزهراني",
        "parentPhone": "0500668355",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1160148977",
        "name": "سعيد مطير سعيد المهداوى",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "مطير سعيد المهداوى",
        "parentPhone": "0547813242",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_388",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1157356922",
        "name": "سلطان سعد بن مقباس الزهراني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "سعد بن مقباس",
        "parentPhone": "0505775636",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "2316823505",
        "name": "سليمان احمد سليمان جنيد",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "احمد سليمان جنيد",
        "parentPhone": "0550001902",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1179702319",
        "name": "طارق زياد عاتق العتيبي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "زياد عاتق العتيبي",
        "parentPhone": "0532228511",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "2329020354",
        "name": "فهد عبدالرحمن محمد فارس",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "عبدالرحمن محمد فارس",
        "parentPhone": "0551757861",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1162673535",
        "name": "ماهر عبدالله محمد الزهراني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "عبدالله محمد الزهراني",
        "parentPhone": "0506161051",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1158618551",
        "name": "مشعل محمد مسلم الرحيلى",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "محمد مسلم الرحيلى",
        "parentPhone": "0503388113",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1161296049",
        "name": "نايف عبدالله جمعه الرفاعي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "عبدالله جمعه الرفاعي",
        "parentPhone": "0594881490",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1186848683",
        "name": "نايف عجلان بن عريفج الجحدلى",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "عجلان بن عريفج",
        "parentPhone": "0509101811",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1153295421",
        "name": "نواف سعد بن مقباس الزهراني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "سعد بن مقباس",
        "parentPhone": "0505775636",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1162417677",
        "name": "هتان عوض بن مهدي القرني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "عوض بن مهدي",
        "parentPhone": "0505756748",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_398",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "4133383531",
        "name": "يونس علي حسن علي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "علي حسن علي",
        "parentPhone": "0543841552",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1163154154",
        "name": "ابراهيم ناصر حسين عدوان",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "ناصر حسين عدوان",
        "parentPhone": "0550740775",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1160551675",
        "name": "احمد علي راس الزهراني",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "علي راس الزهراني",
        "parentPhone": "0555063609",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2439002789",
        "name": "أحمد عوض احمد ناصر",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "عوض احمد ناصر",
        "parentPhone": "0563628280",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1186902969",
        "name": "احمد فيصل احمد الشيخي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "فيصل احمد الشيخي",
        "parentPhone": "0561252839",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1160513931",
        "name": "أحمد محمد احمد السهيمي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "محمد احمد السهيمي",
        "parentPhone": "0554851087",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1160371207",
        "name": "اصيل ظافر علي الشهري",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "ظافر علي الشهري",
        "parentPhone": "0592777909",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1162045528",
        "name": "أنس طراد ابن سعيد الأسمري",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "طراد ابن سعيد",
        "parentPhone": "0553057040",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1178937684",
        "name": "بتال فيصل حسين القرشي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "فيصل حسين القرشي",
        "parentPhone": "0557173003",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1162739658",
        "name": "بدر محمد حامد الزبيدى",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "محمد حامد الزبيدى",
        "parentPhone": "0536368367",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "0086029",
        "name": "خالد خالد محمد علي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "خالد محمد علي",
        "parentPhone": "0543436779",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1155913302",
        "name": "رائد ماجد علي سلامي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "ماجد علي سلامي",
        "parentPhone": "0557565576",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1162340275",
        "name": "سالم فهد سالم الزهراني",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "فهد سالم الزهراني",
        "parentPhone": "0509896015",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1161160260",
        "name": "سعود احمد سعيد الشهري",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "احمد سعيد الشهري",
        "parentPhone": "0501040437",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1163815283",
        "name": "سعيد سعد سعيد الشمراني",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "سعد سعيد الشمراني",
        "parentPhone": "0564499405",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1160627566",
        "name": "سلطان محمد ابراهيم الزبيدي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "محمد ابراهيم الزبيدي",
        "parentPhone": "0501555029",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1161018088",
        "name": "سليمان احمد محمد حكمي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "احمد محمد حكمي",
        "parentPhone": "0560622860",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1158693034",
        "name": "سيف سلطان موسى الكثيري",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "سلطان موسى الكثيري",
        "parentPhone": "0555774824",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1161317381",
        "name": "عبدالاله محمد عويد الجهنى",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "محمد عويد الجهنى",
        "parentPhone": "0553366690",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "2580044259",
        "name": "عبدالرحمن باسم اسماعيل سعيد",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "باسم اسماعيل سعيد",
        "parentPhone": "0505678428",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1159682291",
        "name": "عبدالله متعب عبدالله العبدلي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "متعب عبدالله العبدلي",
        "parentPhone": "0544020055",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2331566246",
        "name": "عبدالملك حمود احمد الاحمدي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "حمود احمد الاحمدي",
        "parentPhone": "0506217451",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_420",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1160766158",
        "name": "عمار عبدالهادي مقبول الحارثي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "عبدالهادي مقبول الحارثي",
        "parentPhone": "0566018878",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1163491333",
        "name": "فهد محمد حسين حدادي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "محمد حسين حدادي",
        "parentPhone": "0569571404",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1158932176",
        "name": "فيصل محمد غرم الله السهيمي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "محمد غرم الله",
        "parentPhone": "0555635477",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1161554744",
        "name": "محمد باسم علي مدخلي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "باسم علي مدخلي",
        "parentPhone": "0563031418",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1162441347",
        "name": "محمد بشير محمد الصلبي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "بشير محمد الصلبي",
        "parentPhone": "0506110536",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "0160495704",
        "name": "محمد سمران عبدالرحمن محمد",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "سمران عبدالرحمن محمد",
        "parentPhone": "0541737223",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_426",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1161037153",
        "name": "نايف احمد عبده العبدلي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "احمد عبده العبدلي",
        "parentPhone": "0567955731",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_427",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1160197883",
        "name": "نواف عبدالله ابن علي الغامدي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "عبدالله ابن علي",
        "parentPhone": "0509176196",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1166043479",
        "name": "يامن محمد سعيد الشهري",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "محمد سعيد الشهري",
        "parentPhone": "0553521358",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1160479679",
        "name": "ابراهيم غرم الله علي الزهراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "غرم الله علي",
        "parentPhone": "0531019019",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1162982894",
        "name": "احمد صالح مدهش الرزقي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "صالح مدهش الرزقي",
        "parentPhone": "0533302918",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1161889181",
        "name": "الياس عبدالله عطيه الزهراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "عبدالله عطيه الزهراني",
        "parentPhone": "0553482663",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1160332126",
        "name": "اياد احمد مريزيق الصبحي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "احمد مريزيق الصبحي",
        "parentPhone": "0532410650",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1163623828",
        "name": "اياد محمد حسن الزهراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "محمد حسن الزهراني",
        "parentPhone": "0555256518",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1167845740",
        "name": "بتال بندر محمد الزهراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "بندر محمد الزهراني",
        "parentPhone": "0553003669",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1162686909",
        "name": "بتال سعد محمد العماري",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "سعد محمد العماري",
        "parentPhone": "0506736386",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1158608008",
        "name": "بتال مصطفى زاهر الزبيدي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "مصطفى زاهر الزبيدي",
        "parentPhone": "0553666150",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1159271350",
        "name": "بتال ممدوح دخيل الله الحارثي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "ممدوح دخيل الله",
        "parentPhone": "0504863122",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1160379887",
        "name": "جهاد ياسر عطيه الزهراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "ياسر عطيه الزهراني",
        "parentPhone": "0555126088",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1162262412",
        "name": "جواد عبدالله أحمد الزهراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "عبدالله أحمد الزهراني",
        "parentPhone": "0500408822",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1159162914",
        "name": "حسان سفر حسن المالكي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "سفر حسن المالكي",
        "parentPhone": "0500001189",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1158448769",
        "name": "حسن سالم بن حفيظ المنهالي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "سالم بن حفيظ",
        "parentPhone": "0530190153",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1159590783",
        "name": "رائد سليمان جودالله القوزي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "سليمان جودالله القوزي",
        "parentPhone": "0504225207",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1172582130",
        "name": "ريان عطيه احمد الزهراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "عطيه احمد الزهراني",
        "parentPhone": "0535019879",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1161520224",
        "name": "ريان هادي سعيد الجهني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "هادي سعيد الجهني",
        "parentPhone": "0505946962",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1162792251",
        "name": "سعيد سعد بن محمد الشمراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "سعد بن محمد",
        "parentPhone": "0509252613",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1183832680",
        "name": "سلطان ناصر جابر واصلي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "ناصر جابر واصلي",
        "parentPhone": "0541541975",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1160735963",
        "name": "سلمان حامد نافع السهلي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "حامد نافع السهلي",
        "parentPhone": "0509515554",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1162628927",
        "name": "عبدالله موسى عبدالله الزهراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "موسى عبدالله الزهراني",
        "parentPhone": "0504419622",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1161929656",
        "name": "علي سليمان بن يحي السميري",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "سليمان بن يحي",
        "parentPhone": "0544202451",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_450",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1162720484",
        "name": "عمر محمد عبدالله العمري",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "محمد عبدالله العمري",
        "parentPhone": "0551658778",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1161089733",
        "name": "فراس ياسر مطلق الزهراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "ياسر مطلق الزهراني",
        "parentPhone": "0547042476",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "2328806225",
        "name": "فهد سليمان فتيني البارودي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "سليمان فتيني البارودي",
        "parentPhone": "0509666112",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1162332264",
        "name": "فيصل محمد عبدالله عون",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "محمد عبدالله عون",
        "parentPhone": "0504326462",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1162262263",
        "name": "مالك عبدالله أحمد الزهراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "عبدالله أحمد الزهراني",
        "parentPhone": "0500408822",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_455",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1158995884",
        "name": "هيثم محمد عبدالله الشهري",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "محمد عبدالله الشهري",
        "parentPhone": "0530447539",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "9683747955",
        "name": "وسيم محمد سعيد قائد",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "محمد سعيد قائد",
        "parentPhone": "0558079806",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1163073693",
        "name": "يحيى احمد يحي الزهراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "احمد يحي الزهراني",
        "parentPhone": "0500363086",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_458",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1161329832",
        "name": "يوسف عامر بن مبخوت الصيعري",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "عامر بن مبخوت",
        "parentPhone": "0533633247",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_459",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1161617806",
        "name": "يوسف عبدالله عايض الشمراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "عبدالله عايض الشمراني",
        "parentPhone": "0555744338",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1163065400",
        "name": "اياد علي بن مطير الزهراني",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "علي بن مطير",
        "parentPhone": "0500880833",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1159276698",
        "name": "ايمن يوسف علي حمدي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "يوسف علي حمدي",
        "parentPhone": "0558061477",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1160456610",
        "name": "بتال حسن محمد المالكي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "حسن محمد المالكي",
        "parentPhone": "0557700681",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1160470686",
        "name": "بدر حسن بن عبدالله المالكى",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "حسن بن عبدالله",
        "parentPhone": "0531378764",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1162098071",
        "name": "بلقاسم ردعان بلقاسم القرني",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "ردعان بلقاسم القرني",
        "parentPhone": "0554174406",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_465",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1161990211",
        "name": "جسار سعيد عبدالله الشمراني",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "سعيد عبدالله الشمراني",
        "parentPhone": "0564492960",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1163071127",
        "name": "حسام احمد بن محمد آل فايع",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "احمد بن محمد",
        "parentPhone": "0564440304",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1161135957",
        "name": "حسام بن علي بن حسن الزهراني",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "بن علي بن",
        "parentPhone": "0507794175",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "21605113761",
        "name": "ديار طلال محمد البعداني",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "طلال محمد البعداني",
        "parentPhone": "0502545428",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "9683729467",
        "name": "طلال محفوظ علي عبدالجليل",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "محفوظ علي عبدالجليل",
        "parentPhone": "0549281896",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_470",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "409703133",
        "name": "عبدالعزيز عادل محمد عبدالله",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "عادل محمد عبدالله",
        "parentPhone": "0563400887",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1161667736",
        "name": "عبدالعزيز محمد حامد الحربي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "محمد حامد الحربي",
        "parentPhone": "0540043341",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1169046917",
        "name": "عبدالمجيد يحي سعيد الزهراني",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "يحي سعيد الزهراني",
        "parentPhone": "0554686455",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1161330889",
        "name": "عزام عبدالرحمن موسي الزهراني",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "عبدالرحمن موسي الزهراني",
        "parentPhone": "0531010931",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1159664042",
        "name": "علي عبده علي ابوالغره",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "عبده علي ابوالغره",
        "parentPhone": "0500303031",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1162597312",
        "name": "علي فواز علي خرمي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "فواز علي خرمي",
        "parentPhone": "0531523689",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1162239469",
        "name": "فارس محمد بن عبدالرحمن الشمراني",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "محمد بن عبدالرحمن",
        "parentPhone": "0505983583",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1163869041",
        "name": "فراس احمد مهدي القرني",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "احمد مهدي القرني",
        "parentPhone": "0508730786",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1154847055",
        "name": "فراس عمر أحمد العيسي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "عمر أحمد العيسي",
        "parentPhone": "0555779161",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1161459555",
        "name": "ماجد النشمي الشمري البلادي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "النشمي الشمري البلادي",
        "parentPhone": "0501363563",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_480",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1160809941",
        "name": "محمد ابراهيم محمد عسيري",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "ابراهيم محمد عسيري",
        "parentPhone": "0506756311",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1162691362",
        "name": "محمد رامي محمد الغامدي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "رامي محمد الغامدي",
        "parentPhone": "0530377716",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2335781882",
        "name": "محمد سالم محمد باحميش",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "سالم محمد باحميش",
        "parentPhone": "0506644210",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1164914887",
        "name": "محمد صالح سعيد الغامدي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "صالح سعيد الغامدي",
        "parentPhone": "0563903286",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_484",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1161400633",
        "name": "محمد عويضه محمد العرياني",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "عويضه محمد العرياني",
        "parentPhone": "0533555096",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "2336110263",
        "name": "محمود محمد محمود مقبل",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "محمد محمود مقبل",
        "parentPhone": "0593351214",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_486",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1161301369",
        "name": "مشاري باسل عطيه الزهراني",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "باسل عطيه الزهراني",
        "parentPhone": "0555584469",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1171065541",
        "name": "معتز محمد جبران شهوان",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "محمد جبران شهوان",
        "parentPhone": "0546744430",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1162499394",
        "name": "مهدي علي مهدي القرني",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "علي مهدي القرني",
        "parentPhone": "0507668259",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1162881831",
        "name": "هاشم حسن عبدالكريم المجايشي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "حسن عبدالكريم المجايشي",
        "parentPhone": "0537843872",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1159714672",
        "name": "هتان بن حسن بن راجح العقيل الزبيدي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "بن حسن بن",
        "parentPhone": "0559147406",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1157591239",
        "name": "يزيد احمد محمد الغامدي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "احمد محمد الغامدي",
        "parentPhone": "0555622440",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1161951833",
        "name": "أحمد سلطان مرزوق العتيبي",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "سلطان مرزوق العتيبي",
        "parentPhone": "0555788277",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "0160505266",
        "name": "اركان احمد عبدالكريم مصلح",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "احمد عبدالكريم مصلح",
        "parentPhone": "0561478964",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "0160492336",
        "name": "الياس احمد احمد شامي",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "احمد احمد شامي",
        "parentPhone": "0506022641",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1162411506",
        "name": "أنس محمد سمحان الشهري",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "محمد سمحان الشهري",
        "parentPhone": "0504660755",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "2370690329",
        "name": "انس نادر شاه سيد سيد احمد",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "نادر شاه سيد",
        "parentPhone": "0509773469",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_497",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1159809217",
        "name": "اويس يحي موسى الفيفي",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "يحي موسى الفيفي",
        "parentPhone": "0557666394",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_498",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1162202681",
        "name": "باسم احمد سمحان الشهري",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "احمد سمحان الشهري",
        "parentPhone": "0555868477",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1158766152",
        "name": "بندر بدر مطلق العتيبي",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "بدر مطلق العتيبي",
        "parentPhone": "0509058772",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1166622025",
        "name": "بندر ماجد سفر الحارثي",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "ماجد سفر الحارثي",
        "parentPhone": "0508383828",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1169557368",
        "name": "تركي ماجد ضاوي القثامي",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "ماجد ضاوي القثامي",
        "parentPhone": "0555592347",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1162548166",
        "name": "تميم منصور مسفر الشمراني",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "منصور مسفر الشمراني",
        "parentPhone": "0545707095",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1159975729",
        "name": "راكان عبدالله عطيه الزهراني",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "عبدالله عطيه الزهراني",
        "parentPhone": "0563080307",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1162713208",
        "name": "زياد أسامه عبدالرزاق الزهراني",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "أسامه عبدالرزاق الزهراني",
        "parentPhone": "0569244839",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1160618029",
        "name": "سعيد عبدالمجيد سعيد زهراني",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "عبدالمجيد سعيد زهراني",
        "parentPhone": "0566600947",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_506",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "4126756875",
        "name": "صبري محمد متوكل بحاري",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "محمد متوكل بحاري",
        "parentPhone": "0571579420",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2449070214",
        "name": "ضيف الله احمد حسن جمال",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "الله احمد حسن",
        "parentPhone": "0553098554",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2337766345",
        "name": "عبدالرحمن احمد شوعي علي",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "احمد شوعي علي",
        "parentPhone": "0503595530",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1163049404",
        "name": "عبدالرحمن سعيد عطيه الزهراني",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "سعيد عطيه الزهراني",
        "parentPhone": "0553377994",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1159150620",
        "name": "عبدالعزيز مهدى يحي حمدي",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "مهدى يحي حمدي",
        "parentPhone": "0504606113",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1162505000",
        "name": "عبدالله فهد بن محمد الغامدي",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "فهد بن محمد",
        "parentPhone": "0500445262",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1165084235",
        "name": "عصام مساعد بن احمد شاعري",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "مساعد بن احمد",
        "parentPhone": "0559281396",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2340213210",
        "name": "محسن هاشم علي العطاس",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "هاشم علي العطاس",
        "parentPhone": "0558431408",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "2346320761",
        "name": "محمد خالد فريد العولقي",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "خالد فريد العولقي",
        "parentPhone": "0503600641",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "2402878231",
        "name": "محمد ياسر عثمان عرفات",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "ياسر عثمان عرفات",
        "parentPhone": "0509852975",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1162066250",
        "name": "مشاري عبدالرحمن حسين الزهراني",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "عبدالرحمن حسين الزهراني",
        "parentPhone": "0534639953",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_517",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1160859144",
        "name": "مهند خالد بن عائض الغامدي",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "خالد بن عائض",
        "parentPhone": "0599547761",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1161673122",
        "name": "مؤيد ممدوح عويض الحارثي",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "ممدوح عويض الحارثي",
        "parentPhone": "0560570226",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_519",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1162576480",
        "name": "وليد عبدالله حسن كويع",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "عبدالله حسن كويع",
        "parentPhone": "0537392956",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1160533582",
        "name": "ياسر عوض عايض القحطاني",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "عوض عايض القحطاني",
        "parentPhone": "0506212555",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1160872907",
        "name": "يوسف عبدالرحمن يوسف المنتشري",
        "grade": "الصف الثاني المتوسط - 6",
        "parentName": "عبدالرحمن يوسف المنتشري",
        "parentPhone": "0545800081",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1212070773",
        "name": "انياس علي محمد كريري",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "علي محمد كريري",
        "parentPhone": "0551997726",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1159430881",
        "name": "باسل وليد يوسف الزهراني",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "وليد يوسف الزهراني",
        "parentPhone": "0542250160",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1159902749",
        "name": "جواد طه محمد الشيخي",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "طه محمد الشيخي",
        "parentPhone": "0561666129",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "4810814774",
        "name": "حاشد بكيل  الموس",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "بكيل الموس",
        "parentPhone": "0506592756",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1158796589",
        "name": "حمد علي محمد العماري",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "علي محمد العماري",
        "parentPhone": "0503088102",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_527",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1158791739",
        "name": "زياد سعد عبدالرحمن الشمراني",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "سعد عبدالرحمن الشمراني",
        "parentPhone": "0532696192",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1160519391",
        "name": "سعود يوسف سعود اليحيوي",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "يوسف سعود اليحيوي",
        "parentPhone": "0504534414",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1163173121",
        "name": "ضاري سامي علي الصبياني",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "سامي علي الصبياني",
        "parentPhone": "0560577179",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_530",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "2330964970",
        "name": "ضيف الله وهيب احمد العديني",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "الله وهيب احمد",
        "parentPhone": "0507016852",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_531",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1161461429",
        "name": "عبدالعزيز خالد محمد شوك",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "خالد محمد شوك",
        "parentPhone": "0506683133",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1161461346",
        "name": "عبدالله خالد محمد شوك",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "خالد محمد شوك",
        "parentPhone": "0506683133",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1158408763",
        "name": "عزام عبدالله عطيه الزنبقي",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "عبدالله عطيه الزنبقي",
        "parentPhone": "0507372801",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_534",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1159883022",
        "name": "علي صالح علي الشمراني",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "صالح علي الشمراني",
        "parentPhone": "0545533533",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_535",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1161261126",
        "name": "علي عبدالله علي الكثيري",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "عبدالله علي الكثيري",
        "parentPhone": "0553377182",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_536",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1158902567",
        "name": "علي غازي علي مجرشي",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "غازي علي مجرشي",
        "parentPhone": "0552177367",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1170389090",
        "name": "غسان محمد علي الغامدي",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "محمد علي الغامدي",
        "parentPhone": "0509615711",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_538",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1160472104",
        "name": "فراس محمد يحي شويع",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "محمد يحي شويع",
        "parentPhone": "0533955774",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_539",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1159699717",
        "name": "فيصل اسماعيل بن سالم الغامدي",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "اسماعيل بن سالم",
        "parentPhone": "0556687850",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_540",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1182206944",
        "name": "فيصل محمد فاران الزهراني",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "محمد فاران الزهراني",
        "parentPhone": "0553316561",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2340245469",
        "name": "قصي نبيل محمد المصباحي",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "نبيل محمد المصباحي",
        "parentPhone": "0569998895",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1159344074",
        "name": "محمد حمود صالح العمري",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "حمود صالح العمري",
        "parentPhone": "0569339777",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1160076046",
        "name": "محمد عائض سعيد القرني",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "عائض سعيد القرني",
        "parentPhone": "0537232777",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1162830663",
        "name": "محمد عبدالله علي الصاعدي",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "عبدالله علي الصاعدي",
        "parentPhone": "0567427608",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_545",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1158220457",
        "name": "محمد عبدالله قليل القرني",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "عبدالله قليل القرني",
        "parentPhone": "0598979745",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1161183049",
        "name": "محمد فهد احمد الشهري",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "فهد احمد الشهري",
        "parentPhone": "0594204743",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1160805238",
        "name": "محمد ماجد محمد العمري",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "ماجد محمد العمري",
        "parentPhone": "0536668657",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2411389980",
        "name": "محمد ناجي محمد المجنحي",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "ناجي محمد المجنحي",
        "parentPhone": "0552993580",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1163534520",
        "name": "معن حسن حواش الحربي",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "حسن حواش الحربي",
        "parentPhone": "0507111811",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1159542818",
        "name": "مهاب ابراهيم بن علي البارقى",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "ابراهيم بن علي",
        "parentPhone": "0534301458",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1162659179",
        "name": "هاني مستور سعد الذويبي",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "مستور سعد الذويبي",
        "parentPhone": "0546780090",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_552",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1161461312",
        "name": "ياسر خالد محمد شوك",
        "grade": "الصف الثاني المتوسط - 7",
        "parentName": "خالد محمد شوك",
        "parentPhone": "0506683133",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "9683737458",
        "name": "احمد عبدالله احمد حسن",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "عبدالله احمد حسن",
        "parentPhone": "0501247183",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2327818429",
        "name": "احمد عمر احمد رحبان",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "عمر احمد رحبان",
        "parentPhone": "0507330216",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1171869884",
        "name": "احمد فهد علي الغامدي",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "فهد علي الغامدي",
        "parentPhone": "0509800138",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_556",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1159096989",
        "name": "اسامه ابراهيم عثمان القاشي",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "ابراهيم عثمان القاشي",
        "parentPhone": "0595955582",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1159404605",
        "name": "أنس محمد بن بلغيث المغربي",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "محمد بن بلغيث",
        "parentPhone": "0554478842",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_558",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1159239985",
        "name": "جابر سالم ابن صالح الشمراني",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "سالم ابن صالح",
        "parentPhone": "0503334939",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1175676368",
        "name": "رائد عوض الحاج الهتاني",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "عوض الحاج الهتاني",
        "parentPhone": "0531567963",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "4124681638",
        "name": "ريان قاسم حسن حميضه",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "قاسم حسن حميضه",
        "parentPhone": "0509333256",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_561",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1162755894",
        "name": "زياد ماجد علي سلامي",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "ماجد علي سلامي",
        "parentPhone": "0557565576",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "2326731565",
        "name": "ضيف الله صالح يوسف حله",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "الله صالح يوسف",
        "parentPhone": "0507784736",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1159182730",
        "name": "عبدالرحمن محمد راجح السميرى",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "محمد راجح السميرى",
        "parentPhone": "0551004430",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1159372935",
        "name": "عبدالله مسفر ابن محمد الزهراني",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "مسفر ابن محمد",
        "parentPhone": "0554763433",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "4143860445",
        "name": "عثمان احمد حميد عثمان",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "احمد حميد عثمان",
        "parentPhone": "0593169535",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1159690526",
        "name": "عزام عبدالله علي الشمراني",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "عبدالله علي الشمراني",
        "parentPhone": "0555599386",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1162947236",
        "name": "علي حسن محمد حكمي",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "حسن محمد حكمي",
        "parentPhone": "0554616401",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "4144844737",
        "name": "عيسى عصام عيسى عبدالله",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "عصام عيسى عبدالله",
        "parentPhone": "0532693334",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1160545636",
        "name": "فراس عباس يحي العزيزي",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "عباس يحي العزيزي",
        "parentPhone": "0567360895",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "0160495699",
        "name": "فراس عماد عبدالرحيم أحمد",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "عماد عبدالرحيم أحمد",
        "parentPhone": "0576808860",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1157843390",
        "name": "محمد احمد بن محمد صمان",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "احمد بن محمد",
        "parentPhone": "0581009192",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "0160486140",
        "name": "محمد عبدالرقيب طاهر قائد",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "عبدالرقيب طاهر قائد",
        "parentPhone": "0534950966",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1158660223",
        "name": "محمد علي محمد حدادي",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "علي محمد حدادي",
        "parentPhone": "0503693268",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1159996196",
        "name": "محمد فهد محمد سهلي",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "فهد محمد سهلي",
        "parentPhone": "0544549878",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "0160231002",
        "name": "محمد فواز محمد العزي",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "فواز محمد العزي",
        "parentPhone": "0545848869",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1173949932",
        "name": "محمد ناصر شوعى كليبى",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "ناصر شوعى كليبى",
        "parentPhone": "0569125350",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "9683617983-1",
        "name": "مكي طلال احمد مقبل",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "طلال احمد مقبل",
        "parentPhone": "0538959830",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1163864554",
        "name": "نديم عبدالقادر ابن عبيد العتيبي",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "عبدالقادر ابن عبيد",
        "parentPhone": "0555646706",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1159034857",
        "name": "هاني حسن احمد باجعفر",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "حسن احمد باجعفر",
        "parentPhone": "0557666853",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1161112824",
        "name": "وليد عبدالله احمد الزهراني",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "عبدالله احمد الزهراني",
        "parentPhone": "0507061878",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2345596569",
        "name": "يحي محمد يحي             عمر",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "محمد يحي عمر",
        "parentPhone": "0544133184",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1168541579",
        "name": "يزن محمد بن حسين محمد",
        "grade": "الصف الثاني المتوسط - 8",
        "parentName": "محمد بن حسين",
        "parentPhone": "0547362026",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1158704401",
        "name": "ابراهيم محمد عوض آل شيبان",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "محمد عوض آل",
        "parentPhone": "0553300305",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1161889157",
        "name": "احمد عائض احمد الكثيري",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "عائض احمد الكثيري",
        "parentPhone": "0546051011",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1161698095",
        "name": "اياد متعب ستر الله الثبيتي",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "متعب ستر الله",
        "parentPhone": "0553654492",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1165448380",
        "name": "تركي عبدالله محمد الغامدي",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "عبدالله محمد الغامدي",
        "parentPhone": "0550078899",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "0160218240",
        "name": "زبروق سعيد زبروق بخيت",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "سعيد زبروق بخيت",
        "parentPhone": "0553375238",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1159138559",
        "name": "سلمان عبدالله بن يوسف المالكي",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "عبدالله بن يوسف",
        "parentPhone": "0547879017",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2383889686",
        "name": "صديق مصعب صديق زروق",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "مصعب صديق زروق",
        "parentPhone": "0532257408",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_590",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1160409197",
        "name": "طلال بندر علي مدخلي",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "بندر علي مدخلي",
        "parentPhone": "0540242020",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1162062549",
        "name": "عاصم محمد بن عامر الحفظي",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "محمد بن عامر",
        "parentPhone": "0590804451",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1167273208",
        "name": "عصام عبدالله بن صالح القرني",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "عبدالله بن صالح",
        "parentPhone": "0533551596",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_593",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "0160464349",
        "name": "علي احمد محمد احمد",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "احمد محمد احمد",
        "parentPhone": "0556061395",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1160489439",
        "name": "علي حسن محمد الفقيه",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "حسن محمد الفقيه",
        "parentPhone": "0506630671",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1158323418",
        "name": "عمار عبدالله عطيه الشمراني",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "عبدالله عطيه الشمراني",
        "parentPhone": "0505377844",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "2355777729",
        "name": "عمار ياسر فرج مدنى",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "ياسر فرج مدنى",
        "parentPhone": "0536244433",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "0171079437",
        "name": "عمر صابر سليمان المروعي",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "صابر سليمان المروعي",
        "parentPhone": "0566457618",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1164011593",
        "name": "عمر محمد بن عبدالله الزهراني",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "محمد بن عبدالله",
        "parentPhone": "0508815149",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1162184780",
        "name": "محمد الحسن محمد الشاعري",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "الحسن محمد الشاعري",
        "parentPhone": "0500344787",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "2320560341",
        "name": "محمد سعيد جوري افرح",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "سعيد جوري افرح",
        "parentPhone": "0508383828",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1162895351",
        "name": "محمد عبدالرحمن محمد الاخفس",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "عبدالرحمن محمد الاخفس",
        "parentPhone": "0553768705",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1161148604",
        "name": "محمد عبدالله محمد الزهراني",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "عبدالله محمد الزهراني",
        "parentPhone": "0509967198",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1157718923",
        "name": "مراد علي محمد المنتشري",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "علي محمد المنتشري",
        "parentPhone": "0540454899",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_604",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1158901270",
        "name": "مصعب عمر ادريس كناني",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "عمر ادريس كناني",
        "parentPhone": "0508383828",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_605",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "2404343572",
        "name": "مهدي عبد الباسط مولوي اسماعيل",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "عبد الباسط مولوي",
        "parentPhone": "0577808689",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "2335132797",
        "name": "نواف عبدالعزيز محمد عباس",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "عبدالعزيز محمد عباس",
        "parentPhone": "0555658091",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "0160483393",
        "name": "نواف عبدالله محمد الوصابي",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "عبدالله محمد الوصابي",
        "parentPhone": "0508489891",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1161171267",
        "name": "نواف قايد صالح الحارثي",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "قايد صالح الحارثي",
        "parentPhone": "0508229800",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_609",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "2419957127",
        "name": "هتان محمد محسن علي",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "محمد محسن علي",
        "parentPhone": "0506729313",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1160991749",
        "name": "وسيم زين علي بداحي",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "زين علي بداحي",
        "parentPhone": "0565781174",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1161497928",
        "name": "وليد محمد يحي هزازي",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "محمد يحي هزازي",
        "parentPhone": "0553807850",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1158692978",
        "name": "ياسين محمد بن صقر السلمي",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "محمد بن صقر",
        "parentPhone": "0564890293",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1179713274",
        "name": "يحي ابراهيم عيسى ابوالزوائد",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "ابراهيم عيسى ابوالزوائد",
        "parentPhone": "0564369830",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "36517-1",
        "name": "يوسف مصطفى يوسف بحرين",
        "grade": "الصف الثاني المتوسط - 9",
        "parentName": "مصطفى يوسف بحرين",
        "parentPhone": "0569288156",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1159305869",
        "name": "ابراهيم عبدالمجيد بن سعيد الزهراني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "عبدالمجيد بن سعيد",
        "parentPhone": "0554045518",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "2302888611",
        "name": "احمد مهند محمد احمد",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "مهند محمد احمد",
        "parentPhone": "0566542683",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2302062191",
        "name": "البراء عارف علي باعوضه",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "عارف علي باعوضه",
        "parentPhone": "0562639792",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_618",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1155154246",
        "name": "بتال احمد سعيد العرياني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "احمد سعيد العرياني",
        "parentPhone": "0558405152",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1155080771",
        "name": "بدر سعد محيميد البقمي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "سعد محيميد البقمي",
        "parentPhone": "0555099942",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1157803030",
        "name": "بسام محمد ناجى الحارثي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "محمد ناجى الحارثي",
        "parentPhone": "0506050666",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1215593052",
        "name": "حامد احمد حميد الرشيدي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "احمد حميد الرشيدي",
        "parentPhone": "0505891612",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_622",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "0160506730",
        "name": "خالد عبدالرقيب طاهر الحميري",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "عبدالرقيب طاهر الحميري",
        "parentPhone": "0534950966",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1152860183",
        "name": "زياد محمد بن عبدالرحمن الشمراني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "محمد بن عبدالرحمن",
        "parentPhone": "0545348507",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1158100709",
        "name": "سليمان علي ابراهيم السميري",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "علي ابراهيم السميري",
        "parentPhone": "0559333187",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "2340899604",
        "name": "صالح عبدالله صالح بفلح",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "عبدالله صالح بفلح",
        "parentPhone": "0509391776",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1158219194",
        "name": "عبدالاله حسين محمد الزهراني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "حسين محمد الزهراني",
        "parentPhone": "0555689266",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1173431170",
        "name": "علي حسن زاهر الشهري",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "حسن زاهر الشهري",
        "parentPhone": "0557866617",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1170371874",
        "name": "عمار سليمان محمد الزهراني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "سليمان محمد الزهراني",
        "parentPhone": "0508009488",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_629",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "2434986523",
        "name": "عمر أباكرا شريف شريف",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "أباكرا شريف شريف",
        "parentPhone": "0534338046",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1157297514",
        "name": "فارس صلاح مفرح الروقي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "صلاح مفرح الروقي",
        "parentPhone": "0533296104",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1158051563",
        "name": "فراس عبدالرحمن يحي طيب",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "عبدالرحمن يحي طيب",
        "parentPhone": "0505350298",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1154725269",
        "name": "فراس فهد موسى ال قربي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "فهد موسى ال",
        "parentPhone": "0545967873",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "4729839102",
        "name": "فوزان قاسم احمد حسان",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "قاسم احمد حسان",
        "parentPhone": "0557925653",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1156074112",
        "name": "فيصل عبدالرحمن خضر الزهراني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "عبدالرحمن خضر الزهراني",
        "parentPhone": "0536688663",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1156681395",
        "name": "محمد سعد علي الزبيدي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "سعد علي الزبيدي",
        "parentPhone": "0532209740",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1154923039",
        "name": "محمد علي محمد الزهراني",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "علي محمد الزهراني",
        "parentPhone": "0555561469",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "0160229182",
        "name": "مقبل علي يحي السلمي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "علي يحي السلمي",
        "parentPhone": "0503675281",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1157522937",
        "name": "نادر بن محمد بن عبدالله البدواني العيسي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "بن محمد بن",
        "parentPhone": "0504852419",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "0150230097",
        "name": "ناصر محمود ناصر الخضر",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "محمود ناصر الخضر",
        "parentPhone": "0558287068",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1178376016",
        "name": "وائل ابراهيم السلومي الزبيدي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "ابراهيم السلومي الزبيدي",
        "parentPhone": "0532344428",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1155005760",
        "name": "وسام ماسي موسى المالكي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "ماسي موسى المالكي",
        "parentPhone": "0548312950",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "2407571724",
        "name": "ياسر احمد ابراهيم الحطامي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "احمد ابراهيم الحطامي",
        "parentPhone": "0531666770",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "2302541350",
        "name": "يامن عبدالله طالب السعيدي",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "عبدالله طالب السعيدي",
        "parentPhone": "0565190011",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2383212996",
        "name": "يزن محمد احمد احمد",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "محمد احمد احمد",
        "parentPhone": "0564010758",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1155144437",
        "name": "يوسف عبدالله سبيع الشهري",
        "grade": "الصف الثاني المتوسط - 1",
        "parentName": "عبدالله سبيع الشهري",
        "parentPhone": "0557445656",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1174395952",
        "name": "ابراهيم احمد عبدالرحمن القرني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "احمد عبدالرحمن القرني",
        "parentPhone": "0547414629",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1157783489",
        "name": "ابراهيم اسامه ابراهيم محسن",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "اسامه ابراهيم محسن",
        "parentPhone": "0552616165",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_648",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1155001322",
        "name": "ابراهيم سعيد ابراهيم الزهراني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "سعيد ابراهيم الزهراني",
        "parentPhone": "0506684406",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1155799479",
        "name": "احمد حسن أحمد الحربي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "حسن أحمد الحربي",
        "parentPhone": "0556623886",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1167841020",
        "name": "أنس عمر علي العيافي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "عمر علي العيافي",
        "parentPhone": "0534623989",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1153725609",
        "name": "بدر هاشم محمد البركاتي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "هاشم محمد البركاتي",
        "parentPhone": "0544052412",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_652",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1173679984",
        "name": "بركي عبيدالله حميد الرشيدي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "عبيدالله حميد الرشيدي",
        "parentPhone": "0566465989",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1156571844",
        "name": "جسار محمد بن حمدان الشمراني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "محمد بن حمدان",
        "parentPhone": "0553111525",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_654",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1157858703",
        "name": "جواد ماجد عبدالرحمن السميري",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "ماجد عبدالرحمن السميري",
        "parentPhone": "0500775590",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1181855303",
        "name": "خالد ستر عويض السلمي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "ستر عويض السلمي",
        "parentPhone": "0530637451",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1160479471",
        "name": "خالد محمد علي مكين الشهري",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "محمد علي مكين",
        "parentPhone": "0535079972",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1158165470",
        "name": "خالد وليد محمد الزهراني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "وليد محمد الزهراني",
        "parentPhone": "0541106814",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1156663674",
        "name": "راكان معبر محمد مجممي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "معبر محمد مجممي",
        "parentPhone": "0506374857",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_659",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1157522135",
        "name": "ريان خالد عبدالله الذبياني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "خالد عبدالله الذبياني",
        "parentPhone": "0598107149",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1155497108",
        "name": "زياد احمد ابن مقبول السميري",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "احمد ابن مقبول",
        "parentPhone": "0503539012",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "2308263405",
        "name": "طلحه طيب نور الاسلام مياه حسين",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "طيب نور الاسلام",
        "parentPhone": "0502387104",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1156932921",
        "name": "عبدالرحمن علي محمد الحارثي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "علي محمد الحارثي",
        "parentPhone": "0546858195",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1156504951",
        "name": "عبدالعزيز علاء بن شوعي تركي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "علاء بن شوعي",
        "parentPhone": "0545225607",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1154386955",
        "name": "عبدالعزيز محمد عمران الزهراني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "محمد عمران الزهراني",
        "parentPhone": "0555655348",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1157723659",
        "name": "عبدالله علي يحيي السهيمي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "علي يحيي السهيمي",
        "parentPhone": "0534096799",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_666",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1156603597",
        "name": "عدي حماد حميد اليزيدي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "حماد حميد اليزيدي",
        "parentPhone": "0556037159",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1156462432",
        "name": "علي محمد علي السوادي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "محمد علي السوادي",
        "parentPhone": "0509294949",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "2306451473",
        "name": "فراس ايمن محمد دخنة",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "ايمن محمد دخنة",
        "parentPhone": "0560852008",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "2310901299",
        "name": "مروان محمد يوسف اسرار",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "محمد يوسف اسرار",
        "parentPhone": "0507675971",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1154227779",
        "name": "مشاري مصلح معيش الحارثي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "مصلح معيش الحارثي",
        "parentPhone": "0556466627",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1154850349",
        "name": "مشعل حمد بن مصلح الحارثي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "حمد بن مصلح",
        "parentPhone": "0504722473",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1154448193",
        "name": "نادر احمد محمد العامري",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "احمد محمد العامري",
        "parentPhone": "0555576745",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1165150010",
        "name": "نادر زياد بن صالح السهيمي",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "زياد بن صالح",
        "parentPhone": "0553673791",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1160647887",
        "name": "هاشم يحيى عبدالله القرني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "يحيى عبدالله القرني",
        "parentPhone": "0565619009",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1157554211",
        "name": "وسام عبدالله بن ضيف الله الشهري",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "عبدالله بن ضيف",
        "parentPhone": "0564992943",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1157472927",
        "name": "ياسر رجب بن محمد الزهراني",
        "grade": "الصف الثاني المتوسط - 2",
        "parentName": "رجب بن محمد",
        "parentPhone": "0550195557",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_677",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1159595964",
        "name": "أحمد اسماعيل ابراهيم شوش",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "اسماعيل ابراهيم شوش",
        "parentPhone": "0542542364",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_678",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1173679927",
        "name": "أحمد عبيدالله  الرشيدي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "عبيدالله الرشيدي",
        "parentPhone": "0566465989",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_679",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1159410362",
        "name": "احمد عوض احمد المقعدي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "عوض احمد المقعدي",
        "parentPhone": "0548147257",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1169994231",
        "name": "احمد عوض الحاج الهتاني",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "عوض الحاج الهتاني",
        "parentPhone": "0542063173",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1155851791",
        "name": "أنس عبدالله علي الكثيري",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "عبدالله علي الكثيري",
        "parentPhone": "0553377182",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "2529504215",
        "name": "انس محمد خليفة عبد الكريم",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "محمد خليفة عبد",
        "parentPhone": "0573290302",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1155203266",
        "name": "أوس يحي موسى الفيفي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "يحي موسى الفيفي",
        "parentPhone": "0557666394",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1158373421",
        "name": "اياد فهد ابن علي الزهراني",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "فهد ابن علي",
        "parentPhone": "0553777432",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1158138642",
        "name": "باسل صليح بن صالح المالكي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "صليح بن صالح",
        "parentPhone": "0565546599",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1170823015",
        "name": "بتال سامي مقبول الثبيتي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "سامي مقبول الثبيتي",
        "parentPhone": "0567277788",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1157694462",
        "name": "بدر محمد علي الحارثي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "محمد علي الحارثي",
        "parentPhone": "0555339741",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_688",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1154056350",
        "name": "تركي عبدالرحمن تركي العسيري",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "عبدالرحمن تركي العسيري",
        "parentPhone": "0555450168",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": [
            {
                "id": "msg_init_689",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1159046687",
        "name": "تركي فيصل احمد الزهراني",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "فيصل احمد الزهراني",
        "parentPhone": "0533969433",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1160473482",
        "name": "حسام جمعان جراد الغامدي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "جمعان جراد الغامدي",
        "parentPhone": "0503808832",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1154556193",
        "name": "حسين محمد ابن حسين الشيخي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "محمد ابن حسين",
        "parentPhone": "0551913736",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1162468605",
        "name": "حمد محمد سعود الحربي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "محمد سعود الحربي",
        "parentPhone": "0594290617",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_693",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "0161070108",
        "name": "ريان ماجد قاسم المقعدي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "ماجد قاسم المقعدي",
        "parentPhone": "0544215139",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1150929287",
        "name": "ريان محمد يحي الزهراني",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "محمد يحي الزهراني",
        "parentPhone": "0594278653",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1157643808",
        "name": "زياد عبدالاله زايد المعلوي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "عبدالاله زايد المعلوي",
        "parentPhone": "0531142311",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1156716845",
        "name": "سعود سعد ساعد الزهراني",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "سعد ساعد الزهراني",
        "parentPhone": "0504153242",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_697",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1154904641",
        "name": "صالح علي بن عبدالله الغامدي",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "علي بن عبدالله",
        "parentPhone": "0505782737",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1152148266",
        "name": "عادل عبدالله علي الشمراني",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "عبدالله علي الشمراني",
        "parentPhone": "0555811994",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1154676603",
        "name": "عاصم احمد محمد الكثيري",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "احمد محمد الكثيري",
        "parentPhone": "0551939200",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1159278181",
        "name": "فيصل سلطان سالم الزهراني",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "سلطان سالم الزهراني",
        "parentPhone": "0559819993",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1155418120",
        "name": "نايف سعيد بن موسى الكثيري",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "سعيد بن موسى",
        "parentPhone": "0598669187",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1155418302",
        "name": "نواف سعيد بن موسى الكثيري",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "سعيد بن موسى",
        "parentPhone": "0598669187",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1156320994",
        "name": "نواف عصام بن محمد الغامدى",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "عصام بن محمد",
        "parentPhone": "0555567985",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1159569167",
        "name": "وليد محمد احمد القرني",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "محمد احمد القرني",
        "parentPhone": "0507732834",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1147620825",
        "name": "ياسر سعد ساعد الزهراني",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "سعد ساعد الزهراني",
        "parentPhone": "0504153242",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1151082292",
        "name": "ياسر فهد عوض القحطاني",
        "grade": "الصف الثاني المتوسط - 3",
        "parentName": "فهد عوض القحطاني",
        "parentPhone": "0506656478",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_707",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1161967458",
        "name": "ابراهيم صالح ابراهيم الزهراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "صالح ابراهيم الزهراني",
        "parentPhone": "0556506556",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1150125720",
        "name": "احمد عبدالعزيز علي شراحيلي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "عبدالعزيز علي شراحيلي",
        "parentPhone": "0505687206",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_709",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1156553040",
        "name": "البراء أحمد عامر البارقي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "أحمد عامر البارقي",
        "parentPhone": "0562725552",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1217067188",
        "name": "بركه عبدالرحمن حميد عبدالرحمن حميد عبدالله عبدالله الرشيدي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "عبدالرحمن حميد عبدالرحمن",
        "parentPhone": "0536334260",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1155220229",
        "name": "بندر يوسف محمد الزبيدي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "يوسف محمد الزبيدي",
        "parentPhone": "0500671393",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1157908524",
        "name": "جواد عبدالله بن محمد دغريري",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "عبدالله بن محمد",
        "parentPhone": "0568788005",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_713",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1157744697",
        "name": "خالد طارق حسن مقطوف",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "طارق حسن مقطوف",
        "parentPhone": "0549114223",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "0160787035",
        "name": "زبن الله حاكم حمد الرويمي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "الله حاكم حمد",
        "parentPhone": "0538227671",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1155715087",
        "name": "سيف ناصر بن علي الجيزاني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "ناصر بن علي",
        "parentPhone": "0504437559",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1209529542",
        "name": "عبد الرحمن إبراهيم منيع الكناني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "الرحمن إبراهيم منيع",
        "parentPhone": "0506400877",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1161461999",
        "name": "عبدالعزيز يحيى ابن احمد الغامدي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "يحيى ابن احمد",
        "parentPhone": "0553218540",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1154107021",
        "name": "عبدالله خالد رجب الزهراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "خالد رجب الزهراني",
        "parentPhone": "0550231551",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1154297269",
        "name": "عدي عبدالله عثمان حكمي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "عبدالله عثمان حكمي",
        "parentPhone": "0506037125",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1155599598",
        "name": "عزام خالد عائض الشمراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "خالد عائض الشمراني",
        "parentPhone": "0544704803",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1166836633",
        "name": "علي محمد يحيى هزازي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "محمد يحيى هزازي",
        "parentPhone": "0538718825",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1166314227",
        "name": "عماد محمد يحى الزهراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "محمد يحى الزهراني",
        "parentPhone": "0535951160",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1156929711",
        "name": "عوض حسن عمر العمري",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "حسن عمر العمري",
        "parentPhone": "0535056863",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1155720988",
        "name": "فارس ابراهيم محمد الشهري",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "ابراهيم محمد الشهري",
        "parentPhone": "0564454576",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_725",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1155147554",
        "name": "فارس محمد مسفر الغامدي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "محمد مسفر الغامدي",
        "parentPhone": "0556999544",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1156941203",
        "name": "فراس علي محسن القرني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "علي محسن القرني",
        "parentPhone": "0505268127",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_727",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1159842945",
        "name": "محمد اسماعيل صالح الشريف",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "اسماعيل صالح الشريف",
        "parentPhone": "0503614501",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_728",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1217067121",
        "name": "محمد عبدالرحمن حميد الرشيدي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "عبدالرحمن حميد الرشيدي",
        "parentPhone": "0536334260",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1155465568",
        "name": "مشاري غازي سليم الحربي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "غازي سليم الحربي",
        "parentPhone": "0590229122",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_730",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": false
            }
        ]
    },
    {
        "id": "1152878029",
        "name": "مصعب احمد علي حمدي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "احمد علي حمدي",
        "parentPhone": "0555849233",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1162478125",
        "name": "مؤيد عطيه وجيه الزهراني",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "عطيه وجيه الزهراني",
        "parentPhone": "0537062204",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1153133952",
        "name": "نواف احمد عطيه المالكي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "احمد عطيه المالكي",
        "parentPhone": "0549312835",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1153805112",
        "name": "هوصان سعود هوصان العتيبي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "سعود هوصان العتيبي",
        "parentPhone": "0500403319",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1158349819",
        "name": "وسام احمد سعد السفري",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "احمد سعد السفري",
        "parentPhone": "0556994451",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1153387244",
        "name": "يزن احمد عويد الرشيدي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "احمد عويد الرشيدي",
        "parentPhone": "0505580447",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1153410137",
        "name": "يوسف عقيل ابراهيم الزيلعي",
        "grade": "الصف الثاني المتوسط - 4",
        "parentName": "عقيل ابراهيم الزيلعي",
        "parentPhone": "0553355750",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1163476409",
        "name": "بسام محمد بن عبدالله الزهراني",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "محمد بن عبدالله",
        "parentPhone": "0504663921",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1164142919",
        "name": "تركي محمد الحسين خواجي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "محمد الحسين خواجي",
        "parentPhone": "0547481631",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_739",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1152292049",
        "name": "حسن بن ماجد بن حسن السويدي الزهراني",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "بن ماجد بن",
        "parentPhone": "0534470001",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2334419567",
        "name": "خالد بسام علي دراوش",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "بسام علي دراوش",
        "parentPhone": "0500659732",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1158369114",
        "name": "سلطان عبدالعزيز علي شراحيلي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "عبدالعزيز علي شراحيلي",
        "parentPhone": "0530033213",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1153314180",
        "name": "سند مفرح محمد صهلولي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "مفرح محمد صهلولي",
        "parentPhone": "0568313345",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1159263563",
        "name": "عبدالعزيز حسين محمد نافع",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "حسين محمد نافع",
        "parentPhone": "0504311264",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1153203854",
        "name": "عبدالله محمد غرم الله الغامدي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "محمد غرم الله",
        "parentPhone": "0555086849",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1154377350",
        "name": "علي عبدالله حبني الشهري",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "عبدالله حبني الشهري",
        "parentPhone": "0553663992",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1155496456",
        "name": "عمر عبدالعزيز عبدالرحيم العيلي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "عبدالعزيز عبدالرحيم العيلي",
        "parentPhone": "0540473372",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1150442802",
        "name": "فارس علي عايض الشهري",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "علي عايض الشهري",
        "parentPhone": "0506015222",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1157287135",
        "name": "فهد علي ابن حسن مباركي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "علي ابن حسن",
        "parentPhone": "0559221106",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1155591348",
        "name": "مالك احمد ابن حسن الزهراني",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "احمد ابن حسن",
        "parentPhone": "0505777449",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1157769710",
        "name": "محمد حسن بالغيث القرنى",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "حسن بالغيث القرنى",
        "parentPhone": "0555552174",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "2376333841",
        "name": "محمد عبدالله احمد زوعري",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "عبدالله احمد زوعري",
        "parentPhone": "0540245461",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1157738665",
        "name": "محمد عبدالله بن عبدالخير الزهراني",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "عبدالله بن عبدالخير",
        "parentPhone": "0553661178",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1158355774",
        "name": "محمد عقيل محمد الحاتمي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "عقيل محمد الحاتمي",
        "parentPhone": "0551004887",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1159552437",
        "name": "محمد فؤاد بن محمد الرشيدي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "فؤاد بن محمد",
        "parentPhone": "0555959280",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1163970294",
        "name": "مروان حسن مصطفى معبر",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "حسن مصطفى معبر",
        "parentPhone": "0500086374",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1155898842",
        "name": "مشعل احمد مهدي القرني",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "احمد مهدي القرني",
        "parentPhone": "0508730786",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "2323417895",
        "name": "مهند حسن حميد الوصابي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "حسن حميد الوصابي",
        "parentPhone": "0530351040",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1158350734",
        "name": "مهنى عوض سعد الزهراني",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "عوض سعد الزهراني",
        "parentPhone": "0554549413",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "2411309673",
        "name": "نادر عبدالله محمد القيري",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "عبدالله محمد القيري",
        "parentPhone": "0556786750",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": []
    },
    {
        "id": "1149323782",
        "name": "نايف نوار بن زايد العتيبي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "نوار بن زايد",
        "parentPhone": "0555654084",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": []
    },
    {
        "id": "1155885021",
        "name": "نواف محمد ابن عويض العتيبي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "محمد ابن عويض",
        "parentPhone": "0537588160",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "نشط الآن",
        "privateMessages": [
            {
                "id": "msg_init_762",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1155068073",
        "name": "نواف محمد احمد الشهابي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "محمد احمد الشهابي",
        "parentPhone": "0502876645",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "1155432394",
        "name": "وسام بن يوسف بن محمد الزهراني",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "بن يوسف بن",
        "parentPhone": "0557708001",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    },
    {
        "id": "2411309665",
        "name": "وليد عبدالله محمد القيري",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "عبدالله محمد القيري",
        "parentPhone": "0556786750",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "يوم أمس",
        "privateMessages": [
            {
                "id": "msg_init_765",
                "text": "نشكر لكم اهتمامكم ومتابعتكم المستمرة لتحصيل الطالب الدراسي وانضباطه الصباحي.",
                "date": "2026-05-20T08:30:00Z",
                "read": true
            }
        ]
    },
    {
        "id": "1157999176",
        "name": "يزن عبدالقادر ابن محمد الشيخي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "عبدالقادر ابن محمد",
        "parentPhone": "0507393978",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1157625045",
        "name": "يوسف احمد سفر الزهراني",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "احمد سفر الزهراني",
        "parentPhone": "0559818342",
        "status": "not_installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "لم يسجل دخول بعد",
        "privateMessages": []
    },
    {
        "id": "1158296960",
        "name": "يوسف صالح بن عبدالله الغامدي",
        "grade": "الصف الثاني المتوسط - 5",
        "parentName": "صالح بن عبدالله",
        "parentPhone": "0559996499",
        "status": "installed",
        "attendance": "present",
        "morningDelayMinutes": 0,
        "lastActive": "منذ دقيقتين",
        "privateMessages": []
    }
];

// الرسائل العامة الافتراضية
const INITIAL_GENERAL_MESSAGES = [
    {
        id: "gen1",
        title: "بدء اختبارات منتصف الفصل الدراسي",
        text: "نود إحاطتكم علماً بأن اختبارات منتصف الفصل الدراسي الثاني تبدأ الأحد القادم بمشيئة الله. نرجو حث الطلاب على المذاكرة والجد والاجتهاد.",
        date: "2026-05-20T09:00:00Z"
    },
    {
        id: "gen2",
        title: "تغيير موعد الاصطفاف الصباحي",
        text: "بناءً على توجيهات إدارة المدرسة، يبدأ الطابور الصباحي في تمام الساعة 6:45 صباحاً نظراً لاعتدال الأجواء. نرجو الحرص على الحضور في الموعد.",
        date: "2026-05-18T12:00:00Z"
    }
];

// قوالب الرسائل الجاهزة حسب نوع الإشعار لسهولة الاختيار والسرعة
const NOTIFICATION_TEMPLATES = {
    attendance_present: {
        title: "حضور الطالب",
        text: "ولي أمر الطالب [name] الموقر، نحيطكم علماً بتحضير الطالب اليوم وتواجده بالمدرسة في الوقت المحدد. نشكر لكم اهتمامكم بحضور ابنكم."
    },
    attendance_absent: {
        title: "غياب الطالب",
        text: "ولي أمر الطالب [name] الموقر، نفيدكم بغياب الطالب عن المدرسة اليوم [day] الموافق [date]. نرجو تزويد إدارة المدرسة بعذر الغياب في أقرب وقت."
    },
    attendance_delayed: {
        title: "تأخر صباحي",
        text: "ولي أمر الطالب [name] الموقر، نحيطكم علماً بتأخر الطالب عن طابور الصباح لليوم [day] لمدة [minutes] دقيقة. يرجى التنبيه بأهمية الحضور المبكر."
    },
    general: {
        title: "إعلان عام هام",
        text: "سعادة أولياء الأمور الكرام، تود إدارة مدرسة الأجاويد الأولى المتوسطة إعلامكم بـ [الرجاء كتابة تفاصيل الإعلان هنا]، شاكرين ومقدرين حسن تعاونكم."
    },
    private: {
        title: "رسالة خاصة من إدارة المدرسة",
        text: "ولي أمر الطالب [name] الموقر، تود إدارة المدرسة التواصل معكم بشأن [الرجاء كتابة تفاصيل الرسالة هنا]. يرجى مراجعة الإدارة أو التواصل معنا."
    }
};
