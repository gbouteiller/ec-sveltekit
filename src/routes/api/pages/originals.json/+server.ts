import {findEntry} from '$lib/notion/server';
import {zContentEntry} from '@niama/notion-tools';
import {json} from '@sveltejs/kit';
import {z} from 'zod';
import type {RequestHandler} from './$types';

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
export const _zPageOriginalsEntry = zContentEntry(
  z.object({
    title: z.string(),
  })
);
export type PageOriginalsEntry = z.output<typeof _zPageOriginalsEntry>;

export const _zPageOriginals = _zPageOriginalsEntry.pick({body: true, title: true});
export type PageOriginals = z.output<typeof _zPageOriginals>;

// GET -------------------------------------------------------------------------------------------------------------------------------------
export const GET: RequestHandler = async () => {
  const page = await findEntry(_zPageOriginals)({collection: 'pages', slug: 'originals'});
  return json(page);
};
