import fs from 'fs-extra';
import sharp, {type Sharp} from 'sharp';
import {getDimensions, getName, type ImgDimensions} from './utils';

async function getMetadata(sharpImg: Sharp) {
  const {format, height, width} = await sharpImg.metadata();
  if (!format || !height || !width) throw new Error('Image metadata are undefined.');
  return {format, height, width};
}

function getPath(name: string, dev: boolean) {
  return `${imagesDir(dev)}/${name}`;
}

function imagesDir(dev: boolean) {
  return dev ? './static/_images' : './.vercel/output/static/_images';
}

async function writeFile(sharpImg: Sharp, {height, width}: ImgDimensions, path: string, dev: boolean) {
  await fs.mkdir(imagesDir(dev), {recursive: true});
  return sharpImg.resize(width, height).toFile(path);
}

export async function downloadImage(src: string, alt: string, width: number, height: number, aspectRatio: number | undefined, dev: boolean) {
  const format = src.split('?')[0].split('.').at(-1)!;
  const maybeName = getName(alt, {format}, getDimensions({height, width}, aspectRatio));
  const maybePath = getPath(maybeName, dev);
  if (fs.existsSync(maybePath)) return `/_images/${maybeName}`;
  const res = await fetch(src);
  const buffer = await res.arrayBuffer();
  const sharpImg = sharp(buffer);
  const metadata = await getMetadata(sharpImg);
  const dimensions = getDimensions(metadata, aspectRatio);
  const name = getName(alt, metadata, dimensions);
  const path = getPath(name, dev);
  if (!fs.existsSync(path)) await writeFile(sharpImg, dimensions, path, dev);
  return `/_images/${name}`;
}

// import eFetch from '@11ty/eleventy-fetch';
// import fs from 'node:fs/promises';
// import sharp from 'sharp';

// //const lqips = new Map(Object.entries(lqipsJson));
// const imagesPath = './.vercel/output/static/images';
// const cache = '1d';
// const cacheDir = '.cache';

// export function getAttrs({aspectRatio: _0, class: _1, fit: _2, height: _3, slug: _4, src: _5, widths: _6, ...attrs}: ImgProps) {
//   return attrs;
// }

// export function getBuffer({src}: ImgProps) {
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//   return eFetch(src, {directory: cacheDir, duration: cache}) as Promise<Buffer>;
// }

// export async function getImg(props: ImgProps) {
//   const attrs = getAttrs(props);
//   const buffer = await getBuffer(props);
//   const metadata = await getMetadata(buffer);
//   const dimensions = getDimensions(props, metadata);
//   const name = getName(props, metadata, dimensions);
//   const path = getPath(name);
//   if (!(await imgExists(path))) await writeFile(buffer, dimensions, path);
//   const lqip = await getLqip(name);
//   const srcset = getSrcSet(props, `images/${name}`);
//   return {img: {...attrs, ...dimensions, src: import.meta.env.PROD ? `images/${name}` : path.slice(1), srcset}, lqip};
// }

// export async function getLqip(name: string) {
//   if (lqips.has(name)) return lqips.get(name)!;
//   const data = await sharp(getPath(name)).resize(16).blur(2).webp({alphaQuality: 20, quality: 20, smartSubsample: true}).toBuffer();
//   const lqip = `data:image/webp;base64,${data.toString('base64')}`;
//   lqips.set(name, lqip);
//   await fs.writeFile('./public/lqips.json', JSON.stringify({...Object.fromEntries(lqips)}));
//   return lqip;
// }

// export function getName({slug}: ImgProps, {format}: ImgMetadata, {height, width}: ImgDimensions) {
//   return `${slug}_${width}x${height}.${format}`;
// }

// export function getPath(name: string) {
//   return `${imagesPath}/${name}`;
// }

// export function getSrcSet({widths}: ImgProps, path: string) {
//   return import.meta.env.PROD ? widths.map((w) => `/_vercel/image?url=${encodeURIComponent(path)}&w=${w}&q=75 ${w}w`).join(',') : '';
// }

// export function imgExists(path: string) {
//   return fs.stat(path).then(
//     () => true,
//     () => false
//   );
// }

// export async function writeFile(buffer: Buffer, {height, width}: ImgDimensions, path: string) {
//   await fs.mkdir(imagesPath, {recursive: true});
//   return sharp(buffer).resize(width, height).toFile(path);
// }

// // TYPES -----------------------------------------------------------------------------------------------------------------------------------

// export type ImgCommonProps = Omit<RemoteImageProps, 'height' | 'slot' | 'width'> & {
//   alt: string;
//   fit?: 'cover' | 'contain' | 'fill';
//   slug: string;
//   src: string;
//   widths: number[];
// };

// export type ImgProps = Simplify<ImgCommonProps & ({aspectRatio: number; height?: never} | {aspectRatio?: never; height?: number})>;
// export type GetImg = Awaited<ReturnType<typeof getImg>>;
