import {BOX, BTN, H} from '$lib/styles';
import type {Intent, Link} from '$lib/utils';
import {tv} from 'tailwind-variants';
import Root from './card.svelte';

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const STYLES = tv({
  extend: BOX,
  slots: {
    BASE: 'items-center gap-8 p-6 sm:gap-12 sm:p-10',
    LINK: BTN({size: 'lg'}), //, intent: ['dark', 'primary', 'white'].includes(intent) ? 'secondary' : undefined}),
    TITLE: H({level: 2}),
  },
});

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type Props = {class: Styles; intent?: Intent; link?: Link; title?: string};;
export type Styles = Partial<(typeof STYLES)['slots']>;

// EXPORTS ---------------------------------------------------------------------------------------------------------------------------------
export {STYLES as CARD, Root as Card, type Props as CardProps, type Styles as CardStyles};
