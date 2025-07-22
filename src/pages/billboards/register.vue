<script setup>
import { useBillboard } from '@/composables/Billboard/useBillboard'
import { useBillboardStructure } from '@/composables/BillboardStructure/useBillboardStructure'
import { useCity } from '@/composables/City/useCity'
import { useUser } from '@/composables/User/useUser'
import { useZone } from '@/composables/Zone/useZone'
import { ref } from 'vue'

const { addBillboard } = useBillboard()
const { allUsers,  users} = useUser()
const { allCities, cities } = useCity()
const { allZones, zones } = useZone()
const { allBillboardStructures, billboardStructures } = useBillboardStructure()

const name = ref('')
const location = ref('')
const city = ref(null);
const zone = ref(null);
const billboard_structure = ref(null)
const advertiser = ref(null);
const size = ref('');
const price_per_month = ref('');
const latitude = ref('');
const longitude = ref('');

allUsers({
  itemsPerPage: 100,
  page: 1,
  role: 'ANUNCIANTE'
})
allCities({
  itemsPerPage: 200,
  page: 1,
})
allZones({
  itemsPerPage: 200,
  page: 1,
})
allBillboardStructures({
  itemsPerPage: 200,
  page: 1,
})

const errors = ref({
  title: '',
  description: '',
})

const validateForm = () => {
  errors.value.name = name.value ? '' : 'El título es obligatorio.'
  errors.value.location = location.value ? '' : 'La ubicacion es obligatoria.'
  errors.value.city = city.value ? '' : 'La ciudad es obligatoria.'
  errors.value.zone = zone.value ? '' : 'La zona es obligatoria.'
  errors.value.billboard_structure = billboard_structure.value?'' : 'El tipo de estructura es obligatorio'
  errors.value.advertiser = advertiser.value?'' : 'El proveedor es obligatorio'
  errors.value.size = size.value ? '' : "El tamaño es obligatorio."
  errors.value.price_per_month = price_per_month.value ? '' : 'El precio mensual el obligatorio.'
  errors.value.latitude = latitude.value ? '' : 'La latitud es obligatoria.'
  errors.value.longitude = longitude.value ? '' : 'La longitud es obligatoria.'
  
  return !errors.value.name && 
          !errors.value.location &&
          !errors.value.city &&
          !errors.value.zone &&
          !errors.value.billboard_structure &&
          !errors.value.advertiser &&
          !errors.value.size &&
          !errors.value.price_per_month &&
          !errors.value.latitude &&
          !errors.value.longitude
}

const registerBillboard = async () => {
  console.log('saving..')
  if (validateForm()) 
  {
    addBillboard({
      name: name.value,
      location: location.value,
      city: city.value,
      zone: zone.value,
      billboard_structure: billboard_structure.value,
      advertiser: advertiser.value,
      size: size.value,
      price_per_month: price_per_month.value,
      latitude: latitude.value,
      longitude: longitude.value
    })
    console.log('sent data..')
  }
}
</script>

<template>
  <div>
    <div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6">
      <div class="d-flex flex-column justify-center">
        <h4 class="text-h4 font-weight-medium">
          Registrar billboard
        </h4>
      </div>
      <div class="d-flex gap-4 align-center flex-wrap">
        <VBtn
          variant="tonal"
          color="primary"
        >
          Cancelar
        </VBtn>
        <VBtn @click="registerBillboard">
          Registrar billboard
        </VBtn>
      </div>
    </div>

    <VRow class="justify-center">
      <VCol md="8">
        <VCard title="Informaci&oacute;n del billboard">
          <VCardText>
            <VRow>
              <VCol cols="6">
                <AppTextField
                  v-model="name"
                  label="Nombre"
                  placeholder=""
                  :error="!!errors.name"
                  :error-messages="errors.name"
                />
              </VCol>
              <VCol>
                <AppTextField
                  v-model="location"
                  label="Ubicaci&oacute;n"
                  rows="2"
                  :error="!!errors.location"
                  :error-messages="errors.location"
                />
              </VCol>
              <VCol cols="6">
                <AppAutocomplete
                  v-model="city"
                  placeholder="Elija una ciudad"
                  :items="cities"
                  label="Ciudad"
                  :item-title="item => `${item.name}, ${item.department}`"
                  :item-value="item => item"
                  persistent-hint
                  :menu-props="{ maxHeight: '200px' }"
                  :error="!!errors.city"
                  :error-messages="errors.city"
                >
                <template #append>
                  <VSlideXReverseTransition mode="out-in">
                  </VSlideXReverseTransition>
                </template>
              </AppAutocomplete>
              </VCol>
              <VCol cols="6">
                <AppAutocomplete
                  v-model="zone"
                  placeholder="Elija una zona"
                  :items="zones"
                  label="Zona"
                  item-title="name"
                  :item-value="item => item"
                  persistent-hint
                  :menu-props="{ maxHeight: '200px' }"
                  :error="!!errors.zone"
                  :error-messages="errors.zone"
                >
                <template #append>
                  <VSlideXReverseTransition mode="out-in">
                  </VSlideXReverseTransition>
                </template>
              </AppAutocomplete>
              </VCol>
              <VCol cols="6">
                <AppAutocomplete
                  v-model="billboard_structure"
                  placeholder="Elija una opcion"
                  :items="billboardStructures"
                  label="Estructura"
                  item-title="name"
                  :item-value="item => item"
                  persistent-hint
                  :menu-props="{ maxHeight: '200px' }"
                  :error="!!errors.billboard_structure"
                  :error-messages="errors.billboard_structure"
                >
                <template #append>
                  <VSlideXReverseTransition mode="out-in">
                  </VSlideXReverseTransition>
                </template>
              </AppAutocomplete>
              </VCol>
              <VCol cols="12" md="6">
                <AppAutocomplete
                  v-model="advertiser"
                  placeholder="Elija una opcion"
                  :items="users"
                  label="Proveedor"
                  :item-title="item => `${item.full_name} (${item.email})`"
                  :item-value="item => item"
                  persistent-hint
                  :menu-props="{ maxHeight: '200px' }"
                  :error="!!errors.advertiser"
                  :error-messages="errors.advertiser"
                >
                <template #append>
                  <VSlideXReverseTransition mode="out-in">
                  </VSlideXReverseTransition>
                </template>
              </AppAutocomplete>
              </VCol>
              <VCol cols="6">
                <AppTextField
                  v-model="size"
                  label="Tama&ntilde;o"
                  placeholder=""
                  :error="!!errors.size"
                  :error-messages="errors.size"
                />
              </VCol>
              <VCol cols="6">
                <AppTextField
                  v-model="price_per_month"
                  label="Precio mensual"
                  placeholder=""
                  :error="!!errors.price_per_month"
                  :error-messages="errors.price_per_month"
                />
              </VCol>
              <VCol cols="6">
                <AppTextField
                  v-model="latitude"
                  label="Latitud"
                  :error="!!errors.latitude"
                  :error-messages="errors.latitude"
                />
              </VCol>
              <VCol>
                <AppTextField
                  v-model="longitude"
                  label="Longitud"
                  :error="!!errors.longitude"
                  :error-messages="errors.longitude"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
