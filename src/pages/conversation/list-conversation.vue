<script setup>
import { useConversation } from '@/composables/Customer/useConversation'
import ECommerceAddCustomerDrawer from '@/views/apps/ecommerce/ECommerceAddCustomerDrawer.vue'
import { paginationMeta } from '@api-utils/paginationMeta'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const searchQuery = ref('')
const isAddCustomerDrawerOpen = ref(false)
const router = useRouter()

const { allConversationsPaginate, totalConversations, conversations, updateConversationStatus } = useConversation()

// Data table options
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()

// Data table Headers
const headers = [
  {
    title: 'Celular',
    key: 'phone',
  },
  {
    title: 'Es Cliente ?',
    key: 'isCustomer',
  },
  {
    title: 'Ultimo Mensaje',
    key: 'last_message',
  },
  {
    title: 'Estado',
    key: 'ia_status',
  },
  {
    title: 'Acción',
    key: 'action',
  },
  
]

const updateOptions = options => {
  page.value = options.page
  sortBy.value = options.sortBy[0]?.key
  orderBy.value = options.sortBy[0]?.order
}

const toggleStatus = async item => {
  const newStatus = ref(0)
  if(item.ia_status){
    newStatus.value = 1
  }
  await updateConversationStatus(item.id, newStatus.value)
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

const getStatusColor = lastMessage => {
  const now = new Date()
  const lastMessageDate = new Date(lastMessage)
  const hoursDiff = (now - lastMessageDate) / (1000 * 60 * 60) // diferencia en horas

  console.log(hoursDiff)
  if (hoursDiff >=12) {
    return 'black'
  } else if (hoursDiff >=6) {
    return 'red'
  } else if (hoursDiff >= 3) {
    return 'yellow'
  } else {
    return 'green' // puedes ajustar el rango de verde si es necesario
  }
}

onMounted(async () =>{
  await allConversationsPaginate({
    page: page.value,
    itemsPerPage: itemsPerPage.value,
  })
})
</script>

<template>
  <div>
    <VCard title="Lista de Conversación con la IA">
      <VCardText>
        <div class="d-flex justify-space-between flex-wrap gap-y-4">
          <AppTextField
            v-model="searchQuery"
            style="max-inline-size: 200px; min-inline-size: 200px;"
            placeholder="Search .."
            density="compact"
          />
          <div class="d-flex flex-row gap-4 align-center flex-wrap">
            <AppSelect
              v-model="itemsPerPage"
              density="compact"
              :items="[5, 10, 20, 50, 100]"
            />
          </div>
        </div>
      </VCardText>

      <VDivider />
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :items="conversations"
        :headers="headers"
        :items-length="totalConversations"
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <template #item.phone="{ item }">
          <div class="d-flex gap-x-2">
            <!-- Enlace a WhatsApp API -->
            <a
              :href="`https://api.whatsapp.com/send?phone=591${item.phone}`"
              target="_blank"
              rel="noopener noreferrer"
              class="text-body-1"
            >
              {{ item.cod_phone }} {{ item.phone }}
            </a>
          </div>
        </template>
        <template #item.last_message="{ item }">
          <VRow class="gap-2 align-center">
            <div
              :style="{
                backgroundColor: getStatusColor(item.last_message),
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                marginRight: '4px',
              }"
            />
            <span>
              {{ formatDate(item.last_message) }}
            </span>
          </VRow>
        </template>


        <template #item.ia_status="{ item }">
          <span>
            
            {{ item.ia_status ? 'Activado' : 'No activado' }}
          </span>
        </template>

        <template #item.isCustomer="{ item }">
          <span>
            {{ item.isCustomer ? 'Sí' : 'No' }}
          </span>
        </template>
        <template #item.action="{ item }">
          <VCheckbox
            v-model="item.ia_status"
            :true-value="1"
            :false-value="0"
            @change="toggleStatus(item)"
          > 
            <VTooltip
              activator="parent"
              location="top"
            >
              {{ item.ia_status ? 'Desactivar IA': 'Activar IA' }}
            </VTooltip>
          </VCheckbox> 
        </template>
        <template #bottom>
          <VDivider />

          <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-disabled mb-0">
              {{ paginationMeta({ page, itemsPerPage }, totalConversations) }}
            </p>

            <VPagination
              v-model="page"
              :length="Math.ceil(totalConversations / itemsPerPage)"
              :total-visible="$vuetify.display.xs ? 1 : Math.min(Math.ceil(totalConversations / itemsPerPage), 5)"
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
          </div>
        </template>
      </VDataTableServer>
    </VCard>

    <ECommerceAddCustomerDrawer v-model:is-drawer-open="isAddCustomerDrawerOpen" />
  </div>
</template>

<style lang="scss" scoped>
.customer-title:hover{
  color: rgba(var(--v-theme-primary)) !important;
}
</style>
