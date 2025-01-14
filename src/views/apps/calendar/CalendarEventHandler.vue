<script setup>
import { useCustomer } from '@/composables/Customer/useCustomer'
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar5 from '@images/avatars/avatar-5.png'
import avatar6 from '@images/avatars/avatar-6.png'
import avatar7 from '@images/avatars/avatar-7.png'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { VForm } from 'vuetify/components/VForm'
import { useCalendarStore } from './useCalendarStore'

const { searchCustomers, customers, loading } = useCustomer()

// 👉 store
const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
  event: {
    type: null,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'addEvent',
  'updateEvent',
  'removeEvent',
  'completedEvent',
  'cancelledEvent'
])

const store = useCalendarStore()
const refForm = ref()

// 👉 Event
const event = ref(JSON.parse(JSON.stringify(props.event)))

// onMounted(async () => {
//   await allCustomerPaginate({
//     page: 1,
//     itemsPerPage: 1000,
//   })
// })

const resetEvent = () => {
  event.value = JSON.parse(JSON.stringify(props.event))
  nextTick(() => {
    refForm.value?.resetValidation()
  })
}

watch(() => props.isDrawerOpen, resetEvent)

const removeEvent = () => {
  emit('removeEvent', String(event.value.id))

  // Close drawer
  emit('update:isDrawerOpen', false)
}

const cancelledEvent = () => {
  emit('cancelledEvent', String(event.value.id))

  // Close drawer
  emit('update:isDrawerOpen', false)
}

const handleSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {

      // If id exist on id => Update event
      if ('id' in event.value)
        emit('completedEvent', String(event.value.id))

      // Else => add new event
      else
        emit('addEvent', event.value)

      // Close drawer
      emit('update:isDrawerOpen', false)
    }
  })
}

const guestsOptions = [
  {
    avatar: avatar1,
    name: 'Jane Foster',
  },
  {
    avatar: avatar3,
    name: 'Donna Frank',
  },
  {
    avatar: avatar5,
    name: 'Gabrielle Robertson',
  },
  {
    avatar: avatar7,
    name: 'Lori Spears',
  },
  {
    avatar: avatar6,
    name: 'Sandy Vega',
  },
  {
    avatar: avatar2,
    name: 'Cheryl May',
  },
]

// 👉 Form
const onCancel = () => {

  // Close drawer
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    resetEvent()
    refForm.value?.resetValidation()
  })
}

const startDateTimePickerConfig = computed(() => {
  const config = {
    enableTime: !event.value.allDay,
    dateFormat: `Y-m-d${ event.value.allDay ? '' : ' H:i' }`,
  }

  if (event.value.end)
    config.maxDate = event.value.end
  
  return config
})

const endDateTimePickerConfig = computed(() => {
  const config = {
    enableTime: !event.value.allDay,
    dateFormat: `Y-m-d${ event.value.allDay ? '' : ' H:i' }`,
  }

  if (event.value.start)
    config.minDate = event.value.start
  
  return config
})

const dialogModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}

const handleCustomerSearch = useDebounceFn(async (query) => {
  if (query.trim()) {
    await searchCustomers(query)
  }
}, 300)
</script>

