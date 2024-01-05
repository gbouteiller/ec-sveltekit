import {findEntries} from '$lib/notion/server';
import {getFetchApi} from '$lib/server';
import {json} from '@sveltejs/kit';
import {_zWorkFromEntry} from '../works/[id].json/+server';
import type {RequestHandler} from './$types';

// PRERENDER -------------------------------------------------------------------------------------------------------------------------------
export const prerender = true;

// GET -------------------------------------------------------------------------------------------------------------------------------------
export const GET: RequestHandler = async ({fetch}) => {
  const works = await findEntries(_zWorkFromEntry(getFetchApi(fetch)).array())('works');
  return json(works);
};
