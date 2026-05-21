import urllib.request
import urllib.parse
import json
import re

app_key = "x3odkkjc"
student_id = "1159278181"
key = f"s_{student_id}"

# 1. Unicode escaping function in Python (simulating js safeEscapeUnicode)
def safe_escape_unicode(text):
    escaped = []
    for char in text:
        code = ord(char)
        if code > 127:
            escaped.append(f"~u{code:04x}")
        else:
            escaped.append(char)
    return "".join(escaped)

# 2. Prepare payload (omitting counters for size compression)
student_payload = {
    "id": student_id,
    "att": "present",
    "time": "2026-05-21 08:30 ص",
    "msgs": [{
        "id": 9999,
        "txt": "رسالة خاصة جديدة",
        "dt": "2026-05-21",
        "rd": False,
        "att": None
    }]
}

# 3. Compact JSON serialize
raw_json = json.dumps(student_payload, separators=(',', ':'), ensure_ascii=False)
print("Raw JSON:", raw_json)

# 4. Escape non-ASCII characters to IIS-safe ASCII
escaped_json = safe_escape_unicode(raw_json)
print("Escaped JSON (100% ASCII):", escaped_json)

# 5. Replace colons with tilde
tilde_json = escaped_json.replace(":", "~")
print("Tilde JSON:", tilde_json)

# 6. URL-encode path segment
encoded = urllib.parse.quote(tilde_json)
print("URL encoded segment length:", len(encoded))

# 7. Write to server
write_url = f"https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/{app_key}/{key}/{encoded}"
read_url = f"https://keyvalue.immanuel.co/api/KeyVal/GetValue/{app_key}/{key}"

try:
    print("\nWriting to cloud...")
    req_write = urllib.request.Request(write_url, method="POST", headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req_write) as res:
        print("Write body:", res.read().decode('utf-8'))

    print("\nReading from cloud...")
    req_read = urllib.request.Request(read_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req_read) as res:
        raw_body = res.read().decode('utf-8')
        print("Raw body response:", repr(raw_body))
        
        # 8. Decode (Simulating Parent App)
        clean_body = json.loads(raw_body)
        print("Clean body:", repr(clean_body))
        
        # Decode Unicode escapes first
        def safe_decode_unicode(text):
            return re.sub(r'~u([0-9a-fA-F]{4})', lambda m: chr(int(m.group(1), 16)), text)
            
        decoded_unicode = safe_decode_unicode(clean_body)
        print("After decoding custom Unicode escapes:", repr(decoded_unicode))
        
        # Replace tildes to colons
        decoded_json = decoded_unicode.replace("~", ":")
        print("After decoding tildes to colons:", repr(decoded_json))
        
        # Parse final payload
        final_payload = json.loads(decoded_json)
        print("\nFinal Parsed Payload:")
        print("ID:", final_payload["id"])
        print("Attendance Status:", final_payload["att"])
        print("Attendance Time:", final_payload["time"])
        print("First Message Text:", final_payload["msgs"][0]["txt"])
        
except Exception as e:
    print("Error:", e)
