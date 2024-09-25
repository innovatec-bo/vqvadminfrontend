<script setup>
import poraIcon from '@/assets/icons/poraIcon.png'
import { useOpportunity } from '@/composables/Opportunity/useOpportunity'
import { onMounted } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import TaskKanban from './opportunity/TaskKanban.vue'

const { allOpportunityKanbanForUser, kanban } = useOpportunity()

const addNewItem = column => {
  column.items.push({
    id: Date.now(),
    project: 'Nuevo Proyecto',
    client: 'Nuevo Cliente',
    visitDate: new Date().toISOString().substring(0, 10),
    price: 0,
    status: 'Nuevo',
    details: 'Sin detalles',
  })
}

const selectedOpportunity  = ref(null)
const isDialogVisible = ref(false)
const originColumnTitle = ref(null)
const destinationColumnTitle = ref(null)

const onDragStart = event => {
  originColumnTitle.value = event.from.closest('.kanban-column').dataset.columnTitle
  console.log('Elemento arrastrado desde:', originColumnTitle.value)
}

const onDragEnd = event => {
  destinationColumnTitle.value = event.to.closest('.kanban-column').dataset.columnTitle
  console.log('Elemento movido de', originColumnTitle.value, 'a', destinationColumnTitle.value)

}

const selectOpportunity = opportunity => {
  selectedOpportunity.value = opportunity
  isDialogVisible.value = true
}

onMounted(async () => {
  await allOpportunityKanbanForUser(1) 
})
</script>

<template>
  <div class="kanban">
    <div
      v-for="(column, index) in kanban"
      :key="index"
      class="kanban-column"
      :data-column-title="column.title"
    >
      <div class="kanban-column-header">
        <div class="column-title">
          <span class="column-dot" /> 
          <h2>{{ column.title }}</h2>
        </div>
        <div class="column-info">
          <span class="task-count">({{ column.items.length }})</span>
          <IconBtn class="icon-btn">
            <VIcon icon="tabler-dots-vertical" />
          </IconBtn>
        </div>
      </div>
      <VueDraggable
        v-model="column.items"
        group="kanban"
        class="kanban-items"
        @start="onDragStart"
        @end="onDragEnd"
      >
        <div
          v-for="(item) in column.items"
          :key="item.id"
          class="kanban-item"
          @click="selectOpportunity(item)"
        >
          <div class="kanban-header">
            <VAvatar
              size="40"
              rounded
            >
              <img
                :src="poraIcon"
                alt="Logo pora"
                style="border-radius: 30%;"
              >
            </VAvatar>

            <!-- Nombre del proyecto y código del departamento -->
            <div class="project-info">
              <h3 class="project-name">
                {{ item.project }}
              </h3>
              <h4 class="department-code">
                {{ item.property || 'Sin código' }} <!-- Aquí agregué un valor por defecto -->
              </h4>
            </div>

            <!-- Precio alineado a la derecha -->
            <p class="price">
              <strong>{{ item.price }}$</strong>
            </p>
          </div>
          <div class="kanban-details">
            <p><strong>{{ item.customer }}</strong></p> <!-- Cambié `customer` a `client` por consistencia -->
            <p>{{ item.phone }}</p>
          </div>  
          <div class="kanban-footer">
            <div class="icon-section">
              <IconBtn>
                <VIcon icon="tabler-x" />
              </IconBtn>
              <IconBtn>
                <VIcon icon="tabler-message" />
                <span class="details">{{ item.cantComments }}</span>
              </IconBtn>
            </div>
          </div>
        </div>
      </VueDraggable>
      <button @click="addNewItem(column)">
        + Agregar nuevo
      </button>
    </div>
  </div>
  <TaskKanban 
    v-model:is-dialog-visible="isDialogVisible" 
    :opportunity-kanban="selectedOpportunity"
  />
</template>

<style>
.kanban {
  display: flex;
  padding: 10px;
  background-color: rgba(var(--v-theme-background), 1); /* Color de fondo */
  gap: 10px;
}

/* Estilo de la columna */
.kanban-column {
  position: relative;
  padding: 10px;
  border-radius: 10px;
  inline-size: 300px;
}

/* Encabezado de la columna */
.kanban-column-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-block-end: 2px solid rgba(var(--v-border-color), var(--v-border-opacity)); /* Color del borde */
  margin-block-end: 10px;
  padding-block-end: 10px;
}

.column-title {
  display: flex;
  align-items: center;
}

.column-title h2 {
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity)); /* Color del texto */
  font-size: 1.1em;
  font-weight: bold;
  margin-inline-start: 5px;
}

.column-dot {
  border-radius: 50%;
  background-color: rgb(var(--v-theme-primary)); /* Color del punto */
  block-size: 8px;
  inline-size: 8px;
}

.column-info {
  display: flex;
  align-items: center;
}

.task-count {
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity)); /* Color del texto */
  font-size: 0.9em;
  margin-inline-end: 10px;
}

.icon-btn {
  border: none;
  background: none;
  cursor: pointer;
}

/* Items dentro de las columnas */
.kanban-items {
  margin-block-start: 10px;
}

.kanban-item {
  padding: 10px;
  border: 1px solid rgba(var(--v-border-color), 0.25); /* Borde con opacidad del 25% */
  border-radius: 10px;
  background-color: rgb(var(--v-theme-surface)); /* Color de fondo de la tarjeta */
  margin-block-end: 10px;
}

.kanban-header {
  display: flex;
  align-items: center; /* Alinea verticalmente los elementos */
  justify-content: space-between;
  gap: 10px; /* Espacio entre el avatar y la información */
}

/* Información del proyecto (nombre y código) */
.project-info {
  display: flex;
  flex-direction: column; /* Alinea el nombre y el código verticalmente */
}

/* Nombre del proyecto */
.project-name {
  padding: 0;
  margin: 0;
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
  font-size: 1rem;
  font-weight: bold;
}

/* Código del departamento debajo del nombre */
.department-code {
  padding: 0;
  margin: 0;
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  font-size: 0.9rem;
}

/* Precio alineado a la derecha */
.price {
  padding: 0;
  margin: 0;
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
  font-size: 1rem;
  font-weight: bold;
}

.kanban-details {
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity)); /* Color del texto */
  font-size: 0.9em;
}

.kanban-footer {
  display: flex;
  color: rgba(var(--v-theme-on-surface), var(--v-low-emphasis-opacity)); /* Color del texto */
  font-size: 0.8em;
}

.icon-section {
  display: flex;
  align-items: center;
  gap: 10px; /* Espacio entre los íconos */
}


.status {
  color: rgb(var(--v-theme-success)); /* Color del estado */
}

.details {
  color: rgba(var(--v-theme-on-surface), var(--v-low-emphasis-opacity)); /* Color de los detalles */
}

button {
  border: none;
  border-radius: 5px;
  background-color: rgb(var(--v-theme-primary)); /* Color del botón */
  color: white;
  cursor: pointer;
  margin-block-start: 10px;
  padding-block: 8px;
  padding-inline: 16px;
}

button:hover {
  background-color: rgb(var(--v-theme-on-surface));
}
</style>
