<div class="lg:flex lg:h-full">
  <Card {title} intent="primary" class={{BASE: 'lg:flex-1 lg:overflow-y-auto lg:before:mt-auto lg:after:mb-auto', TITLE: 'lg:-mt-12'}}>
    <Article source={body} class="lg:-mb-12" />
  </Card>
  <Card intent="light" class={{BASE: 'lg:flex-1 lg:overflow-y-auto'}}>
    <!-- <ToOrderForm client:visible {works} /> -->
  </Card>
</div>

<script lang="ts">
  import {Article} from '$lib/components/ui/article';
  import {Card} from '$lib/components/ui/card';

  // PROPS ---------------------------------------------------------------------------------------------------------------------------------
  export let data;

  // VARS ----------------------------------------------------------------------------------------------------------------------------------
  $: ({body, title, works} = data);
</script>
