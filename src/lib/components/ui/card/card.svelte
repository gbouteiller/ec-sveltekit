<div class={BASE({intent, class: c.BASE})}>
  {#if title}<h2 class={TITLE({class: c.TITLE})}>{title}</h2>{/if}
  <slot />
  {#if link}<a href={link.href} class={LINK({class: c.LINK})}>{link.text}</a>{/if}
</div>

<script lang="ts">
  import {STYLES, type Props} from '.';

  // PROPS -----------------------------------------------------------------------------------------------------------------------------------
  export let intent: Props['intent'] = 'white';
  export let link: Props['link'] = undefined;
  export let title: Props['title'] = undefined;

  // STYLES ----------------------------------------------------------------------------------------------------------------------------------
  let c: Props['class'] = {};
  export {c as class};

  const {BASE, LINK, TITLE} = STYLES();
</script>
