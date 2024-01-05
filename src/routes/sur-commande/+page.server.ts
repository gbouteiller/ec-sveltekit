export const prerender = true;

import { getFetchApi } from '$lib/server';
import { _zCommission } from '../api/commissions/[slug].json/+server';
import { _zWork } from '../api/works/[id].json/+server';
import type { PageServerLoad } from './$types';

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
const zWork = _zWork.transform(({id, thumbnail: image}) => ({id, image}));

// LOAD ------------------------------------------------------------------------------------------------------------------------------------
export const load: PageServerLoad = async ({fetch}) => {
  const fetchApi = getFetchApi(fetch);
  const [{body, title}, works] = await Promise.all([fetchApi(_zCommission)('commissions/animal-totem'), fetchApi(zWork.array())('works')]);
  return {body, title, works};
};
