export const prerender = false;

import {getFormAction} from '$lib/server';
import {superValidate} from 'sveltekit-superforms/server';
import type {General} from '../api/general/+server';
import type {Actions, PageServerLoad} from './$types';
import {zData} from './schemas';

// LOAD ------------------------------------------------------------------------------------------------------------------------------------
export const load: PageServerLoad = async ({fetch}) => {
  const [form, generalRes] = await Promise.all([superValidate(zData), fetch('/api/general')]);
  const general = await generalRes.json() as General;
  return {form, ...general};
};

// ACTIONS ---------------------------------------------------------------------------------------------------------------------------------
export const actions: Actions = {
  default: getFormAction({schema: zData, subject: 'Nouvelle demande'}),
};
