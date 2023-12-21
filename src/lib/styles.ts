import {tv} from 'tailwind-variants';

// BOX -------------------------------------------------------------------------------------------------------------------------------------
export const BOX = tv({
  slots: {
    BASE: 'flex flex-col',
  },
  variants: {
    intent: {
      dark: {
        BASE: 'bg-dark text-white',
      },
      light: {
        BASE: 'bg-light text-dark',
      },
      primary: {
        BASE: 'bg-primary text-dark',
      },
      secondary: {
        BASE: 'bg-secondary text-dark',
      },
      white: {
        BASE: 'bg-white text-dark',
      },
    },
  },
  defaultVariants: {intent: 'primary'},
});

// BTN -------------------------------------------------------------------------------------------------------------------------------------
export const BTN = tv({
  base: `inline-flex items-center justify-center font-bold ring-offset-background transition-colors 
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
  disabled:pointer-events-none disabled:opacity-50`,
  variants: {
    intent: {
      error: 'bg-destructive text-white hover:bg-destructive/90',
      primary: 'bg-primary text-dark hover:bg-primary/90',
      secondary: 'bg-secondary text-dark hover:bg-secondary/80',
    },
    size: {
      default: 'h-10 px-4 py-2',
      icon: 'h-10 w-10',
      lg: 'h-14 px-9 text-xl',
    },
  },
  defaultVariants: {intent: 'primary', size: 'default'},
});

// H ---------------------------------------------------------------------------------------------------------------------------------------
export const H = tv({
  base: 'font-heading font-bold',
  variants: {
    level: {1: 'text-4xl sm:text-6xl md:text-8xl', 2: 'text-3xl sm:text-5xl md:text-6xl', 3: 'text-2xl sm:text-3xl md:text-4xl'},
  },
});
