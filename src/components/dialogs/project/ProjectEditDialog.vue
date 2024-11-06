<script setup>
import { useProject } from '@/composables/Realty/useProject'
import { ref, watch } from 'vue'

const props = defineProps({
  projectData: {
    type: Object,
    required: true,
    default: () => ({
      title: '',
      description: '',
      // eslint-disable-next-line camelcase
      num_pisos: '',
    }),
  },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDialogVisible',
  'submit',
])

const { editProyect } = useProject()
const projectData = ref(structuredClone(toRaw(props.projectData)))

watch(props, () => {
  projectData.value = structuredClone(toRaw(props.projectData))
})

const resetForm = () => {
  emit('update:isDialogVisible', false)
  projectData.value = structuredClone(toRaw(props.projectData))
}

const onFormSubmit = async () => {
  emit('update:isDialogVisible', false)
  try {
    await editProyect(projectData.value.id, projectData.value)
  } catch (err) {
    console.error('Error updating customer:', err)
  }
}

const dialogModelValueUpdate = val => {
  emit('update:isDialogVisible', val)
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 610"
    :model-value="props.isDialogVisible"
    @update:model-value="val => $emit('update:isDialogVisible', val)"
  >
    <DialogCloseBtn @click="$emit('update:isDialogVisible', false)" />
    <VCard
      v-if="props.projectData"
      class="pa-sm-8 pa-5"
    >
      <!-- 👉 Title -->
      <VCardItem>
        <VCardTitle class="text-h3 text-center">
          Editar
        </VCardTitle>
      </VCardItem>
      <VCardText>
        <!-- 👉 Form -->
        <VForm
          class="mt-4"
          @submit.prevent="onFormSubmit"
        >
          <VRow>
            <VCardText>
              <VRow>
                <VCol cols="12">
                  <AppTextField
                    v-model="projectData.title"
                    label="Titulo del Proyecto"
                    placeholder="......"
                  />
                </VCol>
                <VCol>
                  <AppTextarea
                    v-model="projectData.description"
                    label="Descripción (Opcional)"
                    rows="3"
                  />
                </VCol>
                <VCol cols="12">
                  <AppTextField
                    v-model="projectData.num_pisos"
                    label="Numero de pisos (Departamentos)"
                    type="number"
                    min="0"
                  />
                </VCol>
              </VRow>
            </VCardText>
            <!-- Botones -->
            <VCol
              cols="12"
              class="d-flex flex-wrap justify-center gap-4"
            >
              <VBtn type="submit">
                Submit
              </VBtn>
              <VBtn
                color="secondary"
                variant="tonal"
                @click="resetForm"
              >
                Cancel
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
