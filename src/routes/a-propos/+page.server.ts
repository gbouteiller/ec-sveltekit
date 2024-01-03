export const prerender = true;

import {findEntry, zSlugsToContentEntries} from '$lib/notion/server';
import {zIdToCachedImage} from '$lib/notion/server/utils';
import {zContentEntry} from '@niama/notion-tools';
import {z} from 'zod';
import type {PageServerLoad} from './$types';

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
const zSection = zContentEntry(
  z.object({
    image: zIdToCachedImage(),
    title: z.string().optional(),
  })
);

const zPage = zContentEntry(
  z.object({
    sections: zSlugsToContentEntries('about-sections', zSection.array()),
  })
);

// LOAD ------------------------------------------------------------------------------------------------------------------------------------
export const load: PageServerLoad = async () => {
  const {sections} = await findEntry(zPage)({collection: 'pages', slug: 'about'});
  return {sections};
};
