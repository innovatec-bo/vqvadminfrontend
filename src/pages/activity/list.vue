<script setup>
import { useActivity } from '@/composables/Activity/useActivity'
import AddActivity from '@/views/activity/AddActivity.vue'

const currentActiveTab = ref('New')
const filters = ref(['Todos', 'PORA']) // Opciones de filtro
const selectedFilter = ref('Todos') // Filtro seleccionado

const {
  getallActivitiesByAsesorFecha,
  getallActivitiesByFechaPast,
  getallActivitiesByFechaFuture,
  activities,
  activitiesPast,
  activitiesFuture } = useActivity()

const activity = ref('')
const userData = useCookie('userData').value
const isLoading = ref(true) // Variable de estado de carga

// Funciones para obtener actividades
const fetchActivitiesToday = async () => {
  await getallActivitiesByAsesorFecha(userData.id)
  console.log('Actividades de hoy:', activities)
}

const fetchActivitiesPast = async () => {
  await getallActivitiesByFechaPast(userData.id)
  console.log('Actividades pasadas:', activitiesPast)
}

const fetchActivitiesFuture = async () => {
  await getallActivitiesByFechaFuture(userData.id)
  console.log('Actividades futuras:', activitiesFuture)
}

// Cargar todas las actividades al montar el componente
onMounted(async () => {
  await fetchActivitiesToday()
  await fetchActivitiesPast()
  await fetchActivitiesFuture()
  isLoading.value = false // Finaliza la carga después de obtener las actividades
})

const isEditActivity = ref(false)

const editActivity = item => {
  isEditActivity.value = true
  activity.value = { ...item }
}

const onRefreshActivities = () => {
  onMounted()
}

const orders = [
  { tabName: 'Hoy', icon: 'tabler-edit', actividades: activities, badge: activities.value.length },
  { tabName: 'Anteriores', icon: 'tabler-calendar', actividades: activitiesPast, badge: activitiesPast.value.length },
  { tabName: 'Futuros', icon: 'tabler-calendar', actividades: activitiesFuture, badge: activitiesFuture.value.length },
]

const iconosActivity = [
  { type: 'Visita', icon: 'tabler-current-location' },
  { type: 'Llamada', icon: 'tabler-phone' },
  { type: 'Cotizacion', icon: 'tabler-cash' },
  { type: 'Otro', icon: 'tabler-table' },
]

const getIconForActivity = activityType => {
  const iconObj = iconosActivity.find(icon => icon.type === activityType)

  return iconObj ? iconObj.icon : 'tabler-default' // Ícono por defecto si no se encuentra
}



const getFirstWord = str => {
  return str.split(' ')[0] // Divide el string por espacios y devuelve la primera palabra
}

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
</script>

