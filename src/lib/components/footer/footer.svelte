<footer class={BASE({intent, class: c.BASE})}>
  <div class={MENU({class: c.MENU})}>
    {#each menu as { href, isActive, text }}<a {href} data-active={isActive} class={NAV({intent, class: c.NAV})}>{text}</a>{/each}
  </div>
  <span>© 2023 elianacorre.com - Tous droits réservés</span>
</footer>

<script lang="ts">
  import {page} from '$app/stores';
  import {STYLES, type Props} from '.';

  // PROPS ---------------------------------------------------------------------------------------------------------------------------------
  export let intent: Props['intent'] = 'dark';

  // DATA ----------------------------------------------------------------------------------------------------------------------------------
  const menu = [{text: 'Mentions légales', href: '/mentions-legales'}].map((nav) => ({
    ...nav,
    isActive: $page.route.id?.startsWith(nav.href),
  }));

  // STYLES --------------------------------------------------------------------------------------------------------------------------------
  let c: Props['class'] = {};
  export {c as class};

  const {BASE, NAV, MENU} = STYLES();
</script>