<template>
  <VNavigationDrawer
    temporary
    location="end"
    :model-value="props.isDrawerOpen"
    width="420"
    class="scrollable-content"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- 👉 Header -->
    <AppDrawerHeaderSection
      :title="event.id ? 'Actualizar Actividad' : 'Nueva Actividad'"
      @cancel="$emit('update:isDrawerOpen', false)"
    >
      <!-- <template #beforeClose>
        <IconBtn
          v-show="event.id"
          @click="removeEvent"
        >
          <VIcon
            size="18"
            icon="tabler-trash"
          />
        </IconBtn>
      </template> -->
    </AppDrawerHeaderSection>

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <!-- SECTION Form -->
          <VForm
            ref="refForm"
            @submit.prevent="handleSubmit"
          >
            <VRow>
              <!-- 👉 Customer -->
              <VCol cols="12">
                <AppAutocomplete
                  v-model="event.extendedProps.customer.customerId"
                  :rules="[requiredValidator]"
                  label="Cliente"
                  placeholder="Selecciona un Cliente"
                  :items="customers.map(customer => ({title:customer.name, value:customer.id}))"
                  outlined
                  :disabled="event.id && true"
                  @update:search="handleCustomerSearch"
                  :loading="loading"
                  clearable
                />
              </VCol>

              <!-- 👉 Title -->
              <VCol cols="12">
                <AppTextField
                  v-model="event.title"
                  label="Título de la actividad"
                  placeholder="Título de la actividad"
                  :rules="[requiredValidator]"
                  :disabled="event.id && true"
                />
              </VCol>

              <!-- 👉 Calendar -->
              <VCol cols="12">
                <AppSelect
                  v-model="event.extendedProps.calendar"
                  label="Tipo de actividad"
                  placeholder="Seleccione una actividad"
                  :rules="[requiredValidator]"
                  :items="store.availableCalendars"
                  :item-title="item => item.label"
                  :item-value="item => item.value"
                  :disabled="event.id && true"
                >
                  <template #selection="{ item }">
                    <div
                      v-show="event.extendedProps.calendar"
                      class="align-center"
                      :class="event.extendedProps.calendar ? 'd-flex' : ''"
                    >
                      <VBadge
                        :color="item.raw.color"
                        inline
                        dot
                        class="pa-1 pb-2"
                      />
                      <span>{{ item.raw.label }}</span>
                    </div>
                  </template>
                </AppSelect>
              </VCol>

              <!-- 👉 Start date -->
              <VCol cols="12">
                <AppDateTimePicker
                  :key="JSON.stringify(startDateTimePickerConfig)"
                  v-model="event.start"
                  :rules="[requiredValidator]"
                  label="Fecha y hora"
                  placeholder="Seleccione fecha y hora"
                  :config="startDateTimePickerConfig"
                  :disabled="event.id && true"
                />
              </VCol>

              <!-- 👉 End date -->
              <!-- <VCol cols="12">
                <AppDateTimePicker
                  :key="JSON.stringify(endDateTimePickerConfig)"
                  v-model="event.end"
                  :rules="[requiredValidator]"
                  label="End date"
                  placeholder="Select End Date"
                  :config="endDateTimePickerConfig"
                />
              </VCol> -->

              <!-- 👉 All day -->
              <!-- <VCol cols="12">
                <VSwitch
                  v-model="event.allDay"
                  label="All day"
                />
              </VCol> -->

              <!-- 👉 Event URL -->
              <!-- <VCol cols="12">
                <AppTextField
                  v-model="event.url"
                  label="Event URL"
                  placeholder="https://event.com/meeting"
                  :rules="[urlValidator]"
                  type="url"
                />
              </VCol> -->

              <!-- 👉 Guests -->
              <!-- <VCol cols="12">
                <AppSelect
                  v-model="event.extendedProps.guests"
                  label="Guests"
                  placeholder="Select guests"
                  :items="guestsOptions"
                  :item-title="item => item.name"
                  :item-value="item => item.name"
                  chips
                  multiple
                  eager
                />
              </VCol> -->

              <!-- 👉 Location -->
              <!-- <VCol cols="12">
                <AppTextField
                  v-model="event.extendedProps.location"
                  label="Location"
                  placeholder="Meeting room"
                />
              </VCol> -->

              <!-- 👉 Description -->
              <VCol cols="12">
                <AppTextarea
                  v-model="event.extendedProps.description"
                  label="Descripción de la actividad"
                  :disabled="event.id && true"
                />
              </VCol>

              <!-- 👉 Form buttons -->
              <VCol cols="12">
                <VBtn
                  type="submit"
                  class="me-3"
                >
                {{event.id ? "Finalizar" : "Registrar"}}
                </VBtn>
                <VBtn
                  v-if="event.id"
                  variant="outlined"
                  color="error"
                  @click="cancelledEvent"
                >
                  Cancelar
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        <!-- !SECTION -->
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
