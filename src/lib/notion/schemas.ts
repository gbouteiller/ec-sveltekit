import {zContentEntry, zDataEntry} from '@niama/notion-tools';
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
export const zCommissionData = z.object({
  title: z.string(),
});
export const zCommission = zContentEntry(zCommissionData);
export type Commission = z.output<typeof zCommission>;

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
export const zGeneralData = z.object({
  email: z.string().email(),
  instagram: z.string(),
  logo: z.string(),
  phone: z.string(),
});
export const zGeneral = zContentEntry(zGeneralData);
export type General = z.output<typeof zGeneral>;

// IMAGE -----------------------------------------------------------------------------------------------------------------------------------
export const zImageData = z.object({
  alt: z.string(),
  height: z.number().int().min(0),
  src: z.string(),
  width: z.number().int().min(0),
});
export const zImage = zDataEntry(zImageData);
export type Image = z.output<typeof zImage>;

// SET -------------------------------------------------------------------------------------------------------------------------------------
export const zSetData = z.object({
  count: z.number(),
  image: z.string(),
  items: z.string().array(),
  title: z.string(),
});
export const zSet = zContentEntry(zSetData);
export type Set = z.output<typeof zSet>;

// WORK ------------------------------------------------------------------------------------------------------------------------------------
export const zWorkData = z.object({
  date: z.coerce.date(),
  height: z.number().int().min(0),
  image: z.string(),
  material: zMaterial,
  media: zMedia.array().min(1),
  set: z.string(),
  stripe: z.string().optional(),
  thumbnail: z.string().optional(),
  title: z.string(),
  width: z.number().int().min(0),
});
export const zWork = zDataEntry(zWorkData);
export type Work = z.output<typeof zWork>;
