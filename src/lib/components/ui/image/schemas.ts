import {z} from 'zod';

export const zGetImageParams = z.object({
  height: z.number().int().min(0),
  prod: z.boolean().default(false),
  quality: z.number().int().min(0).max(100).default(75),
  src: z.string(),
  width: z.number().int().min(0),
});
export type GetImageParams = z.infer<typeof zGetImageParams>;
