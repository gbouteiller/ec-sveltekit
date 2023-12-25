import slugify from '@sindresorhus/slugify';
import type sharp from 'sharp';
import type {GetImage} from './schemas';

const widths = [256, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];

function vercelSrc(src: string, width: number, quality: number) {
  return `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

function vercelSrcset(src: string, quality: number) {
  return widths.map((width) => `${vercelSrc(src, width, quality)} ${width}w`).join(',');
}

export function getDimensions({height, width}: Omit<ImgMetadata, 'format'>, aspectRatio?: number) {
  if (!aspectRatio) aspectRatio = width / height;
  if (aspectRatio >= width / height) return {height: Math.round(width / aspectRatio), width};
  return {height, width: Math.round(height * aspectRatio)};
}

export function getName(alt: string, {format}: ImgMetadata, {height, width}: ImgDimensions) {
  return `${slugify(alt)}_${width}x${height}.${format}`;
}


export function getImage(
  src: string,
  alt: string,
  height: number,
  width: number,
  aspectRatio: number | undefined,
  quality: number,
  download: boolean,
  dev: boolean
): GetImage {
  if (download) {
    const dimensions = getDimensions({height, width}, aspectRatio);
    const name = getName(alt, {format: src.split('.').at(-1)!}, dimensions);
    src = `/_images/${name}`;
  }

  return {
    decoding: 'async',
    height,
    loading: 'lazy',
    src: dev ? src : vercelSrc(src, widths.at(-1)!, quality),
    srcset: dev ? undefined : vercelSrcset(src, quality),
    width,
  };
}

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type ImgDimensions = Pick<ImgMetadata, 'height' | 'width'>;
export type ImgMetadata = Required<Pick<sharp.Metadata, 'format' | 'height' | 'width'>>;