import urllib.request
import urllib.parse
import json

app_key = "x3odkkjc"
key = "s_1159278181"

def test_raw_vs_encoded(raw_val):
    encoded = urllib.parse.quote(raw_val)
    url = f"https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/{app_key}/{key}/{encoded}"
    print(f"Testing raw len: {len(raw_val)}, encoded len: {len(encoded)}")
    try:
        req = urllib.request.Request(url, method="POST", headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as res:
            body = res.read().decode('utf-8')
            print(f"Status: {res.status}, Body: {body}")
            return True
    except Exception as e:
        print(f"Failed: {e}")
        return False

# Test 1: Raw length 100, but with Arabic/special chars that expand to > 250 chars encoded
test_val_1 = "أ"*80 # Raw length 80, but UTF-8 encoded in URL will be 80 * 2 = 160 or 240 chars!
# In URL encoding, each Arabic char becomes 6 characters (e.g. %D8%B5)
print("Test 1 (Arabic expansion):")
test_raw_vs_encoded(test_val_1)

# Test 2: Raw length 150, all ASCII but with quotes and braces which expand a bit
payload = {"id":"1159278181","attendance":"present","attendanceTime":"2026-05-21 08:30 ص","earlyDaysCount":5,"lateDaysCount":2,"absentDaysCount":1,"privateMessages":[]}
test_val_2 = json.dumps(payload)
print("\nTest 2 (JSON payload):")
test_raw_vs_encoded(test_val_2)
