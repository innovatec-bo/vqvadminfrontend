<script setup>
import { useProject } from '@/composables/Realty/useProject'
import girlUsingMobile from '@images/pages/girl-using-mobile.png'

const searchQuery = ref('')
const { getallProjects, projects } = useProject()
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()


getallProjects({
  q: searchQuery,
  itemsPerPage,
  page,
  sortBy,
  orderBy,
})
</script>

<template>
  <VRow>
    <!-- 👉 Projects -->
    <VCol
      v-for="item in projects"
      :key="item.id"
      cols="12"
      sm="6"
      lg="4"
    >
      <VCard>
        <VCardText class="d-flex align-center pb-1">
          <span>Proyecto: </span>
          <VSpacer />
          <div class="v-avatar-group">
            <VAvatar :color="$vuetify.theme.current.dark ? '#4A5072' : '#f6f6f7'">
              <span>
                +{{ item.properties.length }}
              </span>
            </VAvatar>
          </div>
        </VCardText>

        <VCardText class="pb-5">
          <h4 class="text-h4">
            {{ item.title }}
          </h4>
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Add New Project -->
    <VCol
      cols="12"
      sm="6"
      lg="4"
    >
      <VCard
        class="h-100"
        :ripple="false"
      >
        <VRow
          no-gutters
          class="h-100"
        >
          <VCol
            cols="5"
            class="d-flex flex-column justify-end align-center mt-5"
          >
            <img
              width="85"
              :src="girlUsingMobile"
            >
          </VCol>

          <VCol cols="7">
            <VCardText class="d-flex flex-column align-end justify-end gap-2 h-100">
              <RouterLink :to="{ name: 'owner-project-register-project' }">
                <VBtn>
                  Agregar Proyecto
                </VBtn>
              </RouterLink>
              <span class="text-end">Adicionar Proyecto, Si este no existiera.</span>
            </VCardText>
          </VCol>
        </VRow>
      </VCard>
    </VCol>
  </VRow>
</template>
