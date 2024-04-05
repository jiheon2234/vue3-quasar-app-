<template>
  <router-view />
</template>

<script setup>
import { onErrorCaptured } from 'vue';

onErrorCaptured(error => {
  console.log('####');
  console.error(error);
  return true;
});
</script>
