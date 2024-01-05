import {findEntry} from '$lib/notion/server';
import {getFetchApi, type FetchApi} from '$lib/server';
import {zContentEntry} from '@niama/notion-tools';
import {json} from '@sveltejs/kit';
import {z} from 'zod';
import {_zImage} from '../../images/[id]/[[aspectRatio]].json/+server';
import type {RequestHandler} from './$types';

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
export const _zIndexSectionAboutEntry = zContentEntry(
  z.object({
    button: z.string(),
    image: z.string(),
    title: z.string().optional(),
  })
);
export type IndexSectionAboutEntry = z.output<typeof _zIndexSectionAboutEntry>;

export const _zIndexSectionAboutFromEntry = (fetchApi: FetchApi) =>
  z
    .object({
      ..._zIndexSectionAboutEntry.shape,
      slug: z.literal('about'),
      image: z.string().transform((id) => fetchApi(_zImage)(`images/${id}`)),
    })
    .transform(({body, button, image, slug, title}) => ({body, image, link: {href: '/a-propos', text: button}, slug, title}));

export const _zIndexSectionAbout = z.object({
  ..._zIndexSectionAboutEntry.pick({body: true, slug: true, title: true}).shape,
  image: _zImage,
  link: z.object({href: z.string(), text: z.string()}),
});
export type IndexSectionAbout = z.output<typeof _zIndexSectionAbout>;

// GET -------------------------------------------------------------------------------------------------------------------------------------
export const GET: RequestHandler = async ({fetch}) => {
  const page = await findEntry(_zIndexSectionAboutFromEntry(getFetchApi(fetch)))({collection: 'index-sections', slug: 'about'});
  return json(page);
};
