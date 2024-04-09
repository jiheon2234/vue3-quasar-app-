<template>
  <q-page>
    <div class="row q-col-gutter-x-lg">
      <PostLeftBar class="col-grow" v-model:category="params.category" />

      <section class="col-7">
        <PostHeader v-model:sort="params.sort" />
        <PostList :items="items" />
        <q-btn
          v-if="isLoadMore"
          class="full-width q-mt-md"
          label="더보기"
          outline
          @click="loadMore"
        />
      </section>
      <PostRightBar
        v-model:tags="params.tags"
        class="col-3"
        @openwrite-dialog="openWriteDialog"
      />
    </div>
    <!-- @update:model-value="val => (postDialog = val)" -->
    <PostWriteDialog
      v-model="postDialog"
      @complete="completeRegistrationPost"
    />
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';
import PostList from 'src/components/apps/post/PostList.vue';
import PostHeader from './components/PostHeader.vue';
import PostLeftBar from './components/PostLeftBar.vue';
import PostRightBar from './components/PostRightBar.vue';
import PostWriteDialog from 'src/components/apps/post/PostWriteDialog.vue';
import { ref, watch } from 'vue';
import { getPosts } from 'src/services';
import { useAsyncState } from '@vueuse/core';
import { limit } from 'firebase/firestore';

const router = useRouter();
const params = ref({
  category: null,
  tags: [],
  sort: 'createdAt',
  limit: 2,
});

const items = ref([]);
const start = ref(null);
const isLoadMore = ref(true);

const { execute } = useAsyncState(getPosts, [], {
  immediate: false,
  throwError: true,
  onSuccess: result => {
    if (!start.value) {
      items.value = result.items;
      start.value = result.lastItem;
      return;
    }
    items.value = [...items.value, ...result.items];
    start.value = result.lastItem;
    isLoadMore.value = result.items.length >= params.value.limit;
  },
});

watch(
  params,
  () => {
    start.value = null;
    execute(0, params.value);
  },
  { deep: true, immediate: true },
);

const postDialog = ref(false);
const openWriteDialog = () => {
  postDialog.value = true;
};

const completeRegistrationPost = () => {
  postDialog.value = false;
  execute(0, params.value);
};

const loadMore = () => {
  execute(0, { ...params.value, start: start.value });
};
</script>

<style lang="scss" scoped></style>
