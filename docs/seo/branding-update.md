# Supplied logo replacement — 2026-10-16

Source: owner's `public/brand/logo new.png`, preserved unchanged. `scripts/trace-brand-logo.py` traces its visible artwork and lettering into actual SVG paths with sixteen quantized color layers and a silhouette base. These are approximations of the PNG's shading, not an original editable design source. No PNG is embedded in the SVGs.

- Full artwork: `/brand/logo.svg` and `/brand/logo-wordmark.svg`.
- Compact car/speedometer artwork: `/brand/logo-mark.svg`.
- Header/footer: optimized WebP derived from the vector wordmark; reserved aspect ratio and a white backing preserve legibility in dark mode.
- Existing mark/master/wordmark PNG, WebP, social avatar, Apple/app icons, ICO/PNG favicons and static social covers regenerated from these vectors. Added `/favicon.svg` and `/brand/social-cover.svg`.
- Dynamic `/og` includes the new logo and tagline. Next's server-file trace includes the vector source needed at runtime.

Recreate with `python scripts/trace-brand-logo.py`, then `node scripts/export-brand-assets.mjs`. The trace requires the locally installed Pillow, NumPy and OpenCV; exported assets are committed, so these Python packages are not application runtime dependencies. Existing asset URLs remain available.

Checks: SVG exports contain path geometry, no embedded raster; static social cover and dynamic OG output visually inspected. Home captures at 360/768/1280 show no horizontal overflow. No deployment or production cache refresh was performed; old browser/social cache entries may persist until a separately approved release is deployed and recrawled.
