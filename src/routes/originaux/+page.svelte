<!-- <Section intent="primary" {title}>
  <Article source={body} />
</Section> -->
<Section grid={items}>
  {#each items as item, index}<Item {index} {...item} />{/each}
</Section>

<script lang="ts">
  // import {Article} from '$lib/components/ui/article';
  import {Item} from '$lib/components/ui/item';
  import {Section} from '$lib/components/ui/section';

  // PROPS ---------------------------------------------------------------------------------------------------------------------------------
  export let data;

  // VARS ----------------------------------------------------------------------------------------------------------------------------------
  $: ({body, items, title} = data);
</script>
