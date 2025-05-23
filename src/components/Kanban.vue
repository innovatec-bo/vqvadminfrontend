/* stylelint-disable liberty/use-logical-spec */
/* stylelint-disable order/properties-order */
/* stylelint-disable liberty/use-logical-spec */
/* stylelint-disable alpha-value-notation */
/* stylelint-disable comment-empty-line-before */
/* stylelint-disable alpha-value-notation */
<script setup>
import { useActivity } from '@/composables/Activity/useActivity'
import { useOpportunity } from '@/composables/Opportunity/useOpportunity'
import { StagesOpportunity } from '@/enums/StagesOpportunity'
import { formatCurrency } from '@/utils/currencyFormatter'
import Swal from 'sweetalert2'
import { onMounted, ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import AddQuoteDialog from '../components/dialogs/quote/AddQuoteDialog.vue'
import AddActivity from './activity/AddActivity.vue'
import TaskKanban from './opportunity/TaskKanban.vue'
import PreSaleForm from './sale/PreSaleForm.vue'

const searchTerm = ref('')
const { allOpportunityKanbanForUser, kanban, getOpportunitybyId, opportunity, changeStatusByOpportunity } = useOpportunity()
const { getallTypeActivities, typeActivities } = useActivity()

const selectedOpportunity  = ref(null)
const isDialogVisible = ref(false)
const isDialogVisibleAddQuoteInvoice = ref(false)
const isFormActivityVisible= ref(false)
const originColumnTitle = ref(null)
const formCancelled = ref(false)
const isDialogVisiblePreSale = ref(false)
const lastValidPosition = ref(null)

const formatDate = dateString => {
  const date = new Date(dateString)
  const day = date.getDate() // Día del mes

  const months = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ]

  const month = months[date.getMonth()] // Mes en formato humano
  const hours = date.getHours().toString().padStart(2, '0') // Hora con dos dígitos
  const minutes = date.getMinutes().toString().padStart(2, '0') // Minutos con dos dígitos

  // Retorna la fecha en formato: 7 de marzo, 14:00
  return `${day} de ${month}, ${hours}:${minutes}`
}

const onDragStart = event => {
  // Guarda la columna y el índice inicial del elemento
  lastValidPosition.value = {
    column: event.from.closest('.kanban-column'),
    index: Array.from(event.from.children).indexOf(event.item),
  }
  originColumnTitle.value = event.from.closest('.kanban-column').dataset.columnTitle
  console.log('Elemento arrastrado desde:', originColumnTitle.value)
}


const restoreLastPosition = event => {
  // Obtener el item que está siendo movido (seguramente es el elemento que arrastraste)
  const item = event.data

  // Obtener las columnas de origen y destino
  const originColumnTitle = event.from.closest('.kanban-column').dataset.columnTitle
  const destinationColumnTitle = event.to.closest('.kanban-column').dataset.columnTitle

  // Encontrar las columnas en el estado de los tableros (kanban)
  const originColumn = kanban.value.find(board => board.title === originColumnTitle)
  const destinationColumn = kanban.value.find(board => board.title === destinationColumnTitle)

  if (originColumn && destinationColumn) {
    // Encontramos el índice del item en la columna de destino
    const itemIndexInDest = destinationColumn.items.findIndex(i => i.id === item.id)

    if (itemIndexInDest !== -1) {
      // Eliminar el item de la columna de destino
      const [removedItem] = destinationColumn.items.splice(itemIndexInDest, 1)

      console.log('Elemento eliminado de la columna de destino')

      // Agregar el item a la columna de origen
      originColumn.items.push(removedItem)
      originColumn.items.sort((a, b) => a.id - b.id)
      console.log('Elemento restaurado en la columna de origen')
    } else {
      console.log('Elemento no encontrado en la columna de destino')
    }
  } else {
    console.log('No se encontraron las columnas de origen o destino')
  }
}

const openMissingModal = async element => {
  Swal.fire({
    title: "Quieres dar de baja al cliente ?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "confirmar",
  }).then(result => {
    if (result.isConfirmed) {
      changeStatus(element, StagesOpportunity.LOSS.value)
      removeElement(element)
      closeNavigationDrawer()
      Swal.fire({
        text: "EL cliente fue dado de baja",
        icon: "success",
      })
    }
  })
}

const changeStatus = async (element, stage) => {
  await changeStatusByOpportunity(element.id, stage, {})
  await allOpportunityKanbanForUser() 
}

