<img bind:this={_} {alt} {...props} style={lqip && `background-image:url(${lqip})`} class={STYLES({isLoaded, class: c})} {...$$restProps} />
<noscript>
  <img {alt} {...props} style={lqip && `background-image:url(${lqip})`} class={STYLES({noScript: true, class: c})} {...$$restProps} />
</noscript>

<script lang="ts">
  import {dev} from '$app/environment';
  import {onMount} from 'svelte';
  import {STYLES, type Styles} from './styles';
  import {getImage} from './utils';

  // PROPS ---------------------------------------------------------------------------------------------------------------------------------
  export let alt: HTMLImageElement['alt'] = '';
  export let height: HTMLImageElement['height'];
  export let lqip: string | undefined = undefined;
  export let quality = 75;
  export let src: HTMLImageElement['src'];
  export let width: HTMLImageElement['width'];

  // VARS ----------------------------------------------------------------------------------------------------------------------------------
  let _: HTMLImageElement;
  let isLoaded = false;

  $: props = getImage({height, prod: !dev, quality, src, width});

  // STYLES --------------------------------------------------------------------------------------------------------------------------------
  let c: Styles = '';
  export {c as class};

  // LIFECYCLE -----------------------------------------------------------------------------------------------------------------------------
  onMount(() => {
    if (_.complete) isLoaded = true;
    _.onload = () => (isLoaded = true);
  });
</script>
