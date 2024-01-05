export const prerender = true;

import { getSetHref } from '$lib/notion/utils';
import { getFetchApi } from '$lib/server';
import { _zPageOriginals } from '../api/pages/originals.json/+server';
import { _zSet } from '../api/sets/[slug].json/+server';
import type { PageServerLoad } from './$types';

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
const zSet = _zSet.transform(({count, image, title, slug}) => ({count, href: getSetHref(slug), image, title}));

// LOAD ------------------------------------------------------------------------------------------------------------------------------------
export const load: PageServerLoad = async ({fetch}) => {
  const fetchApi = getFetchApi(fetch);

  const [sets, {body, title}] = await Promise.all([fetchApi(zSet.array())(`sets`), fetchApi(_zPageOriginals)('pages/originals')]);

  return {body, items: sets.filter(({count}) => count > 0), title};
};
