<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">로그인</div>
    <q-form class="q-gutter-y-md" @submit.prevent="handleSignInEmail">
      <div>
        <q-input v-model="form.email" placeholder="이메일" outlined dense />
        <q-input
          type="password"
          v-model="form.password"
          placeholder="비밀번호"
          outlined
          dense
        />
        <DisplayError :code="error?.code" />
        <q-btn
          type="submit"
          label="로그인하기"
          class="full-width"
          unelevated
          color="primary"
          :loading="isLoading"
        />
        <div class="flex justify-between">
          <q-btn
            label="비밀번호 찾기"
            color="secondary"
            flat
            dense
            size="13px"
            @click="$emit('changeView', 'FindPasswordForm')"
          />
          <q-btn
            label="이메일 가입하기"
            color="secondary"
            flat
            dense
            size="13px"
            @click="$emit('changeView', 'SignUpForm')"
          />
        </div>
      </div>
      <q-separator />
      <q-btn
        label="구글 계정으로 로그인하기"
        class="full-width"
        unelevated
        color="primary"
        outlined
        @click="handleSignInGoogle"
      />
    </q-form>
  </div>
</template>

<script setup>
import { signInWithGoogle, signInWithEmail } from 'src/services/auth.js';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import DisplayError from 'src/components/DisplayError.vue';
import { getErrorMessage } from 'src/utils/firebase/error-message';
import { useAsyncState } from '@vueuse/core';
const emit = defineEmits(['changeView', 'closeDialog']);

const $q = useQuasar();

// const isloading = ref(false);
// const error = ref(null);

const { isLoading, error, execute } = useAsyncState(signInWithEmail, null, {
  immediate: false,
  // throwError : true,
  onSuccess: () => {
    $q.notify('환영합니다');
    emit('closeDialog');
  },
  onError: err => {
    error.value = err;
    $q.notify({
      type: 'negative',
      message: getErrorMessage(err.code),
    });
  },
});

//이메일로그인
const form = ref({
  email: '',
  password: '',
});

const handleSignInEmail = () => execute(1000, form.value);

// const handleSignInEmail = async () => {
//   try {
//     isloading.value = true;
//     await signInWithEmail(form.value);
//     $q.notify('환영합니다');
//     emit('closeDialog');
//   } catch (err) {
//     error.value = err;
//     $q.notify({
//       type: 'negative',
//       message: getErrorMessage(err.code),
//     });
//   } finally {
//     isloading.value = false;
//   }
// };

// 구글로그인;
const handleSignInGoogle = async () => {
  await signInWithGoogle();
  $q.notify('환영합니다!!!GOOGLE');
  emit('closeDialog');
};
</script>

<style lang="scss" scoped></style>
