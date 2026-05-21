import urllib.request
import urllib.parse
import json

app_key = "x3odkkjc"
key = "gen_msgs"

# Unicode escaping function
def safe_escape_unicode(text):
    escaped = []
    for char in text:
        code = ord(char)
        if code > 127:
            escaped.append(f"~u{code:04x}")
        else:
            escaped.append(char)
    return "".join(escaped)

# Prepare 2 sample announcements matching what the user sent
announcements = [
    {
        "id": 1000000000001,
        "t": "إعلان عام بدون صورة",
        "txt": "أولياء الأمور الأفاضل، نود إحاطتكم علماً بأن التطبيق يتيح لكم الآن استقبال كافة التحديثات الفورية المتعلقة بأبنائكم مباشرة على هواتفكم.",
        "dt": "2026-05-21",
        "att": None
    },
    {
        "id": 1000000000002,
        "t": "إعلان عام مع صورة",
        "txt": "مرفق لكم شعار التطبيق الجديد وجدول الأنشطة اللاصفية للفصل الدراسي الحالي.",
        "dt": "2026-05-21",
        "att": {
            "t": "image",
            "d": "[Base64]"
        }
    }
]

# Serialize and escape
json_str = json.dumps(announcements, separators=(',', ':'), ensure_ascii=False)
escaped = safe_escape_unicode(json_str)
encoded = urllib.parse.quote(escaped)

url = f"https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/{app_key}/{key}?value={encoded}"

try:
    print("Writing gen_msgs to cloud...")
    req = urllib.request.Request(url, method="POST", headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as res:
        print("Status:", res.status, "Body:", res.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