const completOportunidad = async element => {
  Swal.fire({
    title: "Quieres completar la oportunidad?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "confirmar",
  }).then(result => {
    if (result.isConfirmed) {
      changeStatusByOpportunity(element.id, StagesOpportunity.FINISHED.value, {})
      removeElement(element)
      closeNavigationDrawer()
      Swal.fire({
        text: "EL cliente fue completado",
        icon: "success",
      })
    }
  })
}

const removeElement = data => {
  // Buscamos el tablero que contiene el elemento
  const board = kanban.value.find(board => board.items.some(item => item.id === data.id))

  if (board) {
    // Encontramos el índice del item dentro de los items del tablero
    const itemIndex = board.items.findIndex(item => item.id === data.id)
    
    if (itemIndex !== -1) {
      // Si encontramos el item, lo eliminamos
      board.items.splice(itemIndex, 1)
      console.log('Elemento eliminado')
    } else {
      console.log('Elemento no encontrado en el tablero')
    }
  } else {
    console.log('El elemento no se encuentra en ningún tablero')
  }
}

const handleFormCancelled = () => {
  formCancelled.value= true
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

const onDragEnd = async event => {
  console.log(event)

  const originColumnTitle = event.from.closest('.kanban-column').dataset.columnTitle
  const destinationColumnTitle = event.to.closest('.kanban-column').dataset.columnTitle

  if (!isMoveValid(originColumnTitle, destinationColumnTitle)) {
    console.log(`Movimiento NO permitido de ${originColumnTitle} a ${destinationColumnTitle}`)
  
    return false 
  }

  console.log('Elemento movido de', originColumnTitle, 'a', destinationColumnTitle)
  if (originColumnTitle !== destinationColumnTitle) {
    const item = event.data
    switch (destinationColumnTitle) {
    case 'LEAD':
      console.log('Movido a LEAD')

      break

      //Al pasar a prospecto Se muestra modal
    case 'PROSPECTO':
      console.log('Movido a PROSPECTO')
      selectedOpportunity.value = item
      isFormActivityVisible.value = true
      break

    case 'PREVENTA':
      console.log('Movido a PREVENTA')
      selectedOpportunity.value = item
      changeStatus(selectedOpportunity.value, StagesOpportunity.PRESALE.value)
      break

      //Al pasar a venta , se muestra el modal de venta
    case 'VENTA':
      await getOpportunitybyId(item.id)
      console.log('Movido a VENTA')
      selectedOpportunity.value = opportunity.value
      isDialogVisiblePreSale.value= true
      break

    case 'ENTREGA':
      console.log('Movido a ENTREGA')
      selectedOpportunity.value = item
      changeStatus(selectedOpportunity.value, StagesOpportunity.DELIVERY.value)
      break
    default:
      console.log('Movimiento a una columna no definida')
      break
    }
  }
  watch(formCancelled, newValue => newValue && restoreLastPosition(event))
  formCancelled.value= false
}

const selectOpportunity = opportunity => {
  selectedOpportunity.value = opportunity
  isDialogVisible.value = true
}

// Reglas para prevenir movimientos entre ciertas columnas
const movementRules = {
  'LEAD': ['PROSPECTO', 'PREVENTA'], // LEAD no puede moverse directamente a VENTA
  'PROSPECTO': ['PREVENTA'],
  'PREVENTA': ['VENTA'], 
  'VENTA': ['ENTREGA'], 
  'ENTREGA': [], 
}

// Función para validar el movimiento
const isMoveValid = (fromColumn, toColumn) => {
  const allowedMoves = movementRules[fromColumn] || []
  
  return allowedMoves.includes(toColumn)
}

onMounted(async () => {
  await allOpportunityKanbanForUser() 
  await getallTypeActivities()
})

const refreshKanban = async() => {
  await allOpportunityKanbanForUser() 
}

const cleanSearch = () => {
  searchTerm.value= ''
}

// **Filtrado del Kanban**
const filteredKanban = computed(() => {
  if (!searchTerm.value.trim()) return kanban.value

  return kanban.value.map(column => {
    // Separar elementos filtrados y no filtrados
    const filteredItems = column.items
      .map(item => ({
        ...item,
        isFiltered: (
          (item.name?.toLowerCase() || '').includes(searchTerm.value.toLowerCase()) ||
          (item.type_customer?.toLowerCase() || '').includes(searchTerm.value.toLowerCase()) ||
          (item.phone || '').includes(searchTerm.value) ||
          (item.property?.toLowerCase() || '').includes(searchTerm.value.toLowerCase())
        ),
        isNotFiltered: false, // Los filtrados no deben tener esta bandera
      }))
      .filter(item => item.isFiltered) // Mantiene solo los filtrados

    const remainingItems = column.items
      .map(item => ({
        ...item,
        isFiltered: false,
        isNotFiltered: true, // Agregar bandera para elementos NO filtrados
      }))
      .filter(item => !filteredItems.some(filteredItem => filteredItem.id === item.id)) // Mantiene los NO filtrados

    return { 
      ...column, 
      items: [...filteredItems, ...remainingItems], // Primero los filtrados, luego los no filtrados
    }
  })
})
</script>

<template>
  <div class="kanban-header-container">
    <div class="search-container">
      <AppTextField
        v-model="searchTerm"
        class="search-input"
        placeholder="Buscar..."
        density="compact"
      />
      <VBtn
        class="clear-search-btn"
        icon="tabler-filter-x"
        @click="cleanSearch"
      />
    </div>
  </div>

  <div class="kanban">
    <div
      v-for="(column, index) in filteredKanban"
      :key="index"
      class="kanban-column"
      :data-column-title="column.title"
    >
      <div class="kanban-column-header">
        <div class="column-title">
          <h2>{{ column.title }}</h2>
          <span class="small-badge">{{ column.items.length }} </span>
        </div>
      </div>
      <VueDraggable
        v-model="column.items"
        :group="{ name: column.name, pull: true, put: true }"
        class="kanban-items"
        @start="onDragStart"
        @move="onMove"
        @end="onDragEnd"
      >
        <div
          v-for="(item) in column.items"
          :key="item.id"
          class="kanban-item"
          :class="{ 
            'filtered-item': item.isFiltered, 
            'not-filtered-item': item.isNotFiltered 
          }"
          @click="selectOpportunity(item)"
        >
          <div
            class="d-flex align-center"
            style="gap: 10px; margin-block-end: 10px;"
          > 
            <!-- Contenedor del 70% -->
            <div style="flex: 7;">
              <p style="margin: 0; font-size: small;">
                <strong>{{ item.name }}</strong>
              </p>
              <span style="margin: 0; font-size: small;">{{ item.type_customer }}</span>
            </div>

            <div
              class="d-flex align-center justify-end gap-2"
              style="flex: 0 1 30%; "
            >
              <VBtn
                v-if="item.stage !=='VENTA' && item.stage!== 'ENTREGA'"
                color="warning"
                class="icon-container"
                title="Dar de Baja"
                variant="tonal"
                @click.stop
                @click.prevent="openMissingModal(item)"
              >
                <VIcon
                  icon="tabler-trash"
                  class="icon-small"
                />
              </VBtn>
              <VBtn
                v-if="item.stage=== 'ENTREGA'"
                color="success"
                title="Completar Oportunidad"
                class="icon-container"
                variant="tonal"
                @click.stop
                @click.prevent="completOportunidad(item)"
              >
                <VIcon icon="tabler-check" />
              </VBtn>
            </div>
          </div>

          <div class="kanban-header">
            <div class="d-flex gap-1">
              <div>
                <p class="label-info">
                  {{ item.property_type }}
                </p>
                <div class="project-info">
                  <span
                    v-if="item.property"
                    class="label-name"
                    style="font-size: small;"
                  >
                    {{ item.project + ' | '+ item.property }}  

                  </span>
                  <span
                    v-if="item.property == null"
                    class="label-name"
                    style="display: flex; align-items: center; gap: 8px;"
                  >
                    <VChip
                      class="d-flex justify-center align-center"
                      style="display: inline-flex; border-radius: 4px; block-size: 30px; inline-size: 30px;"
                    >
                      <VIcon
                        size="20"
                        icon="tabler-home"
                      />
                    </VChip>
                    <strong style="font-size: small;">
                      Indefinido
                    </strong>
                  </span>

                  <h4 class="department-code" />
                </div>
                <!-- Precio alineado a la derecha -->
                <p class="price">
                  <strong>{{ formatCurrency(item.price ) }}</strong>
                </p>
              </div>
            </div>
            <div class="kanban-details">
              <p class="label-info">
                {{ formatDate(item.created_at) }}
              </p>
              <p style="color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity)); font-size: small;font-weight: 700; ">
                {{ item.phone }}
              </p>
            </div>
          </div>
        </div>
      </VueDraggable>
    </div>
  </div>

  <TaskKanban 
    v-model:is-dialog-visible="isDialogVisible" 
    :opportunity-kanban="selectedOpportunity"
    @form-cancelled="handleFormCancelled"
    @form-refresh="refreshKanban"
  />
  <AddQuoteDialog
    v-model:is-dialog-visible="isDialogVisibleAddQuoteInvoice"
    :opportunity-kanban="selectedOpportunity"
  />
  <PreSaleForm
    v-model:is-dialog-visible="isDialogVisiblePreSale"
    :opportunity="selectedOpportunity"
    stage="PRESALE"
    @form-cancelled="handleFormCancelled"
    @form-refresh="refreshKanban"
  />
  <AddActivity
    v-model:is-dialog-visible="isFormActivityVisible"
    :opportunity-kanban="selectedOpportunity"
    :type-activities="typeActivities"
    @form-cancelled="handleFormCancelled"
  />
