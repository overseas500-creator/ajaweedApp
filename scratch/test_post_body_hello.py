import urllib.request
import urllib.parse
import json

app_key = "x3odkkjc"
key = "s_test_post"

url = f"https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/{app_key}/{key}/hello"
try:
    req = urllib.request.Request(url, method="POST", headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as res:
        print("Write hello:", res.status, res.read().decode('utf-8'))
        
    url_read = f"https://keyvalue.immanuel.co/api/KeyVal/GetValue/{app_key}/{key}"
    req_read = urllib.request.Request(url_read, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req_read) as res:
        print("Read hello:", res.status, res.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
