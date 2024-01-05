import {findEntries} from '$lib/notion/server';
import {getFetchApi, type FetchApi} from '$lib/server';
import {json} from '@sveltejs/kit';
import {z} from 'zod';
import {_zIndexSectionAbout, _zIndexSectionAboutFromEntry} from '../index-sections/about.json/+server';
import {_zIndexSectionContact, _zIndexSectionContactFromEntry} from '../index-sections/contact.json/+server';
import {_zIndexSectionHero, _zIndexSectionHeroFromEntry} from '../index-sections/hero.json/+server';
import {_zIndexSectionLastWorks, _zIndexSectionLastWorksFromEntry} from '../index-sections/last-works.json/+server';
import {_zIndexSectionToOrder, _zIndexSectionToOrderFromEntry} from '../index-sections/to-order.json/+server';
import type {RequestHandler} from './$types';

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
// export const _zIndexSectionToOrderEntry = zContentEntry(
//   z.object({
//     button: z.string(),
//     images: z.string().array(),
//     title: z.string().optional(),
//   })
// );
// export type IndexSectionToOrderEntry = z.output<typeof _zIndexSectionToOrderEntry>;

export const _zIndexSectionFromEntry = (fetchApi: FetchApi) =>
  z.union([
    _zIndexSectionAboutFromEntry(fetchApi),
    _zIndexSectionContactFromEntry(fetchApi),
    _zIndexSectionHeroFromEntry(fetchApi),
    _zIndexSectionLastWorksFromEntry(fetchApi),
    _zIndexSectionToOrderFromEntry(fetchApi),
  ]);

export const _zIndexSection = z.union([
  _zIndexSectionAbout,
  _zIndexSectionContact,
  _zIndexSectionHero,
  _zIndexSectionLastWorks,
  _zIndexSectionToOrder,
]);
export type IndexSection = z.output<typeof _zIndexSection>;

// GET -------------------------------------------------------------------------------------------------------------------------------------
export const GET: RequestHandler = async ({fetch}) => {
  const indexSections = await findEntries(_zIndexSectionFromEntry(getFetchApi(fetch)).array())('index-sections');
  return json(indexSections);
};
