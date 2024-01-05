import {findEntry} from '$lib/notion/server';
import {getFetchApi, type FetchApi} from '$lib/server';
import {zContentEntry} from '@niama/notion-tools';
import {json} from '@sveltejs/kit';
import {z} from 'zod';
import {_zAboutSection} from '../../about-sections/[slug].json/+server';
import type {RequestHandler} from './$types';

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
export const _zPageAboutEntry = zContentEntry(
  z.object({
    sections: z.string().array(),
  })
);
export type PageAboutEntry = z.output<typeof _zPageAboutEntry>;

export function _zPageAboutFromEntry(fetchApi: FetchApi) {
  return z.object({
    ..._zPageAboutEntry.shape,
    sections: z
      .string()
      .transform((slug) => fetchApi(_zAboutSection)(`about-sections/${slug}`))
      .array(),
  });
}

export const _zPageAbout = z.object({
  ..._zPageAboutEntry.shape,
  sections: _zAboutSection.array(),
});
export type _zPageAbout = z.output<typeof _zPageAbout>;

// GET -------------------------------------------------------------------------------------------------------------------------------------
export const GET: RequestHandler = async ({fetch}) => {
  const page = await findEntry(_zPageAboutFromEntry(getFetchApi(fetch)))({collection: 'pages', slug: 'about'});
  return json(page);
};
