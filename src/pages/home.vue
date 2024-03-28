<template>
  <q-page>
    <div class="text-h4">커뮤니티 목록</div>
    <section class="q-gutter-y-sm q-mt-lg">
      <q-card v-for="id in 100" :key="id">
        <q-card-section>{{ id }}번계시글</q-card-section>
      </q-card>
    </section>
  </q-page>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>

<route lang="yaml">
name: Home-page
meta:
  requiredAuth: true
  width: 600px
</route>
