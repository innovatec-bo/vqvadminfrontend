<script setup>
const currentActiveTab = ref('New')

/*
nombre del proyecto
codigo del departamento
precio
estado de la oportunidad
nombre de la oportunidad
actividad, fecha propgramada de la actividad. 

*/
const orders = [
  {
    tabName: 'Hoy',
    icon: 'tabler-edit',
    timeline1: [
     
    ],
    timeline2: [
    
    ],
  },
  {
    tabName: 'Anteriores',
    icon: 'tabler-calendar',
    timeline1: [
      {
        icon: 'tabler-circle-check',
        type: 'SENDER',
        name: 'Barry Schowalter',
        address: '939 Orange, California(CA),92118',
      },
      {
        icon: 'tabler-map-pin',
        type: 'RECEIVER',
        name: 'Myrtle Ullrich',
        address: '101 Boulder, California(CA), 95959',
      },
    ],
    timeline2: [
      {
        icon: 'tabler-circle-check',
        type: 'SENDER',
        name: 'Veronica Herman',
        address: '162 Windsor, California(CA), 95492',
      },
      {
        icon: 'tabler-map-pin',
        type: 'RECEIVER',
        name: 'Helen Jacobs',
        address: '487 Sunset, California(CA), 94043',
      },
    ],
  },
 
]

const moreList = [
  {
    title: 'Refresh',
    value: 'refresh',
  },
  {
    title: 'Download',
    value: 'Download',
  },
  {
    title: 'View All',
    value: 'View All',
  },
]
</script>

<template>
  <VRow>
    <VCard title="Lista de Actividades">
      <template #append>
        <div class="mt-n4 me-n2">
          <MoreBtn :menu-list="moreList" />
        </div>
      </template>
  
      <VTabs
        v-model="currentActiveTab"
        grow
      >
        <VTab
          v-for="order in orders"
          :key="order.tabName"
        >
          <VIcon
            size="20"
            :icon="order.icon"
          />
          {{ order.tabName }}
        </VTab>
      </VTabs>
  
      <VCardText>
        <VWindow
          v-model="currentActiveTab"
          class="disable-tab-transition"
        >
          <VWindowItem
            v-for="order in orders"
            :key="order.tabName"
            :value="order.tabName"
          >
            <div
              v-for="item in order.timeline1"
              :key="item.icon"
            >
              <VAvatar
                size="40"
                rounded
              >
                <img
                  :src="poraIcon"
                  alt="Logo pora"
                  style="border-radius: 30%;"
                >
              </VAvatar>

              <!-- Nombre del proyecto y código del departamento -->
              <div class="project-info">
                <h3 class="project-name">
                  {{ item.project }}
                </h3>
                <h4 class="department-code">
                  {{ item.property || 'Sin código' }} <!-- Aquí agregué un valor por defecto -->
                </h4>
              </div>

              <!-- Precio alineado a la derecha -->
              <p class="price">
                <strong>{{ item.price }}$</strong>
              </p>
            </div>
          </VWindowItem>
        </VWindow>
      </VCardText>
    </VCard>
  </VRow>
</template>
