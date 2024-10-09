<script setup>
import poraIcon from '@/assets/icons/poraIcon.png'
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
  fetchActivitiesToday()
}

const orders = [
  { tabName: 'Hoy', icon: 'tabler-edit', actividades: activities, badge: activities.value.length },
  { tabName: 'Anteriores', icon: 'tabler-calendar', actividades: activitiesPast, badge: activitiesPast.value.length },
  { tabName: 'Futuros', icon: 'tabler-calendar', actividades: activitiesFuture, badge: activitiesFuture.value.length },
]
</script>

<template>
  <VRow class="match-height">
    <VCol
      cols="12"
      md="4"
    >
      <VCard title="Lista de Actividades">
        <VTabs
          v-model="currentActiveTab"
          grow
        >
          <VTab
            v-for="order in orders"
            :key="order.tabName"
          >
            <VIcon
              size="20"
              :icon="order.icon"
            />
            <!--
              <VBadge
              :content="order.badge"
              :offset-x="-18"
              :offset-y="6"
              >
              </VBadge> 
            -->
            {{ order.tabName }}
          </VTab>
        </VTabs>

        <VCardText>
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
          >
            <VWindowItem
              v-for="order in orders"
              :key="order.tabName"
              :value="order.tabName"
              style="max-block-size: 500px; overflow-y: auto;"
            >
              <template v-if="order.actividades.value.length === 0">
                <div
                  class="no-activities-message"
                  style="align-items: center;"
                >
                  No tienes actividades pendientes
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
                    <template #prepend>
                      <VAvatar 
                        v-if="item.project_name"
                        size="50"
                        rounded
                      >
                        <img
                          :src="poraIcon"
                          alt="Logo pora"
                          style="border-radius: 30%;"
                        >
                      </VAvatar>
                    </template>
                    <VRow>
                      <VCol
                        v-if="item.project_name"
                        cols="12"
                        md="7"
                      >
                        <VListItemTitle class="font-weight-medium">
                          {{ item.project_name }} | {{ item.code_property }}
                        </VListItemTitle>
                        <VListItemSubtitle class="text-disabled d-flex justify-between mt-1">
                          <span>$ {{ item.price }}</span>
                        </VListItemSubtitle>
                      </VCol>
                      <VCol
                        cols="12"
                        md="5"
                      >
                        <VChip
                          label
                          color="primary"
                          class="ml-auto"
                          style="font-size: 0.7em;"
                        >
                          {{ item.stage }}
                        </VChip>
                      </VCol>
                    </VRow>
                  </VListItem>
                  <div class="mx-3 ">
                    <VChip
                      label
                      color="secondary"
                      class="w-100 h-50 d-flex justify-content-between  my-2"
                    >
                      <IconBtn>
                        <VIcon icon="tabler-phone" />
                      </IconBtn>
                      <div style="flex-grow: 2;">
                        {{ item.type_activity }}
                      </div>
                      <div class="mx-2">
                        |
                      </div> <!-- Separador con margen -->
                      <div>
                        {{ item.name_opportunity }}
                      </div>
                    </VChip>

                    <div
                      class="d-flex justify-content-between my-2"
                      style="font-size: 0.9em;"
                    >
                      <div style="flex-grow: 1;">
                        Ver Actividad
                      </div>
                      <div>
                        {{ item.scheduled_at }}
                      </div>
                    </div>
                  </div>
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
    >
      <!-- Componente AddActivity -->
      <AddActivity
        v-model:is-drawer-open="isEditActivity"
        :activities-data="activity"
        @refresh-activities="onRefreshActivities"
        @loaded="isLoading = false"
      >
        />
      </addactivity>
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
</style>
