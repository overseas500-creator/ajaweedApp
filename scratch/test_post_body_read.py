import urllib.request
import urllib.parse
import json

app_key = "x3odkkjc"
key = "s_test_post"

url = f"https://keyvalue.immanuel.co/api/KeyVal/GetValue/{app_key}/{key}"

print("Reading value from cloud...")
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as res:
        raw_body = res.read().decode('utf-8')
        print("Raw fetched body from server:", repr(raw_body))
        parsed = json.loads(raw_body)
        print("Decoded JSON value:", repr(parsed))
except Exception as e:
    print("Error:", e)
