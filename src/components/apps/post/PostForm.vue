<template>
  <q-form @submit.prevent="handleSubmit">
    <q-card-section class="q-gutter-y-sm">
      <q-input
        v-model="titleModel"
        outlined
        placeholder="제목"
        hide-bottom-space
        :rules="[validateRequired]"
      />
      <q-select
        outlined
        v-model="categoryModel"
        :options="categories"
        emit-value
        map-optionsa
        hide-bottom-space
        :rules="[validateRequired]"
      >
        <template v-if="!categoryModel" #selected>
          <span class="text-grey-7">카테고리를 선택하세요</span>
        </template>
      </q-select>
      <TiptabEditor v-model="contentModel" />
      <!-- <q-input
        v-model="contentModel"
        type="textarea"
        outlined
        placeholder="내용을 작성해주세요"
      /> -->
      <q-input
        outlined
        placeholder="태그를 입력해주세요 (Enter)"
        prefix="#"
        @keypress.enter.prevent="onRegistTag"
      />
      <q-chip
        v-for="(tag, index) in tags"
        :key="tag"
        outline
        dense
        removable
        color="teal"
        @remove="removeTag(index)"
      >
        {{ tag }}
      </q-chip>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <slot name="actions">
        <q-btn flat label="취소하기" v-close-popup />
        <q-btn
          type="submit"
          flat
          label="저장하기"
          color="primary"
          :loading="loading"
        />
      </slot>
    </q-card-actions>
  </q-form>
</template>

<script setup>
import { getCategories } from 'src/services/category';
import { computed } from 'vue';
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import TiptabEditor from 'src/components/tiptap/TiptabEditor.vue';
import { validateRequired } from 'src/utils/validate-rules';

const $q = useQuasar();

const props = defineProps({
  title: {
    type: String,
  },
  category: {
    type: String,
  },
  content: {
    type: String,
  },
  tags: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  'update:title',
  'update:category',
  'update:content',
  'update:tags',
  'submit',
]);

const titleModel = computed({
  get: () => props.title,
  set: val => emit('update:title', val),
});

const categoryModel = computed({
  get: () => props.category,
  set: val => emit('update:category', val),
});

const contentModel = computed({
  get: () => props.content,
  set: val => emit('update:content', val),
});

const onRegistTag = e => {
  const tagValue = e.target.value.replace(/ /g, '');
  if (!tagValue) return;
  if (props.tags.length >= 5) {
    $q.notify('태그는 5개까지만 등록할 수 있습니다.');
    return;
  }
  if (!props.tags.includes(tagValue)) {
    emit('update:tags', [...props.tags, tagValue]);
  }
  e.target.value = '';
};

const removeTag = index => {
  const model = [...props.tags];
  model.splice(index, 1);
  emit('update:tags', model);
};
const categories = getCategories();

const handleSubmit = () => {
  if (contentModel.value === '') {
    $q.notify('내용을 입력해주세요');
    return;
  }
  emit('submit');
};
</script>

<style lang="scss" scoped></style>
