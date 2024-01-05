<Item {href} {image} {index} {title} class={c}>
  <h4 class={PRICE({isOdd: index % 2 === 1, class: c.PRICE})}>{stripe ? `${price}.00€` : 'Vendu'}</h4>
</Item>

<script lang="ts">
  import {STYLES, type Props} from '.';
  import {Item} from '../ui/item';

  // PROPS -----------------------------------------------------------------------------------------------------------------------------------
  export let href: Props['href'];
  export let image: Props['image'];
  export let index: Props['index'];
  export let price: Props['price'];
  export let stripe: Props['stripe'] = undefined;
  export let title: Props['title'];

  // STYLES ----------------------------------------------------------------------------------------------------------------------------------
  let c: Props['class'] = {};
  export {c as class};

  const {PRICE} = STYLES();
</script>