<template>
  <VRow
    class="match-height"
    style=" display: flex;block-size: 100vh;"
  >
    <VCol
      cols="12"
      md="4"
      style="display: flex; flex-direction: column;"
    >
      <VCard
        title="Lista de Actividades"
        class="flex-grow-1"
      >
        <VTabs
          v-model="currentActiveTab"
          grow
        >
          <VTab
            v-for="order in orders"
            :key="order.tabName"
          >
            <span style="font-size: 14px;">
              {{ order.tabName }}
            </span>
          </VTab>
        </VTabs>

        <br>
        <VCardText style="flex-grow: 1; overflow-y: auto;">
          <!-- Mostrar el spinner mientras carga -->
          <VOverlay
            v-if="isLoading"
            absolute
            opacity="0.7"
          >
            <VCircularProgress
              indeterminate
              size="70"
            />
          </VOverlay>

          <VWindow
            v-model="currentActiveTab"
            class="disable-tab-transition"
            style="max-block-size: 500px; overflow-y: auto;"
          >
            <VWindowItem
              v-for="order in orders"
              :key="order.tabName"
              :value="order.tabName"
            >
              <template v-if="order.actividades.value.length === 0">
                <div
                  class="no-activities-message d-flex flex-column justify-center align-center"
                  style="min-block-size: 200px; text-align: center;"
                >
                  <VIcon
                    size="64"
                    color="grey"
                    icon="tabler-calendar-off"
                    class="mb-4"
                    style="animation: bounce 1s infinite;"
                  />
                  <div style=" color: #888;font-size: 1.2em;">
                    ¡No tienes actividades pendientes!
                  </div>
                  <div style=" color: #aaa;font-size: 0.9em; margin-block-start: 8px;">
                    ¡Relájate y disfruta tu día!
                  </div>
                </div>
              </template>
              <template v-else>
                <div
                  v-for="item in order.actividades.value"
                  :key="item.id"
                  fill-dot
                  class="border mb-2 rounded-sm py-2"
                  @click="editActivity(item)"
                >
                  <VListItem>
                    <VRow>
                      <VCol
                        cols="12"
                        md="2"
                        style="padding-inline-end: 0;"
                      >
                        <VChip
                          class="d-flex justify-center align-center"
                          style=" display: inline-flex;border-radius: 4px; block-size: 36px; inline-size: 36px;"
                        >
                          <VIcon
                            size="25"
                            icon="tabler-home"
                          />
                        </VChip>
                      </VCol>
                      <VCol
                        v-if="item.project_name"
                        cols="12"
                        md="5"
                        class="d-flex flex-column align-start"
                        style="padding-inline-start: 0;"
                      >
                        <VListItemSubtitle class="text-left">
                          <strong>
                            {{ item.property_title }}
                          </strong>
                        </VListItemSubtitle>
                        <VListItemTitle class="font-weight-medium text-left">
                          <span>$ {{ item.price }}</span>
                        </VListItemTitle>
                      </VCol>
                      <VCol
                        v-if="!item.project_name"
                        cols="12"
                        md="5"
                      />
                      <VCol
                        cols="12"
                        md="5"
                        class="d-flex justify-end align-center"
                      >
                        <VChip
                          label
                          color="primary"
                          class="ml-auto"
                          style="font-size: 10px;"
                        >
                          {{ item.stage }}
                        </VChip>
                      </VCol>
                    </VRow>
                  </VListItem>
                  <VListItem class="">
                    <!-- todo: conseguir icono por actividad -->
                    <VChip
                      label
                      color="secondary"
                      class="w-100 h-48"
                    >
                      <VIcon
                        size="20"
                        :icon="getIconForActivity(item.type_activity)"
                      />
                      <div class="mx-2">
                        {{ item.type_activity }} &nbsp • &nbsp {{ (item.name_opportunity) }}
                      </div>
                    </VChip>
                  </VListItem>
                  <VListItem>
                    <div
                      class="d-flex justify-content-between "
                      style="font-size: 0.9em;"
                    >
                      <div style="flex-grow: 1;">
                        Ver
                      </div>
                      <div>
                        {{ formatDate(item.scheduled_at) }}
                      </div>
                    </div>
                  </VListItem>
                </div>
              </template>
            </VWindowItem>
          </VWindow>
        </VCardText>
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="8"
      style="display: flex; flex-direction: column;"
    >
      <AddActivity
        v-model:is-drawer-open="isEditActivity"
        :activities-data="activity"
        class="flex-grow-1"
        @refresh-activities="onRefreshActivities"
        @loaded="isLoading = false"
      />
    </VCol>
  </VRow>
</template>


<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.breadcrumbs {
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));

  /* Color del texto de breadcrumbs */
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
  background-color: rgba(var(--v-theme-primary), 0.1);

  /* Color del botón con opacidad */
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));

  /* Color del texto del botón */
  cursor: pointer;
  padding-block: 5px;
}

.filters button.active {
  background-color: rgb(var(--v-theme-primary));

  /* Color de botón activo */
  color: rgb(var(--v-theme-surface));

  /* Texto del botón activo */
}

.date-picker {
  display: flex;
  align-items: center;
  gap: 8px;
}

.date-picker label {
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));

  /* Color del texto */
  font-size: 0.9rem;
}

.date-picker input[type="date"] {
  padding: 10px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));

  /* Borde del selector de fecha */
  border-radius: 5px;
  background-color: rgb(var(--v-theme-surface));

  /* Fondo del input */
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));

  /* Color del texto del input */
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}
</style>
