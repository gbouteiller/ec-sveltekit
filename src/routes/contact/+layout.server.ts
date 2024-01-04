export const prerender = true;

import {zGeneralData} from '$lib/notion/schemas';
import {findEntry} from '$lib/notion/server';
import {zIdToCachedImage} from '$lib/notion/server/utils';
import {getSocial} from '$lib/notion/utils';
import {zContentEntry} from '@niama/notion-tools';
import {z} from 'zod';
import type {LayoutServerLoad} from './$types';

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
const zGeneral = zContentEntry(
  z.object({
    ...zGeneralData.shape,
    logo: zIdToCachedImage(1),
  })
).transform(({email, instagram, logo, phone}) => ({social: getSocial({email, instagram, phone}), logo}));

// LOAD ------------------------------------------------------------------------------------------------------------------------------------
export const load: LayoutServerLoad = async () => {
  const general = await findEntry(zGeneral)({collection: 'pages', slug: 'general'});
  return {...general};
};
