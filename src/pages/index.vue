<template>
  <q-page>
    <div class="row q-col-gutter-x-lg">
      <PostLeftBar class="col-grow" v-model:category="params.category" />

      <section class="col-7">
        <PostHeader v-model:sort="params.sort" />
        <PostList :items="posts" />
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

const router = useRouter();
const params = ref({
  category: null,
  tags: [],
  sort: 'createdAt',
});

const { state: posts, execute } = useAsyncState(getPosts, [], {
  immediate: false,
  throwError: true,
});

watch(params, () => execute(0, params.value), { deep: true, immediate: true });

const postDialog = ref(false);
const openWriteDialog = () => {
  postDialog.value = true;
};

const completeRegistrationPost = () => {
  postDialog.value = false;
  execute(0, params.value);
};
</script>

<style lang="scss" scoped></style>
