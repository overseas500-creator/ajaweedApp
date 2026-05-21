import urllib.request
import urllib.parse
import json

app_key = "x3odkkjc"
key = "s_test_query_integrity"

# Full JSON with colons, Arabic characters, spaces, quotes
payload = {
    "id": "1159278181",
    "att": "present",
    "time": "2026-05-21 08:30 ص",
    "delay": 0,
    "early": 6,
    "late": 3,
    "absent": 1,
    "msgs": [{
        "id": 1779344979515,
        "txt": "رسالة خاصة تجريبية طويلة جداً ومفصلة لولي الأمر بدون أي اختصار أو مشاكل في الترميز",
        "dt": "2026-05-21",
        "rd": False,
        "att": None
    }]
}

# Serialize normally, keep colons, keep Arabic
json_str = json.dumps(payload, ensure_ascii=False)
print("Original JSON string length:", len(json_str))
print("Original JSON:", json_str)

# URL-encode normally (with % symbols, spaces, quotes, Arabic)
encoded_val = urllib.parse.quote(json_str)
print("URL-encoded value length:", len(encoded_val))

# Write to cloud using query string ?value=
url_write = f"https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/{app_key}/{key}?value={encoded_val}"
url_read = f"https://keyvalue.immanuel.co/api/KeyVal/GetValue/{app_key}/{key}"

try:
    print("\nWriting to cloud via query string...")
    req_write = urllib.request.Request(url_write, method="POST", headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req_write) as res:
        print("Status:", res.status, "Body:", res.read().decode('utf-8'))
        
    print("\nReading back from cloud...")
    req_read = urllib.request.Request(url_read, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req_read) as res:
        raw_body = res.read().decode('utf-8')
        print("Raw fetched body from server:", repr(raw_body))
        
        # Parse outer string quotes from keyvalue
        parsed_str = json.loads(raw_body)
        print("Parsed JSON string:", parsed_str)
        
        # Parse the JSON payload
        final_payload = json.loads(parsed_str)
        print("\nFinal Parsed Payload:")
        print("ID:", final_payload["id"])
        print("Attendance Status:", final_payload["att"])
        print("Attendance Time:", final_payload["time"])
        print("Message Text:", final_payload["msgs"][0]["txt"])
        
except Exception as e:
    print("Error during integrity test:", e)
