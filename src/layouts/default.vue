<template>
  <q-layout view="lHh Lpr lff" class="bg-grey-2">
    <q-header bordered class="bg-white text-grey-9">
      <q-toolbar>
        <q-btn flat dense to="/">
          <q-toolbar-title>
            <q-avatar>
              <img src="/logo.png" />
            </q-avatar>
            MyClub
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <q-btn stretch flat label="Home" to="/home" />
        <q-btn
          stretch
          flat
          label="수강하기"
          href="https://google.com"
          target="_blank"
        />
        <q-btn
          stretch
          flat
          label="온라인 강의"
          href="https://chat.openai.com"
          target="_blank"
        />
        <q-btn
          stretch
          flat
          label="유튜브"
          href="https://www.youtube.com"
          target="_blank"
        />
        <q-separator class="q-my-md q-mr-md" vertical />
        <q-btn
          v-if="!authStore.isAuthenticated"
          unelevated
          rounded
          color="primary"
          label="로그인/회원가입"
          @click="openAuthDialog"
        />
        <q-btn round flat v-if="authStore.isAuthenticated">
          <q-avatar>
            <img
              :src="
                authStore.user.photoURL ||
                generateDefaultPhotoURL(authStore.user.uid)
              "
            />
          </q-avatar>
          <q-menu>
            <q-list style="min-width: 140px">
              <q-item
                v-if="authStore.user.emailVerified"
                clickable
                v-close-popup
                to="/mypage/profile"
              >
                <q-item-section>프로필</q-item-section>
              </q-item>
              <q-item v-else clickable v-close-popup>
                <q-item-section class="text-red" @click="verifyEmail"
                  >이메일을 인증해주세요</q-item-section
                >
              </q-item>
              <q-item clickable v-close-popup @click="handleLogout">
                <q-item-section>로그아웃</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container :style="pageContainerStyles">
      <router-view />
    </q-page-container>
    <AuthDialog v-model="authDialog" />
  </q-layout>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';
import { useQuasar } from 'quasar';

import AuthDialog from 'src/components/auth/AuthDialog.vue';
import {
  logout,
  generateDefaultPhotoURL,
  sendVerificationEmail,
} from 'src/services';
const $q = useQuasar();
const authStore = useAuthStore();

const route = useRoute();

const pageContainerStyles = computed(() => ({
  maxWidth: route.meta.width || '1000px',
  margin: '0 auto',
}));

const authDialog = ref(false);
const openAuthDialog = () => {
  authDialog.value = true;
};

const handleLogout = async () => {
  await logout();
  $q.notify('로그아웃 되었습니다');
};

const verifyEmail = async () => {
  await sendVerificationEmail();
  $q.notify('이메일을 확인해주세요');
};
</script>
