1
<template>
  <q-item class="bg-white q-pt-md" clickable :to="`/posts/${item.id}`">
    <q-item-section avatar top>
      <q-avatar>
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <div class="flex items-center">
        <span
          >닉네임 &middot; &nbsp;{{ formatRelativeTime(item.createdAt) }}</span
        >
        <q-chip class="q-ml-sm" dense color="primary" text-color="white">
          {{ item.category }}
        </q-chip>
      </div>
      <div class="text-h6 q-mt-sm">{{ item.title }}</div>
      <div class="text-primary text-caption">
        <span v-for="tag in item.tags" :key="tag" class="q-mr-sm"
          >#{{ tag }}
        </span>
      </div>
      <div class="text-grey-6 q-my-sm ellipsis-2-lines">{{ item.content }}</div>
      <div class="row items-center">
        <div class="col-3">
          <div class="flex flex-center">
            <PostIcon
              name="sym_o_visibility"
              :label="item.readCount"
              tooltip="조회수"
            />
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <PostIcon
              name="sym_o_sms"
              :label="item.commentCount"
              tooltip="댓글수"
            />
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-btn class="full-width" flat dense @click.prevent="togglelike">
              <PostIcon
                :name="isLike ? 'favorite' : 'sym_o_favorite'"
                :label="likeCount"
                tooltip="좋아요"
              />
            </q-btn>
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-btn
              class="full-width"
              flat
              dense
              @click.prevent="togglebookmark"
            >
              <PostIcon
                :name="isBookmark ? 'bookmark' : 'sym_o_bookmark'"
                :label="bookmarkCount"
                tooltip="북마크"
              />
            </q-btn>
          </div>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup>
import PostIcon from './PostIcon.vue';
import { date } from 'quasar';
import { addLike, hasLike, removeLike } from 'src/services';
import { formatRelativeTime } from 'src/utils/relative-time-format';
import { useAuthStore } from 'src/stores/auth';
import { storeToRefs } from 'pinia';
import { toRefs, ref, watch } from 'vue';
import { useLike } from 'src/composables/useLike';
import { useBookmark } from 'src/composables/useBookmark';

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});

const { isLike, likeCount, togglelike } = useLike(props.item.id, {
  initialCount: props.item.likeCount,
});

const { isBookmark, bookmarkCount, togglebookmark } = useBookmark(
  props.item.id,
  {
    initialCount: props.item.bookmarkCount,
  },
);
</script>

<style lang="scss" scoped></style>
