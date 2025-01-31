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
    series1: '#858585',
    series2: '#28C76F',
    series3: '#7367F0',
  },
}

const series = ref([])

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
              return `${props.data.total_property || 0} Unidades`;
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

const updateChartData = (data) => {
    series.value = [
        data.total_property_available || 0,
        data.total_property_sale || 0,
        data.total_property_delivery || 0,
    ]
}

watch(() => props.data, (newData) => {
    updateChartData(newData)
  },
  { immediate: true, deep: true }
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
