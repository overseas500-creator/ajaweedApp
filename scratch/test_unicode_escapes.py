import urllib.request
import urllib.parse
import json

app_key = "x3odkkjc"
key = "s_test_unicode"

# Write JSON with unicode escapes (ensure_ascii=True is the default!)
payload = {"text": "رسالة خاصة ص"}
json_str = json.dumps(payload, separators=(',', ':'), ensure_ascii=True)
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
        print("Raw body response:", repr(raw_body))
        
        # Now let's try replacing tildes with colons and parsing!
        # First unescape the raw JSON string
        parsed_str = json.loads(raw_body)
        print("Parsed string:", repr(parsed_str))
        
        # Replace tildes back to colons
        json_with_colons = parsed_str.replace("~", ":")
        print("JSON with colons:", repr(json_with_colons))
        
        # Parse final JSON
        final_payload = json.loads(json_with_colons)
        print("Final parsed payload:", final_payload)
        
except Exception as e:
    print("Error:", e)
