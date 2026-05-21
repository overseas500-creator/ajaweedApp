import urllib.request
import urllib.parse
import json

app_key = "x3odkkjc"
key = "s_test_query"

# We will test different query parameter names: 'value', 'val', 'v', 'data'
def test_query(param_name, val):
    encoded_val = urllib.parse.quote(val)
    url = f"https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/{app_key}/{key}?{param_name}={encoded_val}"
    try:
        req = urllib.request.Request(url, method="POST", headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as res:
            print(f"Testing ?{param_name}=...: Status: {res.status}, Body: {res.read().decode('utf-8')}")
            
        # Let's read it back to see if it actually updated to the value or if it updated to empty/null
        url_read = f"https://keyvalue.immanuel.co/api/KeyVal/GetValue/{app_key}/{key}"
        req_read = urllib.request.Request(url_read, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req_read) as res:
            print(f"  Read back value: {res.read().decode('utf-8')}")
    except Exception as e:
        print(f"Testing ?{param_name}=... failed: {e}")

test_query("value", "query_value_test_123")
test_query("val", "query_val_test_123")
test_query("v", "query_v_test_123")
