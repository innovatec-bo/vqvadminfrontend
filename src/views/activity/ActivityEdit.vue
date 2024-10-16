<script setup>
import { useActivity } from '@/composables/Activity/useActivity'

const props = defineProps({
  activitiesData: {
    type: Object,
    required: true,
    default: () => ({
      title: '',
      description: '',
      // eslint-disable-next-line camelcase
      schedule_at: '',
    }),
  },
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'refreshActivities',
])

const { changeStatusActivity, updateActivity } = useActivity()
const activitiesData = ref(structuredClone(toRaw(props.activitiesData)))

watch(props, () => {
  activitiesData.value = structuredClone(toRaw(props.activitiesData))
})

const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)

}

const onSubmit = async() => {
  try {
    await updateActivity(activitiesData.value.id, activitiesData.value)
  } catch (err) {
    console.error('Error updating activity:', err)
  }finally{
    emit('refreshActivities') 
    emit('update:isDrawerOpen', false) 
  }
}

const complet = async()=>{
  await changeStatusActivity(activitiesData.value.id, {
    "state_activity": "COMPLETED",
  })
  emit('refreshActivities') 
  emit('update:isDrawerOpen', false) // Cerrar el drawer
}


const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}
</script>

<template>
  <VCard
    v-if="isDrawerOpen"
    title="Editar Actividad"
  >
    <VChip
      label
      color="primary"
      class="mx-5"
    >
      {{ activitiesData.type_activity }}
    </VChip>
    <VForm class="mt-4">
      <VWindow class=" mx-3">
        <VCol>
          <AppTextField
            v-model="activitiesData.title"
            label="Titulo de la actividad"
            placeholder="......"
          />
        </VCol>
        <VCol>
          <AppDateTimePicker
            v-model="activitiesData.scheduled_at"
            label="Seleccione la fecha y hora"
            placeholder="Select date and time"
            :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
            :rules="[requiredValidator]"
          />
        </VCol>
        <VCol>
          <AppTextarea
            v-model="activitiesData.description"
            label="Descripcion"
            rows="3"
            :rules="[requiredValidator]"
          />
        </VCol>
      </VWindow>
    </VForm>
    <VWindow class=" mx-10">
      <div class="mb-5">
        <VBtn
          size="small"
          color="primary"
          class="mx-2"
          @click="onSubmit"
        >
          Actualizar
        </VBtn>
        <VBtn
          size="small"
          color="success"
          class="mx-auto"
          @click="complet"
        >
          Completar
        </VBtn> 
        <VBtn
          size="small"
          color="error"
          class="my-2 mx-2"
          @click="closeNavigationDrawer"
        >
          Cancelar
        </VBtn>
      </div>
    </VWindow>
  </VCard>
</template>
