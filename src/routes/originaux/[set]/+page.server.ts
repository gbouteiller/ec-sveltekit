export const prerender = true;

import { getWorkItem } from '$lib/notion/utils';
import { getFetchApi } from '$lib/server';
import { error } from '@sveltejs/kit';
import { z } from 'zod';
import { _zSet } from '../../api/sets/[slug].json/+server';
import { _zWork } from '../../api/works/[id].json/+server';
import type { PageServerLoad } from './$types';

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
const zSet = z.object({
  ..._zSet.shape,
  items: _zWork.transform(getWorkItem).array(),
});

// LOAD ------------------------------------------------------------------------------------------------------------------------------------
export const load: PageServerLoad = async ({fetch, params: {set: slug}}) => {
  if (!slug) error(404);

  const {body, items, title} = await getFetchApi(fetch)(zSet)(`sets/${slug}`);
  if (items.length === 0) error(404);

  const crumbs = [{text: 'Accueil', href: '/'}, {text: 'Originaux', href: '/originaux'}, {text: title}];

  return {body, crumbs, items, title};
};
