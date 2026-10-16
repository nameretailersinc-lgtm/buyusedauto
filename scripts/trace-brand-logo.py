"""Trace the owner's transparent PNG into SVG paths, without embedded raster.
Requires locally installed Pillow, NumPy and OpenCV. Shading is quantized to
sixteen colors; the supplied text is traced rather than replaced with a font.
"""
from pathlib import Path
import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
rgba = np.asarray(Image.open(ROOT / "public/brand/logo new.png").convert("RGBA"))
visible = rgba[:, :, 3] >= 96
cv2.setRNGSeed(42)
_, assignments, palette = cv2.kmeans(rgba[:, :, :3][visible].astype(np.float32), 16, None, (cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_MAX_ITER, 40, 0.3), 1, cv2.KMEANS_PP_CENTERS)
labels = np.full(visible.shape, -1, dtype=np.int16)
labels[visible] = assignments[:, 0]


def trace(name, bottom=None):
    mask = visible.copy()
    if bottom is not None:
        mask[bottom:, :] = False
    ys, xs = np.where(mask)
    x0, y0, x1, y1 = int(xs.min()), int(ys.min()), int(xs.max()+1), int(ys.max()+1)
    silhouette, _ = cv2.findContours(mask.astype(np.uint8)*255, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    outline = []
    for contour in silhouette:
        if abs(cv2.contourArea(contour)) >= 3:
            points = cv2.approxPolyDP(contour, 0.4, True)[:, 0, :]
            if len(points) >= 3:
                outline.append("M"+"L".join(f"{x},{y}" for x, y in points)+"Z")
    paths = [f'<path fill="#081724" fill-rule="evenodd" d="{"".join(outline)}"/>']
    for index, color in enumerate(palette):
        layer = ((labels == index) & mask).astype(np.uint8)*255
        contours, _ = cv2.findContours(layer, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
        commands = []
        for contour in contours:
            if abs(cv2.contourArea(contour)) < 3:
                continue
            points = cv2.approxPolyDP(contour, 0.55, True)[:, 0, :]
            if len(points) >= 3:
                commands.append("M"+"L".join(f"{x},{y}" for x, y in points)+"Z")
        if commands:
            fill = "#"+"".join(f"{int(round(channel)):02x}" for channel in color)
            paths.append(f'<path fill="{fill}" stroke="{fill}" stroke-width="1.5" stroke-linejoin="round" fill-rule="evenodd" d="{"".join(commands)}"/>')
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{x1-x0}" height="{y1-y0}" viewBox="{x0} {y0} {x1-x0} {y1-y0}" role="img"><title>BuyUsedAutomobiles.com — Find, Compare, Buy</title>{"".join(paths)}</svg>\n'
    (ROOT / f"public/brand/{name}.svg").write_text(svg, encoding="utf-8")
    print(f"{name}.svg: {x1-x0} x {y1-y0}; {len(paths)} vector color layers")
    return svg


wordmark = trace("logo-wordmark")
trace("logo-mark", bottom=580)
(ROOT / "public/brand/logo.svg").write_text(wordmark, encoding="utf-8")
