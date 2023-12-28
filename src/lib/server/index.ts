import {dev} from '$app/environment';
import {NOTION_TOOLS_CMS_ID, NOTION_TOOLS_KEY} from '$env/static/private';
import {createNotionAssets, createNotionCms} from '@niama/notion-tools/server';

// CMS -------------------------------------------------------------------------------------------------------------------------------------
export const {findEntry, findEntries} = createNotionCms({
  auth: NOTION_TOOLS_KEY,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  //fetch: (input, fetchOptions) => eFetch(input, {duration: '59m', type: 'json', fetchOptions}),
  fetch: async (input, fetchOptions) => {
    const response = await fetch(input, fetchOptions);
    return response.json();
  },
  pageId: NOTION_TOOLS_CMS_ID,
});

// ASSETS ----------------------------------------------------------------------------------------------------------------------------------
export const {cacheImage} = createNotionAssets({
  baseUrl: '/_assets',
  dir: dev ? './static/_assets' : '.svelte-kit/output/client/_assets',
});
