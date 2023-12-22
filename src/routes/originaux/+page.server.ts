import {findEntry} from '$lib/server';
import {zPageOriginals} from '$lib/server/schemas';
import type {PageServerLoad} from './$types';

// LOAD ------------------------------------------------------------------------------------------------------------------------------------
export const load: PageServerLoad = async () => findEntry(zPageOriginals)({collection: 'pages', slug: 'originals'});
