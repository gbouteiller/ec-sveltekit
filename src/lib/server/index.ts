import {NOTION_TOOLS_CMS_ID, NOTION_TOOLS_KEY} from '$env/static/private';
import {createNotionCms} from '@niama/notion-tools/server';

// CORE ------------------------------------------------------------------------------------------------------------------------------------
export const {findEntry, findEntries} = createNotionCms({
  auth: NOTION_TOOLS_KEY,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  //fetch: (input, fetchOptions) => eFetch(input, {duration: '59m', type: 'json', fetchOptions}),
  pageId: NOTION_TOOLS_CMS_ID,
});