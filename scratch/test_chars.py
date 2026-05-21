import urllib.request
import urllib.parse

app_key = "x3odkkjc"
key = "s_1159278181"

def test_char(name, char_str):
    encoded = urllib.parse.quote(char_str)
    url = f"https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/{app_key}/{key}/{encoded}"
    try:
        req = urllib.request.Request(url, method="POST", headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as res:
            body = res.read().decode('utf-8')
            print(f"Char {name} ('{char_str}'): Status: {res.status}, Body: {body}")
            return True
    except Exception as e:
        print(f"Char {name} ('{char_str}') failed: {e}")
        return False

test_char("Double Quote", '"')
test_char("Colon", ':')
test_char("Comma", ',')
test_char("Left Brace", '{')
test_char("Right Brace", '}')
test_char("Left Bracket", '[')
test_char("Right Bracket", ']')
test_char("Forward Slash", '/')
test_char("Backslash", '\\')
test_char("Percent", '%')
test_char("Safe ASCII Long", 'A' * 210)
test_char("Safe ASCII Limit", 'A' * 220)
