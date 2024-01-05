import {findEntries, findEntry} from '$lib/notion/server';
import {getFetchApi, type FetchApi} from '$lib/server';
import {zContentEntry} from '@niama/notion-tools';
import {json} from '@sveltejs/kit';
import {z} from 'zod';
import {_zImage} from '../../images/[id]/[[aspectRatio]].json/+server';
import {_zWork} from '../../works/[id].json/+server';
import type {EntryGenerator, RequestHandler} from './$types';

// PRERENDER -------------------------------------------------------------------------------------------------------------------------------
export const prerender = true;

export const entries: EntryGenerator = () => {
  return findEntries(_zSetEntry.transform(({slug}) => ({slug})).array())('sets');
};

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
export const _zSetEntry = zContentEntry(
  z.object({
    count: z.number(),
    image: z.string(),
    items: z.string().array(),
    title: z.string(),
  })
);
export type SetEntry = z.output<typeof _zSetEntry>;

export function _zSetFromEntry(fetchApi: FetchApi) {
  return z.object({
    ..._zSetEntry.shape,
    image: z.string().transform((id) => fetchApi(_zImage)(`images/${id}/1`)),
    items: z
      .string()
      .transform((id) => fetchApi(_zWork)(`works/${id}`))
      .array(),
  });
}

export const _zSet = z.object({
  ..._zSetEntry.shape,
  image: _zImage,
  items: _zWork.array(),
});
export type Set = z.output<typeof _zSet>;

// GET -------------------------------------------------------------------------------------------------------------------------------------
export const GET: RequestHandler = async ({fetch, params: {slug}}) => {
  const set = await findEntry(_zSetFromEntry(getFetchApi(fetch)))({collection: 'sets', slug});
  return json(set);
};
