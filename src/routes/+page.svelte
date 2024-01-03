<div class="relative flex h-full w-full items-end justify-center">
  <figure class={FIG({class: 'absolute inset-0 bottom-11 -z-10 sm:bottom-14 lg:inset-x-10'})}>
    <Image {...hero.image} loading="eager" class="h-full object-cover" />
  </figure>
  {#if hero.title}<h1 class={H({level: 1, class: 'mb-8 w-full bg-secondary p-6 text-center lg:mx-16'})}>{hero.title}</h1>{/if}
</div>

<Section {...lastWorks} class={{TITLE: 'lg:w-full'}}>
  {#each lastWorks.grid as work, index}<WorkItem {index} {...work} />{/each}
</Section>

<Section {...toOrder} intent="secondary" class={{CONTENT: 'relative md:!py-32', TITLE: 'text-center'}}>
  <Article source={toOrder.body} />
  <div class="hidden md:block">
    {#each toOrderImages as { classes, ...image }}
      <figure class={FIG({class: ['!absolute z-10 shadow-lg', classes]})}>
        <Image {...image} />
      </figure>
    {/each}
  </div>
</Section>

<Section {...about} intent="primary" class={{CONTENT: 'flex-1'}}>
  <figure slot="aside" class={FIG({class: 'h-96 w-full flex-none md:h-auto md:flex-1'})}>
    <Image {...about.image} sizes="(min-width: 768px) 50vw, 100vw" class="h-full object-cover" />
  </figure>
  <Article source={about.body} />
</Section>

<Section {...contact} intent="dark" class={{BASE: 'relative w-full !flex-col xl:border-r-[80px] xl:border-primary xl:p-10 xl:pt-48'}}>
  <div slot="aside" class={CONTACT_ASIDE}>
    <h2 class={H({level: 2, class: 'text-center sm:text-4xl md:text-5xl lg:text-6xl'})}>{contact.quote.text}</h2>
    <h3 class={H({level: 3, class: 'font-normal'})}>{contact.quote.author}</h3>
  </div>
  <div class="flex flex-col justify-center gap-4 sm:flex-row sm:gap-12 md:gap-16 lg:gap-24">
    {#each contact.social as item}
      <ContactItem {...item} class={CONTACT_ITEM} />
    {/each}
  </div>
</Section>

<script lang="ts">
  import {ContactItem} from '$lib/components/contact-item';
  import {Article} from '$lib/components/ui/article';
  import {Image} from '$lib/components/ui/image';
  import {FIG} from '$lib/components/ui/image/styles';
  import {Section} from '$lib/components/ui/section';
  import {WorkItem} from '$lib/components/work-item';
  import {H} from '$lib/styles';

  // PROPS ---------------------------------------------------------------------------------------------------------------------------------
  export let data;

  // VARS ----------------------------------------------------------------------------------------------------------------------------------
  $: ({about, contact, hero, lastWorks, toOrder} = data);

  $: toOrderImages = toOrder.images.map((img, i) => {
    const classes =
      ['-top-4 ', '-bottom-4 ', '-top-10 left-[calc(100%_+_4rem)] 2xl:left-[calc(100%_+_10rem)] ', '-bottom-2 left-full '][i] +
      (img.width <= img.height
        ? ['-left-96 2xl:-left-[30rem] ', '-left-80 ', '', ''][i] + 'w-80'
        : ['-left-[34rem] 2xl:-left-[40rem] ', '-left-[30rem] ', '', ''][i] + 'w-[30rem]');
    const sizes = img.width <= img.height ? '320px' : '480px';
    return {...img, classes, sizes};
  });

  // STYLES --------------------------------------------------------------------------------------------------------------------------------
  const CONTACT_ASIDE =
    'z-10 flex flex-col items-center gap-4 py-6 px-5 bg-white lg:px-10 text-neutral-900 xl:absolute xl:-top-6 xl:left-10 xl:items-end';

  const CONTACT_ITEM = {
    BASE: 'text-lg hover:text-primary sm:flex-col sm:text-xl md:text-2xl',
    ICON: 'w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 text-primary',
  };
</script>
