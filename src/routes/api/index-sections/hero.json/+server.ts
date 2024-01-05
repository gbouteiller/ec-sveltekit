import {findEntry} from '$lib/notion/server';
import {getFetchApi, type FetchApi} from '$lib/server';
import {zContentEntry} from '@niama/notion-tools';
import {json} from '@sveltejs/kit';
import {z} from 'zod';
import {_zImage} from '../../images/[id]/[[aspectRatio]].json/+server';
import type {RequestHandler} from './$types';

// PRERENDER -------------------------------------------------------------------------------------------------------------------------------
export const prerender = true;

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
export const _zIndexSectionHeroEntry = zContentEntry(
  z.object({
    image: z.string(),
    title: z.string().optional(),
  })
);
export type IndexSectionHeroEntry = z.output<typeof _zIndexSectionHeroEntry>;

export const _zIndexSectionHeroFromEntry = (fetchApi: FetchApi) =>
  z.object({
    ..._zIndexSectionHeroEntry.pick({slug: true, title: true}).shape,
    image: z.string().transform((id) => fetchApi(_zImage)(`images/${id}`)),
    slug: z.literal('hero'),
  });

export const _zIndexSectionHero = z.object({
  ..._zIndexSectionHeroEntry.pick({slug: true, title: true}).shape,
  image: _zImage,
});
export type IndexSectionHero = z.output<typeof _zIndexSectionHero>;

// GET -------------------------------------------------------------------------------------------------------------------------------------
export const GET: RequestHandler = async ({fetch}) => {
  const page = await findEntry(_zIndexSectionHeroFromEntry(getFetchApi(fetch)))({collection: 'index-sections', slug: 'hero'});
  return json(page);
};
