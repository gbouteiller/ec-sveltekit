export const prerender = true;

import {zSetData} from '$lib/notion/schemas';
import {findEntries, findEntry} from '$lib/notion/server';
import {zIdToCachedImage} from '$lib/notion/server/utils';
import {getSetHref} from '$lib/notion/utils';
import {zContentEntry} from '@niama/notion-tools';
import {z} from 'zod';
import type {PageServerLoad} from './$types';

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
const zPage = zContentEntry(
  z.object({
    title: z.string(),
  })
);

const zSet = zContentEntry(
  z.object({
    ...zSetData.shape,
    image: zIdToCachedImage(1),
  })
).transform(({count, image, title, slug}) => ({count, href: getSetHref(slug), image, title}));

// LOAD ------------------------------------------------------------------------------------------------------------------------------------
export const load: PageServerLoad = async () => {
  const [sets, {body, title}] = await Promise.all([
    findEntries(zSet.array())('sets'),
    findEntry(zPage)({collection: 'pages', slug: 'originals'}),
  ]);

  return {body, items: sets.filter(({count}) => count > 0), title};
};
