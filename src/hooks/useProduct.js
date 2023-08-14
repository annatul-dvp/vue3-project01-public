import axios from 'axios';
import numberFormat from '@/helpers/numberFormat';
import { computed, ref, reactive } from 'vue';
import { API_BASE_URL } from '../config';

export default function () {
  const productData = ref(null);

  // const product = computed(() => (productData.value ? { ...productData.value, image: productData.value.image.file.url } : []));
  const category = computed(() => productData.value.category);

  const fetchStatus = reactive({
    isLoading: false,
    isFailed: false,
  });

  const fetchProduct = (productId) => {
    fetchStatus.isLoading = true;
    fetchStatus.isFailed = false;
    axios.get(`${API_BASE_URL}/api/products/${productId}`)
      .then((response) => {
        const p = response.data;
        productData.value = Object.assign(p, {
          pricePretty: numberFormat(p.price),
          imageURL: p.image.file.url,
        });
      })
      .catch(() => { fetchStatus.isFailed = true; })
      .then(() => { fetchStatus.isLoading = false; });
  };

  return {
    product: productData,
    category,
    status: fetchStatus,

    fetchProduct,
  };
}
