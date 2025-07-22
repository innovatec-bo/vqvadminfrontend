<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import { useUser } from '@/composables/User/useUser'
import { paginationMeta } from '@api-utils/paginationMeta'
import { debounce } from 'lodash'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const { allUsers,  users, user, totalUsers } = useUser()

const searchQuery = ref()
const itemsPerPage = ref(20)
const page = ref(1)
const isDialogEditPropertyVisible = ref(false)

const updateOptions = options => {
  page.value = options.page
  itemsPerPage.value = options.itemsPerPage
}

// Headers
const headers = [
  {
    title: 'Nombre',
    key: 'name',
  },
  {
    title: 'Apellido',
    key: 'last_name',
  },
  {
    title: 'Correo',
    key: 'email',
  },
  {
    title: 'Telefono',
    key: 'phone',
  },
  {
    title: 'Tipo de usuario',
    key: 'user_type',
  },
  {
    title: 'Estado del usuario',
    key: 'entity_status',
  },
  {
    title: 'Accion',
    key: 'actions',
    sortable: false,
  },
]

const fetchList = () => {
  allUsers({
    itemsPerPage: itemsPerPage.value,
    page: page.value,
    search: searchQuery.value,
  })
}

const debouncedFetch = debounce(fetchList, 300)

// Observar múltiples reactivos con opción immediate
watch([searchQuery, itemsPerPage, page], debouncedFetch, { immediate: true })

const resolveUserStatus = stat => {
  switch (stat) 
  {
    case 'inactive':
      return { color: 'danger', text: 'INACTIVO' }
    case 'active':
      return { color: 'success', text: 'ACTIVO' }
    default:
      return { color: 'warning', text: 'INDEFINIDO' }
  }
}

const deleteProperty = async id => {
  await removeProperty(id)
  fetchList()
}

const handleUpdateUser = async item => {
  isDialogEditPropertyVisible.value = true
  user.value = { ...item }
}

const handleUserUpdated = updatedUser => {
  const index = users.value.findIndex(p => p.id === updatedUser.id)
  if (index !== -1) {
    users.value[index] = { ...updatedUser }
  }
}


// const ExportExcell = async ()=>{
//   await exportPropertyExcel()
// }
</script>

<template>
  <section>
    <VCard>
      <VCardText class="d-flex flex-wrap gap-4">
        <div>
          <h5 class="text-h5">
            Usuarios
          </h5>
          <div class="text-body-1">
            En total son {{ totalUsers }} usuarios.
          </div>
        </div>
        <VSpacer />
        <div class="d-flex align-center flex-wrap gap-4">
          <AppSelect
            v-model="itemsPerPage"
            density="compact"
            :items="[5, 10, 20, 50, 100]"
          />
          <!-- 👉 Search  -->
          <AppTextField
            v-model="searchQuery"
            placeholder="Buscar..."
            density="compact"
            style="inline-size: 12.5rem;"
          />
          <RouterLink :to="{ name: 'users-add-user' }">
            <VBtn>
              Agregar Usuario
            </VBtn>
          </RouterLink>
        </div>
      </VCardText>
      <VDivider />

      <!-- SECTION datatable -->
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :items="users"
        :headers="headers"
        :items-length="itemsPerPage.value === -1 ? users.value.length : totalUsers"
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <template #item.phone="{ item }">
          <span>{{item.cod_phone}} {{item.phone}}</span>
        </template>
        <template #item.entity_status="{ item }">
          <VChip
            label
            size="small"
            class="text-capitalize"
            :color="resolveUserStatus(item.entity_status).color"
          >
            {{ resolveUserStatus(item.entity_status).text }}
          </VChip>
        </template>
        <template #bottom>
          <VDivider />

          <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-disabled mb-0">
              {{ paginationMeta({ page, itemsPerPage }, totalUsers) }}
            </p>

            <VPagination
              v-model="page"
              :length="Math.ceil(totalUsers / itemsPerPage)"
              :total-visible="$vuetify.display.xs ? 1 : 7"
            >
              <template #prev="slotProps">
                <VBtn
                  variant="tonal"
                  color="default"
                  v-bind="slotProps"
                  :icon="false"
                >
                  Anterior
                </VBtn>
              </template>

              <template #next="slotProps">
                <VBtn
                  variant="tonal"
                  color="default"
                  v-bind="slotProps"
                  :icon="false"
                >
                  Siguiente
                </VBtn>
              </template>
            </VPagination>
          </div>
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <IconBtn>
            <VIcon
              icon="ti ti-edit"
              @click="handleUpdateUser(item)"
            />
          </IconBtn>
        </template>
      </VDataTableServer>
      <!-- SECTION -->
    </VCard>
    <!-- <EditPropertyDialog
      v-if="billboardFace"
      v-model:is-dialog-visible="isDialogEditPropertyVisible"
      :billboardFace="billboardFace"
      @property-updated="handleUserUpdated"
    /> -->
  </section>
</template>


<style lang="scss">
.text-capitalize {
  text-transform: capitalize;
}

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));
}
</style>
