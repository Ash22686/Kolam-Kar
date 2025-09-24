import cv2
import numpy as np
import matplotlib.pyplot as plt
from scipy.signal import find_peaks
from PIL import Image
from io import BytesIO

def reflect_points(img, angle):
    """Reflect image about a line through its center at given angle (degrees)."""
    h, w = img.shape
    center = (w // 2, h // 2)
    M1 = cv2.getRotationMatrix2D(center, -angle, 1.0)
    rotated = cv2.warpAffine(img, M1, (w, h))
    flipped = cv2.flip(rotated, 0)
    M2 = cv2.getRotationMatrix2D(center, angle, 1.0)
    back = cv2.warpAffine(flipped, M2, (w, h))
    return back

def symmetry_scores(img, step=1):
    """Return scores for all tested axes (0–180°)."""
    scores = []
    angles = np.arange(0, 180, step)
    for ang in angles:
        refl = reflect_points(img, ang)
        score = np.sum(img * refl) / np.sqrt(np.sum(img**2) * np.sum(refl**2) + 1e-9)
        scores.append(score)
    return angles, np.array(scores)

def draw_symmetry_lines(img, angles):
    """Draw multiple symmetry lines on the image."""
    h, w = img.shape
    cx, cy = w // 2, h // 2
    color_img = cv2.cvtColor((img * 255).astype(np.uint8), cv2.COLOR_GRAY2BGR)
    for angle in angles:
        rad = np.deg2rad(angle)
        length = max(h, w)
        dx = int(np.cos(rad) * length)
        dy = int(np.sin(rad) * length)
        cv2.line(color_img, (cx - dx, cy - dy), (cx + dx, cy + dy), (255, 0, 0), 1)
    return color_img

def symmetry(image_path, sensitivity=0.85):
    # 1. Load & preprocess the image
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        print(f"Error: Could not load image from {image_path}")
        return
        
    img = cv2.resize(img, (256, 256))
    _, th_img = cv2.threshold(img, 0, 1, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

    # 2. Compute symmetry scores
    angles, scores = symmetry_scores(th_img, step=1)

    # 3. Circular extension for peak detection
    max_score = np.max(scores)
    height_threshold = max_score * sensitivity

    extended_scores = np.concatenate([scores, scores])
    extended_angles = np.concatenate([angles, angles + 180])

    peak_indices, _ = find_peaks(extended_scores, height=height_threshold, prominence=0.01)

    strong_axes_angles = np.mod(extended_angles[peak_indices], 180)
    strong_axes_angles = np.unique(np.round(strong_axes_angles, 1))

    print("\n--- Detected Symmetry Axes ---")
    if len(strong_axes_angles) == 0:
        print("No strong symmetry axes found with current settings.")
    else:
        for i, angle in enumerate(strong_axes_angles):
            print(f"Axis {i+1}: {angle:.1f}° (Score: {scores[int(angle)] if angle in angles else 'n/a'})")

    # 4. Draw the detected axes
    result_img = draw_symmetry_lines(th_img, strong_axes_angles)

    fig, axes = plt.subplots(1, 2, figsize=(12, 6))
    axes[0].plot(angles, scores, label='Symmetry Score')
    axes[0].plot(strong_axes_angles, [scores[int(a)] for a in strong_axes_angles], "rx", label='Detected Peaks')
    axes[0].axhline(y=height_threshold, color='g', linestyle='--', label=f'Threshold ({sensitivity*100:.0f}%)')
    axes[0].set_title('Symmetry Score vs. Angle')
    axes[0].set_xlabel('Angle (degrees)')
    axes[0].set_ylabel('Normalized Score')
    axes[0].grid(True)
    axes[0].legend()
    axes[0].set_xticks(np.arange(0, 181, 30))

    axes[1].imshow(result_img)
    axes[1].set_title(f'Detected {len(strong_axes_angles)} Symmetry Lines')
    axes[1].axis('off')

    plt.tight_layout()

    # Save figure to a PIL image
    buf = BytesIO()
    fig.savefig(buf, format='PNG')
    buf.seek(0)
    plt.close(fig)
    pil_img = Image.open(buf)

    return pil_img
    

def fractal_dimension_boxcount(image_path, threshold=128):
    # Load and convert to grayscale
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    assert img is not None, "Error: image not found."
    
    # Binarize (strokes = 1, background = 0)
    _, binary = cv2.threshold(img, threshold, 255, cv2.THRESH_BINARY_INV)
    binary = binary // 255  # scale to {0,1}
    
    # Sizes of the grid boxes
    sizes = 2**np.arange(1, int(np.log2(min(binary.shape))), 1)
    counts = []
    
    for size in sizes:
        # Resize image so dimensions are multiples of box size
        new_shape = (binary.shape[0] // size * size, binary.shape[1] // size * size)
        resized = binary[:new_shape[0], :new_shape[1]]
        
        # Partition into boxes and count non-empty ones
        S = resized.reshape((new_shape[0]//size, size, new_shape[1]//size, size))
        S = S.max(axis=(1,3))
        counts.append(np.sum(S > 0))
    
    # Linear fit in log-log space
    coeffs = np.polyfit(np.log(sizes), np.log(counts), 1)
    fractal_dim = -coeffs[0]
    
    # --- Visualization ---
    fig, ax = plt.subplots(1, 2, figsize=(12, 6))
    
    # Show Kolam with an overlay grid (for one size)
    overlay = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)
    step = sizes[len(sizes)//3]  # choose mid grid size
    for x in range(0, overlay.shape[1], step):
        cv2.line(overlay, (x,0), (x,overlay.shape[0]), (0,0,255), 1)
    for y in range(0, overlay.shape[0], step):
        cv2.line(overlay, (0,y), (overlay.shape[1],y), (0,0,255), 1)
    ax[0].imshow(overlay)
    ax[0].set_title("Kolam with grid overlay")
    ax[0].axis("off")
    
    # Plot log-log fit
    ax[1].plot(np.log(sizes), np.log(counts), "o-", label="data")
    ax[1].plot(np.log(sizes), np.polyval(coeffs, np.log(sizes)), "--", label=f"fit: D={fractal_dim:.3f}")
    ax[1].set_xlabel("log(Box size)")
    ax[1].set_ylabel("log(Count)")
    ax[1].legend()
    ax[1].set_title("Box-counting fractal analysis")
    
    plt.tight_layout()

    # Save figure to a PIL image
    buf = BytesIO()
    fig.savefig(buf, format='PNG')
    buf.seek(0)
    plt.close(fig)
    pil_img = Image.open(buf)

    return pil_img

