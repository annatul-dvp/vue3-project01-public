import { useStore } from 'vuex';
import { ref, reactive } from 'vue';

export default function (product) {
  const $store = useStore();

  // const productAdded = ref(false);
  // const productAddSending = ref(false);
  // const isAddedMessageShowed = ref(false);

  const addStatus = reactive({
    isAdded: false,
    isAddSending: false,
    isAddedMessageShowed: false,
  });

  const productAmount = ref(1);

  const doAddToCart = () => {
    addStatus.isAdded = false;
    addStatus.isAddSending = true;
    addStatus.isAddedMessageShowed = false;

    console.log(product.value);

    $store.dispatch('addProductToCart', { productID: product.value.id, amount: productAmount.value })
      .then(() => {
        addStatus.isAdded = true;
        addStatus.isAddSending = false;
        addStatus.isAddedMessageShowed = true;
      });
  };

  return {
    productAmount,
    status: addStatus,

    doAddToCart,
  };
}
