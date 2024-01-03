<Breadcrumb items={crumbs} />
<Section intent="primary" {title} class={MAIN}>
  <table class="prose lg:prose-lg xl:prose-xl 2xl:prose-2xl w-full table-auto">
    <tbody>
      {#each features as { text, value }}
        <tr>
          <td class="font-bold">{text}</td>
          <td>{value}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  <figure slot="aside" class={FIG({class: 'order-1 flex-1 bg-white lg:h-[calc(100vh_-_188px)] lg:p-10'})}>
    <Image {...image} sizes="(min-width: 1024px) calc(1.1 * (100vw - 88px)), 100vw" class="h-full object-contain" />
  </figure>
</Section>
{#if others.length > 0}
  <Section grid={others} gridMax={320} intent="light" title="Également dans cette collection">
    {#each others as work, index}<WorkItem {index} {...work} />{/each}
  </Section>
{/if}

<script lang="ts">
  import {Breadcrumb} from '$lib/components/ui/breadcrumb';
  import {Image} from '$lib/components/ui/image';
  import {FIG} from '$lib/components/ui/image/styles';
  import {Section} from '$lib/components/ui/section';
  import {WorkItem} from '$lib/components/work-item';

  // PROPS ---------------------------------------------------------------------------------------------------------------------------------
  export let data;

  // VARS ----------------------------------------------------------------------------------------------------------------------------------
  const {crumbs, features, image, others, title} = data;

  // STYLES --------------------------------------------------------------------------------------------------------------------------------
  const MAIN = {BASE: 'md:!flex-col lg:!flex-row', CONTENT: 'flex-none justify-center lg:max-w-lg', TITLE: 'text-center'};
</script>
