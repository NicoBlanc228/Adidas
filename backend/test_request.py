import urllib.request
import urllib.error

try:
    response = urllib.request.urlopen("http://127.0.0.1:8000/api/users/")
    print("Status:", response.status)
    print("Response:", response.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print("HTTP Error:", e.code, e.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)