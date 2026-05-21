import urllib.request
import urllib.parse

app_key = "x3odkkjc"
key = "s_1159278181"
read_url = f"https://keyvalue.immanuel.co/api/KeyVal/GetValue/{app_key}/{key}"

try:
    req_read = urllib.request.Request(read_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req_read) as res:
        raw_body = res.read().decode('utf-8')
        print("Raw body response:", repr(raw_body))
except Exception as e:
    print("Error:", e)
