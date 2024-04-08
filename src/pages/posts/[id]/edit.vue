<template>
  <q-page padding>
    <BaseCard>
      <q-toolbar>
        <q-toolbar-title>글쓰기</q-toolbar-title>
      </q-toolbar>

      <q-separator />
      <PostForm
        v-model:title="form.title"
        v-model:category="form.category"
        v-model:content="form.content"
        v-model:tags="form.tags"
        @submit="handleSubmit"
      >
        <template #actions>
          <q-btn flat label="취소" v-close-popup />
          <q-btn
            type="submit"
            flat
            label="수정"
            color="primary"
            :loading="isLoading"
          />
        </template>
      </PostForm>
    </BaseCard>
  </q-page>
</template>

<script>
const getInitialForm = () => ({
  title: '',
  category: '',
  content: '',
  tags: [],
});
</script>

<script setup>
import { ref } from 'vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import { getCategories } from 'src/services/category';
import { useAsyncState } from '@vueuse/core';
import PostForm from 'src/components/apps/post/PostForm.vue';
import { useRoute } from 'vue-router';
import { getPost, updatePost } from 'src/services/post';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const route = useRoute();

useAsyncState(
  () => getPost(route.params.id),
  {},
  {
    onSuccess(post) {
      form.value.title = post.title;
      form.value.category = post.category;
      form.value.content = post.content;
      form.value.tags = post.tags;
    },
  },
);

const form = ref(getInitialForm());

const { isLoading, execute: executeUpdatePost } = useAsyncState(
  updatePost,
  null,
  {
    immediate: false,
    throwError: true,
    onSuccess: () => {
      $q.notify('수정완료');
    },
  },
);

const handleSubmit = async () => {
  if (!confirm('수정하시겠습니까?')) {
    return;
  }
  await executeUpdatePost(1000, route.params.id, form.value);
};
</script>

<style lang="scss" scoped></style>

<route lang="yaml">
meta:
  width: 800px
</route>
