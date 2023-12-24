import {tv} from "tailwind-variants";

// FIG -------------------------------------------------------------------------------------------------------------------------------------
export const FIG = tv({base: 'relative overflow-hidden bg-light'});

// IMG -------------------------------------------------------------------------------------------------------------------------------------
export const IMG = tv({
  base: 'h-full w-full',
  variants: {
    fit: {contain: 'object-contain', cover: 'object-cover', fill: ''},
  },
});