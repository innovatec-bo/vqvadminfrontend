<!-- eslint-disable vue/no-mutating-props -->
<script setup>
const emit = defineEmits([
  'removeProduct',
  'totalAmount',
])
</script>

<template>
  <VCard
    flat
    border
    class="d-flex flex-row"
  >
    <!-- 👉 Left Form -->
    <div class="pa-5 flex-grow-1" />
  </VCard>
</template>
