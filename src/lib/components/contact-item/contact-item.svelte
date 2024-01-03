<a href={href} class={BASE({class: c.BASE})}>
  <Icon icon={`mdi:${icon}`} class={ICON({class: c.ICON})} />
  {text}
</a>

<script lang="ts">
  import Icon from '@iconify/svelte';
  import {STYLES, type Props} from '.';
  
  // PROPS -----------------------------------------------------------------------------------------------------------------------------------
  export let href: Props['href'];
  export let icon: Props['icon'];
  export let text: Props['text'];

  // STYLES ----------------------------------------------------------------------------------------------------------------------------------
  let c: Props['class'] = {};
  export {c as class};

  const {BASE, ICON} = STYLES();
</script>
