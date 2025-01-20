<!-- eslint-disable camelcase -->
<script setup>
import poraIcon from '@/assets/icons/poraIcon.png'
import { useActivity } from '@/composables/Activity/useActivity'
import { useOpportunity } from '@/composables/Opportunity/useOpportunity'
import { useProcess } from '@/composables/Process/useProcess'
import { useQuote } from '@/composables/Quote/useQuote'
import { useProperty } from '@/composables/Realty/useProperty'
import { useSales } from '@/composables/Sales/useSales'
import { StagesOpportunity } from '@/enums/StagesOpportunity'
import { StateActivity } from '@/enums/StateActivity'
import { formatCurrency } from '@/utils/currencyFormatter'
import { ref, watch } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'

const props = defineProps({
  isDialogVisible: { type: Boolean, required: true },
  opportunityKanban: { type: Object, required: true },
})

const emit = defineEmits(['update:isDialogVisible', 'formCancelled'])
const { changeStatusQuotesCustomer } = useQuote()
const { checkProcessForOpportunity } = useProcess()
const { allProperty, properties, propertiesAvailbles } = useProperty()
const { getallTypeActivities, typeActivities, registerActivity, loadingActivity, changeStatusActivity } = useActivity()
const { getOpportunitybyId, opportunity, changeOpportunity, loadingOpportunity, changeStatusByOpportunity } = useOpportunity()
const { SaleChangeSignature } = useSales()

const newActivity = ref({
  title: null,
  description: null,
  type_activity_id: null,
  scheduled_at: null,
  opportunity_id: null,
  assigned_to: null,
})

const dialogVisibleUpdate = () => {
  emit('update:isDialogVisible', false)
}

const tabItems = ref([
  { title: 'Informacion', value: 'information' },
  { title: 'Agregar Actividad', value: 'add_activity' },
  { title: 'Lista de Actividades', value: 'activity_list' },
])

const displayPaymentMethod = method => {
  if (method === 'CASH') {
    return 'Al Contado'
  } else if (method === 'DIRECTCREDIT') {
    return 'Crédito Directo'
  } else if (method === 'BANKCREDIT') {
    return 'Crédito Bancario'
  }
  
  return method
}

const displayStatus = status => {
  if (status === 'SALE') {
    return 'VENDIDO'
  } else if (status === 'DISCARD') {
    return 'CANCELADO'
  } else if (status === 'DELIVERY') {
    return 'ENTREGADO'
  }
  
  return status
}

const navigationTab = ref(tabItems.value[0].value)

const fetchOpportunityData = async () => {
  if (props.opportunityKanban?.id) {
    await getOpportunitybyId(props.opportunityKanban.id)
  }
}


const addActivity = async () => {
  await registerActivity(newActivity.value)
  newActivity.value = {
    title: null,
    description: null,
    type_activity_id: null,
    scheduled_at: null,
    opportunity_id: null,
    assigned_to: null,
  }
  dialogVisibleUpdate()
}

const saveData = async () => {
  console.log('antes del save:', opportunity)

  const data = {
    id: opportunity.value.id,
    stage_id: opportunity.value.stage_id,
    description: opportunity.value.description,
    property_id: opportunity.value.property_id,
    customer: {
      id: opportunity.value.customer.id,
      name: opportunity.value.customer.name,
      email: opportunity.value.customer.email,
      ci: opportunity.value.customer.ci,
      cod_phone: opportunity.value.cod_phone,
      phone: opportunity.value.customer.phone,
      type_customer: opportunity.value.customer.type_customer,
    },
  }

  await changeOpportunity(opportunity.value.id, data)
  dialogVisibleUpdate()
}

const confirmActivity = async activityId => {
  await changeStatusActivity(activityId, {
    state_activity: StateActivity.COMPLETED.value,
  })
  dialogVisibleUpdate()
}

