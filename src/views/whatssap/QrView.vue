<template>
  <div>
    <!-- Mostrar el código QR si está disponible -->
    <div v-if="qrCode">
      <img
        :src="`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrCode)}`"
        alt="QR Code"
      >
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

// Recibir el código QR como una prop
const props = defineProps({
  qrCode: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
/* Estilos opcionales para la imagen del QR */
img {
  block-size: auto;
  max-inline-size: 100%;
}
</style>
