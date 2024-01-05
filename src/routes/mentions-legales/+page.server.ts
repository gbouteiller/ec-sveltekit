export const prerender = true;

import { getFetchApi } from '$lib/server';
import { _zPageDisclaimer } from '../api/pages/disclaimer.json/+server';
import type { PageServerLoad } from './$types';

// LOAD ------------------------------------------------------------------------------------------------------------------------------------
export const load: PageServerLoad = async ({fetch}) => getFetchApi(fetch)(_zPageDisclaimer)('pages/disclaimer');
