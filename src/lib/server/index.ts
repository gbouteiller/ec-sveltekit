import {dev} from '$app/environment';
import {CLOUDFLARE_SECRET_KEY, SENDGRID_API_KEY} from '$env/static/private';
import sgMail from '@sendgrid/mail';
import type {Action} from '@sveltejs/kit';
import type {ZodValidation} from 'formsnap';
import {message, superValidate} from 'sveltekit-superforms/server';
import type {z} from 'zod';

export function getFetchApi(fetch: Fetch) {
  return <S extends z.ZodTypeAny>(schema: S) =>
    async (uri: string): Promise<z.output<S>> => {
      const response = await fetch(`/api/${uri}.json`);
      const dto = await response.json();
      return schema.parseAsync(dto);
    };
}

export function getFormAction<D extends z.ZodObject<{captcha: z.ZodString}>>({subject, schema}: getFormActionParams<D>): Action {
  return async (event) => {
    const form = await superValidate(event, schema);
    if (!form.valid) return message(form, 'INVALID_FORM');

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({response: form.data.captcha, secret: CLOUDFLARE_SECRET_KEY}),
    });
    const {success} = (await response.json()) as {success: boolean};
    if (!success) return message(form, 'INVALID_CAPTCHA', {status: 403});

    sgMail.setApiKey(SENDGRID_API_KEY);

    if (!dev)
      await sgMail.send({
        to: 'eliana.m.corre@gmail.com',
        from: 'me@elianacorre.com',
        subject: `elianacorre.com - ${subject}`,
        html: Object.entries(form.data)
          .map(([k, v]) => `<b>${k}</b>: ${v}`)
          .join('<br>'),
      });

    return message(form, 'SUCCESS');
  };
}

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type Fetch = typeof fetch;
export type FetchApi = ReturnType<typeof getFetchApi>;

export type getFormActionParams<D extends z.ZodObject<{captcha: z.ZodString}>> = {
  schema: ZodValidation<D>;
  subject: string;
};
