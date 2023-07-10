<template>
  <li class="cart__order">
    <h3>{{ item.product.title }}</h3>
    <b>{{ totalPricePretty }}</b>
    <span>Артикул: {{ item.product.id }}</span>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['item'],
  computed: {
    totalPricePretty() {
      return numberFormat(this.item.amount * this.item.product.price);
    },
  },
};
</script>
