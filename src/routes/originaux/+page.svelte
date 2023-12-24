{#await data.page}
  Loading page...
{:then page}
  {page.data.title}
{:catch error}
  <p>error loading page: {error.message}</p>
{/await}
{#await data.items}
  Loading items...
{:then items}
  <Section grid={items}>
    {#each items as item, index}<Item {index} {...item} />{/each}
  </Section>
{:catch error}
  <p>error loading items: {error.message}</p>
{/await}

<!-- <Section intent="primary" {title}>
  <UiArticle>{body}</UiArticle>
</Section> -->
<!-- <Section grid={items}>
  {#each items as item, index}<Item {index} {...item} />{/each}
</Section> -->

<!-- <img src="/_vercel/image?url=/favicon.png&w=256&q=75" alt="favicon" width="128" height="128" /> -->

<script lang="ts">
  import {Item} from '$lib/components/ui/item';
  import {Section} from '$lib/components/ui/section';

  // PROPS ---------------------------------------------------------------------------------------------------------------------------------
  export let data;

  // VARS ----------------------------------------------------------------------------------------------------------------------------------
  $: ({page, items} = data);
</script>
