import urllib.request
import json
import re

app_key = "x3odkkjc"
key = "s_1159278181"
url = f"https://keyvalue.immanuel.co/api/KeyVal/GetValue/{app_key}/{key}"

def safe_decode_unicode(text):
    return re.sub(r'~u([0-9a-fA-F]{4})', lambda m: chr(int(m.group(1), 16)), text)

try:
    print("Fetching s_1159278181 from cloud...")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as res:
        raw_body = res.read().decode('utf-8')
        print("Raw Body from server:", repr(raw_body))
        
        # Simulating safeParseKeyValue
        s = raw_body.strip()
        if s.startswith('"') and s.endswith('"'):
            s = json.loads(s)
            
        print("After unquoting string:", repr(s))
        
        # 1. Decode Unicode escapes first
        decoded = safe_decode_unicode(s)
        print("After decoding custom Unicode escapes:", repr(decoded))
        
        # 2. Restore colons
        decoded_json = decoded.replace("~", ":")
        print("After restoring colons:", repr(decoded_json))
        
        # 3. Parse JSON
        payload = json.loads(decoded_json)
        print("\nSUCCESS! Parsed JSON:")
        print(json.dumps(payload, indent=2, ensure_ascii=False))
        
except Exception as e:
    print("Error:", e)
