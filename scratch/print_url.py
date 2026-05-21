import urllib.parse
import json

app_key = "x3odkkjc"
key = "s_1159278181"

payload = {"id":"1159278181","attendance":"present","attendanceTime":"2026-05-21 08-30 ص","earlyDaysCount":5,"lateDaysCount":2,"absentDaysCount":1,"privateMessages":[]}
json_str = json.dumps(payload, ensure_ascii=False) # Keep Arabic character readable
json_no_colon = json_str.replace(":", "=")
encoded = urllib.parse.quote(json_no_colon)
url = f"https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/{app_key}/{key}/{encoded}"
print("URL:", url)
print("Encoded length:", len(encoded))
print("Raw length:", len(json_no_colon))
