export const prerender = true;

import {getFetchApi} from '$lib/server';
import type {PageServerLoad} from './$types';
import {_zIndexSection} from './api/index-sections.json/+server';
import type {IndexSectionAbout} from './api/index-sections/about.json/+server';
import type {IndexSectionContact} from './api/index-sections/contact.json/+server';
import type {IndexSectionHero} from './api/index-sections/hero.json/+server';
import type {IndexSectionLastWorks} from './api/index-sections/last-works.json/+server';
import type {IndexSectionToOrder} from './api/index-sections/to-order.json/+server';

// LOAD ------------------------------------------------------------------------------------------------------------------------------------
export const load: PageServerLoad = async ({fetch}) => {
  const sections = await getFetchApi(fetch)(_zIndexSection.array())(`index-sections`);
  return {
    about: sections.find(({slug}) => slug === 'about') as IndexSectionAbout,
    contact: sections.find(({slug}) => slug === 'contact') as IndexSectionContact,
    hero: sections.find(({slug}) => slug === 'hero') as IndexSectionHero,
    lastWorks: sections.find(({slug}) => slug === 'last-works') as IndexSectionLastWorks,
    toOrder: sections.find(({slug}) => slug === 'to-order') as IndexSectionToOrder,
  };
};
