<template>
  <BaseCard class="q-pa-lg">
    <div class="flex q-mb-md">
      <q-btn
        icon="sym_o_arrow_back"
        flat
        round
        dense
        color="grey"
        size="16px"
        @click="$router.back()"
      />
      <q-space />
      <q-btn
        :icon="isLike ? 'favorite' : 'sym_o_favorite'"
        flat
        round
        dense
        color="red"
        size="16px"
        @click="togglelike"
      />
      <q-btn icon="sym_o_bookmark" flat round dense color="blue" size="16px" />
    </div>
    <div class="flex items-center">
      <q-avatar>
        <img src="https://cdn.quasar.dev/img/avatar.png" />
      </q-avatar>
      <div class="q-ml-md">
        <div>Nickname</div>
        <div class="text-grey-6">
          {{ date.formatDate(post.createdAt, 'YYYY. MM. DD HH:MM') }}
        </div>
      </div>
      <q-space />
      <q-btn v-if="hasOwnContent(post.uid)" icon="more_horiz" round flat>
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item
              clickable
              v-close-popup
              :to="`/posts/${$route.params.id}/edit`"
            >
              <q-item-section>수정하기</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="handleDeletePost">
              <q-item-section>삭제하기</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
    <div class="q-mt-md text-h5 text-weight-bold">{{ post.title }}</div>
    <div class="text-teal">
      <span v-for="tag in post.tags" :key="tag">#{{ tag }} &nbsp;</span>
      {{ post.category }}
    </div>

    <div class="row items-center q-gutter-x-md q-mt-md justify-end">
      <PostIcon
        name="sym_o_visibility"
        :label="post.readCount"
        tooltip="조회수"
      />
      <PostIcon name="sym_o_sms" :label="post.readCount" tooltip="댓글수" />
      <PostIcon name="sym_o_favorite" :label="likeCount" tooltip="좋아요" />
      <PostIcon
        name="sym_o_bookmark"
        :label="post.bookmarkCount"
        tooltip="북마크"
      />
    </div>
    <q-separator class="q-my-lg" />
    <TiptabViewer v-if="post.content" :content="post.content" />
  </BaseCard>
</template>

<script setup>
import { ref } from 'vue';
import { date, useQuasar } from 'quasar';
import PostIcon from 'src/components/apps/post/PostIcon.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import { deletePost, getPostDetails } from 'src/services';
import { useAsyncState } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
import TiptabViewer from 'src/components/tiptap/TiptabViewer.vue';
import { useAuthStore } from 'src/stores/auth';
import { useLike } from 'src/composables/useLike';

const route = useRoute();
const router = useRouter();
const $q = useQuasar();
const { hasOwnContent } = useAuthStore();
const post = ref({});
const { error } = useAsyncState(
  () => getPostDetails(route.params.id),
  {},
  {
    onSuccess: result => {
      post.value = result.post;
      updateLikeCount(result.post.likeCount);
    },
  },
);
const { execute: executeDeletePost } = useAsyncState(deletePost, null, {
  immediate: false,
  onSuccess: () => {
    $q.notify('삭제완료');
    router.push('/');
  },
});
const handleDeletePost = async () => {
  if (!confirm('삭제하시겠어요?')) {
    return;
  }
  await executeDeletePost(0, route.params.id);
};
const { isLike, likeCount, togglelike, updateLikeCount } = useLike(
  route.params.id,
  {},
);
</script>

<style lang="scss" scoped></style>
