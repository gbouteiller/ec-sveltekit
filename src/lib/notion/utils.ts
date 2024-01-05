import { i18n } from '$lib/i18n';
import type { GeneralEntry } from '../../routes/api/pages/general.json/+server';
import type { Set } from '../../routes/api/sets/[slug].json/+server';
import type { Work } from '../../routes/api/works/[id].json/+server';

// GENERAL ---------------------------------------------------------------------------------------------------------------------------------
export function getSocial({email, instagram, phone}: Pick<GeneralEntry, 'email' | 'instagram' | 'phone'>) {
  return [
    {href: `tel:${phone}`, icon: 'phone-outline', text: phone},
    {href: `mailto:${email}`, icon: 'email-outline', text: email},
    {href: `https://www.instagram.com/${instagram}`, icon: 'instagram', text: instagram},
  ];
}

// SET -------------------------------------------------------------------------------------------------------------------------------------
export function getSetHref(slug: string) {
  return `/originaux/${slug}`;
}

export function getSetCrumb({slug, title}: Pick<Set, 'slug' | 'title'>) {
  return {href: getSetHref(slug), text: title};
}

// WORK ------------------------------------------------------------------------------------------------------------------------------------
export function getWorkFeatures({height, material, media, width}: Pick<Work, 'height' | 'material' | 'media' | 'width'>) {
  return [
    {text: 'Prix', value: `${getWorkPrice({height, material, width})}.00€`},
    {text: 'Dimensions', value: `${width}cm x ${height}cm`},
    {text: 'Support', value: i18n.materials[material]},
    {text: 'Média', value: media.map((item) => i18n.medias[item]).join(', ')},
  ];
}

export function getWorkHref({id, set}: Pick<Work, 'id' | 'set'>) {
  return `/originaux/${set}/${id}`;
}

export function getWorkItem(work: Work) {
  const {date, stripe, thumbnail: image, title} = work;
  return {date, href: getWorkHref(work), image, price: getWorkPrice(work), stripe, title};
}

export function getWorkPrice({height, material, width}: Pick<Work, 'height' | 'material' | 'width'>) {
  return Math.ceil((width * height) / (material === 'canvas' ? 6 : 9));
}

export function sortWorks(w1: Pick<Work, 'date'>, w2: Pick<Work, 'date'>) {
  return w2.date.getTime() - w1.date.getTime();
}
