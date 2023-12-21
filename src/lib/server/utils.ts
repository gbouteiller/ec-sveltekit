import type {SetDto, WorkDto} from './schemas';

// SET -------------------------------------------------------------------------------------------------------------------------------------
export function filterNonEmptySets(sets: SetDto[], works: WorkDto[]) {
  return sets.filter(({slug}) => works.some(({data: {set}}) => set.slug === slug));
}

export function setItemFrom({data: {image, title}, slug}: SetDto) {
  return {href: `/originaux/${slug}`, image, title};
}
export type SetItem = ReturnType<typeof setItemFrom>;

// WORK ------------------------------------------------------------------------------------------------------------------------------------
export function workItemFrom({data: {height, image, set, stripe, thumbnail, title, type, width}, id: slug}: WorkDto) {
  const price = Math.ceil((width * height) / (type === 'canvas' ? 6 : 9));
  return {href: `/originaux/${set.slug}/${slug}`, image: thumbnail ?? image, price, slug, stripe, title};
}
export type WorkItem = ReturnType<typeof workItemFrom>;
