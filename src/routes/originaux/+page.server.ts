export const prerender = true;

import {findEntry} from '$lib/server';
// import {findEntries, findEntry} from '$lib/server';
// import {zContentEntry} from '@niama/notion-tools';
// import {findEntry} from '$lib/server';
import {zPageOriginals} from '$lib/server/schemas';
// import {findWorks, zPageOriginalsData, zSetData} from '$lib/server/schemas';
// import {filterNonEmptySets, setItemFrom} from '$lib/server/utils';
import type {PageServerLoad} from './$types';

// LOAD ------------------------------------------------------------------------------------------------------------------------------------
export const load: PageServerLoad = async () => {
  return findEntry(zPageOriginals)({collection: 'pages', slug: 'originals'});
  // return {
  //   page: findEntry(zContentEntry(zPageOriginalsData))({collection: 'pages', slug: 'originals'}),
  //   items: Promise.all([findEntries(zContentEntry(zSetData).array())('sets'), findWorks()]).then(([sets, works]) =>
  //     filterNonEmptySets(sets, works).map(setItemFrom)
  //   ),
  // };
};
