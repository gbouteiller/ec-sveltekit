import {findEntries} from '$lib/notion/server';
import {getFetchApi} from '$lib/server';
import {json} from '@sveltejs/kit';
import {_zSetFromEntry} from '../sets/[slug].json/+server';
import type {RequestHandler} from './$types';

// GET -------------------------------------------------------------------------------------------------------------------------------------
export const GET: RequestHandler = async ({fetch}) => {
  const sets = await findEntries(_zSetFromEntry(getFetchApi(fetch)).array())('sets');
  return json(sets);
};