// Función para actualizar tabItems con el orden deseado
const updateTabItems = () => {
  const tabs = []

  // Agregar las tabs comunes
  tabs.push(
    { title: 'Informacion', value: 'information' },
    { title: 'Agregar Actividad', value: 'add_activity' },
    { title: 'Lista de Actividades', value: 'activity_list' },
  )

  // Orden deseado: Ventas, Cotizaciones, Información, Agregar Actividad, Lista de Actividades
  if (props.opportunityKanban.stage === StagesOpportunity.DELIVERY.label) {
    tabs.push({ title: 'Entrega', value: 'delivery' })
  }
  if (props.opportunityKanban.stage === StagesOpportunity.SALE.label) {
    tabs.push({ title: 'Ventas', value: 'sales' })
  }
  if (props.opportunityKanban.stage === StagesOpportunity.PRESALE.label) {
    tabs.push({ title: 'Cotizaciones', value: 'quotations' })
  }

  // Actualizar el valor de tabItems
  tabItems.value = tabs
  navigationTab.value = tabItems.value[0].value
}

// Vigilar el estado del diálogo y actualizar tabItems cuando sea necesario
watch(() => props.isDialogVisible, async newValue => {
  if (newValue) {
    await fetchOpportunityData()
    updateTabItems()

    // await allProperty({ page: 1, itemsPerPage: 100 })
    await propertiesAvailbles() 
    await getallTypeActivities()
  }
})

const statusQuoteCustomer = async (quoteId, statusquote) => {
  const newStatus = statusquote === 'APPROVED' ? 'NOT_APPROVED' : 'APPROVED'

  console.log(`Procedimiento ${quoteId} marcado como: ${statusquote}`)
  await  changeStatusQuotesCustomer(quoteId, {
    status: newStatus,
  })
}

const confirmationSignature = async saleid => {
  console.log('entra a firma')
  await SaleChangeSignature( saleid)
}

const markProcedureAsDone = async procedure => {
  console.log(`Procedimiento ${procedure.id} marcado como: ${procedure.pivot.is_check ? 'realizado' : 'no realizado'}`)
  await checkProcessForOpportunity( opportunity.value.id, procedure.id, {
    is_check: !procedure.pivot.is_check, 
  })
  procedure.pivot.is_check = !procedure.pivot.is_check
}
</script>

