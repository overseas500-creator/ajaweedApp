import urllib.parse
import json

app_key = "x3odkkjc"
key = "s_test_unicode"

payload = {"text": "رسالة خاصة ص"}
json_str = json.dumps(payload, separators=(',', ':'), ensure_ascii=True)
json_tilde = json_str.replace(":", "~")
encoded = urllib.parse.quote(json_tilde)

url = f"https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/{app_key}/{key}/{encoded}"
print("URL:", url)
print("Encoded length:", len(encoded))
print("Raw length:", len(json_tilde))
