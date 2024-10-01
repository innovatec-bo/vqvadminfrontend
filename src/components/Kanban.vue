<script setup>
import poraIcon from '@/assets/icons/poraIcon.png'
import { useOpportunity } from '@/composables/Opportunity/useOpportunity'
import { useSales } from '@/composables/Sales/useSales'
import { onMounted, ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import TaskKanban from './opportunity/TaskKanban.vue'
import PreSaleForm from './sale/PreSaleForm.vue'

const { allOpportunityKanbanForUser, kanban, generateProspect } = useOpportunity()
const { loadingSale, sale, generateSale } = useSales()

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

const isDialogVisiblePreSale = ref(true)

const onDragStart = event => {
  originColumnTitle.value = event.from.closest('.kanban-column').dataset.columnTitle
  console.log('Elemento arrastrado desde:', originColumnTitle.value)
}

const onMove = event => {
  const originColumn = event.from.closest('.kanban-column').dataset.columnTitle
  const destinationColumn = event.to.closest('.kanban-column').dataset.columnTitle

  if (!isMoveValid(originColumn, destinationColumn)) {
    console.log(`Movimiento NO permitido de ${originColumn} a ${destinationColumn}`)
    
    return false 
  }

  console.log(`Movimiento permitido de ${originColumn} a ${destinationColumn}`)
  
  return true 
}

const onDragEnd = event => {
  destinationColumnTitle.value = event.to.closest('.kanban-column').dataset.columnTitle
  console.log('Elemento movido de', originColumnTitle.value, 'a', destinationColumnTitle.value)
  if (originColumnTitle.value !== destinationColumnTitle.value) {
    const item = event.data
    switch (destinationColumnTitle.value) {
    case 'LEAD':
      console.log('Movido a LEAD')

      break
    case 'PROSPECTO':
      console.log('Movido a PROSPECTO')
      generateProspect(item.id, item)

      break
    case 'PREVENTA':
      console.log('Movido a PREVENTA')
      isDialogVisiblePreSale.value= true

      break
    case 'VENTA':
      console.log('Movido a VENTA')

      break
    case 'ENTREGA':
      console.log('Movido a ENTREGA')

      break
    default:
      console.log('Movimiento a una columna no definida')
      break
    }
  }
}

const selectOpportunity = opportunity => {
  selectedOpportunity.value = opportunity
  isDialogVisible.value = true
}

// Reglas para prevenir movimientos entre ciertas columnas
const movementRules = {
  'LEAD': ['LEAD', 'PROSPECTO', 'PREVENTA'], // LEAD no puede moverse directamente a VENTA
  'PROSPECTO': ['PROSPECTO', 'PREVENTA'],
  'PREVENTA': ['PREVENTA', 'VENTA'], 
  'VENTA': ['VENTA', 'ENTREGA'], 
  'ENTREGA': ['ENTREGA'], 
}

// Función para validar el movimiento
const isMoveValid = (fromColumn, toColumn) => {
  const allowedMoves = movementRules[fromColumn] || []
  
  return allowedMoves.includes(toColumn)
}

onMounted(async () => {
  await allOpportunityKanbanForUser() 
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
        </div>
      </div>
      <VueDraggable
        v-model="column.items"
        :group="{ name: column.name, pull: true, put: true }"
        class="kanban-items"
        @start="onDragStart"
        @end="onDragEnd"
        @move="onMove"
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
                {{ item.property || 'Sin código' }}
              </h4>
            </div>
            <!-- Precio alineado a la derecha -->
            <p class="price">
              <strong>{{ item.price }}$</strong>
            </p>
          </div>

          <!-- Información del cliente -->
          <div class="kanban-details">
            <p><strong>{{ item.name }}</strong></p>
            <p>{{ item.phone }}</p>
          </div>

          <!-- Detalles del proyecto -->
          <div class="kanban-project-details">
            <p
              v-if="item.status === 'Cumplido'"
              class="status"
            >
              Cumplido
            </p>
            <div class="checklist">
              <p>
                {{ item.lastActivity?.title || ' ' }} 
                <VIcon
                  v-if="item.lastActivity"
                  icon="tabler-check"
                />
              </p>
            </div>
          </div>

          <!-- Footer con comentarios y otras acciones -->
          <div class="kanban-footer">
            <div class="icon-section">
              <IconBtn>
                <VIcon icon="tabler-message" />
                <span class="details">{{ item.cantComments }}</span>
              </IconBtn>
            </div>
          </div>
        </div>
      </VueDraggable>
    </div>
  </div>

  <TaskKanban 
    v-model:is-dialog-visible="isDialogVisible" 
    :opportunity-kanban="selectedOpportunity"
  />
  <PreSaleForm v-model="isDialogVisiblePreSale" />
</template>

<style>
/* Estilos personalizados para la tarjeta */
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
  border-block-end: 2px solid rgba(var(--v-border-color), var(--v-border-opacity));
  margin-block-end: 10px;
  padding-block-end: 10px;
}

.column-title {
  display: flex;
  align-items: center;
}

.column-title h2 {
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
  font-size: 1.1em;
  font-weight: bold;
  margin-inline-start: 5px;
}

.column-dot {
  border-radius: 50%;
  background-color: rgb(var(--v-theme-primary));
  block-size: 8px;
  inline-size: 8px;
}

.column-info {
  display: flex;
  align-items: center;
}

.task-count {
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  font-size: 0.9em;
  margin-inline-end: 10px;
}

/* Items dentro de las columnas */
.kanban-items {
  margin-block-start: 10px;
}

.kanban-item {
  padding: 10px;
  border: 1px solid rgba(var(--v-border-color), 0.25);
  border-radius: 10px;
  background-color: rgb(var(--v-theme-surface));
  margin-block-end: 10px;
}

.kanban-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.project-info {
  display: flex;
  flex-direction: column;
}

.project-name {
  padding: 0;
  margin: 0;
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
  font-size: 1rem;
  font-weight: bold;
}

.department-code {
  padding: 0;
  margin: 0;
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  font-size: 0.9rem;
}

.price {
  padding: 0;
  margin: 0;
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
  font-size: 1rem;
  font-weight: bold;
}

/* Detalles del proyecto */
.kanban-project-details {
  margin-block-start: 10px;
}

.status {
  color: rgb(var(--v-theme-success));
}

.checklist p {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.kanban-footer {
  display: flex;
  justify-content: flex-end;
  font-size: 0.8em;
  gap: 10px;
}

.icon-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.details {
  color: rgba(var(--v-theme-on-surface), var(--v-low-emphasis-opacity));
}

/* Botones */
button {
  border: none;
  border-radius: 5px;
  background-color: rgb(var(--v-theme-primary));
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
