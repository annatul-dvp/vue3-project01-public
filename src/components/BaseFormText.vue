<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <BaseFormField :title="title" :error="error">
    <input class="form__input" v-model="dataValue" :type="type" :placeholder="placeholder">
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    type: {
      default: 'text',
    },
  },
  mixins: [formFieldMixin],
});
</script>
