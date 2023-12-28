import {zGetImageParams, type GetImageParams} from './schemas';

const vercelWidths = [256, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];

function vercelSrc({quality, src, width}: Pick<GetImageParams, 'quality' | 'src' | 'width'>) {
  return `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

function vercelSrcset({quality, src}: Pick<GetImageParams, 'quality' | 'src'>) {
  return vercelWidths.map((width) => `${vercelSrc({quality, src, width})} ${width}w`).join(',');
}

export function getImage(params: GetImageParams) {
  const {height: imgHeight, prod, quality, src, width: imgWidth} = zGetImageParams.parse(params);
  const width = vercelWidths.find((width) => width >= imgWidth) ?? vercelWidths.at(-1)!;
  const height = Math.round((width * imgHeight) / imgWidth);
  return {
    decoding: 'async' as const,
    height,
    loading: 'lazy' as const,
    src: prod ? vercelSrc({quality, src, width}) : src,
    srcset: prod ? vercelSrcset({quality, src}) : undefined,
    width,
  };
}
