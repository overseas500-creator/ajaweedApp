import urllib.request
import urllib.parse
import json

app_key = "x3odkkjc"
key = "s_test_post"

# Let's try sending a POST to /api/KeyVal/UpdateValue/{app_key}/{key} with the value in the body
url = f"https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/{app_key}/{key}"
data = "Hello from Body with Arabic: رسالة".encode('utf-8')

print("Testing POST with body...")
try:
    req = urllib.request.Request(url, data=data, method="POST", headers={
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/x-www-form-urlencoded' # or text/plain
    })
    with urllib.request.urlopen(req) as res:
        print("Status:", res.status)
        print("Body:", res.read().decode('utf-8'))
except Exception as e:
    print("Failed:", e)