</template>

<style>
/* Estilos personalizados para la tarjeta */
.kanban {
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch; /* Asegura que todas las columnas tengan el mismo alto */
  padding: 10px;
  background-color: rgba(var(--v-theme-background), 1); /* Color de fondo */
  gap: 24px;
  overflow-x: auto;
  white-space: nowrap;
}

.kanban-column {
  display: flex;
  flex-direction: column; /* Permite que las tareas se apilen verticalmente */
  flex-grow: 1; /* Hace que las columnas crezcan para igualar el alto */
  padding: 10px;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  background-color: #F3F3F3;
  inline-size: 300px;
  min-inline-size: 300px;
}

.icon-container {
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  max-block-size: 24px;
  max-inline-size: 24px;
  min-inline-size: 24px;
}

.button-task {
  display: flex;
  align-items: center;
  padding: 0;
  max-block-size: 24px;
  max-inline-size: 24px;
  min-inline-size: 24px;
}

/* Encabezado de la columna */
.kanban-column-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
}

.column-title {
  display: flex;
  align-items: center;
  gap: 4px;
}

.column-title h2 {
  color: #525252;
  font-size: 14px;
  font-weight: 700;
  margin-inline-start: 5px;
  text-transform: lowercase;
}

.column-title h2::first-letter {
  text-transform: uppercase; 
}

