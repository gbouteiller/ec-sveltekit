export const prerender = true;

import {zWorkData} from '$lib/notion/schemas';
import {findEntries, findEntry} from '$lib/notion/server';
import {zIdToCachedImage} from '$lib/notion/server/utils';
import {zContentEntry, zDataEntry} from '@niama/notion-tools';
import {z} from 'zod';
import type {PageServerLoad} from './$types';

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
const zCommission = zContentEntry(
  z.object({
    title: z.string(),
  })
);

const zWork = zDataEntry(
  z.object({
    ...zWorkData.shape,
    image: zIdToCachedImage(1),
    thumbnail: zIdToCachedImage(1).optional(),
  })
).transform(({id, image, thumbnail}) => ({id, image: thumbnail ?? image}));

// LOAD ------------------------------------------------------------------------------------------------------------------------------------
export const load: PageServerLoad = async () => {
  const [{body, title}, works] = await Promise.all([
    findEntry(zCommission)({collection: 'commissions', slug: 'animal-totem'}),
    findEntries(zWork.array())('works'),
  ]);

  return {body, title, works};
};
