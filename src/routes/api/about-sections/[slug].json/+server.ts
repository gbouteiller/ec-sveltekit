import {findEntry} from '$lib/notion/server';
import {getFetchApi, type FetchApi} from '$lib/server';
import {zContentEntry} from '@niama/notion-tools';
import {json} from '@sveltejs/kit';
import {z} from 'zod';
import {_zImage} from '../../images/[id]/[[aspectRatio]].json/+server';
import type {RequestHandler} from './$types';

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
export const _zAboutSectionEntry = zContentEntry(
  z.object({
    image: z.string(),
    title: z.string(),
  })
);
export type AboutSectionEntry = z.output<typeof _zAboutSectionEntry>;

export const _zAboutSectionFromEntry = (fetchApi: FetchApi) =>
  z.object({
    ..._zAboutSectionEntry.shape,
    image: z.string().transform((id) => fetchApi(_zImage)(`images/${id}`)),
  });

export const _zAboutSection = z.object({
  ..._zAboutSectionEntry.shape,
  image: _zImage,
});
export type AboutSection = z.output<typeof _zAboutSection>;

// GET -------------------------------------------------------------------------------------------------------------------------------------
export const GET: RequestHandler = async ({fetch, params: {slug}}) => {
  const aboutSection = await findEntry(_zAboutSectionFromEntry(getFetchApi(fetch)))({collection: 'about-sections', slug});
  return json(aboutSection);
};
