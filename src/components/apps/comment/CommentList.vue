<template>
  <q-list class="q-mt-lg bg-white" bordered separator>
    <CommentItem
      v-for="item in items"
      :key="item.id"
      v-bind="item"
      @delete="handleDeleteComment"
    />
  </q-list>
</template>

<script setup>
import CommentItem from './CommentItem.vue';
import { useAsyncState } from '@vueuse/core';
import { deleteComment } from 'src/services';
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  postId: {
    type: String,
  },
});

const emit = defineEmits(['deleted']);

const { execute } = useAsyncState(deleteComment, null, {
  immediate: false,
  onSuccess: () => {
    emit('deleted');
  },
});

const handleDeleteComment = async commentId => {
  if (!confirm('정말 삭제하시겠습니까?')) {
    return;
  }
  execute(0, props.postId, commentId);
};
</script>

<style lang="scss" scoped></style>