<template>
  <VDialog
    max-width="1000"
    :model-value="props.isDialogVisible"
    persistent
    :close-on-esc="false"
    @update:model-value="dialogVisibleUpdate"
  >
    <DialogCloseBtn @click="dialogVisibleUpdate" />
    <VCol
      cols="12"
      style="display: flex; flex-direction: column;"
    >
      <VCard class="pa-sm-4">
        <VTabs v-model="navigationTab">
          <VTab
            v-for="item in tabItems"
            :key="item.value"
            :value="item.value"
          >
            {{ item.title }}
          </VTab>
        </VTabs>

        <!-- Contenidos de las pestañas -->
        <VWindow v-model="navigationTab">
          <!-- Información -->
          <VWindowItem
            value="information"
            style="max-block-size: 90vh; overflow-y: auto;"
          >
            <VCard title="Información del Cliente y Oportunidad">
              <VCardText>
                <VForm @submit.prevent="saveData">
                  <VRow>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <AppTextField
                        v-model="opportunity.customer.name"
                        label="Nombre del Cliente"
                        placeholder="Ingresa el nombre"
                        outlined
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <AppTextField
                        v-model="opportunity.customer.email"
                        label="Email del Cliente"
                        placeholder="Ingresa el email"
                        outlined
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VRow>
                        <!-- Select para el código de país -->
                        <VCol cols="4">
                          <AppSelect
                            v-model="opportunity.customer.cod_phone"
                            label="Código"
                            :items="[
                              '+1', // Estados Unidos y Canadá
                              '+52',
                              '+55', // Brasil
                              '+54', // Argentina
                              '+49', // Alemania
                              '+33', // Francia
                              '+34', // España
                              '+39', // Italia
                              '+86', // China
                              '+81', // Japón
                              '+7', // Rusia
                              '+591' // Bolivia
                            ]"
                            placeholder="Cód."
                            outlined
                          />
                        </VCol>

                        <!-- Campo de texto para el número de teléfono -->
                        <VCol cols="8">
                          <AppTextField
                            v-model="opportunity.customer.phone"
                            label="Número de Teléfono"
                            placeholder="Ingresa el teléfono"
                            outlined
                            dense
                            maxlength="9"
                          />
                        </VCol>
                      </VRow>
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <AppTextField
                        v-model="opportunity.customer.ci"
                        label="CI del Cliente"
                        placeholder="Ingresa el CI"
                        outlined
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <AppAutocomplete
                        v-model="opportunity.property_id"
                        label="Departamento de Interés"
                        placeholder="Selecciona un Departamento"
                        :items="properties.map(property => ({title:property.title, value:property.id}))"
                        outlined
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <AppSelect
                        v-model="opportunity.customer.type_customer"
                        label="Tipo de Cliente"
                        :items="[
                          'Olvidadizo', 
                          'Familiar',
                          'Decidido',
                          'Indeciso',
                          'Exigente',
                          'Referido',
                          'Inversionista',
                          'Recuperado',
                          'Curioso',
                        ]"
                        placeholder="Tipo de Cliente"
                        outlined
                      />
                    </VCol>
                    <VCol                      
                      cols="12"
                      md="6"
                    >
                      <AppTextarea
                        v-model="opportunity.description"
                        label="Descripción de la Oportunidad"
                        placeholder="Ingresa una descripción"
                        rows="2"
                        auto-grow
                        outlined
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                      class="text-center mt-5 "
                    >
                      <VBtn
                        type="submit"
                        color="primary"
                        class="me-3"
                        :disabled="loadingOpportunity"
                        :loading="loadingOpportunity"
                      >
                        Guardar Cambios
                      </VBtn>
                      <VBtn
                        color="error"
                        @click="dialogVisibleUpdate"
                      >
                        Cancelar
                      </VBtn>
                    </VCol>
                  </VRow>
                </VForm>
              </VCardText>
            </VCard>
          </VWindowItem>
          <!-- Agregar Actividad -->
          <VWindowItem
            value="add_activity"
            style="max-block-size: 90vh; overflow-y: auto;"
          >
            <VCard title="Agregar Actividad">
              <VCardText>
                <VForm @submit.prevent="addActivity">
                  <VRow>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <AppTextField
                        v-model="newActivity.title"
                        label="Titulo de la Actividad"
                        placeholder="Escribe un Titulo"
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <AppSelect
                        v-model="newActivity.type_activity_id"
                        label="Seleccione una Actividad"
                        placeholder="Seleccione una Actividad"
                        :items="typeActivities.map(activity => ({ title: activity.name, value: activity.id }))"
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <AppDateTimePicker
                        v-model="newActivity.scheduled_at"
                        label="Fecha"
                        placeholder="Seleccione una Fecha"
                        :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <AppTextarea
                        v-model="newActivity.description"
                        label="Detalla tu Actividad"
                        rows="2"
                        placeholder="Describe la actividad"
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      class="text-center"
                    >
                      <VBtn
                        type="submit"
                        class="me-3"
                        :disabled="loadingActivity"
                        :loading="loadingActivity"
                      >
                        Agregar Actividad
                      </VBtn>
                      <VBtn
                        color="error"
                        @click="dialogVisibleUpdate"
                      >
                        Cancelar
                      </VBtn>
                    </VCol>
                  </VRow>
                </VForm>
              </VCardText>
            </VCard>
          </VWindowItem>
          <!-- Lista de Actividades -->
          <VWindowItem
            value="activity_list"
            style="max-block-size: 90vh; overflow-y: auto;"
          >
            <VCard title="Lista de Actividades">
              <VDataTable
                :headers="[
                  { title: 'Actividad', value: 'title' },
                  { title: 'Fecha', value: 'scheduled_at' },
                  { title: 'Estado', value: 'state_activity' },
                  { title: 'Descripción', value: 'description' },
                  { title: 'Acciones', value: 'actions', sortable: false }
                ]"
                :items="opportunity.activities"
                item-value="id"
                class="elevation-1"
                :items-per-page="5"
              >
                <template #[`item.actions`]="{ item }">
                  <VBtn
                    title="Marcar Como Realizada"
                    color="primary"
                    :disabled="item.state_activity !== StateActivity.PENDING.value"
                    @click="confirmActivity(item.id)"
                  >
                    <VIcon icon="tabler-checkbox" />
                  </VBtn>
                </template>
              </VDataTable>
            </VCard>
          </VWindowItem>
          <!-- Cotizaciones -->
          <VWindowItem
            value="quotations"
            style="max-block-size: 90vh; overflow-y: auto;"
          >
            <VCard>
              <VCardTitle class="d-flex justify-space-between align-center">
                <span class="text-h5 font-weight-medium">Cotizaciones</span>
                <!-- Botón para agregar nueva cotización -->
                <RouterLink
                  :to="{ name: 'quote-add-quote' }"
                  class="text-white"
                >
                  <VBtn
                    color="primary"
                    variant="outlined"
                    size="small"
                  >
                    <VIcon icon="tabler-plus" />
                    Agregar nueva cotización
                  </VBtn>
                </RouterLink>
              </VCardTitle>
              <VCardText>
                <div>
                  <!-- Tabla de cotizaciones -->
                  <div v-if="opportunity.quotes && opportunity.quotes.length > 0">
                    <VTable
                      density="compact"
                      class="text-no-wrap"
                    >
                      <thead>
                        <tr>
                          <th>Propiedad</th>
                          <th>Fecha</th>
                          <th>Monto</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in opportunity.quotes"
                          :key="item.id"
                        >
                          <!-- Propiedad -->
                          <td>{{ item.properties[0].title }}</td>
              
                          <!-- Fecha -->
                          <td>{{ item.created_at }}</td>
              
                          <!-- Monto -->
                          <td>{{ formatCurrency(item.amount) }}</td>
              
                          <!-- Acciones -->
                          <td>
                            <VRow class="d-flex align-center gap-2">
                              <!-- Checkbox de aprobación interna -->
                              <VCheckbox
                                v-model="item.status"
                                true-value="APPROVED"
                                false-value="NOT_APPROVED"
                                disabled
                              />
                  
                              <!-- Checkbox de aprobación del cliente -->
                              <VCheckbox
                                v-model="item.status_customer"
                                true-value="APPROVED"
                                false-value="NOT_APPROVED"
                                @click="statusQuoteCustomer(item.id, item.status_customer)"
                              >
                                <VTooltip
                                  activator="parent"
                                  location="top"
                                >
                                  {{
                                    item.status_customer === "NOT_APPROVED"
                                      ? "No aprobado por cliente"
                                      : "Aprobado por cliente"
                                  }}
                                </VTooltip>
                              </VCheckbox>
                  
                              <!-- Enlace para ver la cotización -->
                              <RouterLink :to="{ name: 'quote-id', params: { id: item.id } }">
                                <VBtn
                                  icon
                                  variant="plain"
                                >
                                  <VIcon icon="tabler-eye" />
                                </VBtn>
                              </RouterLink>
                            </VRow>
                          </td>
                        </tr>
                      </tbody>
                    </VTable>
                  </div>

                  <!-- Mensaje si no hay cotizaciones -->
                  <div
                    v-else
                    class="text-center my-5"
                  >
                    <span>No hay procedimientos disponibles.</span>
                  </div>
                </div>
              </VCardText>
            </VCard>
          </VWindowItem>
          <!-- Ventas -->
          <VWindowItem
            value="sales"
            style="max-block-size: 90vh; overflow-y: auto;"
          >
            <VCard title="Ventas">
              <VCardText>
                <!-- ventas -->
                <VTable
                  density="compact"
                  class="text-no-wrap my-2"
                >
                  <thead>
                    <tr>
                      <th>
                        ID
                      </th>
                      <th>
                        Metodo de Pago
                      </th>
                      <th>
                        Propiedades
                      </th>
                      <th>
                        Total
                      </th>
                      <th>
                        Estado
                      </th>
                      <th>
                        Fecha
                      </th>
                      <th>
                        Accion
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      v-for="item in opportunity.sales"
                      :key="item.id"
                    >
                      <td>
                        {{ item.id }}
                      </td>
                      <td>
                        {{ displayPaymentMethod(item.payment_method) }}
                      </td>
                      <td>
                        <div
                          v-for="property in item.properties" 
                          :key="property.id"
                          class="d-flex gap-x-2"
                        >
                          {{ property.title }} | {{ property.code }} 
                        </div>
                      </td>
                      <td>
                        {{ formatCurrency(item.amount ) }}
                      </td>
                      <td>
                        {{ displayStatus(item.status ) }}
                      </td>
                      <td>
                        {{ item.creation_date }}
                      </td>
                      <td>
                        <div class="d-flex  ">
                          <RouterLink :to="{ name: 'sale-id', params: { id: item.id } }">
                            <IconBtn>
                              <VIcon icon="tabler-eye" />
                            </IconBtn>
                          </RouterLink>
                          <VCheckbox
                            v-model="item.confirmation_signature"
                            :true-value="1"
                            :false-value="0"
                            class="my-2"
                            @change="confirmationSignature(item.id)"
                          >
                            <VTooltip
                              activator="parent"
                              location="top"
                            >
                              Confirmar firma
                            </VTooltip>
                          </VCheckbox>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </VTable>
                <!-- procesos  -->
                <div class="my-5">
                  <strong>
                    Procesos
                  </strong> 
   
                  <div
                    v-if="opportunity.procedure && opportunity.procedure.length > 0"
                    class="d-flex flex-wrap gap-2 my-5"
                  >
                    <div
                      v-for="procedure in opportunity.procedure"
                      :key="procedure.id"
                    >
                      <VChip
                        :color="procedure.pivot.is_check ? 'primary' : 'secondary'"
                        variant="outlined"
                        class="my-1"
                        style="cursor: pointer;"
                        fill-dot
                        @click="markProcedureAsDone(procedure)" 
                      >
                        <VIcon
                          v-if="procedure.pivot.is_check"
                          icon="tabler-check"
                          class="mr-2"
                        />
                        {{ procedure.title }}
                      </VChip>
                      <VTooltip
                        activator="parent"
                        location="top"
                      >
                        {{ procedure.pivot.is_check? 'Deshacer Proceso': 'Confirmar Proceso' }}
                      </VTooltip>
                    </div>
                  </div>
                  <div v-else>
                    <span>No hay procedimientos disponibles.</span>
                  </div>
                </div>

                <VRow>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <!-- Anticipo -->
                    <div class="mb-4">
                      <strong>
                        Anticipo
                      </strong> 
                      <VTable
                        v-if="opportunity.initial_payments && opportunity.initial_payments.length > 0"
                        density="compact"
                        class="text-no-wrap my-2"
                        style="font-size: 12px;"
                      >
                        <thead>
                          <tr>
                            <th>
                              Propiedad
                            </th>
                            <th>
                              Fecha
                            </th>
                            <th>
                              Monto
                            </th>
                            <th />
                          </tr>
                        </thead>
                    
                        <tbody>
                          <tr
                            v-for="item in opportunity.initial_payments"
                            :key="item.id"
                          >
                            <td>
                              {{ item.property_title }}
                            </td>
                            <td>
                              {{ item.date }}
                            </td>
                            <td>
                              {{ item.amount }}
                            </td>
                            <td>
                              <VRow>
                                <VCheckbox
                                  v-model="item.is_paid"
                                  :true-value="1"
                                  :false-value="0"
                                  :disabled="item.is_paid === 1"
                                  @change="confirmPayment(item.id)"
                                >
                                  <VTooltip
                                    activator="parent"
                                    location="top"
                                  >
                                    Confirmar Pago
                                  </VTooltip>
                                </VCheckbox>
                              </VRow>
                            </td>
                          </tr>
                        </tbody>
                      </VTable>
                    </div>
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <!-- saldo -->
                    <div>
                      <strong>
                        Saldos
                      </strong> 
                      <VTable
                        v-if="opportunity.balance_payments && opportunity.balance_payments.length > 0"
                        density="compact"
                        class="text-no-wrap my-2"
                        style="font-size: 12px;"
                      >
                        <thead>
                          <tr>
                            <th>
                              Propiedad
                            </th>
                            <th>
                              Fecha
                            </th>
                            <th>
                              Monto
                            </th>
                            <th />
                          </tr>
                        </thead>
                    
                        <tbody>
                          <tr
                            v-for="item in opportunity.balance_payments"
                            :key="item.id"
                          >
                            <td>
                              {{ item.property_title }}
                            </td>
                            <td>
                              {{ item.date }}
                            </td>
                            <td>
                              {{ item.amount }}
                            </td>
                            <td>
                              <VCheckbox
                                v-model="item.is_paid"
                                :true-value="1"
                                :false-value="0"
                                :disabled="item.is_paid === 1"
                                @change="confirmPayment(item.id)"
                              > 
                                <VTooltip
                                  activator="parent"
                                  location="top"
                                >
                                  Confirmar Pago
                                </VTooltip>
                              </VCheckbox>
                            </td>
                          </tr>
                        </tbody>
                      </VTable>
                    </div>
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VWindowItem>
          <!-- Entregas -->
          <VWindowItem
            value="delivery"
            style="max-block-size: 90vh; overflow-y: auto;"
          >
            <!-- Propiedades -->
            <div class="my-5">
              <span style="font-size: 14px; font-weight: 500;">
                Propiedades
              </span> 
              <div v-if="opportunity.sales.length > 0">
                <div
                  v-for="sale in opportunity.sales"
                  :key="sale.id"
                >
                  <div
                    v-for="property in sale.properties"
                    :key="property.id"
                    class="d-flex align-center justify-between"
                  >
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
                    <VCol
                      cols="12"
                      md="7"
                    >
                      <VListItemTitle class="font-weight-medium">
                        {{ property.project_title }} | {{ property.title }}
                      </VListItemTitle>
                      <VListItemSubtitle class="text-disabled d-flex justify-between mt-1">
                        <span> {{ formatCurrency(property.pivot_price ) }} </span>
                      </VListItemSubtitle>
                    </VCol>
                  </div>
                </div>
              </div>
            </div>
            <!-- procesos  -->
            <div class="my-5">
              <span style="font-size: 14px; font-weight: 500; ">
                Procesos
              </span> 
   
              <div
                v-if="opportunity.procedure && opportunity.procedure.length > 0"
                class="d-flex flex-wrap gap-2 my-5"
              >
                <div
                  v-for="procedure in opportunity.procedure"
                  :key="procedure.id"
                >
                  <VChip
                    :color="procedure.pivot.is_check ? 'primary' : 'secondary'"
                    variant="outlined"
                    class="my-1"
                    style="cursor: pointer;"
                    fill-dot
                    @click="markProcedureAsDone(procedure.id, procedure.pivot.is_check)" 
                  >
                    <VIcon
                      v-if="procedure.pivot.is_check"
                      icon="tabler-check"
                      class="mr-2"
                    />
                    {{ procedure.title }}
                  </VChip>
                  <VTooltip
                    activator="parent"
                    location="top"
                  >
                    {{ procedure.pivot.is_check? 'Deshacer Proceso': 'Confirmar Proceso' }}
                  </VTooltip>
                </div>
              </div>
              <div v-else>
                <span>No hay procedimientos disponibles.</span>
              </div>
            </div>

            <!-- Botón Generar Cotización -->
            <VCardText class="d-flex justify-center mt-4">
              <VBtn
                color="primary"
                size="small"
              >
                Finalizar Oportunidad
              </VBtn>
            </VCardText>
          </VWindowItem>
        </VWindow>
      </VCard>
    </VCol>
  </VDialog>
</template>


