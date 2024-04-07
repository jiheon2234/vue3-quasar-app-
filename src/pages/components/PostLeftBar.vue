<template>
  <StickySideBar>
    <q-card flat bordered>
      <q-list bordered separator>
        <q-item
          clickable
          :active="category === null"
          v-ripple
          @click="changeCategory(null)"
        >
          <q-item-section>전체</q-item-section>
        </q-item>
        <q-item
          v-for="c in categories"
          :key="c.value"
          clickable
          v-ripple
          :active="category === c.value"
          @click="changeCategory(c.value)"
        >
          <q-item-section>{{ c.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </StickySideBar>
</template>

<script setup>
import StickySideBar from 'src/components/StickySideBar.vue';
import { getCategories } from 'src/services/category';

defineProps({
  category: {
    type: String,
  },
});
const emit = defineEmits(['update:category']);

const changeCategory = c => {
  emit('update:category', c);
};

const categories = getCategories();
</script>