.small-badge {        
  padding: 0;
  border-radius: 20%;
  background-color: #525252;        
  block-size: 14px; 
  color: white;           
  font-size: 10px;             
  inline-size: 20px;   
  margin-block-start: -8px;     
  max-inline-size: 20px;
  text-align: center;
}

.label-info{
  color: #4B465C;
  font-size: 12px;
  margin-block-end: 0 !important;
}

.column-info {
  display: flex;
  align-items: center;
}

/* Items dentro de las columnas */
.kanban-items {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Espacio entre elementos */
  min-block-size: 99%; /* Asegura que el espacio vacío siempre esté disponible */
}

.kanban-item {
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  background-color: rgb(var(--v-theme-surface));
  box-shadow: 0 2px 6px 0 rgba(82, 82, 82, 20%);
  margin-block-end: 10px;
  padding-block: 10px;
  padding-inline: 14px;
}

.kanban-details p{
  text-align: end;
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
  font-size: 14px;
  font-weight: bold;
}

/* Detalles del proyecto */
.kanban-project-details {
  margin-block-start: 0;
}

.status {
  color: rgb(var(--v-theme-success));
}

.checklist p {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block-end: 0;

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

.filtered-item {
  transform: scale(1.05);
  transition: all 0.5s ease-in-out;
}

.not-filtered-item {
  filter: blur(.0313rem);
  opacity: 0.5; /* Hace que los no filtrados sean menos visibles */

}

.kanban-header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(var(--v-theme-background), 1);
  border-block-end: 1px solid #E5E7EB;
  padding-block: 10px;
  padding-inline: 16px;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 8px; /* Espacio entre el input y el botón */
}

.search-input {
  max-inline-size: 300px;
  min-inline-size: 200px;
}

.clear-search-btn {
  border-radius: 12px;
  max-block-size: 38px;
  max-inline-size: 38px;
}
</style>
