<img {...props} {alt} class={IMG({fit, class: c})} on:load={onLoad} {...$$restProps} />

<!-- <img
  {alt}
  src={lqip}
  loading="eager"
  decoding="async"
  class={IMG({fit, class: ['absolute inset-0 p-[inherit] transition-opacity', isLoaded && 'pointer-events-none opacity-0 duration-700']})}
/> -->
<script lang="ts">
  import {dev} from '$app/environment';
  import {IMG} from './styles';
  import {getImage} from './utils';

  // PROPS ---------------------------------------------------------------------------------------------------------------------------------
  export let alt = '';
  export let aspectRatio: number | undefined = undefined;
  export let download = false;
  export let fit: 'contain' | 'cover' | 'fill' = 'cover';
  export let height: number;
  export let quality = 75;
  export let src: string;
  export let width: number;
  //export let img: GetImg['img'];
  // export let lqip: GetImg['lqip'];

  // VARS ----------------------------------------------------------------------------------------------------------------------------------
  $: props = getImage(src, alt, height, width, aspectRatio, quality, download, dev);

  // STYLES --------------------------------------------------------------------------------------------------------------------------------
  let c = '';
  export {c as class};

  // EVENTS --------------------------------------------------------------------------------------------------------------------------------
  let isLoaded = false;

  function onLoad() {
    isLoaded = true;
  }
</script>
