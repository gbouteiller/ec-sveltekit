export const prerender = true;

import {cacheImage, findEntries, findEntry} from '$lib/server';
import {zImage} from '$lib/server/schemas';
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
    count: z.number(),
    image: zImage.transform((img) => cacheImage({...img, aspectRatio: 1})),
    title: z.string(),
  })
);

// LOAD ------------------------------------------------------------------------------------------------------------------------------------
export const load: PageServerLoad = async () => {
  const [sets, {body, data}] = await Promise.all([
    findEntries(zSet.array())('sets'),
    findEntry(zPage)({collection: 'pages', slug: 'originals'}),
  ]);

  const items = sets
    .filter(({data: {count}}) => count > 0)
    .map(({data: {image, title}, slug}) => ({href: `/originaux/${slug}`, image, title}));

  return {body, items, title: data.title};
};
