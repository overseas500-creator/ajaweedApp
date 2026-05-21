import urllib.request
import urllib.parse
import json
import re

app_key = "x3odkkjc"
key = "s_1159278181"

# 1. Unicode escaping function in Python (simulating JS safeEscapeUnicode)
def safe_escape_unicode(text):
    escaped = []
    for char in text:
        code = ord(char)
        if code > 127:
            escaped.append(f"~u{code:04x}")
        else:
            escaped.append(char)
    return "".join(escaped)

# 2. Unicode decoding function in Python (simulating JS safeDecodeUnicode)
def safe_decode_unicode(text):
    return re.sub(r'~u([0-9a-fA-F]{4})', lambda m: chr(int(m.group(1), 16)), text)

# 3. Full student payload with Arabic text
student_payload = {
    "id": "1159278181",
    "att": "present",
    "time": "2026-05-21 08:30 ص",
    "delay": 0,
    "early": 15,
    "late": 2,
    "absent": 1,
    "msgs": [{
        "id": 1779344979515,
        "txt": "رسالة خاصة تجريبية طويلة جداً ومفصلة لولي الأمر بدون أي اختصار أو مشاكل في الترميز",
        "dt": "2026-05-21",
        "rd": False,
        "att": None
    }]
}

# 4. Serialize to JSON string
json_str = json.dumps(student_payload, separators=(',', ':'), ensure_ascii=False)
print("Raw JSON String:", json_str)

# 5. Escape non-ASCII to ASCII-safe representation
escaped_str = safe_escape_unicode(json_str)
print("Escaped JSON (100% ASCII):", escaped_str)

# 6. URL-encode for query string parameter
encoded_val = urllib.parse.quote(escaped_str)
print("URL-encoded query string length:", len(encoded_val))

# 7. Write to keyvalue cloud using ?value=
url_write = f"https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/{app_key}/{key}?value={encoded_val}"
url_read = f"https://keyvalue.immanuel.co/api/KeyVal/GetValue/{app_key}/{key}"

try:
    print("\nWriting to cloud...")
    req_write = urllib.request.Request(url_write, method="POST", headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req_write) as res:
        print("Write Status:", res.status, "Body:", res.read().decode('utf-8'))
        
    print("\nReading back from cloud...")
    req_read = urllib.request.Request(url_read, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req_read) as res:
        raw_body = res.read().decode('utf-8')
        print("Raw fetched body from server:", repr(raw_body))
        
        # 8. Decode simulated parent app
        # Strip outer quotes added by keyvalue.immanuel.co GetValue API
        clean_body = json.loads(raw_body)
        print("After stripping outer quotes:", repr(clean_body))
        
        # Decode our custom Unicode escapes
        decoded_json = safe_decode_unicode(clean_body)
        print("After decoding custom Unicode escapes:", repr(decoded_json))
        
        # Parse final JSON payload
        final_payload = json.loads(decoded_json)
        print("\nFinal Parsed Payload:")
        print("ID:", final_payload["id"])
        print("Attendance Status:", final_payload["att"])
        print("Attendance Time:", final_payload["time"])
        print("Early Attendance Count:", final_payload["early"])
        print("Late Attendance Count:", final_payload["late"])
        print("Absent Attendance Count:", final_payload["absent"])
        print("First Message Text:", final_payload["msgs"][0]["txt"])
        print("SUCCESS!!!")
        
except Exception as e:
    print("Error during test:", e)
