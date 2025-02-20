<script setup>
import BitacoraCustomer from '@/components/bitacora/BitacoraCustomer.vue'
import { useCustomer } from '@/composables/Customer/useCustomer'
import CustomerActivity from '@/views/customer/customerActivity.vue'
import Customeropportunity from '@/views/customer/customeropportunity.vue'
import CustomerQuote from '@/views/customer/customerQuote.vue'
import CustomerSale from '@/views/customer/customerSale.vue'

const userTab = ref(null)
const route = useRoute()
const isDialogVisibleAddOpportunity = ref(false)

const {  getPerfilCutomerbyId, customer, loading } = useCustomer()

const tabs = [
  { icon: 'tabler-users', title: 'Oportunidades' },
  { icon: 'tabler-star', title: 'Actividades'  },
  { icon: 'tabler-currency-dollar', title: 'Cotizaciones'  },
  { icon: 'tabler-cash', title: 'ventas'  },
  { icon: 'tabler-table', title: 'Bitacora'  },
]

const loadCustomer = async () => {
  try {
    await getPerfilCutomerbyId(route.params.id)
  } catch (error) {
    console.error('Error al obtener al customer:', error)
  }
}

onMounted(() => {
  loadCustomer()
  console.log(customer)
})
</script>

<template>
  <VRow v-if="customer">
    <VCol
      cols="12"
      md="3"
    >
      <VCard>
        <VCardText class="text-center pt-15">
          <span class="text-5xl font-weight-medium">
            {{ avatarText(customer.customer.name) }}
          </span>
          <h6 class="text-h4 mt-4">
            {{ customer.customer.name }}
          </h6>
        </VCardText>
        <VDivider />

        <!-- 👉 Details -->
        <VCardText>
          <p class="text-sm text-uppercase text-disabled">
            Detalles
          </p>
          <VList class="card-list mt-2">
            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Nombre:
                  <span class="text-body-1">
                    {{ customer.customer.name }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Email:
                  <span class="text-body-1">{{ customer.customer.email }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Numero:
                  <span class="text-body-1">{{ customer.customer.cod_phone }}{{ customer.customer.phone }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Lugar de Trabajo:
                  <span class="text-body-1">{{ customer.customer.workplace }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Carnet:
                  <span class="text-body-1">{{ customer.customer.ci }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Tipo de Cliente:
                  <span class="text-body-1">{{ customer.customer.type_customer }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <!--
              <VBtn
              color="primary"
              title="Agregar Actividad"
              @click="isDialogVisibleAddOpportunity = true"
              >
              Agregar Oportunidad
              </VBtn> 
            -->
          </VList>
        </VCardText>
        <!-- 👉 Edit and Suspend button -->
      </VCard>
    </VCol>
    <VCol
      cols="12"
      md="9"
    >
      <VTabs
        v-model="userTab"
        class="v-tabs-pill"
      >
        <VTab
          v-for="tab in tabs"
          :key="tab.icon"
        >
          <VIcon
            :size="18"
            :icon="tab.icon"
            class="me-1"
          />
          <span>{{ tab.title }}</span>
        </VTab>
      </VTabs>

      <VWindow
        v-model="userTab"
        class="mt-6 disable-tab-transition"
        :touch="false"
      >
        <VWindowItem>
          <Customeropportunity 
            :opportunities="customer.opportunities"
            @refresh-customer="loadCustomer"
          />
        </VWindowItem>
        <VWindowItem>
          <CustomerActivity :activities="customer.activities" />
        </VWindowItem>
        <VWindowItem>
          <CustomerQuote :quotes="customer.quotes" />
        </VWindowItem>
        <VWindowItem>
          <CustomerSale
            :sales="customer.sales" 
            @refresh-customer="loadCustomer"
          />
        </VWindowItem>
        <VWindowItem>
          <BitacoraCustomer :customer="customer.customer.id" />
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
  <VCard v-else>
    <VCardTitle class="text-center">
      {{ loading ? 'Cargando' : 'Cliente no encontrado' }}
    </VCardTitle>
  </VCard>
  <!--
    <AddOportunity
    v-model:is-dialog-visible="isDialogVisibleAddOpportunity"
    :customer-object="customer"
    /> 
  -->
</template>



