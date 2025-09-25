from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from math_analysis import symmetry, fractal_dimension_boxcount
from io import BytesIO
from PIL import Image
import base64
import tempfile
import cv2
import numpy as np
import os

app = FastAPI(
    title="Kolam API",
    description="API to create and analyse Kolams",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev, allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def read_root():
    return {"message": "Welcome to Kolam API"}

@app.post("/math_analysis")
async def math_analysis(file: UploadFile = File(...)):
    # Save uploaded file temporarily
    contents = await file.read()
    with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as tmp:
        tmp.write(contents)
        tmp_path = tmp.name

    # Call your functions with the file path
    sym = symmetry(tmp_path)  
    frac_dim = fractal_dimension_boxcount(tmp_path, threshold=128)

    # Convert OpenCV/numpy output -> PIL for encoding
    if isinstance(sym, np.ndarray):
        sym = cv2.cvtColor(sym, cv2.COLOR_BGR2RGB)
        sym = Image.fromarray(sym)

    # Convert images to base64
    def image_to_base64(img) -> str:
        if isinstance(img, np.ndarray):
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            img = Image.fromarray(img)
        buf = BytesIO()
        img.save(buf, format="PNG")
        return base64.b64encode(buf.getvalue()).decode("utf-8")

    sym_b64 = image_to_base64(sym)
    frac_dim = image_to_base64(frac_dim)
    os.remove(tmp_path)
    return JSONResponse(content={
        "symmetry": f"data:image/png;base64,{sym_b64}",
        "fractal_dimension": f"data:image/png;base64,{frac_dim}"
    })
