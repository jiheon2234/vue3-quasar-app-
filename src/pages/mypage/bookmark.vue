<template>
  <PostList :items="posts" />
</template>

<script setup>
import { useAsyncState } from '@vueuse/core';
import { ref } from 'vue';
import { getUserBookmarks } from 'src/services';
import PostList from 'src/components/apps/post/PostList.vue';

import { useAuthStore } from 'src/stores/auth';
const authStore = useAuthStore();

const { state: items } = useAsyncState(() =>
  getUserBookmarks(authStore.uid).then(result => (posts.value = result)),
);

const posts = ref([]);
</script>

<style lang="scss" scoped></style>
