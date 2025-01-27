<script setup>
import Kanban from '@/components/Kanban.vue'

const isDialogVisibleAddOpportunity = ref(false)
const selectedDateRange = ref([new Date(2024, 9, 10), new Date(2024, 10, 10)]) // Rango de fechas
const filters = ref(['Todos', 'PORA']) // Opciones de filtro
const selectedFilter = ref('Todos') 
let searchTerm = ref()
</script>

<template>
  <div class="">
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
          <!--
            <VBtn
            color="primary"
            title="Agregar Actividad"
            @click="isDialogVisibleAddOpportunity = true"
            >
            Agregar Oportunidad
            </VBtn> 
          -->
        </div>
      </div>

      <div class="filter-controls">
        <!-- Selector de fechas -->
        <div class="date-picker d-flex align-center justify-center">
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
  <!-- <AddOportunity v-model:is-dialog-visible="isDialogVisibleAddOpportunity" /> -->
</template>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-block-end: 16px;
}

.breadcrumbs {
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  font-size: 1rem;
}

.filter-controls {
  display: flex;
  align-items: center;

  /* gap: 10px; */
}

.filters {
  display: flex;
  gap: 5px;
}

.filters button {
  border: none;
  border-radius: 5px;
  background-color: rgba(var(--v-theme-primary), 0.1);
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
  cursor: pointer;
  padding-block: 5px;
}

.filters button.active {
  background-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-surface));
}

.date-picker {
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (max-width: 768px) {
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .filters {
    justify-content: center;
  }

  .filters button {
    flex: 1; /* Hace que los botones ocupen el ancho completo en pantallas pequeñas */
  }

  .date-picker {
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    inline-size: 100%; /* Ocupa el ancho completo */
  }
  
  .kanban-container {
    padding: 5px; /* Reduce el padding en pantallas más pequeñas */
  }
}

@media (max-width: 480px) {
  .filters button {
    font-size: 0.8rem; /* Reduce el tamaño del texto en pantallas pequeñas */
    padding-block: 4px;
  }

  .date-picker input {
    inline-size: 100%; /* Hace que los inputs ocupen el ancho completo */
  }
}
</style>
