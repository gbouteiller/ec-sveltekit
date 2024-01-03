export const prerender = true;

import {findEntry} from '$lib/notion/server';
import {zContentEntry} from '@niama/notion-tools';
import {z} from 'zod';
import type {PageServerLoad} from './$types';

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
const zPage = zContentEntry(
  z.object({
    title: z.string(),
  })
);

// LOAD ------------------------------------------------------------------------------------------------------------------------------------
export const load: PageServerLoad = async () => findEntry(zPage)({collection: 'pages', slug: 'disclaimer'});
