import urllib.request
import urllib.parse
import json

app_key = "x3odkkjc"
key = "s_1159278181"

def safe_escape_unicode(text):
    escaped = []
    for char in text:
        code = ord(char)
        if code > 127:
            escaped.append(f"~u{code:04x}")
        else:
            escaped.append(char)
    return "".join(escaped)

# Faisal's student payload
faisal_payload = {
    "id": "1159278181",
    "att": "delayed",  # حضور متأخر
    "time": "2026-05-21 08:30 ص",  # وقت الحضور الفعلي المستورد من إكسل
    "delay": 15,  # تأخر 15 دقيقة
    "early": 18,  # عداد حضور مبكر
    "late": 4,  # عداد حضور متأخر
    "absent": 2,  # عداد غياب
    "msgs": [
        {
            "id": 1779344979515,
            "txt": "السلام عليكم، نود إحاطتكم علماً بأن الطالب فيصل قد تأخر عن الطابور الصباحي اليوم بمقدار 15 دقيقة وتم تسجيله حضور متأخر.",
            "dt": "2026-05-21",
            "rd": False,
            "att": None
        }
    ]
}

# Serialize, escape, and encode
json_str = json.dumps(faisal_payload, separators=(',', ':'), ensure_ascii=False)
escaped = safe_escape_unicode(json_str)
encoded = urllib.parse.quote(escaped)

url = f"https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/{app_key}/{key}?value={encoded}"

try:
    print("Writing Faisal's student data to cloud...")
    req = urllib.request.Request(url, method="POST", headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as res:
        print("Status:", res.status, "Body:", res.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
