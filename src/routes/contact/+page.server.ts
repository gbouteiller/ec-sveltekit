export const prerender = false;

import {getFormAction} from '$lib/server';
import {superValidate} from 'sveltekit-superforms/server';
import type {Actions, PageServerLoad} from './$types';
import {zData} from './schemas';

// LOAD ------------------------------------------------------------------------------------------------------------------------------------
export const load: PageServerLoad = async () => {
  const form = await superValidate(zData);
  return {form};
};

// ACTIONS ---------------------------------------------------------------------------------------------------------------------------------
export const actions: Actions = {
  default: getFormAction({schema: zData, subject: 'Nouvelle demande'}),
};
