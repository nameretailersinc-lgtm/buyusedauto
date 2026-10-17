import sharp from 'sharp';
import {writeFile} from 'node:fs/promises';
const assets=JSON.parse(process.env.COUNTRY_IMAGE_INPUTS);
for(const {name,source} of assets)await sharp(source).resize({width:1200,withoutEnlargement:true}).webp({quality:82}).toFile(`public/images/${name}.webp`);
await writeFile('reports/country-guide-image-prompts.json',JSON.stringify({mode:'built-in image_gen',promptTemplate:'Use case: photorealistic-natural. Asset type: editorial cover for a country-specific used car buying guide. Primary request: {scene} Professional realistic automotive photography, landscape 3:2 composition, centered subjects suitable for responsive cropping, natural restrained colors. No logos, watermarks, readable registration details, document text, or text overlays. Do not depict an official endorsement.',assets:assets.map(({name,scene})=>({path:`public/images/${name}.webp`,scene}))},null,2));
