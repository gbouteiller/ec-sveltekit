import {findEntry} from '$lib/notion/server';
import {getWorkItem, sortWorks} from '$lib/notion/utils';
import {getFetchApi, type FetchApi} from '$lib/server';
import {zContentEntry} from '@niama/notion-tools';
import {json} from '@sveltejs/kit';
import {z} from 'zod';
import {_zWork, _zWorkItem} from '../../works/[id].json/+server';
import type {RequestHandler} from './$types';

// PRERENDER -------------------------------------------------------------------------------------------------------------------------------
export const prerender = true;

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
export const _zIndexSectionLastWorksEntry = zContentEntry(
  z.object({
    button: z.string(),
    count: z.number().int().min(0),
    title: z.string().optional(),
  })
);
export type IndexSectionLastWorksEntry = z.output<typeof _zIndexSectionLastWorksEntry>;

export const _zIndexSectionLastWorksFromEntry = (fetchApi: FetchApi) =>
  z
    .object({
      ..._zIndexSectionLastWorksEntry.shape,
      count: _zIndexSectionLastWorksEntry.shape.count.transform((count) =>
        fetchApi(_zWork.transform(getWorkItem).array())('works').then((works) => works.toSorted(sortWorks).slice(0, count))
      ),
      slug: z.literal('last-works'),
    })
    .transform(({button, count: grid, slug, title}) => ({grid, link: {href: '/originaux', text: button}, slug, title}));

export const _zIndexSectionLastWorks = z.object({
  ..._zIndexSectionLastWorksEntry.pick({slug: true, title: true}).shape,
  grid: _zWorkItem.array(),
  link: z.object({href: z.string(), text: z.string()}),
});
export type IndexSectionLastWorks = z.output<typeof _zIndexSectionLastWorks>;

// GET -------------------------------------------------------------------------------------------------------------------------------------
export const GET: RequestHandler = async ({fetch}) => {
  const page = await findEntry(_zIndexSectionLastWorksFromEntry(getFetchApi(fetch)))({collection: 'index-sections', slug: 'last-works'});
  return json(page);
};
