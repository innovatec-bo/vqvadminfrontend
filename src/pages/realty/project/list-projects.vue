<script setup>
import { useProject } from '@/composables/Realty/useProject'
import { debounce } from 'lodash'
import { ref } from 'vue'

const searchQuery = ref('')
const itemsPerPage = ref(100)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()
const hideCompleted = ref(false)
const descriptionLimit = 100 

const { getallProjects, projects, totalProjects } = useProject()

const updateOptions = options => {
  page.value = options.page

  // sortBy.value = options.sortBy[0]?.key
  // orderBy.value = options.sortBy[0]?.order
}

const AllQuote =  ()=>{
  getallProjects({
    page: page.value,
    itemsPerPage: itemsPerPage.value,
    search: searchQuery.value,
  })
}

const debouncedFetch = debounce(AllQuote, 300)

watch([searchQuery, itemsPerPage, page], debouncedFetch, { immediate: true })

watch([
  hideCompleted,
], () => {
  page.value = 1
})

// Función para cortar la descripción y agregar "Ver más"
const getTruncatedDescription = description => {
  if (description.length > descriptionLimit) {
    return description.slice(0, descriptionLimit) + '...'
  }
  
  return description
}

const toggleDescription = index => {
  const el = document.getElementById(`description-${index}`)
  if (el.classList.contains('expanded')) {
    el.classList.remove('expanded')
  } else {
    el.classList.add('expanded')
  }
}
</script>

<template>
  <VCard class="mb-6">
    <VCardText>
      <!-- 👉 Header -->
      <div class="d-flex justify-space-between align-center flex-wrap gap-4 mb-6">
        <div>
          <h5 class="text-h5" />
          <div class="text-body-1">
            En total son {{ totalProjects }} 
          </div>
        </div>

        <div class="d-flex flex-wrap align-center gap-4">
          <AppTextField
            v-model="searchQuery"
            placeholder="Buscar..."
            density="compact"
            style="min-inline-size: 200px;"
          />
          <RouterLink :to="{ name: 'realty-project-register-project' }">
            <VBtn>
              Agregar Proyecto
            </VBtn>
          </RouterLink>
        </div>
      </div>

      <!-- 👉 Course List -->
      <div class="mb-6">
        <VRow>
          <template
            v-for="(item, index) in projects"
            :key="item.id"
          >
            <VCol
              cols="12"
              md="4"
              sm="6"
            >
              <VCard
                flat
                border
                class="project-card"
              >
                <VCardText>
                  <div class="d-flex justify-space-between align-center mb-4">
                    <div class="d-flex">
                      <VIcon
                        icon="tabler-smart-home"
                        color="warning"
                        class="me-2"
                        size="20"
                      />
                      <!-- <span class="text-body-1 text-disabled font-weight-medium">({{ item.properties.length }} Propiedades)</span> -->
                    </div>
                  </div>
                  
                  <h5 class="text-h5 mb-1">
                    <RouterLink
                      :to="{ name: 'realty-project-id', params: { id: item.id } }"
                      class="course-title"
                    >
                      {{ item.title }}
                    </RouterLink> 
                  </h5>
                  <p
                    :id="`description-${index}`"
                    class="description"
                  >
                    {{ getTruncatedDescription(item.description) }}
                    <template v-if="item.description.length > descriptionLimit">
                      <VBtn
                        text
                        @click="toggleDescription(index)"
                      >
                        Ver {{ document.getElementById(`description-${index}`)?.classList.contains('expanded') ? 'menos' : 'más' }}
                      </VBtn>
                    </template>
                  </p>
                
                  <div class="d-flex flex-wrap gap-4">
                    <VBtn
                      variant="tonal"
                      color="secondary"
                      class="flex-grow-1"
                      :to="{ name: 'realty-project-id', params: { id: item.id } }"
                    >
                      <template #prepend>
                        <!--
                          <VIcon
                          icon="tabler-rotate-clockwise-2"
                          class="flip-in-rtl"
                          /> 
                        -->
                      </template>
                      Mirar Propiedades
                    </VBtn>
                  </div>
                </VCardText>
              </VCard>
            </VCol>
          </template>
        </VRow>
      </div>
      <VPagination
        v-model="page"
        :length="Math.ceil(totalProjects / itemsPerPage)"
      >
        <template #prev="slotProps">
          <VBtn
            variant="tonal"
            color="default"
            v-bind="slotProps"
            :icon="false"
          >
            Previous
          </VBtn>
        </template>
        <template #next="slotProps">
          <VBtn
            variant="tonal"
            color="default"
            v-bind="slotProps"
            :icon="false"
          >
            Next
          </VBtn>
        </template>
      </VPagination>
    </VCardText>
  </VCard>
</template>

