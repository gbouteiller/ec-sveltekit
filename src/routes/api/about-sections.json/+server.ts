import {findEntries} from '$lib/notion/server';
import {getFetchApi} from '$lib/server';
import {json} from '@sveltejs/kit';
import type {RequestHandler} from '../about-sections/$types';
import {_zAboutSectionFromEntry} from '../about-sections/[slug].json/+server';

// GET -------------------------------------------------------------------------------------------------------------------------------------
export const GET: RequestHandler = async ({fetch}) => {
  const aboutSections = await findEntries(_zAboutSectionFromEntry(getFetchApi(fetch)).array())('about-sections');
  return json(aboutSections);
};
