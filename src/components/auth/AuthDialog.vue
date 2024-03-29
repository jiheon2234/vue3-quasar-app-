<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="val => $emit('update:modelValue', val)"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card :style="{ width: '400px' }">
      <q-card-section class="flex">
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-px-xl q-pb-xl">
        <SigninForm
          v-if="viewMode === 'SignInForm'"
          @change-view="changeViewMode"
        />
        <SignupForm
          v-else-if="viewMode === 'SignUpForm'"
          @change-view="changeViewMode"
        />
        <FindPasswordForm v-else @change-view="changeViewMode" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import SigninForm from './SigninForm.vue';
import SignupForm from './SignupForm.vue';
import FindPasswordForm from './FindPasswordForm.vue';
import { ref } from 'vue';

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
defineEmits(['update:modelValue']);
const viewMode = ref('SignInForm'); // SigninForm, SignupForm, FindPasswordForm
const changeViewMode = mode => (viewMode.value = mode);
</script>

<style lang="scss" scoped></style>
