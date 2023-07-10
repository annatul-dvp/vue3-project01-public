<template>
  <ul class="catalog__list">
    <ProductItem v-for="(product) in products" :key="product.id" :product ='product'>
    </ProductItem>
  </ul>
</template>

<script>
import { defineComponent } from 'vue';
import ProductItem from './ProductItem.vue';

export default defineComponent({
  props: ['products'],
  components: { ProductItem },
});
</script>
