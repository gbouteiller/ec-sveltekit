<article class={cn('prose lg:prose-lg xl:prose-xl 2xl:prose-2xl', c)}>{@html source}</article>

<script lang="ts">
  import {cn} from '$lib/utils';
  
  // PROPS ---------------------------------------------------------------------------------------------------------------------------------
  export let source: string;

  // STYLES --------------------------------------------------------------------------------------------------------------------------------
  let c = '';
  export {c as class};
</script>
