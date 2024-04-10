<template>
  <q-page>
    <div class="row q-col-gutter-x-lg">
      <PostLeftBar class="col-grow" v-model:category="category" />

      <section class="col-7">
        <PostHeader v-model:sort="sort" />

        <PostList :items="items" />
        <!-- <q-btn
          v-if="isLoadMore"
          class="full-width q-mt-md"
          label="더보기"
          outline
          @click="loadMore"
        /> -->
        <div v-intersection-observer="handleInterSectionObserver"></div>
      </section>
      <PostRightBar
        v-model:tags="tags"
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
import { computed, ref, watch } from 'vue';
import { getPosts } from 'src/services';
import { useAsyncState } from '@vueuse/core';
import { vIntersectionObserver } from '@vueuse/components';
import { usePostQuery } from 'src/composables/usePostQuery';
import { useAuthStore } from 'src/stores/auth';
const { category, sort, tags } = usePostQuery();
const authStore = useAuthStore();
const router = useRouter();
const params = computed(() => ({
  category: category.value,
  tags: tags.value,
  sort: sort.value,
  limit: 5,
}));

// const params = ref({
//   category: category.value,
//   tags: [],
//   sort: 'createdAt',
//   limit: 5,
// });

const items = ref([]);
const start = ref(null);
const isLoadMore = ref(true);

const { isLoading, execute } = useAsyncState(getPosts, [], {
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
  { deep: true, immediate: false },
);

const postDialog = ref(false);
const openWriteDialog = () => {
  if (!authStore.isLogin) {
    alert('로그인 후 이용 가능');
    return;
  }
  postDialog.value = true;
};

const completeRegistrationPost = () => {
  postDialog.value = false;
  start.value = null;
  execute(0, params.value);
};

// const vInterSectionObserver = {
//   beforeMount: (el, binding) => {
//     const observer = new IntersectionObserver(binding.value);
//     observer.observe(el);
//   },
// };

const loadMore = () => {
  execute(0, { ...params.value, start: start.value });
};

const handleInterSectionObserver = ([{ isIntersecting }]) => {
  if (isIntersecting && isLoadMore.value) {
    console.log('### handleInterSectionObserver ###');
    loadMore();
  }
};
</script>

<style lang="scss" scoped></style>
