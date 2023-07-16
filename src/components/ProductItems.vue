<template>
  <li v-bind="$attrs" class="catalog__item" v-for="(product) in productsNormalized" :key="product.id" >
    <router-link  :to="{name: 'product', params: {id: product.id}}">
      <img class="catalog__pic" :src="product.image" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <a href="#" @click.prevent="openQuickView(product.id)">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.pricePretty }}
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="(c) in product.colors" :key="c.id">
        <label class="colors__label">
          <input id="colors__blue"
          class="colors__radio sr-only" type="radio" :value="c.code" v-model="color">
          <span class="colors__value" :style="{backgroundColor: c.code}">
          </span>
        </label>
      </li>
    </ul>
  </li>
  <BaseModal v-model:open="isQuickViewOpened">
    <ProductQuickView :product-id="currentProductId"/>
  </BaseModal>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
import BaseModal from '@/components/BaseModal.vue';
import { defineAsyncComponent, defineComponent, h } from 'vue';

export default defineComponent({
  inheritAttrs: false,
  components: {
    BaseModal,
    ProductQuickView: defineAsyncComponent({
      loader: () => import('@/components/ProductQuickView.vue'),
      delay: 0,
      loadingComponent: () => h('div', 'Загрузка...'),
    }),
  },
  data() {
    return {
      color: '#73B6EA',
      currentProductId: null,
    };
  },
  computed: {
    isQuickViewOpened: {
      get() {
        return !!this.currentProductId;
      },
      set(isOpen) {
        if (!isOpen) {
          this.currentProductId = null;
        }
      },
    },
    productsNormalized() {
      return this.products.map((product) => ({
        ...product,
        pricePretty: numberFormat(product.price),
      }));
    },
  },
  methods: {
    gotoPage,
    openQuickView(productId) {
      this.currentProductId = productId;
    },
  },
  props: ['products'],
});
</script>
