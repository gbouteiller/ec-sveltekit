import {z} from 'zod';

// ENUMS -----------------------------------------------------------------------------------------------------------------------------------
export const layouts = ['portrait', 'landscape'] as const;
export const zLayout = z.enum(layouts);

export const medias = ['acrylic', 'ink', 'mixedMedia', 'oil', 'watercolor'] as const;
export const zMedia = z.enum(medias);

export const regions = ['reunion', 'mainland'] as const;
export const zRegion = z.enum(regions);

export const sizes = ['fA5', 'f2432'] as const;
export const zSize = z.enum(sizes);

export const types = ['canvas', 'paper'] as const;
export const zType = z.enum(types);

// IMAGE -----------------------------------------------------------------------------------------------------------------------------------
export const zImageData = z.object({
  alt: z.string(),
  height: z.number().int().min(0),
  src: z.string(),
  width: z.number().int().min(0),
});

// FORM ORDER ------------------------------------------------------------------------------------------------------------------------------
export const zFormOrder = z.object({
  animal: z.string().optional(),
  captcha: z.string(),
  color1: z.string(),
  color2: z.string().optional(),
  color3: z.string().optional(),
  email: z.string().email(),
  forename: z.string(),
  hobbies: z.string().optional(),
  layout: zLayout,
  note: z.string().optional(),
  personality: z.string().optional(),
  region: zRegion,
  phone: z.string().optional(),
  size: zSize,
  surname: z.string(),
  works: z.string().array().length(2),
});
export type FormOrder = z.infer<typeof zFormOrder>;

// FORM REQUEST ----------------------------------------------------------------------------------------------------------------------------
export const zFormRequest = z.object({
  captcha: z.string(),
  email: z.string().email(),
  forename: z.string(),
  message: z.string(),
  surname: z.string(),
});
export type FormRequest = z.infer<typeof zFormRequest>;

// WORK ------------------------------------------------------------------------------------------------------------------------------------
export const zWorkImageItem = z.object({cmp: z.any(), id: z.string()});
export type WorkImageItem = z.infer<typeof zWorkImageItem>;
