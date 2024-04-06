<template>
  <q-page padding>
    <div class="text-h4">useAsyncState</div>
    <q-separator spaced />

    <!-- <p>{{ state }}</p> -->
    <p>{{ isReady }}</p>
    <p>{{ isLoading }}</p>
    <button @click="handleButton">excute</button>
    <p>{{ error }}</p>
    <p>{{ state }}</p>
  </q-page>
</template>

<script setup>
import axios from 'axios';
import { useAsyncState } from '@vueuse/core';

const { state, isLoading, error, isReady, execute } = useAsyncState(
  axios
    .get('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => res.data),
  { 이건: '초기값' },
  {
    immediate: true,
  },
);

const handleButton = () => {
  execute(1000);
};
</script>

<style lang="scss" scoped></style>
