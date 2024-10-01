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

// onMounted(fetchActivitiesToday, fetchActivitiesPast, fetchActivitiesFuture)
onMounted(async () => {
  await fetchActivitiesToday()
  await fetchActivitiesPast()
  await fetchActivitiesFuture()
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
  { tabName: 'Hoy', icon: 'tabler-edit', actividades: activities },
  { tabName: 'Anteriores', icon: 'tabler-calendar', actividades: activitiesPast },
  { tabName: 'Futuros', icon: 'tabler-calendar', actividades: activitiesFuture },
]
</script>

<template>
  <div class="toolbar mb-5">
    <div class="breadcrumbs">
      <div class="filters">
        <button
          v-for="filter in filters"
          :key="filter"
          :class="{ active: selectedFilter === filter }"
          class="px-5"
          @click="selectedFilter = filter"
        >
          {{ filter }}
        </button>
      </div>
    </div>
  </div>

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
            {{ order.tabName }}
          </VTab>
        </VTabs>

        <VCardText>
          <VWindow
            v-model="currentActiveTab"
            class="disable-tab-transition"
          >
            <VWindowItem
              v-for="order in orders"
              :key="order.tabName"
              :value="order.tabName"
              style="max-block-size: 90vh; overflow-y: auto;"
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
                  class="border mb-2 rounded-sm"
                  @click="editActivity(item)"
                >
                  <VListItem>
                    <template #prepend>
                      <VAvatar
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
                    <VListItemTitle class="font-weight-medium">
                      {{ item.project_name }}
                    </VListItemTitle>
                    <VListItemSubtitle class="text-disabled d-flex justify-between mt-1">
                      <span>{{ item.code_property }}</span>
                      <span class="ml-auto">{{ item.price }}$</span>
                    </VListItemSubtitle>
                  </VListItem>
                  <div class="mx-7 ">
                    {{ item.title }}
                    <div class="mt-2 d-flex justify-between">
                      <VAvatar
                        variant="tonal"
                        rounded
                        size="22"
                      >
                        <VIcon
                          :icon="tabler-user"
                          size="20"
                        />
                      </VAvatar>
                      <span
                        class="mx-2 mt-1"
                        style="font-size: 0.8em;"
                      >
                        {{ item.name_opportunity }}
                      </span>
                      <VChip
                        label
                        color="primary"
                        class="ml-auto"
                        style="font-size: 0.7em;"
                      >
                        {{ item.stage }}
                      </VChip>
                    </div>
                    <div
                      class="mt-2 d-flex justify-between"
                      style="font-size: 0.8em;"
                    >
                      <VAvatar
                        variant="tonal"
                        rounded
                        size="22"
                      >
                        <VIcon
                          :icon="tabler-calendar"
                          size="20"
                        />
                      </VAvatar>
                      <span class="mx-2 mt-1">{{ item.type_activity }}</span>
                      <span class="ml-auto mt-1 ">
                        {{ new Date(item.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
                      </span>
                    </div>
                    <div
                      class="my-2"
                      style="font-size: 0.9em;"
                    >
                      {{ item.description }}
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
      <AddActivity
        v-model:is-drawer-open="isEditActivity"
        :activities-data="activity"
        @refresh-activities="onRefreshActivities"
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
</style>
