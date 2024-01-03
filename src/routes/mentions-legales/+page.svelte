<Section intent="primary" title="Mentions légales">
  <Article source={body} class="bg-white p-6 text-justify" />
</Section>

<script lang="ts">
  import {Article} from '$lib/components/ui/article';
  import {Section} from '$lib/components/ui/section';

  // PROPS ---------------------------------------------------------------------------------------------------------------------------------
  export let data;

  // VARS ----------------------------------------------------------------------------------------------------------------------------------
  $: ({body} = data);
</script>
