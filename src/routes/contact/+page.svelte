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
    <Form.Root {form} method="POST" schema={zData} {options} let:config let:delayed class="flex w-full max-w-3xl flex-col gap-6">
      <Turnstile siteKey={PUBLIC_CLOUDFLARE_SITE_KEY} formsField="captcha" />
      <Form.Field {config} name="forename">
        <Form.Item>
          <Form.Label>{i18n.fields.forename}</Form.Label>
          <Form.Input />
          <Form.Validation />
        </Form.Item>
      </Form.Field>
      <Form.Field {config} name="surname">
        <Form.Item>
          <Form.Label>{i18n.fields.surname}</Form.Label>
          <Form.Input />
          <Form.Validation />
        </Form.Item>
      </Form.Field>
      <Form.Field {config} name="email">
        <Form.Item>
          <Form.Label>{i18n.fields.email}</Form.Label>
          <Form.Input type="email" />
          <Form.Validation />
        </Form.Item>
      </Form.Field>
      <Form.Field {config} name="message">
        <Form.Item>
          <Form.Label>{i18n.fields.message}</Form.Label>
          <Form.Textarea rows={10} />
          <Form.Validation />
        </Form.Item>
      </Form.Field>
      <Form.Button disabled={delayed} class="self-end">
        {#if delayed}
          <Icon icon="mdi:loading" class="mr-2 h-6 w-6 animate-spin" />{/if}
        Envoyer
      </Form.Button>
    </Form.Root>
    <Toaster />
  </Card>
</div>

<script lang="ts">
  import {PUBLIC_CLOUDFLARE_SITE_KEY} from '$env/static/public';
  import {ContactItem, type ContactItemStyles} from '$lib/components/contact-item';
  import {Card, type CardStyles} from '$lib/components/ui/card';
  import * as Form from '$lib/components/ui/form';
  import {Image} from '$lib/components/ui/image';
  import {FIG} from '$lib/components/ui/image/styles';
  import {Toaster, addToast} from '$lib/components/ui/toaster';
  import {i18n as allI18n} from '$lib/i18n';
  import Icon from '@iconify/svelte';
  import type {FormOptions} from 'formsnap';
  import {Turnstile} from 'svelte-turnstile';
  import {zData} from './schemas';

  // PROPS ---------------------------------------------------------------------------------------------------------------------------------
  export let data;

  // VARS ----------------------------------------------------------------------------------------------------------------------------------
  const i18n = allI18n.components.contactForm;
  $: ({form, logo, social} = data);

  const options: FormOptions<typeof zData> = {
    onUpdated({form: {message, valid}}) {
      const data = valid ? {description: i18n.success, type: 'success' as const} : {description: i18n.failure, type: 'failure' as const};
      if (message) addToast({data});
    },
    resetForm: true,
  };

  // STYLES --------------------------------------------------------------------------------------------------------------------------------
  const CONTACT_ITEM: ContactItemStyles = {BASE: 'w-full p-2 border-t-2'};
  const INFOS: CardStyles = {BASE: 'flex:none items-center overflow-y-auto before:mt-auto after:mb-auto sm:flex-1 lg:flex-none'};
</script>
