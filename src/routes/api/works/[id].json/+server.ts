import {zMaterial, zMedia} from '$lib/notion/schemas';
import {findEntry} from '$lib/notion/server';
import {getFetchApi, type FetchApi} from '$lib/server';
import {zDataEntry} from '@niama/notion-tools';
import {json} from '@sveltejs/kit';
import {z} from 'zod';
import {_zImage} from '../../images/[id]/[[aspectRatio]].json/+server';
import type {RequestHandler} from './$types';

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
export const _zWorkEntry = zDataEntry(
  z.object({
    date: z.coerce.date(),
    height: z.number().int().min(0),
    image: z.string(),
    material: zMaterial,
    media: zMedia.array().min(1),
    set: z.string(),
    stripe: z.string().optional(),
    thumbnail: z.string().optional(),
    title: z.string(),
    width: z.number().int().min(0),
  })
);
export type WorkEntry = z.output<typeof _zWorkEntry>;

export function _zWorkFromEntry(fetchApi: FetchApi) {
  return _zWorkEntry.transform(async (w) => {
    const [image, thumbnail] = await Promise.all([
      fetchApi(_zImage)(`images/${w.image}`),
      fetchApi(_zImage)(`images/${w.thumbnail ?? w.image}/1`),
    ]);
    return {...w, image, thumbnail};
  });
}

export const _zWork = z.object({
  ..._zWorkEntry.shape,
  image: _zImage,
  thumbnail: _zImage,
});
export type Work = z.output<typeof _zWork>;

export const _zWorkItem = z.object({
  ..._zWork.pick({date: true, image: true, stripe: true, title: true}).shape,
  href: z.string(),
  price: z.number(),
});

// GET -------------------------------------------------------------------------------------------------------------------------------------
export const GET: RequestHandler = async ({fetch, params: {id}}) => {
  const work = await findEntry(_zWorkFromEntry(getFetchApi(fetch)))({collection: 'works', id});
  return json(work);
};
