import {BOX, BTN, H} from '$lib/styles';
import type {Intent, Link} from '$lib/utils';
import {tv} from 'tailwind-variants';
import Root from './section.svelte';

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const STYLES = tv({
  extend: BOX,
  slots: {
    BASE: 'md:flex-row',
    CONTENT: 'mx-auto flex flex-col items-center gap-8 p-6 sm:gap-12 sm:p-10',
    GRID: 'mx-auto grid w-full grid-cols-[var(--grid-cols)] gap-8 sm:gap-12 lg:max-w-[var(--max-w-grid)]',
    LINK: BTN({size: 'lg'}), //, intent: ['dark', 'primary', 'white'].includes(intent) ? 'secondary' : undefined}),
    TITLE: H({level: 2}),
  },
  variants: {
    hasGrid: {
      true: {
        CONTENT: 'w-full',
      },
    },
  },
});

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type Props = {class: Styles; grid?: any[]; gridMax: number; intent: Intent; link?: Link; title?: string};
export type Styles = Partial<(typeof STYLES)['slots']>;

// EXPORTS ---------------------------------------------------------------------------------------------------------------------------------
export {STYLES as SECTION, Root as Section, type Props as SectionProps, type Styles as SectionStyles};
