<script setup>
import Kanban from '@/components/kanban.vue'

const selectedDateRange = ref([new Date(2024, 9, 10), new Date(2024, 10, 10)]) // Rango de fechas
const filters = ref(['Todos', 'OGA', 'PORA']) // Opciones de filtro
const selectedFilter = ref('Todos') // Filtro seleccionado
</script>

<template>
  <div class="kanban-container">
    <!-- Barra de herramientas (encima del Kanban) -->
    <div class="toolbar">
      <div class="breadcrumbs">
        <div class="filters">
          <button
            v-for="filter in filters"
            :key="filter"
            :class="{ active: selectedFilter === filter }"
            @click="selectedFilter = filter"
          >
            {{ filter }}
          </button>
        </div>
      </div>

      <div class="filter-controls">
        <!-- Selector de fechas -->
        <div class="d-flex align-center justify-center ">
          <AppDateTimePicker
            v-model="selectedDateRange[0]"
            style="inline-size: 200px;"
            label="Desde"
            placeholder="Seleccione Fecha"
            :config="{ dateFormat: 'F j, Y' }"
          />
          <AppDateTimePicker
            v-model="selectedDateRange[1]"
            label="Hasta"
            style="inline-size: 200px;"
            placeholder="Seleccione Fecha"
            :config="{ dateFormat: 'F j, Y' }"
          />
        </div>
      </div>
    </div>
    
    <!-- Kanban Board -->
    <div>
      <Kanban />
    </div>
  </div>
</template>



<style scoped>
.kanban-container {
  padding: 10px;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.breadcrumbs {
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity)); /* Color del texto de breadcrumbs */
  font-size: 1rem;
}

.filter-controls {
  display: flex;
  align-items: center;
}

.filters {
  display: flex;
  gap: 5px;
}

.filters button {
  border: none;
  border-radius: 5px;
  background-color: rgba(var(--v-theme-primary), 0.1); /* Color del botón con opacidad */
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity)); /* Color del texto del botón */
  cursor: pointer;
  padding-block: 5px;
}

.filters button.active {
  background-color: rgb(var(--v-theme-primary)); /* Color de botón activo */
  color: rgb(var(--v-theme-surface)); /* Texto del botón activo */
}

.date-picker {
  display: flex;
  align-items: center;
  gap: 8px;
}

.date-picker label {
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity)); /* Color del texto */
  font-size: 0.9rem;
}

.date-picker input[type="date"] {
  padding: 10px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity)); /* Borde del selector de fecha */
  border-radius: 5px;
  background-color: rgb(var(--v-theme-surface)); /* Fondo del input */
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity)); /* Color del texto del input */
}
</style>




