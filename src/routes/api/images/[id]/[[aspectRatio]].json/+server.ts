import {cacheImage, findEntries, findEntry} from '$lib/notion/server';
import {zDataEntry} from '@niama/notion-tools';
import {json} from '@sveltejs/kit';
import {z} from 'zod';
import type {EntryGenerator, RequestHandler} from './$types';

// PRERENDER -------------------------------------------------------------------------------------------------------------------------------
export const prerender = true;

export const entries: EntryGenerator = () => {
  return findEntries(_zImageEntry.transform(({id}) => ({id})).array())('images');
};

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
export const _zImageEntry = zDataEntry(
  z.object({
    alt: z.string(),
    height: z.number().int().min(0),
    src: z.string(),
    width: z.number().int().min(0),
  })
);
export type ImageEntry = z.output<typeof _zImageEntry>;

export function _zImageFromEntry(aspectRatio?: number) {
  return _zImageEntry.transform((image) => cacheImage({...image, aspectRatio}));
}

export const _zImage = z.object({
  ..._zImageEntry.pick({alt: true, src: true}).shape,
  height: z.coerce.number(),
  lqip: z.string(),
  width: z.coerce.number(),
});
export type Image = z.output<typeof _zImage>;

// GET -------------------------------------------------------------------------------------------------------------------------------------
export const GET: RequestHandler = async ({params: {aspectRatio: ar, id}}) => {
  const aspectRatio = ar !== undefined ? z.coerce.number().parse(ar) : ar;
  const image = await findEntry(_zImageFromEntry(aspectRatio))({collection: 'images', id});
  return json(image);
};
