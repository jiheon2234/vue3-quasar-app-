<template>
  <PostList :items="posts" />
</template>

<script setup>
import PostList from 'src/components/apps/post/PostList.vue';

const posts = Array.from({ length: 3 }, (_, idx) => ({
  id: 'A' + idx,
  title: 'VUE3 FIREBASE' + idx,
  content:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias ea maiores veritatis nihil? Perspiciatis, incidunt ducimus. Tempora a odio labore quia eius error, est sed, sint obcaecati in ut. Consequatur.',
  readCount: 1,
  commentCount: 2,
  likeCount: 3,
  bookmarkCount: 4,
  uid: 'uid',
  category: '카테고리' + idx,
}));
</script>

<style lang="scss" scoped></style>
