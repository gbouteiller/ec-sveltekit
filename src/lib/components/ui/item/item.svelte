<a {href} class={BASE({class: c.BASE})}>
  <hgroup class={HEADER({class: c.HEADER})}>
    <div class={BULLET({class: c.BULLET, isOdd: index % 2 === 1})} />
    {#if title}<h3 class={TITLE({class: c.TITLE})}>{title}</h3>{/if}
  </hgroup>
  <figure class={FIGURE({class: c.FIGURE})}>
    <Image {...image} {sizes} class="hover:scale-110" />
    <slot />
  </figure>
</a>

<script lang="ts">
  import {STYLES, type Props} from '.';
  import {Image} from '../image';

  // PROPS ---------------------------------------------------------------------------------------------------------------------------------
  export let href: Props['href'];
  export let image: Props['image'];
  export let index: Props['index'];
  export let title: Props['title'];

  // VARS ----------------------------------------------------------------------------------------------------------------------------------
  const sizes =
    '(min-width: 736px) min(calc(100vw - 88px), 550px), (min-width: 640px) calc(1.1 * (100vw - 88px)), calc(1.1 * (100vw - 56px))';

  // STYLES --------------------------------------------------------------------------------------------------------------------------------
  let c: Props['class'] = {};
  export {c as class};

  const {BASE, BULLET, FIGURE, HEADER, IMAGE, TITLE} = STYLES();
</script>
