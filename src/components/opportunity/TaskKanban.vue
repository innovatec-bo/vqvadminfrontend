<!-- eslint-disable camelcase -->
<script setup>
import poraIcon from '@/assets/icons/poraIcon.png'
import { useActivity } from '@/composables/Activity/useActivity'
import { useOpportunity } from '@/composables/Opportunity/useOpportunity'
import { useProperty } from '@/composables/Realty/useProperty'
import { StagesOpportunity } from '@/enums/StagesOpportunity'
import { StateActivity } from '@/enums/StateActivity'
import { ref, watch } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'

const props = defineProps({
  isDialogVisible: { type: Boolean, required: true },
  opportunityKanban: { type: Object, required: true },
})

const emit = defineEmits(['update:isDialogVisible'])

const stageOptions = Object.values(StagesOpportunity).map(stage => ({
  title: stage.label,
  value: stage.value,
}))

const { allProperty, properties } = useProperty()

const { getallTypeActivities, typeActivities, registerActivity, loadingActivity, changeStatusActivity } = useActivity()
const { getOpportunitybyId, opportunity, changeOpportunity, loadingOpportunity, changeStatusByOpportunity } = useOpportunity()



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

const navigationTab = ref(tabItems.value[0].value)


// Cargar las propiedades cuando se abra el diálogo
const fetchProperties = async () => {
  await allProperty({ page: 1, itemsPerPage: 100 }) 
}

// Función para obtener todas las actividades
const allTypeActivity = async () => {
  await getallTypeActivities()
}

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


  // Agregar las tabs comunes
  tabs.push(
    { title: 'Informacion', value: 'information' },
    { title: 'Agregar Actividad', value: 'add_activity' },
    { title: 'Lista de Actividades', value: 'activity_list' },
  )

  // Actualizar el valor de tabItems
  tabItems.value = tabs
  navigationTab.value = tabItems.value[0].value
}

// Vigilar el estado del diálogo y actualizar tabItems cuando sea necesario
watch(() => props.isDialogVisible, async newValue => {
  if (newValue) {
    await fetchOpportunityData()
    updateTabItems()
    await allProperty({ page: 1, itemsPerPage: 100 })
    await getallTypeActivities()

    
  }
})
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

    <VCard class="pa-sm-8">
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
                  <VCol cols="6">
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
                  <!--
                    <VCol
                    cols="12"
                    md="6"
                    >
                    <AppSelect
                    v-model="opportunity.stage_id"
                    label="Estado del Cliente"
                    placeholder="Selecciona un Estado"
                    :items="stageOptions"
                    item-text="label"
                    item-value="value"
                    outlined
                    />
                    </VCol> 
                  -->
                  <!--
                    <VCol
                    cols="12"
                    md="6"
                    >
                    <AppSelect
                    label="Tipo de Compra"
                    placeholder="Selecciona un Tipo"
                    :items="['CONTADO', 'CREDITO DIRECTO']"
                    outlined
                    />
                    </VCol> 
                  -->
                  <!--
                    <VCol
                    cols="12"
                    md="6"
                    >
                    <AppTextField
                    label="Precio de Negociacion"
                    placeholder="Ingresa el Precio Final"
                    outlined
                    />
                    </VCol> 
                  -->
                  <!-- Descripción de la Oportunidad -->
                  <VCol cols="12">
                    <AppTextarea
                      v-model="opportunity.description"
                      label="Descripción de la Oportunidad"
                      placeholder="Ingresa una descripción"
                      rows="3"
                      auto-grow
                      outlined
                    />
                  </VCol>
                

                  <!-- Botones de Acción -->
                  <VCol
                    cols="12"
                    class="text-center"
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
                      color="secondary"
                      variant="tonal"
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
          <VCardItem>
            <VCardTitle class="text-h3 font-weight-medium mb-3">
              Agregar Actividad
            </VCardTitle>
            <VCardText>
              <VForm @submit.prevent="addActivity">
                <VRow>
                  <VCol cols="12">
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
                  <VCol cols="12">
                    <AppTextarea
                      v-model="newActivity.description"
                      label="Detalla tu Actividad"
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
                      color="secondary"
                      variant="tonal"
                      @click="dialogVisibleUpdate"
                    >
                      Cancelar
                    </VBtn>
                  </VCol>
                </VRow>
              </VForm>
            </VCardText>
          </VCardItem>
        </VWindowItem>
        <!-- Lista de Actividades -->
        <VWindowItem
          value="activity_list"
          style="max-block-size: 90vh; overflow-y: auto;"
        >
          <VCardItem>
            <VCardTitle class="text-h3 font-weight-medium mb-3">
              Lista de Actividades
            </VCardTitle>
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
          </VCardItem>
        </VWindowItem>
        <!-- Cotizaciones -->
        <VWindowItem
          value="quotations"
          style="max-block-size: 90vh; overflow-y: auto;"
        >
          <VCard>
            <VCardTitle class="d-flex justify-space-between align-center">
              <span class="text-h3 font-weight-medium">Cotizaciones</span>
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
                <VRow>
                  <VCol
                    v-for="property in sale.properties"
                    :key="property.id"
                    class="d-flex align-center justify-between"
                    cols="12"
                    md="9"
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
                    <VCol cols="12">
                      <VListItemTitle class="font-weight-medium">
                        {{ property.project_title }} | {{ property.title }}
                      </VListItemTitle>
                      <VListItemSubtitle class="text-disabled d-flex justify-between mt-1">
                        <span>$ {{ property.pivot_price }}</span>
                      </VListItemSubtitle>
                    </VCol>
                  </VCol>
                  <VCheckbox
                    v-model="sale.confirmation_signature"
                    :true-value="1"
                    :false-value="0"
                    @change="confirmationSignature(sale.id)"
                  >
                    <VTooltip
                      activator="parent"
                      location="top"
                    >
                      Confirmar firma
                    </VTooltip>
                  </VCheckbox>
                </VRow>
              </div>
            </div>
          </div>

          <!-- Anticipo -->
          <div class="mb-4">
            <span style="font-size: 14px; font-weight: 500; ">
              Anticipo
            </span> 
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
                  <th>
                    Action
                  </th>
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
                      <div 
                        v-if="item.is_paid === 0"
                        fill-dot
                        style="cursor: pointer;"
                        @click="editPaymentPlan(item)"
                      >
                        <VIcon
                
                          size="25"
                          icon="tabler-edit"
                        />
                      </div>
                    </VRow>
                  </td>
                </tr>
              </tbody>
            </VTable>
          </div>

          <!-- saldo -->
          <div>
            <span style="font-size: 14px; font-weight: 500; ">
              Saldos
            </span> 
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
                  <th>
                    Action
                  </th>
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
                      <div 
                        v-if="item.is_paid === 0"
                        fill-dot
                        style="cursor: pointer;"
                        @click="editPaymentPlan(item)"
                      >
                        <VIcon
                          size="25"
                          icon="tabler-edit"
                        />
                      </div>
                    </VRow>
                  </td>
                </tr>
              </tbody>
            </VTable>
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

          <!-- Botón pasar estado -->
          <VCardText class="d-flex  mt-4">
            <VBtn
              color="primary"
              variant="tonal"
              class="mx-auto"
              size="small"
              @click="openSaleForm"
            >
              Generar Venta
            </VBtn> 
          </VCardText>
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
  </VDialog>
</template>

