import {findEntry} from '$lib/notion/server';
import {getFetchApi, type FetchApi} from '$lib/server';
import {zContentEntry} from '@niama/notion-tools';
import {json} from '@sveltejs/kit';
import {z} from 'zod';
import {_zGeneral} from '../../pages/general.json/+server';
import type {RequestHandler} from './$types';

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
export const _zIndexSectionContactEntry = zContentEntry(
  z.object({
    button: z.string(),
    quoteAuthor: z.string().optional(),
    quoteText: z.string().optional(),
    title: z.string().optional(),
  })
);
export type IndexSectionContactEntry = z.output<typeof _zIndexSectionContactEntry>;

export const _zIndexSectionContactFromEntry = (fetchApi: FetchApi) =>
  z
    .object({
      ..._zIndexSectionContactEntry.shape,
      slug: z.literal('contact'),
    })
    .transform(async ({button, quoteAuthor: author, quoteText: text, slug, title}) => ({
      link: {href: '/contact', text: button},
      quote: {author, text},
      slug,
      social: await fetchApi(_zGeneral.transform(({social}) => social))('pages/general'),
      title,
    }));

export const _zIndexSectionContact = z.object({
  ..._zIndexSectionContactEntry.pick({slug: true, title: true}).shape,
  link: z.object({href: z.string(), text: z.string()}),
  quote: z.object({author: z.string(), text: z.string()}),

  social: _zGeneral.shape.social,
});
export type IndexSectionContact = z.output<typeof _zIndexSectionContact>;

// GET -------------------------------------------------------------------------------------------------------------------------------------
export const GET: RequestHandler = async ({fetch}) => {
  const page = await findEntry(_zIndexSectionContactFromEntry(getFetchApi(fetch)))({collection: 'index-sections', slug: 'contact'});
  return json(page);
};
