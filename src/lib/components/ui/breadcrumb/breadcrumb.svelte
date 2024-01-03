<ol class={BASE({intent: 'light', class: ['w-full flex-row items-center gap-4 overflow-x-auto p-4 sm:px-8', c]})}>
  {#each items as { href, text }, i}
    {#if i < items.length - 1}
      <li><a {href} class="font-bold text-dark hover:text-primary">{text}</a></li>
      <li aria-hidden>&rsaquo;</li>
    {:else}<li>{text}</li>{/if}
  {/each}
</ol>

<script lang="ts">
  import {STYLES, type Props} from '.';

  // PROPS -----------------------------------------------------------------------------------------------------------------------------------
  export let items: Props['items'];

  // STYLES ----------------------------------------------------------------------------------------------------------------------------------
  let c: Props['class'] = '';
  export {c as class};

  const {BASE} = STYLES();
</script>
