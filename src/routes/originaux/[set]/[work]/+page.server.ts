export const prerender = true;

import { getSetCrumb, getWorkFeatures, getWorkHref, getWorkItem } from '$lib/notion/utils';
import { getFetchApi } from '$lib/server';
import { error } from '@sveltejs/kit';
import { _zSet } from '../../../api/sets/[slug].json/+server';
import type { PageServerLoad } from './$types';

// LOAD ------------------------------------------------------------------------------------------------------------------------------------
export const load: PageServerLoad = async ({fetch, params: {set: setSlug, work: workId}}) => {
  if (!setSlug || !workId) error(404);

  const set = await getFetchApi(fetch)(_zSet)(`sets/${setSlug}`);

  const work = set.items.find(({id}) => workId === id);
  if (!work) error(404);
  const {image, title} = work;

  return {
    crumbs: [{text: 'Accueil', href: '/'}, {text: 'Originaux', href: '/originaux'}, getSetCrumb(set), {text: title}],
    features: getWorkFeatures(work),
    href: getWorkHref(work),
    image,
    others: set.items.filter(({id}) => id !== workId).map(getWorkItem),
    title,
  };
};
