import {tv} from 'tailwind-variants';
import Root from './article.svelte';

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const STYLES = tv({
  base: 'prose lg:prose-lg xl:prose-xl 2xl:prose-2xl',
});

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type Props = {class: Styles; source: string};
export type Styles = string;

// EXPORTS ---------------------------------------------------------------------------------------------------------------------------------
export {STYLES as ARTICLE, Root as Article, type Props as ArticleProps, type Styles as ArticleStyles};
