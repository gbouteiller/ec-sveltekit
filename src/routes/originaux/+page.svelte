<!-- <Section intent="primary" {title}>
  <UiArticle>{body}</UiArticle>
</Section> -->
<Section grid={items}>
  {#each items as item, index}<Item {index} {...item} />{/each}
</Section>
<!-- <img src="/favicon.png" srcset="/_vercel/image?url=/favicon.png&w=128&q=75" alt="favicon" width="128" height="128" /> -->

<script lang="ts">
  import {Item} from '$lib/components/ui/item';
  import {Section} from '$lib/components/ui/section';

  // PROPS ---------------------------------------------------------------------------------------------------------------------------------
  export let data;

  // VARS ----------------------------------------------------------------------------------------------------------------------------------
  $: ({items} = data);
</script>
