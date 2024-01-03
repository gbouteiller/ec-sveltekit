import {BOX} from '$lib/styles';
import {tv} from 'tailwind-variants';
import Root from './breadcrumb.svelte';

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const STYLES = tv({
  extend: BOX
});

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type Props = {class: Styles; items: {href?: string; text: string}[]};
export type Styles = string;

// EXPORTS ---------------------------------------------------------------------------------------------------------------------------------
export {STYLES as BREADCRUMB, Root as Breadcrumb, type Props as BreadcrumbProps, type Styles as BreadcrumbStyles};

