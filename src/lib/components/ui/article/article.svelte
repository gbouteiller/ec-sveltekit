<article class={STYLES({class: c})}>{@html source}</article>

<script lang="ts">
  import {STYLES, type Props} from '.';

  // PROPS ---------------------------------------------------------------------------------------------------------------------------------
  export let source: Props['source'];

  // STYLES --------------------------------------------------------------------------------------------------------------------------------
  let c: Props['class'] = '';
  export {c as class};
</script>
