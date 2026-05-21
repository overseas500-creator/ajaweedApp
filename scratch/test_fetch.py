import urllib.request
import urllib.parse
import json

app_key = "x3odkkjc"
key = "s_test_123"

# Write tilde JSON
payload = {"id":"1159278181","attendance":"present","attendanceTime":"2026-05-21 08~30 ص"}
json_str = json.dumps(payload, separators=(',', ':'), ensure_ascii=False)
json_tilde = json_str.replace(":", "~")
encoded = urllib.parse.quote(json_tilde)

write_url = f"https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/{app_key}/{key}/{encoded}"
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
        print("Read status:", res.status, "Body:", repr(raw_body))
except Exception as e:
    print("Error:", e)
