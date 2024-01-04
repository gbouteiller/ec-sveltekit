<div class="flex h-full w-full flex-col md:flex-row">
  <Card intent="light" title="Me contacter" class={INFOS}>
    <div class="flex items-center gap-4 md:flex-col">
      <div class="w-full max-w-md">
        {#each social as item}<ContactItem {...item} class={CONTACT_ITEM} />{/each}
      </div>
      <figure class={FIG({class: 'hidden aspect-square w-72 flex-none sm:block lg:w-96'})}>
        <Image {...logo} sizes="(min-width: 1024px) 384px, 288px" />
      </figure>
    </div>
  </Card>
  <Card intent="primary" class={{BASE: 'flex-1 overflow-y-auto before:mt-auto after:mb-auto'}}>
    <slot />
  </Card>
</div>

<script lang="ts">
  import {ContactItem, type ContactItemStyles} from '$lib/components/contact-item';
  import {Card, type CardStyles} from '$lib/components/ui/card';
  import {Image} from '$lib/components/ui/image';
  import {FIG} from '$lib/components/ui/image/styles';

  // PROPS ---------------------------------------------------------------------------------------------------------------------------------
  export let data;

  // VARS ----------------------------------------------------------------------------------------------------------------------------------
  $: ({logo, social} = data);

  // STYLES --------------------------------------------------------------------------------------------------------------------------------
  const CONTACT_ITEM: ContactItemStyles = {BASE: 'w-full p-2 border-t-2'};
  const INFOS: CardStyles = {BASE: 'flex:none items-center overflow-y-auto before:mt-auto after:mb-auto sm:flex-1 lg:flex-none'};
</script>
