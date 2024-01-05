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
export const _zIndexSectionToOrderEntry = zContentEntry(
  z.object({
    button: z.string(),
    images: z.string().array(),
    title: z.string().optional(),
  })
);
export type IndexSectionToOrderEntry = z.output<typeof _zIndexSectionToOrderEntry>;

export const _zIndexSectionToOrderFromEntry = (fetchApi: FetchApi) =>
  z
    .object({
      ..._zIndexSectionToOrderEntry.shape,
      images: z
        .string()
        .transform((id) => fetchApi(_zImage)(`images/${id}`))
        .array(),
      slug: z.literal('to-order'),
    })
    .transform(({body, button, images, slug, title}) => ({body, images, link: {href: '/sur-commande', text: button}, slug, title}));

export const _zIndexSectionToOrder = z.object({
  ..._zIndexSectionToOrderEntry.pick({body: true, slug: true, title: true}).shape,
  images: _zImage.array(),
  link: z.object({href: z.string(), text: z.string()}),
});
export type IndexSectionToOrder = z.output<typeof _zIndexSectionToOrder>;

// GET -------------------------------------------------------------------------------------------------------------------------------------
export const GET: RequestHandler = async ({fetch}) => {
  const page = await findEntry(_zIndexSectionToOrderFromEntry(getFetchApi(fetch)))({collection: 'index-sections', slug: 'to-order'});
  return json(page);
};
