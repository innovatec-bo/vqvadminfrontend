<script setup>
const props = defineProps({
  activities: {
    type: Object,
    required: true,
  },
})

const displayStage= stage => {
  if (stage === 'PENDING') {
    return 'Pendiente'
  } else if (stage === 'COMPLETED') {
    return 'Completada'
  } 
  else if (stage === 'DISCARD') {
    return 'Descartada'
  }
  else if (stage === 'CANCELLED') {
    return 'Cancelada'
  }
  
  return stage
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
</script>

<template>
  <VCard title="Activities">
    <VRow class="mx-5 my-2 ">
      <VCol
        v-for="activity in props.activities"
        :key="activity.id"
        cols="4.5"
        class="border my-2 mx-2"
      >
        <div class="d-flex justify-content-between ">
          <div style="flex-grow: 1;">
            <strong>
              {{ activity.title }}
            </strong>
          </div>
          <div>
            <strong>
              Asesor:  {{ activity.name_assigned }}
            </strong>
          </div>
        </div>      
        <span>
          {{ activity.description }}
        </span>
        
        <span
          class="d-flex align-center mt-2 "
          style="font-size: small"
        >
          <span>Creado:</span>
          <span class="ms-2"> 
            {{ formatDate(activity.created_at) }}
          </span>
        </span>
        <span
          class="d-flex align-center  "
          style="font-size: small"
        >
          <span>Programado:</span>
          <span class="ms-2"> 
            {{ formatDate(activity.scheduled_at) }}
          </span>
        </span>
       
        <div
          class="d-flex gap-x-4 justify-end mt-2 " 
          style="font-size: small"
        >
          <span class="d-flex align-center">
            <VIcon
              color="primary"
              icon="tabler-capture"
              size="18"
            />
            <strong class="ms-2"> {{ activity.type_activity }}
            </strong>
          </span>
          <span class="d-flex align-center ">
            <VIcon
              color="primary"
              icon="tabler-circle-dotted"
              size="18"
            />
            <strong class="ms-2"> {{ displayStage( activity.state_activity) }}</strong>
          </span>
        </div>
      </VCol>
    </VRow>
  </VCard>
</template>
