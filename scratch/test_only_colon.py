import urllib.request
import urllib.parse
import json

app_key = "x3odkkjc"
key = "s_1159278181"

def test_string(name, raw_val):
    encoded = urllib.parse.quote(raw_val)
    url = f"https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/{app_key}/{key}/{encoded}"
    print(f"Testing {name}: raw len {len(raw_val)}, encoded len {len(encoded)}")
    try:
        req = urllib.request.Request(url, method="POST", headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as res:
            body = res.read().decode('utf-8')
            print(f"Status: {res.status}, Body: {body}")
            return True
    except Exception as e:
        print(f"Failed: {e}")
        return False

# Test JSON string without spaces but WITH colons
payload = {"id":"1159278181","attendance":"present","attendanceTime":"2026-05-21 08:30 ص","earlyDaysCount":5,"lateDaysCount":2,"absentDaysCount":1,"privateMessages":[]}
json_str = json.dumps(payload, separators=(',', ':'), ensure_ascii=False)

test_string("JSON compact WITH colon", json_str)
