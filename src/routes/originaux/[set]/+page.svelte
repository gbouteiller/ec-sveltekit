<Breadcrumb items={crumbs} />
<Section intent="primary" {title}>
  <Article source={body} />
</Section>
<Section grid={items}>
  {#each items as item, index}<WorkItem {index} {...item} />{/each}
</Section>

<script lang="ts">
  import {Article} from '$lib/components/ui/article';
  import {Breadcrumb} from '$lib/components/ui/breadcrumb';
  import {Section} from '$lib/components/ui/section';
  import {WorkItem} from '$lib/components/work-item';

  // PROPS ---------------------------------------------------------------------------------------------------------------------------------
  export let data;

  // VARS ----------------------------------------------------------------------------------------------------------------------------------
  $: ({body, crumbs, items, title} = data);
</script>
