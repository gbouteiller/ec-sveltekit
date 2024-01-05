export const prerender = true;

import { getFetchApi } from '$lib/server';
import { _zPageAbout } from '../api/pages/about.json/+server';
import type { PageServerLoad } from './$types';

// LOAD ------------------------------------------------------------------------------------------------------------------------------------
export const load: PageServerLoad = async ({fetch}) => {
  const {sections} = await getFetchApi(fetch)(_zPageAbout)('pages/about');
  return {sections};
};
