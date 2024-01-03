import {i18n as allI18n} from '$lib/i18n';
import {z} from "zod";

export const zData = z.object({
  captcha: z.string(),
  email: z.string().min(1, allI18n.validators.required).email(allI18n.validators.email),
  forename: z.string().min(1, allI18n.validators.required),
  message: z.string().min(1, allI18n.validators.required),
  surname: z.string().min(1, allI18n.validators.required),
});
export type Data = z.output<typeof zData>;