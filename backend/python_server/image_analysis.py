from dotenv import load_dotenv
load_dotenv()

from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO


# Initialize client (needs GEMINI_API_KEY in .env or environment)
client = genai.Client()

# Prompt template
PROMPT_TEMPLATE = """
You are an expert kolam artist and designer with a deep understanding of cultural significance, aesthetics, and techniques in kolam creation. I want you to help me generate an image based on a specific kolam idea. 

This is what has been shared with me: 

{user_input}

Additionally, I want you to make reasonable assumptions about elements that should be incorporated in the kolam based on the provided information. 

The generated image should be vibrant, culturally resonant, and visually appealing, suitable for use in a specific context that enhances its purpose.

"""
def get_kolam_type(user_input: str) -> str:
    # normalize input
    text = user_input.lower().strip()

    if "pulli" in text or "dot" in text:
        return "pulli"
    elif "sikku" in text or "twisted" in text:
        return "sikku"
    elif "kambi" in text or "line" in text:
        return "kambi"
    elif "chikku" in text or "loop" in text:
        return "chikku"
    elif "rangoli" in text or "color" in text or "colour" in text:
        return "rangoli"
    # elif "isai" in text or "music" in text or "musical" in text:
    #     return "isai_kolam"
    else:
        return "rangoli"  # fallback if nothing matched
    
def generate_kolam(user_input: str, reference_image_path: str = "kolam.jpg"):
    # Fill the template with user input
    prompt = PROMPT_TEMPLATE.format(user_input=user_input)
    image_type = get_kolam_type(user_input)

    # Load the reference image
    reference_image_path = f"kolams/{image_type}.png"
    image = Image.open(reference_image_path)

    # Send request to Gemini
    response = client.models.generate_content(
        model="gemini-2.5-flash-image-preview",
        contents=[prompt, image]
    )

    # Handle response parts
    for part in response.candidates[0].content.parts:
        if part.text is not None:
            print("Text output:\n", part.text)
        elif part.inline_data is not None:
            gen_img = Image.open(BytesIO(part.inline_data.data))
            return gen_img   # ✅ return instead of saving

    return None   # ✅ explicit fallback if nothing is returned

def img_to_img(user_input: str, reference_image_path: str = "kolam.jpg"):
    # Fill the template with user input
    prompt = PROMPT_TEMPLATE.format(user_input=user_input)
    image_type = get_kolam_type(user_input)

    # Load the reference image
    image = Image.open(reference_image_path)

    # Send request to Gemini
    response = client.models.generate_content(
        model="gemini-2.5-flash-image-preview",
        contents=[prompt, image]
    )

    # Handle response parts
    for part in response.candidates[0].content.parts:
        if part.text is not None:
            print("Text output:\n", part.text)
        elif part.inline_data is not None:
            gen_img = Image.open(BytesIO(part.inline_data.data))
            return gen_img   # ✅ return instead of saving

    return None   # ✅ explicit fallback if nothing is returned


if __name__ == "__main__":
    # Example: accept user input from terminal
    user_input = input("Describe your kolam idea (theme, colors, style, purpose): ")
    generate_kolam(user_input)