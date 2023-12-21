import {zImageData, zMedia, zType} from '$lib/schemas';
import {zContentEntry, zDataEntry, type ContentEntry, type DataEntry, type DataRef} from '@niama/notion-tools';
import {z} from 'zod';
import {findEntries, findEntry} from '.';
import {i18n} from './i18n';
import {filterNonEmptySets, setItemFrom, workItemFrom} from './utils';

// IMAGE -----------------------------------------------------------------------------------------------------------------------------------
export const zImageDto = zDataEntry(zImageData).transform(({data: {alt, height, src, width}, id: slug}) => ({
  alt,
  ratio: width / height,
  slug,
  src,
  widths: [256, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
}));

export const zImage = z.string().transform((id) => findEntry(zImageDto)({collection: 'images', id}));

// ABOUT SECTION ---------------------------------------------------------------------------------------------------------------------------
export const zAboutSectionData = z.object({
  image: zImage,
  title: z.string().optional(),
});
export const zAboutSection = zContentEntry(zAboutSectionData).transform(({body, data, slug}) => ({...data, body, slug}));

// COMMISSION ------------------------------------------------------------------------------------------------------------------------------
export const zCommissionData = z.object({
  title: z.string(),
});
export const zCommission = zContentEntry(zCommissionData).transform(({body, data, slug}) => ({...data, body, slug}));

// PAGE ABOUT ------------------------------------------------------------------------------------------------------------------------------
export const zPageAboutData = z.object({
  sections: z
    .string()
    .transform((slug) => findEntry(zAboutSection)({collection: 'about-sections', slug}))
    .array(),
});
export const zPageAbout = zContentEntry(zPageAboutData).transform(({data: {sections}}) => sections);

// PAGE DISCLAIMER -------------------------------------------------------------------------------------------------------------------------
export const zPageDisclaimerData = z.object({title: z.string()});
export const zPageDisclaimer = zContentEntry(zPageDisclaimerData);

// PAGE GENERAL ----------------------------------------------------------------------------------------------------------------------------
export const zPageGeneralData = z.object({
  email: z.string().email(),
  instagram: z.string(),
  logo: zImage,
  phone: z.string(),
});

export const zPageGeneral = zContentEntry(zPageGeneralData).transform(({data: {email, instagram, logo, phone}, slug}) => {
  const social = [
    {href: `tel:${phone}`, icon: 'phone-outline', text: phone},
    {href: `mailto:${email}`, icon: 'email-outline', text: email},
    {href: `https://www.instagram.com/${instagram}`, icon: 'instagram', text: instagram},
  ];
  return {logo, slug, social};
});

export function findPageGeneral() {
  return findEntry(zPageGeneral)({collection: 'pages', slug: 'general'});
}

// PAGE INDEX ------------------------------------------------------------------------------------------------------------------------------
export const zIndexSectionAboutData = z.object({
  button: z.string(),
  image: zImage,
  slug: z.literal('about'),
  title: z.string().optional(),
});

export const zIndexSectionAbout = zContentEntry(zIndexSectionAboutData).transform(({body, data: {button, image, slug, title}}) => {
  return {body, image, link: {href: '/a-propos', text: button}, slug, title};
});

export const zIndexSectionContactData = z.object({
  button: z.string(),
  quoteAuthor: z.string().optional(),
  quoteText: z.string().optional(),
  slug: z.literal('contact'),
  title: z.string().optional(),
});

export const zIndexSectionContact = zContentEntry(zIndexSectionContactData).transform(async ({data}) => {
  const {social} = await findPageGeneral();
  const {button, quoteAuthor: author, quoteText: text, slug, title} = data;
  return {link: {href: '/contact', text: button}, quote: {author, text}, slug, social, title};
});

export const zIndexSectionHeroData = z.object({
  image: zImage,
  slug: z.literal('hero'),
  title: z.string().optional(),
});

export const zIndexSectionHero = zContentEntry(zIndexSectionHeroData).transform(({data}) => data);

export const zIndexSectionLastWorksData = z.object({
  button: z.string(),
  count: z.number().int().min(0).transform(findWorkItems),
  slug: z.literal('last-works'),
  title: z.string().optional(),
});

export const zIndexSectionLastWorks = zContentEntry(zIndexSectionLastWorksData).transform(({data: {button, count: grid, slug, title}}) => {
  return {grid, link: {href: '/originaux', text: button}, slug, title};
});

export const zIndexSectionToOrderData = z.object({
  button: z.string(),
  images: zImage.array(),
  slug: z.literal('to-order'),
  title: z.string().optional(),
});

export const zIndexSectionToOrder = zContentEntry(zIndexSectionToOrderData).transform(({body, data: {button, images, slug, title}}) => {
  return {body, images, link: {href: '/sur-commande', text: button}, slug, title};
});

export const zPageIndex = z
  .union([zIndexSectionAbout, zIndexSectionContact, zIndexSectionHero, zIndexSectionLastWorks, zIndexSectionToOrder])
  .array()
  .transform((dtos) => ({
    about: dtos.find(({slug}) => slug === 'about') as z.infer<typeof zIndexSectionAbout>,
    contact: dtos.find(({slug}) => slug === 'contact') as z.infer<typeof zIndexSectionContact>,
    hero: dtos.find(({slug}) => slug === 'hero') as z.infer<typeof zIndexSectionHero>,
    lastWorks: dtos.find(({slug}) => slug === 'last-works') as z.infer<typeof zIndexSectionLastWorks>,
    toOrder: dtos.find(({slug}) => slug === 'to-order') as z.infer<typeof zIndexSectionToOrder>,
  }));

// PAGE ORIGINALS --------------------------------------------------------------------------------------------------------------------------
export const zPageOriginalsData = z.object({
  title: z.string(),
});

export const zPageOriginals = zContentEntry(zPageOriginalsData).transform(async ({body, data: {title}}) => {
  const [sets, works] = await Promise.all([findEntries(zContentEntry(zSetData).array())('sets'), findWorks()]);
  return {body, items: filterNonEmptySets(sets, works).map(setItemFrom), title};
});

// PAGE TO ORDER ---------------------------------------------------------------------------------------------------------------------------
export const zPageToOrderData = z.object({
  title: z.string(),
});

export const zPageToOrder = zContentEntry(zPageToOrderData).transform(async () => {
  const [commissions, works] = await Promise.all([findEntries(zContentEntry(zCommissionData).array())('commissions'), findWorkItems()]);
  return {commissions, works};
});

// PAGE ------------------------------------------------------------------------------------------------------------------------------------
export const zPageData = z.union([zPageAboutData, zPageDisclaimerData, zPageGeneralData, zPageOriginalsData]);

// SET -------------------------------------------------------------------------------------------------------------------------------------
export const zSetData = z.object({
  image: zImage,
  title: z.string(),
});
export type SetDto = ContentEntry<z.infer<typeof zSetData>>;

export const zSetItem = zContentEntry(zSetData).transform(setItemFrom);

// WORK ------------------------------------------------------------------------------------------------------------------------------------
export const zWorkData = z.object({
  date: z.coerce.date(),
  height: z.number().int().min(0),
  image: zImage,
  media: zMedia.array().min(0),
  set: z.string().transform((slug) => ({collection: 'sets', slug})),
  stripe: z.string().optional(),
  thumbnail: zImage.optional(),
  title: z.string(),
  type: zType,
  width: z.number().int().min(0),
});
export type WorkDto = DataEntry<z.infer<typeof zWorkData>>;

export async function findWorks(refsOrCountOrSet?: DataRef<'works'>[] | number | string) {
  const entries = await findEntries(zDataEntry(zWorkData).array())(Array.isArray(refsOrCountOrSet) ? refsOrCountOrSet : 'works');
  if (typeof refsOrCountOrSet === 'string') return entries.filter(({data: {set}}) => set.slug === refsOrCountOrSet);
  if (typeof refsOrCountOrSet !== 'number') return entries;
  return entries.sort((w2, w1) => w1.data.date.getTime() - w2.data.date.getTime()).slice(0, refsOrCountOrSet);
}

export async function findWorkItems(refsOrCountOrSet?: DataRef<'works'>[] | number | string) {
  const entries = await findWorks(refsOrCountOrSet);
  return entries.map(workItemFrom);
}

// PAGE ORIGINALS SET ----------------------------------------------------------------------------------------------------------------------
export const zPageOriginalsSet = zContentEntry(zSetData).transform(async ({body, data, slug}) => {
  return {...data, body, items: await findWorkItems(slug), slug};
});

// PAGE ORIGINALS SET WORK -----------------------------------------------------------------------------------------------------------------
export const zPageOriginalsSetWork = zDataEntry(zWorkData).transform(
  async ({data: {height, image, media, set: s, stripe, title, type, width}, id}) => {
    const [set, items] = await Promise.all([findEntry(zSetItem)({collection: 'sets', slug: s.slug}), findWorkItems(s.slug)]);
    const price = Math.ceil((width * height) / (type === 'canvas' ? 6 : 9));
    const features = [
      {text: 'Prix', value: `${price}.00€`},
      {text: 'Dimensions', value: `${width}cm x ${height}cm`},
      {text: 'Support', value: i18n.types[type]},
      {text: 'Média', value: media.map((item) => i18n.medias[item]).join(', ')},
    ];
    return {features, href: `/originaux/${s.slug}/${id}`, image, set, others: items.filter(({slug}) => id !== slug), stripe, title};
  }
);
