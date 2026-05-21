import urllib.request
import json

app_key = "x3odkkjc"

def read_key(key):
    url = f"https://keyvalue.immanuel.co/api/KeyVal/GetValue/{app_key}/{key}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as res:
            print(f"=== KEY: {key} ===")
            print("Raw:", res.read().decode('utf-8'))
    except Exception as e:
        print(f"Error reading {key}: {e}")

read_key("s_1159278181")
read_key("gen_msgs")
