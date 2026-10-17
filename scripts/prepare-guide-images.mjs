import sharp from 'sharp';
import {writeFile} from 'node:fs/promises';
const assets = JSON.parse(process.env.GUIDE_IMAGE_INPUTS);
for (const {name, source} of assets) {
  await sharp(source).resize({width: 1200, withoutEnlargement: true}).webp({quality: 82}).toFile(`public/images/${name}.webp`);
}
await writeFile('reports/guide-image-prompts.json', JSON.stringify({mode: 'built-in image_gen', promptTemplate: 'Use case: photorealistic-natural. Asset type: landscape editorial website guide cover. Primary request: {scene} Style: realistic professional automotive editorial photography, restrained natural colors, landscape 3:2 composition with the subject centered for responsive cropping. Constraints: no logos, no watermarks, no text overlays, no promotional claims.', assets: assets.map(({name,scene}) => ({path: `public/images/${name}.webp`, scene}))}, null, 2));
