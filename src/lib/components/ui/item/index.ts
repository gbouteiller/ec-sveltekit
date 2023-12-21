import type {SetItem} from '$lib/server/utils';
import {H} from '$lib/styles';
import {tv} from 'tailwind-variants';
import Root from './item.svelte';

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const STYLES = tv({
  slots: {
    BASE: 'flex flex-col gap-2',
    BULLET: 'h-4 w-4 bg-primary',
    FIGURE: 'relative overflow-hidden bg-light aspect-square w-full shadow-xl',
    HEADER: 'flex items-baseline justify-center gap-1',
    IMAGE: '',
    TITLE: H({level: 3, class: 'truncate pl-1 text-4xl/[2.75rem]'}),
  },
  variants: {
    isOdd: {
      true: {
        BULLET: 'bg-secondary',
      },
    },
  },
});

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type Props = {class: Styles; index: number} & SetItem;
export type Styles = Partial<(typeof STYLES)['slots']>;

// EXPORTS ---------------------------------------------------------------------------------------------------------------------------------
export {STYLES as ITEM, Root as Item, type Props as ItemProps, type Styles as ItemStyles};

