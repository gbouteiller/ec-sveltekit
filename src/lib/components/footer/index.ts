import {BOX} from '$lib/styles';
import type {Intent} from '$lib/utils';
import {tv} from 'tailwind-variants';
import Root from './footer.svelte';

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const STYLES = tv({
  extend: BOX,
  slots: {
    BASE: 'flex-row justify-center p-4 text-sm sm:justify-between',
    MENU: 'hidden sm:flex sm:gap-2',
    NAV: 'hover:text-primary',
  },
  variants: {
    intent: {
      primary: {
        NAV: 'hover:text-white',
      },
    },
  },
});

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type Props = {class: Styles; intent: Intent};
export type Styles = Partial<(typeof STYLES)['slots']>;

// EXPORTS ---------------------------------------------------------------------------------------------------------------------------------
export {STYLES as FOOTER, Root as Footer, type Props as FooterProps, type Styles as FooterStyles};
