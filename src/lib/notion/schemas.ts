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

export const materials = ['canvas', 'paper'] as const;
export const zMaterial = z.enum(materials);

// COMMISSION ------------------------------------------------------------------------------------------------------------------------------


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

// GENERAL ----------------------------------------------------------------------------------------------------------------------------


// IMAGE -----------------------------------------------------------------------------------------------------------------------------------


// SET -------------------------------------------------------------------------------------------------------------------------------------


// WORK ------------------------------------------------------------------------------------------------------------------------------------


// API -------------------------------------------------------------------------------------------------------------------------------------





