import type {WorkItem} from '$lib/server/utils';
import {tv} from 'tailwind-variants';
import {ITEM, type ItemStyles} from '../ui/item';
import Root from './work-item.svelte';

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const STYLES = tv({
  extend: ITEM,
  slots: {
    PRICE: 'z-[1] absolute bottom-0 right-0 px-4 py-2 text-xl font-bold bg-primary',
  },
  variants: {
    isOdd: {
      true: {
        PRICE: 'bg-secondary',
      },
    },
  },
});

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type Props = WorkItem & {class: Styles; index: number};
export type Styles = Partial<(typeof STYLES)['slots']> & ItemStyles;

// EXPORTS ---------------------------------------------------------------------------------------------------------------------------------
export {STYLES as WORK_ITEM, Root as WorkItem, type Props as WorkItemProps, type Styles as WorkItemStyles};
