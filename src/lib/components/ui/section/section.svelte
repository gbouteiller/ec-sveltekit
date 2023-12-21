<section class={BASE({intent, class: c.BASE})}>
  <slot name="aside" />
  <div class={CONTENT({hasGrid: !!grid, class: c.CONTENT})}>
    {#if title}<h2 class={TITLE({class: c.TITLE})}>{title}</h2>{/if}
    {#if grid}<div class={GRID({class: c.GRID})} style={sGrid}><slot /></div>{:else}<slot />{/if}
    {#if link}<a href={link.href} class={LINK({intent, class: c.LINK})}>{link.text}</a>{/if}
  </div>
</section>

<script lang="ts">
  import {STYLES, type Props} from '.';

  // PROPS -----------------------------------------------------------------------------------------------------------------------------------
  export let grid: Props['grid'] = undefined;
  export let gridMax: Props['gridMax'] = 500;
  export let intent: Props['intent'] = 'white';
  export let link: Props['link'] = undefined;
  export let title: Props['title'] = undefined;

  // STYLES ----------------------------------------------------------------------------------------------------------------------------------
  let c: Props['class'] = {};
  export {c as class};

  const {BASE, CONTENT, GRID, LINK, TITLE} = STYLES();

  $: sGrid = `
    --grid-cols: repeat(auto-fit,minmax(300px,1fr)); 
    --max-w-grid: ${gridMax * (grid?.length ?? 0) + 12 * 4 * ((grid?.length ?? 0) - 1)}px;
  `;
</script>
