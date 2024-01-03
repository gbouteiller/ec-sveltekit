<div class="fixed bottom-0 right-0 z-50 m-4 flex flex-col items-end gap-2" use:portal>
  {#each $toasts as { id, data } (id)}
    <div
      {...$content(id)}
      use:content
      animate:flip={{duration: 500}}
      in:fly={{duration: 150, x: '100%'}}
      out:fly={{duration: 150, x: '100%'}}
      class="{data.type === 'success' ? 'bg-success' : 'bg-destructive'} text-white shadow-md"
    >
      <div class="relative w-96 max-w-[calc(100vw-2rem)] p-5">
        <h3 {...$title(id)} use:title class="flex items-center gap-2 font-bold">{data.type === 'success' ? 'Succès' : 'Erreur'}</h3>
        <div {...$description(id)} use:description>{data.description}</div>
      </div>
    </div>
  {/each}
</div>

<script lang="ts" context="module">
  const {elements, helpers, states, actions} = createToaster<ToastData>();
  const {content, title, description} = elements;
  const {toasts} = states;
  const {portal} = actions;
  export const addToast = helpers.addToast;

  // TYPES ---------------------------------------------------------------------------------------------------------------------------------
  export type ToastData = {description: string; type: 'failure' | 'success'};
</script>

<script lang="ts">
  import {createToaster} from '@melt-ui/svelte';
  import {flip} from 'svelte/animate';
  import {fly} from 'svelte/transition';
</script>
