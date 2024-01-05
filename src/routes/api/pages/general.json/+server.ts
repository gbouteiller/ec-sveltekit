import {findEntry} from '$lib/notion/server';
import {getSocial} from '$lib/notion/utils';
import {getFetchApi, type FetchApi} from '$lib/server';
import {zContentEntry} from '@niama/notion-tools';
import {json} from '@sveltejs/kit';
import {z} from 'zod';
import {_zImage} from '../../images/[id]/[[aspectRatio]].json/+server';
import type {RequestHandler} from './$types';

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
export const _zGeneralEntry = zContentEntry(
  z.object({
    email: z.string().email(),
    instagram: z.string(),
    logo: z.string(),
    phone: z.string(),
  })
);
export type GeneralEntry = z.output<typeof _zGeneralEntry>;

export function _zGeneralFromEntry(fetchApi: FetchApi) {
  return z
    .object({
      ..._zGeneralEntry.shape,
      logo: z.string().transform((id) => fetchApi(_zImage)(`images/${id}/1`)),
    })
    .transform(({email, instagram, logo, phone}) => ({social: getSocial({email, instagram, phone}), logo}));
}

export const _zGeneral = z.object({
  logo: _zImage,
  social: z
    .object({
      href: z.string(),
      icon: z.string(),
      text: z.string(),
    })
    .array(),
});

export type General = z.output<typeof _zGeneral>;

// GET -------------------------------------------------------------------------------------------------------------------------------------
export const GET: RequestHandler = async ({fetch}) => {
  const general = await findEntry(_zGeneralFromEntry(getFetchApi(fetch)))({collection: 'pages', slug: 'general'});
  return json(general);
};
