<nav class={BASE()}>
  <a href="/" class={BRAND()}>Eliana Corré</a>
  <div class={LINKS()}>
    {#each menu as { href, isActive, text }}<a {href} class={LINK({isActive})}>{text}</a>{/each}
  </div>
</nav>
<slot />

<script lang="ts">
  import {page} from '$app/stores';
  import {tv} from 'tailwind-variants';
  import '../app.pcss';

  $: menu = [
    {text: 'Originaux', href: '/originaux'},
    {text: 'Sur commande', href: '/sur-commande'},
    {text: 'À propos', href: '/a-propos'},
    {text: 'Contact', href: '/contact'},
  ].map((nav) => ({...nav, isActive: $page.route.id?.startsWith(nav.href)}));

  const NAV = tv({
    slots: {
      BASE: 'z-10 flex flex-none items-center justify-between bg-white px-4 shadow-md lg:px-10',
      BRAND: 'font-heading flex-none py-4 text-5xl font-bold hover:text-primary',
      LINK: 'flex h-full items-center border-y-8 border-y-transparent text-xl uppercase hover:text-primary',
      LINKS: 'hidden h-full flex-1 items-center justify-end gap-4 md:flex lg:gap-8',
    },
    variants: {
      isActive: {
        true: {
          LINK: 'border-b-primary',
        },
      },
    },
  });

  const {BASE, BRAND, LINK, LINKS} = NAV();
</script>
