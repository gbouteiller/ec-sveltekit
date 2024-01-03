import {zSetData} from '$lib/notion/schemas';
import {findEntry, zIdsToDataEntries} from '$lib/notion/server';
import {zWorkItem} from '$lib/notion/server/utils';
import {zContentEntry} from '@niama/notion-tools';
import {error} from '@sveltejs/kit';
import {z} from 'zod';
import type {PageServerLoad} from './$types';

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
const zSet = zContentEntry(
  z.object({
    ...zSetData.shape,
    items: zIdsToDataEntries('works', zWorkItem.array()),
  })
);

// LOAD ------------------------------------------------------------------------------------------------------------------------------------
export const load: PageServerLoad = async ({params: {set: slug}}) => {
  if (!slug) error(404);

  const {body, items, title} = await findEntry(zSet)({collection: 'sets', slug});
  if (items.length === 0) error(404);

  const crumbs = [{text: 'Accueil', href: '/'}, {text: 'Originaux', href: '/originaux'}, {text: title}];

  return {body, crumbs, items, title};
};
