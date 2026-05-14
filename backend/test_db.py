import os
from src.config.env import settings

print("DATABASE_URL:", repr(settings.DATABASE_URL))
print("Length:", len(settings.DATABASE_URL))

# Try to encode/decode
try:
    encoded = settings.DATABASE_URL.encode('utf-8')
    decoded = encoded.decode('utf-8')
    print("UTF-8 roundtrip OK")
except UnicodeError as e:
    print("UTF-8 error:", e)