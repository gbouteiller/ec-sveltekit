import {i18n} from '$lib/i18n';
import type {General, Set, Work} from './schemas';

// GENERAL ---------------------------------------------------------------------------------------------------------------------------------
export function getSocial({email, instagram, phone}: Pick<General, 'email' | 'instagram' | 'phone'>) {
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

export function getWorkItem(work: Pick<Work, 'height' | 'id' | 'image' | 'material' | 'set' | 'stripe' | 'thumbnail' | 'title' | 'width'>) {
  const {image, stripe, thumbnail, title} = work;
  return {href: getWorkHref(work), image: thumbnail ?? image, price: getWorkPrice(work), stripe, title};
}

export function getWorkPrice({height, material, width}: Pick<Work, 'height' | 'material' | 'width'>) {
  return Math.ceil((width * height) / (material === 'canvas' ? 6 : 9));
}

export function sortWorks(w1: Pick<Work, 'date'>, w2: Pick<Work, 'date'>) {
  return w2.date.getTime() - w1.date.getTime();
}
