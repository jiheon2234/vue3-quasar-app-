<template>
  <q-page>
    <div class="row q-col-gutter-x-lg">
      <PostLeftBar class="col-grow" />

      <section class="col-7">
        <PostHeader />
        <PostList :items="posts" />
      </section>
      <PostRightBar class="col-3" />
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';
import PostList from 'src/components/post/PostList.vue';
import PostHeader from './components/PostHeader.vue';
import PostLeftBar from './components/PostLeftBar.vue';
import PostRightBar from './components/PostRightBar.vue';

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
