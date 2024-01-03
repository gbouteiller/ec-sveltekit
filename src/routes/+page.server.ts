export const prerender = true;

import {zGeneral, zImage} from '$lib/notion/schemas';
import {cacheImage, findEntries, findEntry, zIdsToDataEntries} from '$lib/notion/server';
import {zIdToCachedImage, zWorkItem} from '$lib/notion/server/utils';
import {getSocial, sortWorks} from '$lib/notion/utils';
import {zContentEntry} from '@niama/notion-tools';
import {z} from 'zod';
import type {PageServerLoad} from './$types';

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
const zAbout = zContentEntry(
  z.object({
    button: z.string(),
    image: zIdToCachedImage(),
    slug: z.literal('about'),
    title: z.string().optional(),
  })
).transform(({body, button, image, slug, title}) => ({body, image, link: {href: '/a-propos', text: button}, slug, title}));
type About = z.output<typeof zAbout>;

const zContact = zContentEntry(
  z.object({
    button: z.string(),
    quoteAuthor: z.string().optional(),
    quoteText: z.string().optional(),
    slug: z.literal('contact'),
    title: z.string().optional(),
  })
);
type Contact = z.output<typeof zContact>;

const zHero = zContentEntry(
  z.object({
    image: zIdToCachedImage(),
    slug: z.literal('hero'),
    title: z.string().optional(),
  })
);
type Hero = z.output<typeof zHero>;

const zLastWorks = zContentEntry(
  z.object({
    button: z.string(),
    count: z
      .number()
      .int()
      .min(0)
      .transform((count) => findEntries(zWorkItem.array())('works').then((works) => works.toSorted(sortWorks).slice(0, count))),
    slug: z.literal('last-works'),
    title: z.string().optional(),
  })
).transform(({button, count: grid, slug, title}) => ({grid, link: {href: '/originaux', text: button}, slug, title}));
type LastWorks = z.output<typeof zLastWorks>;

const zToOrder = zContentEntry(
  z.object({
    button: z.string(),
    images: zIdsToDataEntries('images', zImage.transform(cacheImage).array()),
    slug: z.literal('to-order'),
    title: z.string().optional(),
  })
).transform(({body, button, images, slug, title}) => ({body, images, link: {href: '/sur-commande', text: button}, slug, title}));
type ToOrder = z.output<typeof zToOrder>;

// LOAD ------------------------------------------------------------------------------------------------------------------------------------
export const load: PageServerLoad = async () => {
  const [sections, general] = await Promise.all([
    findEntries(z.union([zAbout, zContact, zHero, zLastWorks, zToOrder]).array())('index-sections'),
    findEntry(zGeneral)({collection: 'pages', slug: 'general'}),
  ]);

  const {button, quoteAuthor: author, quoteText: text, slug, title} = sections.find(({slug}) => slug === 'contact') as Contact;
  const contact = {link: {href: '/contact', text: button}, quote: {author, text}, slug, social: getSocial(general), title};

  return {
    about: sections.find(({slug}) => slug === 'about') as About,
    contact,
    hero: sections.find(({slug}) => slug === 'hero') as Hero,
    lastWorks: sections.find(({slug}) => slug === 'last-works') as LastWorks,
    toOrder: sections.find(({slug}) => slug === 'to-order') as ToOrder,
  };
};
