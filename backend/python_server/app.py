# app.py
from fastapi import FastAPI, File, UploadFile, Body, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from pathlib import Path
from io import BytesIO
from PIL import Image
import base64
import tempfile
import cv2
import numpy as np
import os
from starlette.concurrency import run_in_threadpool

# Import your existing analysis/generation functions
# (Make sure these modules are on PYTHONPATH or in same package)
from math_analysis import symmetry, fractal_dimension_boxcount
from image_analysis import generate_kolam, img_to_img

app = FastAPI(
    title="Kolam API",
    description="API to create and analyse Kolams",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev; tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

# ---------- utilities ----------
def image_to_base64(img) -> str:
    """
    Convert a PIL.Image or OpenCV numpy array (BGR) to a base64 PNG string (no prefix).
    """
    if img is None:
        raise ValueError("image_to_base64: img is None")

    if isinstance(img, np.ndarray):
        # assume OpenCV BGR -> convert to RGB
        if img.ndim == 3 and img.shape[2] == 3:
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = Image.fromarray(img)

    if not isinstance(img, Image.Image):
        raise TypeError("image_to_base64 expects a PIL.Image or numpy.ndarray")

    buf = BytesIO()
    img.save(buf, format="PNG")
    return base64.b64encode(buf.getvalue()).decode("utf-8")


async def save_upload(file: UploadFile, dest: Path) -> Path:
    """
    Save FastAPI UploadFile to disk asynchronously.
    """
    with dest.open("wb") as f:
        while True:
            chunk = await file.read(1024 * 1024)
            if not chunk:
                break
            f.write(chunk)
    await file.close()
    return dest


# ---------- Kolam mapping ----------
def get_kolam_type(user_input: str) -> str:
    """
    Map user input string to a canonical kolam keyword.
    Returns one of:
      pulli_kolam, sikku_kolam, kambi_kolam, chikku_kolam, rangoli_kolam, isai_kolam
    or "unknown" if none matched.
    """
    if user_input is None:
        return "unknown"
    text = user_input.lower()

    # synonyms / English hints
    mapping_checks = [
        (["pulli", "dot"], "pulli_kolam"),
        (["sikku", "twist", "twisted"], "sikku_kolam"),
        (["kambi", "line"], "kambi_kolam"),
        (["chikku", "loop"], "chikku_kolam"),
        (["rangoli", "color", "colour", "colourful"], "rangoli_kolam"),
        (["isai", "music", "musical"], "isai_kolam"),
    ]

    for keywords, keyword_out in mapping_checks:
        for kw in keywords:
            if kw in text:
                return keyword_out

    # fallback: try to find close match using substrings
    short = text.replace(" ", "")
    if "pulli" in short or "dot" in short:
        return "pulli_kolam"
    if "sikku" in short or "twist" in short:
        return "sikku_kolam"
    if "kambi" in short or "line" in short:
        return "kambi_kolam"
    if "chikku" in short or "loop" in short:
        return "chikku_kolam"
    if "rangoli" in short or "color" in short or "colour" in short:
        return "rangoli_kolam"
    if "isai" in short or "music" in short:
        return "isai_kolam"

    return "unknown"


# ---------- Request models ----------
class GenerateRequest(BaseModel):
    user_input: str

# ---------- Routes ----------
@app.get("/")
def read_root():
    return {"message": "Welcome to Kolam API"}


@app.post("/math_analysis")
async def math_analysis(file: UploadFile = File(...)):
    """
    Accepts an uploaded image and returns:
      - `symmetry`: PNG data URI for symmetry visualization
      - `fractal_dimension`: PNG data URI for fractal-dimension visualization
    """
    # Save uploaded file temporarily
    contents = await file.read()
    with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as tmp:
        tmp.write(contents)
        tmp_path = tmp.name

    try:
        # Call your processing functions (they may be CPU-bound -> optionally run_in_threadpool)
        # Use run_in_threadpool to avoid blocking the event loop if functions are heavy.
        sym = await run_in_threadpool(symmetry, tmp_path)
        frac_img = await run_in_threadpool(fractal_dimension_boxcount, tmp_path, 128)

        # Convert results to base64 PNGs
        if isinstance(sym, np.ndarray):
            # Assume BGR -> convert
            sym = cv2.cvtColor(sym, cv2.COLOR_BGR2RGB)
            sym = Image.fromarray(sym)

        if isinstance(frac_img, np.ndarray):
            frac_img = cv2.cvtColor(frac_img, cv2.COLOR_BGR2RGB)
            frac_img = Image.fromarray(frac_img)

        sym_b64 = image_to_base64(sym)
        frac_b64 = image_to_base64(frac_img)

        return JSONResponse(content={
            "symmetry": f"data:image/png;base64,{sym_b64}",
            "fractal_dimension": f"data:image/png;base64,{frac_b64}"
        })
    finally:
        try:
            os.remove(tmp_path)
        except Exception:
            pass

@app.post("/generate_image")
async def image_generation(req: GenerateRequest = Body(...)):
    """
    Generate a Kolam image from `user_input` (text) and return:
      - result: data URI of generated PNG,
      - keyword: canonical kolam keyword deduced from user_input
    """
    user_input = req.user_input
    if not isinstance(user_input, str) or user_input.strip() == "":
        raise HTTPException(status_code=400, detail="user_input must be a non-empty string")

    # Determine kolam keyword
    kolam_keyword = get_kolam_type(user_input)

    # Call the image generation (run in threadpool if blocking)
    img = await run_in_threadpool(generate_kolam, user_input)

    # Validate result
    if img is None:
        raise HTTPException(status_code=500, detail="generate_kolam returned None")

    img_b64 = image_to_base64(img)
    return JSONResponse(content={
        "result": f"data:image/png;base64,{img_b64}",
        "keyword": kolam_keyword,
        "input": user_input
    })

@app.post("/img_img_gen")
async def img_img_gen(
    file: UploadFile = File(...),
    user_input: str = Form(...)
):
    """
    Generate a Kolam image from uploaded image + text prompt and return:
      - result: data URI of generated PNG,
      - keyword: canonical kolam keyword deduced from user_input
      - input: the user input text
    """
    # Validate inputs
    if not isinstance(user_input, str) or user_input.strip() == "":
        raise HTTPException(status_code=400, detail="user_input must be a non-empty string")
    
    # Validate file type
    if not file.content_type or not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")

    # Save uploaded file temporarily
    contents = await file.read()
    with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as tmp:
        tmp.write(contents)
        tmp_path = tmp.name

    try:
        # Determine kolam keyword
        kolam_keyword = get_kolam_type(user_input)

        # Call the image-to-image generation (run in threadpool if blocking)
        img = await run_in_threadpool(img_to_img, user_input, tmp_path)

        # Validate result
        if img is None:
            raise HTTPException(status_code=500, detail="img_to_img returned None")

        img_b64 = image_to_base64(img)
        return JSONResponse(content={
            "result": f"data:image/png;base64,{img_b64}",
            "keyword": kolam_keyword,
            "input": user_input
        })
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")
    
    finally:
        # Clean up temporary file
        try:
            os.remove(tmp_path)
        except Exception:
            pass


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)