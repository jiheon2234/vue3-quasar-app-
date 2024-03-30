<template>
  <q-page>
    <div class="text-h4">커뮤니티 목록</div>
    <section class="q-gutter-y-sm q-mt-lg">
      <PostList :items="posts" />
    </section>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';
import PostList from './components/post/PostList.vue';
const router = useRouter();
// const goPostDetails = id => router.push(`/posts/${id}`);

const posts = Array.from({ length: 20 }, (_, idx) => ({
  id: idx,
  title: 'VUE3 FIREBASE' + idx,
  content:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias ea maiores veritatis nihil? Perspiciatis, incidunt ducimus. Tempora a odio labore quia eius error, est sed, sint obcaecati in ut. Consequatur.',
  readCount: 1,
  commentCount: 2,
  likeCount: 3,
  bookmarkCount: 4,
  tags: ['html', 'css', 'javascript'],
  uid: 'uid',
  category: '카테고리' + idx,
}));
</script>

<style lang="scss" scoped></style>
