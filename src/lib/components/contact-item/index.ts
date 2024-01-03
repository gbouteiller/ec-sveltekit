import {tv} from 'tailwind-variants';
import Root from './contact-item.svelte';

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const STYLES = tv({
  slots: {
    BASE: 'flex items-center gap-4 text-lg',
    ICON: 'h-10 w-10',
  },
});

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type Props = {class: Styles; href: string; icon: string; text: string};
export type Styles = Partial<(typeof STYLES)['slots']>;

// EXPORTS ---------------------------------------------------------------------------------------------------------------------------------
export {STYLES as CONTACT_ITEM, Root as ContactItem, type Props as ContactItemProps, type Styles as ContactItemStyles};
