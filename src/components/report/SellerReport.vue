<template>
  <VCard class="report-card">
    <VCardTitle class="text-h5">
      Reporte de Actividades
    </VCardTitle>
    <VCardText>
      <p>No hay actividades seleccionadas. Aquí tienes un resumen de las actividades:</p>
      <VList>
        <VListItem
          v-for="(activity, index) in activities"
          :key="index"
        >
          <VListItemTitle>{{ activity.title }}</VListItemTitle>
          <VListItemSubtitle>
            Fecha: {{ activity.date }} | Estado: {{ activity.status }}
          </VListItemSubtitle>
        </VListItem>
      </VList>
    </VCardText>
    <VCardActions>
      <VBtn
        color="primary"
        @click="onRefresh"
      >
        Actualizar Reporte
      </VBtn>
    </VCardActions>
  </VCard>
</template>

<script setup>
import { ref } from 'vue'

const activities = ref([
  { title: 'Actividad 1', date: '2024-10-09', status: 'Pendiente' },
  { title: 'Actividad 2', date: '2024-10-10', status: 'Completada' },
  { title: 'Actividad 3', date: '2024-10-11', status: 'En Progreso' },
])

const onRefresh = () => {
  // Lógica para actualizar el reporte
  console.log('Reporte actualizado')
}
</script>

<style scoped>
.report-card {
  padding: 16px;
  margin-block-start: 20px;
}
</style>
