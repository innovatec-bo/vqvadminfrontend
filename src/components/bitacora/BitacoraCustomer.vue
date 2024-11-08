<!-- eslint-disable camelcase -->
<script setup>
import { useBitacora } from '@/composables/Bitacora/useBitacora'
import { onMounted } from 'vue'

const props = defineProps({
  customer: { type: String, required: true },
})

const { bitacoras, getBitacorabyId } = useBitacora()

onMounted(async () => {
  await getBitacorabyId(props.customer)
})

const getActivityType = typeId => {
  switch(typeId) {
  case 1: return 'Visita'
  case 2: return 'Llamada'
  case 3: return 'Cotización'
  
  default: return 'Otro'
  }
}
</script>

<template>
  <div>
    <VCard title="Historial del cliente">
      <VCardText>
        <VRow class="d-flex justify-space-between">
          <VCol cols="12">
            <div class="my-5">
              <VTimeline
                side="end"
                align="start"
                line-inset="8"
                truncate-line="both"
                density="compact"
              >
                <VTimelineItem
                  v-for="log in bitacoras"
                  :key="log.id"
                  size="x-small"
                  dot-color="warning"
                >
                  <div class="d-flex justify-space-between align-center gap-2 flex-wrap">
                    <span class="app-timeline-title">
                      {{ log.log_name }}
                    </span>
                    <span class="app-timeline-meta">
                      {{ formatDate(log.created_at) }}
                    </span>
                  </div>
                  <div class="app-timeline-text ">
                    <p> {{ log.description }} </p>
                    <VChip v-if="log.properties.activity">                      
                      {{ getActivityType(log.properties.activity.type_activity_id) }}
                    </VChip>

                    <!-- {{ log.properties }} -->
                    <!--
                      <span v-if="log.properties.procedure">
                      </span> 
                    -->
                  </div>
                </VTimelineItem>
              </VTimeline>
              <div
                v-if="!bitacoras || bitacoras.length === 0"
                class="empty-state my-2"
              >
                <p>No hay actividades registradas para este cliente.</p>
              </div>
            </div>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </div>
</template>
