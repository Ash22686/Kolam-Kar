import torch
from diffusers import DiffusionPipeline, DPMSolverMultistepScheduler
from PIL import Image

def generate(prompt: str, model_id: str = "runwayml/stable-diffusion-v1-5", 
             height: int = 768, width: int = 768, guidance_scale: float = 7.5, 
             num_inference_steps: int = 50, seed: int = 42):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    # Load pipeline
    pipe = DiffusionPipeline.from_pretrained(
        model_id,
        torch_dtype=torch.float16 if device.type == "cuda" else torch.float32,
        revision="fp16" if device.type == "cuda" else None,
        use_safetensors=True,
        safety_checker=None  # optional: remove safety filtering if you want full control
    )
    pipe = pipe.to(device)

    # Optionally choose a scheduler (default may work fine)
    pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)

    # Set seed
    generator = torch.Generator(device).manual_seed(seed)

    # Generate
    out = pipe(
        prompt=prompt,
        height=height,
        width=width,
        guidance_scale=guidance_scale,
        num_inference_steps=num_inference_steps,
        generator=generator
    )

    image = out.images[0]
    return image

if __name__ == "__main__":
    prompt = "Astronaut in a jungle, cold color palette, muted colors, detailed, 8k"
    img = generate(prompt)
    img.save("out.png")
    print("Saved output to out.png")
