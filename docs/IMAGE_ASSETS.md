# Original website assets

Created with the built-in imagegen tool for the user's supplied visual references. These are illustrative generated images, not listings, customer photographs, endorsements, or evidence about a specific vehicle. No external stock license is implied.

Optimized local copies:

- `public/images/mountain-suv.webp`: 1774 × 887, 244,030 bytes.
- `public/images/guide-inspection.webp`: 800 × 533, 28,374 bytes.
- `public/images/guide-financing.webp`: 800 × 533, 21,664 bytes.
- `public/images/guide-negotiation.webp`: 800 × 533, 16,928 bytes.

Sharp was used only for proportional resizing and WebP encoding. Originals remain in Codex's generated-images directory; the application uses the project-local copies through `next/image` with responsive sizes. No in-image text is used as UI.

## Final generation prompts

### Mountain SUV

Use case: ads-marketing. Asset type: photorealistic background photograph for a premium automotive research website, not a UI mockup. Primary request: a clean white modern midsize SUV in front three-quarter view, facing slightly left, parked safely on a scenic alpine road beside a lake, blue mountains and evergreen forest behind it, soft bright morning daylight and natural reflections. Composition: wide landscape 2:1, image roughly 2048 by 1024; SUV fully visible, including all wheels, positioned in the right-center at about 68 percent of image width and in the lower half. Left 45 percent is airy pale blue sky and softly detailed lake/mountain landscape with generous quiet space for dark website headings that will be added in code. Right scenery crisp and realistic. Premium editorial automotive photography, grounded tire shadows, convincing proportions, natural white paint and dark green foliage. No readable brand marks, no logos, no text, no watermarks, no people, no graphic overlays or UI. Image is illustrative, not a real car listing.

### Inspection guide

Use case: photorealistic-natural. Asset type: editorial thumbnail for a used-car research guide. A cropped close-up of a person's hand holding a magnifying glass near the headlight and white painted fender of a parked modern used car, outdoor natural daylight, neutral pale green and white tones, thoughtful practical inspection mood, premium editorial photography. Landscape 3:2 composition with subject on right half and simple pale negative space on the left to place a small icon in code. No faces, no text, no logos, no watermarks.

### Financing guide

Use case: photorealistic-natural. Asset type: editorial thumbnail for a car finance guide. Overhead close-up of a black calculator, a neat plain financial worksheet with indistinct lines and no readable text, a black pen and silver car key on a bright white desk. Clean restrained blue-gray and white tones, natural light from a window, premium realistic editorial photography, landscape 3:2 composition with objects primarily on right half and clear white negative space left. No brands, no readable numbers or text, no watermark.

### Negotiation guide

Use case: photorealistic-natural. Asset type: editorial thumbnail for a used-car price negotiation guide. Close cropped view of two adults' hands sharing a simple handshake beside a parked white car, only forearms and hands visible, one navy sleeve and one light neutral sleeve, subtle car body blurred behind, warm natural daylight, premium realistic photography. Landscape 3:2 with handshake on right half and softly blurred pale background left for an icon in code. No faces, no logos, no text, no watermark.

## Interior-page image expansion

Generated for the October 14, 2026 redesign request. Each is 1774 by 887 pixels. Images are assigned centrally in `data/visuals.ts`.

| Local asset | Bytes | Primary use |
| --- | ---: | --- |
| `public/images/coastal-sedan.webp` | 285,054 | Tools hub, affordability, depreciation, lease comparison |
| `public/images/inspection-workshop.webp` | 100,906 | Inspection tool and guide |
| `public/images/fuel-stop.webp` | 169,278 | Fuel and ownership-cost tools and guidance |
| `public/images/car-keys.webp` | 83,708 | Value estimate, trade-in tool and guide |

### Additional final generation prompts

#### coastal-sedan

A well-kept blue-gray midsize sedan, three-quarter front view facing left, parked on a quiet coastal overlook above a blue sea. Cypress trees and distant green hills, gentle morning sun, premium but approachable automotive photography. Original photorealistic editorial photograph for a trustworthy used-car planning website. Wide 2:1 landscape, no text, no logos, no watermarks, no UI. Natural believable details, bright soft daylight, calm teal-green and warm white color harmony. Compose the main subject in the rightmost 45 percent, keep the left 50 percent softly lit and quiet for a website heading added in code. No readable plates, no exaggerated luxury styling.

#### inspection-workshop

The front-right quarter of a white compact car with the hood safely raised inside a clean independent workshop. A mechanic's forearm and gloved hand using a small inspection flashlight near the engine bay, face out of frame. The empty left side is softly blurred pale workshop wall with daylight. Neat practical service setting, no dramatic industrial grime. Original photorealistic editorial photograph for a trustworthy used-car planning website. Wide 2:1 landscape, no text, no logos, no watermarks, no UI. Natural believable details, bright soft daylight, calm teal-green and warm white color harmony. Compose the main subject in the rightmost 45 percent, keep the left 50 percent softly lit and quiet for a website heading added in code. No readable plates, no exaggerated luxury styling.

#### fuel-stop

A graphite station wagon parked beside a simple modern fuel pump at a clean tree-lined roadside station, viewed from rear three-quarter angle on the right. A green fuel nozzle safely inserted into its fuel port, nobody driving. Low soft green hills behind. Empty left side is pale sunlit forecourt, airy and uncluttered. Fuel pump shows no readable prices or branding. Original photorealistic editorial photograph for a trustworthy used-car planning website. Wide 2:1 landscape, no text, no logos, no watermarks, no UI. Natural believable details, bright soft daylight, calm teal-green and warm white color harmony. Compose the main subject in the rightmost 45 percent, keep the left 50 percent softly lit and quiet for a website heading added in code. No readable plates, no exaggerated luxury styling.

#### car-keys

Close view of an adult hand holding a simple black car key fob above an open palm at the right of frame, with a clean pearl-white used sedan parked in a leafy suburban driveway behind. Only hands are visible, no faces. Authentic car-ownership handover concept, soft natural morning light. Left half is a softly blurred pale driveway and greenery, generous negative space. Original photorealistic editorial photograph for a trustworthy used-car planning website. Wide 2:1 landscape, no text, no logos, no watermarks, no UI. Natural believable details, bright soft daylight, calm teal-green and warm white color harmony. Compose the main subject in the rightmost 45 percent, keep the left 50 percent softly lit and quiet for a website heading added in code. No readable plates, no exaggerated luxury styling.
