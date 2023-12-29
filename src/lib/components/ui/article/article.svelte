<article class={cn('prose lg:prose-lg xl:prose-xl 2xl:prose-2xl', c)}><Markdown {source} /></article>

<script lang="ts">
  import {cn} from '$lib/utils';
  import Markdown from '@magidoc/plugin-svelte-marked';

  // PROPS ---------------------------------------------------------------------------------------------------------------------------------
  export let source: string;

  // STYLES --------------------------------------------------------------------------------------------------------------------------------
  let c = '';
  export {c as class};
</script>
