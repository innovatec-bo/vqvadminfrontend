<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true, 
  }
})

const headingColor = 'rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity))'
const labelColor = 'rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity))'

const chartColors = {
  donut: {
    series1: '#666666',
    series2: '#474747',
    series3: '#292929',
    series4: '#0A0A0A',
  },
}

const series = ref([
  props.data?.total_property_available,
  props.data?.total_property_sale,
  props.data?.total_property_delivery,
])

const config = ref({
  chart: {
    height: 400,
    type: 'donut',
    toolbar: { show: false },
  },
  plotOptions: {
    pie: {
      donut: {
        size: '75%',
        labels: {
          show: true,
          value: {
            fontSize: '26px',
            color: headingColor,
            fontWeight: 500,
            offsetY: -15,
            formatter(val) {
              return `${Number.parseInt(val)} Unidades`;
            },
          },
          name: { offsetY: 30 },
          total: {
            show: true,
            fontSize: '0.75rem',
            fontWeight: 400,
            label: 'Total',
            color: labelColor,
            formatter() {
              return `${props.data.total_property} Unidades`;
            },
          },
        },
      },
    },
  },
  labels: [
    'Disponibles',
    'Vendidas',
    'En entrega',
  ],
  colors: [
    chartColors.donut.series1,
    chartColors.donut.series2,
    chartColors.donut.series3,
    chartColors.donut.series4,
  ],
  grid: { padding: { top: 15 } },
  stroke: { width: 0 },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: true,
    position: 'bottom',
    offsetY: 10,
    markers: {
      width: 8,
      height: 8,
      offsetX: -3,
    },
    itemMargin: {
      horizontal: 15,
      vertical: 5,
    },
    fontSize: '13px',
    fontWeight: 400,
  },
  tooltip: { theme: 'dark' },
  responsive: [{
    breakpoint: 420,
    options: { chart: { height: 200 } },
  }],
})

// Actualiza las series y la configuración al cambiar props.data
watch(() => props.data, (newData) => {
    series.value = [
      newData?.total_property_available,
      newData?.total_property_sale,
      newData?.total_property_delivery,
    ]

    config.value.plotOptions.pie.donut.labels.total.formatter = () =>
      `${newData?.total_property} unidades`
  },
  { deep: true }
)
</script>

<template>
      <AppCardActions 
        v-model:loading="props.isLoading"
        noActions
      >
        <VCardItem title="Análisis del producto">
        </VCardItem>
        <VCardText>
          <VueApexCharts
            type="donut"
            height="400"
            :series="series"            
            :options="config"
          />
        </VCardText>
      </AppCardActions>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>
