<script setup>
import ProjectEditDialog from '@/components/dialogs/project/ProjectEditDialog.vue'
import { useProject } from '@/composables/Realty/useProject'
import { useProperty } from '@/composables/Realty/useProperty'
import { VDataTable } from 'vuetify/labs/VDataTable'

const route = useRoute('owner-project-id')
const isConfirmDialogVisible = ref(false)
const isProjectInfoEditDialogVisible = ref(false)

const { project, getProjectId } = useProject()
const { allPropertybyProject, properties, loadingProject } = useProperty()

const searchQuery = ref()
const itemsPerPage = ref(100)
const page = ref(1)

const headers = [
  {
    title: 'Codigo',
    key: 'code',
  },
  {
    title: 'Estado',
    key: 'status',
  },
  {
    title: 'Superficie',
    key: 'surface',
  },
  {
    title: 'Precio',
    key: 'base_price',
  },
  
]

const projectData = computed(() => project.value)

const fetchProperties = () => {
  allPropertybyProject({
    itemsPerPage: itemsPerPage.value,
    page: page.value,
    search: searchQuery.value,
  }, route.params.id )
}

const fetchProject= () => {
  getProjectId(route.params.id)
}

const sumPrices = () => {
  return properties.value.reduce((total, property) => {
    return total + (property.base_price || 0)
  }, 0)
}

onMounted(() => {
  fetchProperties()
  fetchProject()
})

function formatDate(dateString) {
  if (!dateString) return ''
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  
  return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>

<template>
  <div class="d-flex justify-space-between align-center flex-wrap gap-y-4 mb-6">
    <div>
      <div class="d-flex gap-2 align-center mb-2 flex-wrap">
        <h4 class="text-h4">
          {{ project?.title }}
        </h4>         
      </div>
      <span v-if="project">
        Numero de Pisos:   {{ project?.num_pisos }}
      </span>
      <div class="gap-2 align-center mt-3 flex-wrap">
        <span>
          {{ project?.description }}
        </span>
      </div>
    </div>
    <div>
      <VBtn
        variant="tonal"
        color="info"
        @click="isProjectInfoEditDialogVisible = !isProjectInfoEditDialogVisible"
      >
        Editar
      </VBtn>
      <VBtn
        variant="tonal"
        color="error"
        @click="isConfirmDialogVisible = !isConfirmDialogVisible"
      >
        Eliminar  
      </VBtn>
    </div>
  </div>

  <VRow>
    <VCol cols="12">
      <!-- 👉 Order Details -->
      <VCard class="mb-6">
        <VCardItem>
          <template #title>
            <h5 class="text-h5">
              Propiedades del Proyecto
            </h5>
          </template>
        </VCardItem>

        <VDivider />
        <VDataTable
          :headers="headers"
          :items="properties"
          item-value="productName"
          class="text-no-wrap"
        >
          <template #item.code="{ item }">
            <span> {{ item.code }}</span>
          </template>

          <template #item.status="{ item }">
            <span> {{ item.status }}</span>
          </template>

          <template #item.base_price="{ item }">
            <span>$ {{ item.base_price }}</span>
          </template>

         

          <template #bottom />
        </VDataTable>
        <VDivider />

        <VCardText>
          <div class="d-flex align-end flex-column">
            <table class="text-high-emphasis">
              <tbody>
                <tr>
                  <td
                    class="text-high-emphasis font-weight-medium  "
                    width="100px"
                  >
                    Total:
                  </td>
                  <td
                    class="font-weight-medium "
                    style=" padding-inline: 5px 30px;"
                  >
                    $ {{ sumPrices() }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <ConfirmDialog
    v-model:is-dialog-visible="isConfirmDialogVisible"
    confirmation-question="Are you sure to cancel your Order?"
    cancel-msg="Order cancelled!!"
    cancel-title="Cancelled"
    confirm-msg="Your order cancelled successfully."
    confirm-title="Cancelled!"
  />
  <ProjectEditDialog
    v-model:is-dialog-visible="isProjectInfoEditDialogVisible" 
    :project-data="projectData"
  />
</template>
