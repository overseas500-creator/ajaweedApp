import urllib.request
import urllib.parse
import json
import base64

app_key = "x3odkkjc"
key = "s_test_b64"

# Create a payload with Arabic characters
payload = {
    "id": "1159278181",
    "attendance": "present",
    "attendanceTime": "2026-05-21 08:30 ص",
    "earlyDaysCount": 5,
    "lateDaysCount": 2,
    "absentDaysCount": 1,
    "privateMessages": [{"id": 1, "text": "رسالة خاصة تجريبية"}]
}

# 1. Convert to compact JSON string
json_str = json.dumps(payload, separators=(',', ':'), ensure_ascii=False)
print("Raw JSON:", json_str)
print("Raw JSON length:", len(json_str))

# 2. Encode to UTF-8 bytes and then URL-safe Base64
utf8_bytes = json_str.encode('utf-8')
b64_bytes = base64.urlsafe_b64encode(utf8_bytes)
b64_str = b64_bytes.decode('ascii').rstrip('=') # Strip padding

print("Base64 String:", b64_str)
print("Base64 String length:", len(b64_str))

# 3. Write to keyvalue.immanuel.co
# Since it is URL-safe, we don't even need to quote it, but let's do it just in case
write_url = f"https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/{app_key}/{key}/{b64_str}"
read_url = f"https://keyvalue.immanuel.co/api/KeyVal/GetValue/{app_key}/{key}"

try:
    print("Writing...")
    req_write = urllib.request.Request(write_url, method="POST", headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req_write) as res:
        print("Write status:", res.status, "Body:", res.read().decode('utf-8'))
        
    print("Reading...")
    req_read = urllib.request.Request(read_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req_read) as res:
        raw_body = res.read().decode('utf-8')
        print("Raw body response:", repr(raw_body))
        
        # Decode the raw body
        # First strip outer quotes that keyvalue API adds to the response
        clean_body = json.loads(raw_body)
        print("Clean response body:", repr(clean_body))
        
        # Add padding back if necessary
        padding_needed = len(clean_body) % 4
        if padding_needed:
            clean_body += '=' * (4 - padding_needed)
            
        decoded_bytes = base64.urlsafe_b64decode(clean_body.encode('ascii'))
        decoded_json = decoded_bytes.decode('utf-8')
        print("Decoded JSON:", decoded_json)
        
        parsed_payload = json.loads(decoded_json)
        print("Parsed Payload:", parsed_payload)
        
except Exception as e:
    print("Error:", e)
