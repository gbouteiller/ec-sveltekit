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
  $: props = getImage(src, quality, download, dev);

  const widths = [256, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];

  function vercelUrl(src: string, width: number, quality: number) {
    return `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
  }

  function getImage(src: string, quality: number, download: boolean, dev: boolean): GetImage {
    if (download) {
      
    }
    
    return {
      decoding: 'async',
      loading: 'lazy',
      height,
      src: dev ? src : vercelUrl(src, widths.at(-1)!, quality),
      srcset: dev ? undefined : '',
      width,
    };
  }

  function downloadImage() {}

  type GetImage = {decoding: 'async'; height: number; loading: 'lazy'; src: string; srcset?: string; width: number};

  // STYLES --------------------------------------------------------------------------------------------------------------------------------
  let c = '';
  export {c as class};

  // EVENTS --------------------------------------------------------------------------------------------------------------------------------
  let isLoaded = false;

  function onLoad() {
    isLoaded = true;
  }
</script>
