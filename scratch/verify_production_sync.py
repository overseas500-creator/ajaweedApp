import urllib.request
import urllib.parse
import json

app_key = "x3odkkjc"
student_id = "1159278181"
key = f"s_{student_id}"

# 1. Prepare short-keyed student payload matching app.js
payload = {
    "id": student_id,
    "att": "present",
    "time": "2026-05-21 08:30 ص",
    "delay": 0,
    "early": 6,
    "late": 3,
    "absent": 1,
    "msgs": [{
        "id": 9999,
        "txt": "رسالة تجريبية قصيرة ومضغوطة",
        "dt": "2026-05-21",
        "rd": False,
        "att": None
    }]
}

# 2. Serialize and replace colons with tilde
json_str = json.dumps(payload, separators=(',', ':'), ensure_ascii=False)
tilde_str = json_str.replace(":", "~")
encoded = urllib.parse.quote(tilde_str)

write_url = f"https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/{app_key}/{key}/{encoded}"
read_url = f"https://keyvalue.immanuel.co/api/KeyVal/GetValue/{app_key}/{key}"

print("--- Automated Verification Script ---")
print("Compact JSON length:", len(json_str))
print("IIS-Safe Tilde string:", tilde_str)
print("URL-encoded path segment length:", len(encoded))

# Assert length is strictly less than 210
if len(tilde_str) >= 210:
    print("WARNING: Length is above 210 characters limit!")
else:
    print("PASS: Length is within 210 characters limit.")

try:
    # 3. Simulate Admin Sync Write
    print("\nSimulating admin dashboard cloud sync...")
    req_write = urllib.request.Request(write_url, method="POST", headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req_write) as res:
        status = res.status
        body = res.read().decode('utf-8')
        print(f"Server Response Status: {status}, Body: {body}")
        if body == "true":
            print("PASS: Cloud sync write successful (returned true).")
        else:
            print("FAIL: Cloud sync write failed.")

    # 4. Simulate Parent Sync Read
    print("\nSimulating parent dashboard cloud sync fetch...")
    req_read = urllib.request.Request(read_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req_read) as res:
        raw_body = res.read().decode('utf-8')
        print("Raw fetched body from server:", repr(raw_body))
        
        # 5. Simulate Parent Parsing and Decoding
        # Strip outer quotes added by keyvalue.immanuel.co API
        clean_body = json.loads(raw_body)
        print("After stripping outer quotes:", repr(clean_body))
        
        # Replace tildes back to colons
        json_with_colons = clean_body.replace("~", ":")
        print("After decoding tildes to colons:", repr(json_with_colons))
        
        # Parse final JSON payload
        parsed_payload = json.loads(json_with_colons)
        print("Successfully parsed final JSON payload!")
        print("Attendance Status:", parsed_payload.get("att"))
        print("Attendance Time:", parsed_payload.get("time"))
        print("Early Attendance Count:", parsed_payload.get("early"))
        print("Private Messages:", parsed_payload.get("msgs"))
        
        if parsed_payload.get("id") == student_id:
            print("PASS: Verified data integrity and ID match!")
        else:
            print("FAIL: Data ID mismatch.")

except Exception as e:
    print("ERROR DURING VERIFICATION:", e)
