import {findEntry} from '$lib/notion/server';
import {zContentEntry} from '@niama/notion-tools';
import {json} from '@sveltejs/kit';
import {z} from 'zod';
import type {RequestHandler} from './$types';

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
export const _zCommissionEntry = zContentEntry(z.object({
  title: z.string(),
}));
export type CommissionEntry = z.output<typeof _zCommissionEntry>;

export const _zCommission = _zCommissionEntry;
export type Commission = z.output<typeof _zCommission>;

// GET -------------------------------------------------------------------------------------------------------------------------------------
export const GET: RequestHandler = async ({params: {slug}}) => {
  const commission = await findEntry(_zCommission)({collection: 'commissions', slug});
  return json(commission);
};
