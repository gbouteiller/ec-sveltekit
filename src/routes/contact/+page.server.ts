import {zGeneralData} from '$lib/notion/schemas';
import {findEntry} from '$lib/notion/server';
import {zIdToCachedImage} from '$lib/notion/server/utils';
import {getSocial} from '$lib/notion/utils';
import {getFormAction} from '$lib/server';
import {zContentEntry} from '@niama/notion-tools';
import {superValidate} from 'sveltekit-superforms/server';
import {z} from 'zod';
import type {Actions, PageServerLoad} from './$types';
import {zData} from './schemas';

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
const zGeneral = zContentEntry(
  z.object({
    ...zGeneralData.shape,
    logo: zIdToCachedImage(1),
  })
).transform(({email, instagram, logo, phone}) => ({social: getSocial({email, instagram, phone}), logo}));

// LOAD ------------------------------------------------------------------------------------------------------------------------------------
export const load: PageServerLoad = async () => {
  const [form, general] = await Promise.all([superValidate(zData), findEntry(zGeneral)({collection: 'pages', slug: 'general'})]);
  return {...general, form};
};

// ACTIONS ---------------------------------------------------------------------------------------------------------------------------------
export const actions: Actions = {
  default: getFormAction({schema: zData, subject: 'Nouvelle demande'}),
};
