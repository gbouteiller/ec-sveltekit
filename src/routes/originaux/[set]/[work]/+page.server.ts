export const prerender = true;

import {zSetData, zWork} from '$lib/notion/schemas';
import {findEntry, zIdsToDataEntries} from '$lib/notion/server';
import {getCachedImage} from '$lib/notion/server/utils';
import {getSetCrumb, getWorkFeatures, getWorkHref, getWorkItem} from '$lib/notion/utils';
import {zContentEntry} from '@niama/notion-tools';
import {error} from '@sveltejs/kit';
import {z} from 'zod';
import type {PageServerLoad} from './$types';

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
const zSet = zContentEntry(
  z.object({
    ...zSetData.shape,
    items: zIdsToDataEntries('works', zWork.array()),
  })
);

// LOAD ------------------------------------------------------------------------------------------------------------------------------------
export const load: PageServerLoad = async ({params: {set: setSlug, work: workId}}) => {
  if (!setSlug || !workId) error(404);

  const set = await findEntry(zSet)({collection: 'sets', slug: setSlug});

  const work = set.items.find(({id}) => workId === id);
  if (!work) error(404);
  const {title} = work;

  const [image, ...others] = await Promise.all([
    getCachedImage(work.image),
    ...set.items.filter(({id}) => id !== workId).map(getWorkItem),
  ]);

  const crumbs = [{text: 'Accueil', href: '/'}, {text: 'Originaux', href: '/originaux'}, getSetCrumb(set), {text: title}];

  return {crumbs, features: getWorkFeatures(work), href: getWorkHref(work), image, others, title};
};
