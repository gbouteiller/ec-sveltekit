{#each sections as { body, image, title }, i}
  <Section intent={i % 2 ? 'white' : 'secondary'} {title} class={{BASE: 'md:min-h-[512px]', CONTENT: 'flex-1 self-center'}}>
    <Article source={body} class="text-justify" />
    <figure slot="aside" class={FIG({class: ['h-96 w-full flex-none md:h-auto md:flex-1', i % 2 && 'md:order-1']})}>
      <Image {...image} loading={i > 0 ? 'lazy' : 'eager'} sizes="(min-width: 768px) 50vw, 100vw" class="h-full object-cover" />
    </figure>
  </Section>
{/each}

<script lang="ts">
  import {Article} from '$lib/components/ui/article';
  import {Image} from '$lib/components/ui/image';
  import {FIG} from '$lib/components/ui/image/styles';
  import {Section} from '$lib/components/ui/section';

  // PROPS ---------------------------------------------------------------------------------------------------------------------------------
  export let data;

  // VARS ----------------------------------------------------------------------------------------------------------------------------------
  $: ({sections} = data);
</script>
