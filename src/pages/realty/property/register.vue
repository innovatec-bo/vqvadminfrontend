<script setup>
import { useProperty } from '@/composables/Realty/useProperty'
import PropertyDetails from '@/views/Realty/property/PropertyDetails.vue'
import PropertyFeature from '@/views/Realty/property/PropertyFeature.vue'
import PropertyReview from '@/views/Realty/property/PropertyReview.vue'

let isSubmitting = ref(false)

const propertyListingSteps = [
  {
    title: 'Detalle de la Propiedad',
    subtitle: 'Informacion de la propiedad',
    icon: 'tabler-home',
  },
  {
    title: 'Caracteristicas',
    subtitle: 'Beneficios del Inmuebles',
    icon: 'tabler-bookmarks',
  },
  {
    title: 'Revisar y completar',
    subtitle: 'Publicar Propiedad',
    icon: 'tabler-checkbox',
  },
]

const propertyListingData = ref({
  propertyDetails: {
    code: null,
    deliveryDate: null,
    propertyType: { value: '0', title: 'Seleccione un Tipo' },
    projectType: { value: '0', title: 'Seleccione un Tipo' },
    description: null,
    price: null,
    percentageinitialfee: null,   
  },

  propertyFeatures: {
    floor: '',
    surface: null,
    bedroomCount: '',
    bathroomCount: '',
    floorNo: '',
    featureDetails: [],
    typeDepartmentsDetails: { value: '0', title: 'Seleccione un Tipo' },
    benefitsDetails: [],
    covered: false,
    // eslint-disable-next-line camelcase
    type_department_id: null,
  },
  reviewProperty: { isPropertyConfirmed: true },
})

console.log(propertyListingData)

const { addProperty, loading, error } = useProperty()

const currentStep = ref(0)

const onSubmit = async () => {
  isSubmitting.value = true
  await addProperty(propertyListingData.value)
  isSubmitting.value = false
}
</script>

<template>
  <div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6">
    <div class="d-flex flex-column justify-center">
      <h4 class="text-h4 font-weight-medium">
        Agregar Propiedad
      </h4>
      <span>Registra tu Propiedad y vendela YA!</span>
    </div>

    <div class="d-flex gap-4 align-center flex-wrap">
      <RouterLink :to="{ name: 'realty-property-list' }">
        <VBtn
          variant="tonal"
          color="secondary"
        >
          Cancelar
        </VBtn>
      </RouterLink>
      <VBtn>
        Importar
      </VBtn>
    </div>
  </div>
  <VCard>
    <VRow no-gutters>
      <VCol
        cols="12"
        md="4"
        :class="$vuetify.display.smAndDown ? 'border-b' : 'border-e'"
      >
        <VCardText>
          <AppStepper
            v-model:current-step="currentStep"
            :items="propertyListingSteps"
            direction="vertical"
            icon-size="24"
            class="stepper-icon-step-bg"
          />
        </VCardText>
      </VCol>

      <VCol
        cols="12"
        md="8"
      >
        <VCardText>
          <VWindow
            v-model="currentStep"
            class="disable-tab-transition"
          >
            <VWindowItem>
              <PropertyDetails v-model:form-data="propertyListingData.propertyDetails" />
            </VWindowItem>
            <VWindowItem>
              <PropertyFeature 
                v-model:form-data="propertyListingData.propertyFeatures"
                :property-type="propertyListingData.propertyDetails.propertyType" 
              />
            </VWindowItem>
            <VWindowItem>
              <PropertyReview v-model:form-data="propertyListingData" />
            </VWindowItem>
          </VWindow>

          <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
            <VBtn
              color="secondary"
              variant="tonal"
              :disabled="currentStep === 0"
              @click="currentStep--"
            >
              <VIcon
                icon="tabler-arrow-left"
                start
                class="flip-in-rtl"
              />
              Volver
            </VBtn>

            <VBtn
              v-if="propertyListingSteps.length - 1 === currentStep"
              color="success"
              append-icon="tabler-check"
              :loading="isSubmitting"
              :disabled="isSubmitting"
              @click="onSubmit"
            >
              Registrar
            </VBtn>

            <VBtn
              v-else
              @click="currentStep++"
            >
              Siguiente

              <VIcon
                icon="tabler-arrow-right"
                end
                class="flip-in-rtl"
              />
            </VBtn>
          </div>
        </VCardText>
      </VCol>
    </VRow>
  </VCard>
</template>
