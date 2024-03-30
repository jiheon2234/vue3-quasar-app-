<template>
  <StickySideBar>
    <q-card flat bordered>
      <q-list bordered separator>
        <q-item clickable v-ripple>
          <q-item-section>전체</q-item-section>
        </q-item>
        <q-item v-for="c in categories" :key="c.value" clickable v-ripple>
          <q-item-section>{{ c.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </StickySideBar>
</template>

<script setup>
import StickySideBar from 'src/components/StickySideBar.vue';
import { getCategories } from 'src/services/category';

const categories = getCategories();
</script>
