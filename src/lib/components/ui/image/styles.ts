import {tv} from 'tailwind-variants';

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const STYLES = tv({
  base: 'max-w-full h-auto bg-cover bg-center bg-no-repeat transition duration-700 ease-in-out',
  variants: {
    isLoaded: {
      true: 'blur-none scale-100',
      false: 'blur-2xl scale-110',
    },
    noScript: {
      true: 'absolute inset-0 pointer-events-none',
    },
  },
  defaultVariants: {
    isLoaded: true,
    noScript: false,
  },
});

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type Styles = string;
