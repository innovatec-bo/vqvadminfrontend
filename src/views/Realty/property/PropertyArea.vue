<script setup>
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
  propertyType: {
    type: [String, Number],
    required: false,
  },
})


const emit = defineEmits(['update:formData'])
const map = ref(null)
const marker = ref(null)
const formData = ref(props.formData)

watch(formData, () => {
  emit('update:formData', formData.value)
})

const initializeMap = () => {
  // Crear la instancia del mapa y asignarla a la referencia 'map'
  map.value = new google.maps.Map(document.getElementById('mapContainer'), {
    center: { lat: -17.766893, lng: -63.1965114 },
    zoom: 15,
  })

  const geocoder = new google.maps.Geocoder()

  // Agregar un listener para clicks en el mapa
  map.value.addListener('click', event => {
    const { lat, lng } = event.latLng.toJSON()

    console.log('Latitud:', lat, 'Longitud:', lng)

    if (marker.value) {
      marker.value.setPosition(event.latLng)
    } else {
      marker.value = new google.maps.Marker({
        position: event.latLng,
        map: map.value,
      })
    }
    formData.value.latitud = lat
    formData.value.longitud = lng
    console.log(formData)

    // Realizar la solicitud de geocoding
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      console.log(results)
      if (status === 'OK' && results[0]) {
        console.log('Address:', results[0].formatted_address)
        address.value = results[0].formatted_address
        formData.value.address = results[0].formatted_address  // Actualizar la dirección en formData
      } else {
        console.error('Geocoding failed:', status)
      }
    })
  })
}

const loadGoogleMapsScript = () => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve()
      
      return
    }
    const script = document.createElement('script')

    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD9GBheVzANbK5ORaYfsmqk3R4mNJPGs-0&callback=initMap`
    script.async = true
    script.defer = true
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

onMounted(async () => {
  window.initMap = initializeMap
  try {
    await loadGoogleMapsScript()
    initializeMap()
  } catch (error) {
    console.error('Error loading Google Maps script:', error)
  }
})
</script>

<template>
  <VForm>
    <VRow>
      <VCol cols="12">
        <h3 class="text-center">
          DIRECCION Y TERRENO
        </h3>
      </VCol>
      <VCol cols="12">
        <!-- 👉 Description -->
        <AppTextField
          v-model="formData.surface"
          label="Tamaño del Terreno"
          suffix="(m²)"
          type="number"
          placeholder="..."
          :rules="[requiredValidator]"
        />
        <AppTextarea
          v-model="formData.address"
          label="Direccion del inmueble"
          rows="3"
          :rules="[requiredValidator]"
        />
      </VCol>
    </VRow>
  </VForm>
  <!-- Agregar separación -->
  <div style="margin-block-end: 20px;" />
  <label>Marca la Ubicacion de la Casa en el Mapa:</label>
  <VLayout class="fleet-app-layout">
    <VMain>
      <div class="h-100">
        <!-- 👉 Fleet map  -->
        <div
          id="mapContainer"
          class="basemap"
        />
      </div>
    </VMain>
  </VLayout>
</template>

<style lang="scss">
@use "@styles/variables/vuetify.scss";
@use "@core/scss/base/mixins.scss";

.fleet-app-layout {
  border-radius: vuetify.$card-border-radius;

  @include mixins.elevation(vuetify.$card-elevation);

  $sel-fleet-app-layout: &;

  @at-root {
    .skin--bordered {
      @include mixins.bordered-skin($sel-fleet-app-layout);
    }
  }
}

.navigation-toggle-btn {
  position: absolute;
  z-index: 1;
  inset-block-start: 1rem;
  inset-inline-start: 1rem;
}

.navigation-close-btn {
  position: absolute;
  z-index: 1;
  inset-block-start: 1rem;
  inset-inline-end: 1rem;
}

.basemap {
  block-size: 100%;
  inline-size: 100%;
}

.marker-focus {
  filter: drop-shadow(0 0 7px rgb(var(--v-theme-primary)));
}

.mapboxgl-ctrl-bottom-left,
.mapboxgl-ctrl-bottom-right {
  display: none;
}

.fleet-navigation-drawer {
  .v-timeline .v-timeline-divider__dot .v-timeline-divider__inner-dot {
    box-shadow: none;
  }
}

/* stylelint-disable-next-line selector-id-pattern */
#mapContainer {
  block-size: 40vh !important;
}
</style>
