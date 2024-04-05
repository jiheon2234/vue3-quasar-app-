<template>
  <div v-if="code" class="text-red text-center">
    {{ errorMessage }}
  </div>
</template>
<!--
<script>
import { computed } from 'vue';
const ERROR_CODE_JSON = {
  'auth/invalid-email': '이메일 주소가 올바르지 않습니다.',
};
</script> -->

<script setup>
import { getErrorMessage } from 'src/utils/firebase/error-message.js';
import { computed } from 'vue';
const props = defineProps({
  code: {
    type: String,
  },
});

const errorMessage = computed(() => getErrorMessage(props.code));
</script>

<style lang="scss" scoped></style>
