<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">회원가입</div>
    <q-form class="q-gutter-y-md" @submit.prevent="handleSubmit">
      <q-input
        v-model="form.nickname"
        placeholder="닉네임"
        outlined
        dense
        hide-bottom-space
        :rules="[validateRequired]"
      />
      <q-input
        v-model="form.email"
        placeholder="이메일"
        outlined
        dense
        hide-bottom-space
        :rules="[validateEmail]"
      />
      <q-input
        v-model="form.password"
        type="password"
        placeholder="비밀번호(문자, 숫자조합 8자이상)"
        outlined
        dense
        hide-bottom-space
        :rules="[validatePassword]"
      />
      <q-input
        v-model="passwordConfirm"
        type="password"
        placeholder="비밀번호 확인"
        outlined
        dense
        hide-bottom-space
        :rules="[
          validatePassword,
          val => val === form.password || '비밀번호가 일치하지 않습니다',
        ]"
      />

      <q-btn
        type="submit"
        label="가입하기"
        class="full-width"
        unelevated
        color="primary"
        :loading="isLoading"
      />
      <q-separator />
      <q-btn
        label=" 로그인하기"
        class="full-width"
        unelevated
        flat
        @click="$emit('changeView', 'SignInForm')"
      />
    </q-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { signUpWithEmail } from 'src/services';
import { useAsyncState } from '@vueuse/core';
import { useQuasar } from 'quasar';
import {
  validateRequired,
  validateEmail,
  validatePassword,
} from 'src/utils/validate-rules';
import { getErrorMessage } from 'src/utils/firebase/error-message';
const emit = defineEmits(['changeView', 'closeDialog']);

const $q = useQuasar();

const { isLoading, execute } = useAsyncState(signUpWithEmail, null, {
  immediate: false,
  onSuccess: () => {
    $q.notify('가입을 환영합니다');
    $q.notify('이메일 확인!!');
    emit('closeDialog');
  },
  onError: error => {
    $q.notify({ type: 'negative', message: getErrorMessage(error.code) });
  },
});

const passwordConfirm = ref('');
const form = ref({
  nickname: '',
  email: '',
  password: '',
});

const handleSubmit = () => {
  execute(1000, form.value);
};

// const handleSubmit = async () => {
//   await signUpWithEmail(form.value);
//   $q.notify('가입을 환영합니다');
//   $q.notify('이메일 확인!!');
//   emit('closeDialog');
// };
</script>

<style lang="scss" scoped></style>
