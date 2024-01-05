import {findEntry} from '$lib/notion/server';
import {zContentEntry} from '@niama/notion-tools';
import {json} from '@sveltejs/kit';
import {z} from 'zod';
import type {RequestHandler} from './$types';

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
export const _zPageDisclaimerEntry = zContentEntry(
  z.object({
    title: z.string(),
  })
);
export type PageDisclaimerEntry = z.output<typeof _zPageDisclaimerEntry>;

export const _zPageDisclaimer = _zPageDisclaimerEntry.pick({body: true, title: true});
export type PageDisclaimer = z.output<typeof _zPageDisclaimer>;

// GET -------------------------------------------------------------------------------------------------------------------------------------
export const GET: RequestHandler = async () => {
  const page = await findEntry(_zPageDisclaimer)({collection: 'pages', slug: 'disclaimer'});
  return json(page);
};
