import {getFetchApi, getFormAction} from '$lib/server';
import {superValidate} from 'sveltekit-superforms/server';
import {_zGeneral} from '../api/pages/general.json/+server';
import type {Actions, PageServerLoad} from './$types';
import {zData} from './schemas';

// LOAD ------------------------------------------------------------------------------------------------------------------------------------
export const load: PageServerLoad = async ({fetch}) => {
  const [form, general] = await Promise.all([superValidate(zData), getFetchApi(fetch)(_zGeneral)('pages/general')]);
  return {form, ...general};
};

// ACTIONS ---------------------------------------------------------------------------------------------------------------------------------
export const actions: Actions = {
  default: getFormAction({schema: zData, subject: 'Nouvelle demande'}),
};
