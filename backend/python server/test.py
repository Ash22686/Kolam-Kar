import requests
import base64

# API endpoint
url = "http://127.0.0.1:8000/math_analysis"

# Path to local image to test
image_path = "kolam.webp"

# Send request
with open(image_path, "rb") as f:
    files = {"file": f}
    response = requests.post(url, files=files)

# Handle response
if response.status_code == 200:
    data = response.json()
    img_b64 = data["fractal_dimension"]

    # Strip "data:image/png;base64," prefix
    if img_b64.startswith("data:image"):
        img_b64 = img_b64.split(",")[1]

    # Decode and save
    img_bytes = base64.b64decode(img_b64)
    with open("result.png", "wb") as out_file:
        out_file.write(img_bytes)

    print("✅ Processed image saved as result.png")
else:
    print("❌ Error:", response.status_code, response.text)
