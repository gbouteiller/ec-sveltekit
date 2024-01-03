import {cacheImage, findEntry, zIdToDataEntry, zIdsToDataEntries} from '.';
import {zImage, zWork, type Work} from '../schemas';
import {getWorkHref, getWorkPrice} from '../utils';

// IMAGE -----------------------------------------------------------------------------------------------------------------------------------
function zCachedImage(aspectRatio?: number) {
  return zImage.transform((image) => cacheImage({...image, aspectRatio}));
}

export function getCachedImage(id: string, aspectRatio?: number) {
  return findEntry(zCachedImage(aspectRatio))({collection: 'images', id}); 
}

export function zIdToCachedImage(aspectRatio?: number) {
  return zIdToDataEntry('images', zCachedImage(aspectRatio));
}

export function zIdsToCachedImages(aspectRatio?: number) {
  return zIdsToDataEntries('images', zCachedImage(aspectRatio).array());
}

// SET -------------------------------------------------------------------------------------------------------------------------------------
// export function setItemFrom({data: {image, title}, slug}: SetDto) {
//   return {href: `/originaux/${slug}`, image, title};
// }
// export type SetItem = ReturnType<typeof setItemFrom>;

// WORK ------------------------------------------------------------------------------------------------------------------------------------
export const zWorkItem = zWork.transform(getWorkItem); 

export async function getWorkItem(work: Work) {
  const {date, stripe, thumbnail, title} = work;
  const image = await findEntry(zCachedImage(1))({collection: 'images', id: thumbnail ?? work.image}) 
  return {date, href: getWorkHref(work), image, price: getWorkPrice(work), stripe, title};
}