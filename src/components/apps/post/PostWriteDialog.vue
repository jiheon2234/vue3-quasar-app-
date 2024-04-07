<template>
  <q-dialog persistent v-bind="$attrs" @hide="onHide">
    <q-card :style="{ minWidth: '660px' }">
      <q-toolbar>
        <q-toolbar-title>글쓰기</q-toolbar-title>
        <q-btn v-close-popup flat round dense icon="close" />
      </q-toolbar>

      <q-separator />
      <PostForm
        v-model:title="form.title"
        v-model:category="form.category"
        v-model:content="form.content"
        v-model:tags="form.tags"
        :loading="isLoading"
        @submit="
          execute(1000, {
            ...form,
            uid: authStore.uid,
          })
        "
      />
    </q-card>
  </q-dialog>
</template>

<script>
const getInitialForm = () => ({
  title: '',
  category: '',
  content: '',
  tags: '',
});
</script>

<script setup>
import { ref } from 'vue';
import PostForm from './PostForm.vue';
import { createPost } from 'src/services/post';
import { useAsyncState } from '@vueuse/core';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';
import { route } from 'quasar/wrappers';

const emit = defineEmits('[complete]');

const authStore = useAuthStore();
const router = useRouter();

const form = ref(getInitialForm());

const onHide = () => {
  form.value = getInitialForm();
};

const { isLoading, execute } = useAsyncState(createPost, null, {
  immediate: false,
  throwError: true,
  onSuccess: postId => {
    console.log('postId', postId);
    // router.push(`/posts/${postId}`);
    emit('complete');
  },
});
// const handleSubmit = () =>
//   execute(1000, {
//     ...form.value,
//     uid: authStore.uid,
//   });
</script>

<style lang="scss" scoped></style>
