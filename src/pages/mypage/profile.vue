<template>
  <div class="q-gutter-y-md">
    <BaseCard>
      <q-form @submit.prevent="handleSubmitProfile">
        <q-card-section class="q-gutter-y-md q-mt-md">
          <div class="text-h6">프로필 변경</div>
          <q-input v-model="displayName" outlined dense label="닉네임" />
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <q-space />
          <q-btn
            type="submit"
            label="저장하기"
            flat
            color="primary"
            :loading="isLoadingProfile"
          />
        </q-card-actions>
      </q-form>
    </BaseCard>

    <BaseCard>
      <q-form @submit.prevent="handleSubmitEmail">
        <q-card-section class="q-gutter-y-md q-mt-md">
          <div class="text-h6">이메일 변경</div>

          <q-input v-model="email" outlined dense label="이메일" readonly />
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <q-space />
          <q-btn
            type="submit"
            label="저장하기"
            flat
            color="primary"
            :loading="isLoading"
          />
        </q-card-actions>
      </q-form>
    </BaseCard>
  </div>
</template>

<script setup>
import BaseCard from 'src/components/base/BaseCard.vue';
import { useAuthStore } from 'src/stores/auth';
import { watchEffect } from 'vue';
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { updateUserProfile, updateUserEmail } from 'src/services';
import { useAsyncState } from '@vueuse/core';
import { getErrorMessage } from 'src/utils/firebase/error-message';
const $q = useQuasar();
const authstore = useAuthStore();

const { isLoading: isLoadingProfile, execute: executeProfile } = useAsyncState(
  updateUserProfile,
  null,
  {
    immediate: false,
    onSuccess: () => {
      $q.notify('프로필 수정 완료');
    },
    onError: err => {
      $q.notify({
        type: 'negative',
        message: getErrorMessage(err.code),
      });
    },
  },
);

const displayName = ref('');

// const handleSubmitProfile = async () => {
//   await updateUserProfile(displayName.value);
//   $q.notify('프로필 수정 완료');
// };

const email = ref('');
const handleSubmitProfile = () => executeProfile(0, displayName.value);

const { isLoading: isLoadingEmail, execute: executeEmail } = useAsyncState(
  updateUserEmail,
  null,
  {
    immediate: false,
    onSuccess: () => {
      $q.notify('이메일 수정 완료');
    },
    onError: err => {
      $q.notify({
        type: 'negative',
        message: getErrorMessage(err.code),
      });
    },
  },
);

const handleSubmitEmail = () => executeEmail(1000, email.value);

// const handleSubmitEmail = async () => {
//   await updateUserEmail(email.value);
//   $q.notify('이메일 수정 완료');
// };

watchEffect(() => {
  displayName.value = authstore.user?.displayName;
  email.value = authstore.user?.email;
});
</script>

<style lang="scss" scoped></style>
