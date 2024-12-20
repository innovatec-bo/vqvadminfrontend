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
const borderColor = 'rgba(var(--v-border-color), var(--v-border-opacity))'

const chartColors = {
  line: {
    series1: '#858585',
    series2: '#666666',
    series3: '#474747',
    series4: '#292929',
    series5: '#0A0A0A',
  },
}

const series = ref([])

const config = ref({
  chart: {
    height: 420,
    type: 'line',
    stacked: false,
    parentHeightOffset: 0,
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  plotOptions: {
    bar: {
      columnWidth: '30%',
      startingShape: 'rounded',
      endingShape: 'rounded',
      borderRadius: 4,
    },
  },
  colors: [
    chartColors.line.series1,
    chartColors.line.series2,
    chartColors.line.series3,
    chartColors.line.series4,
    chartColors.line.series5,
  ],
  grid: {
    strokeDashArray: 8,
    borderColor,
  },
  markers: {
    size: 3,
    colors: ['#FFFFFF'],
    strokeColors: [
      chartColors.line.series1,
      chartColors.line.series2,
      chartColors.line.series3,
      chartColors.line.series4,
      chartColors.line.series5,
    ],
    hover: { size: 4 },
    borderRadius: 2,
  },
  stroke: {
    curve: 'smooth',
    width: [2, 2, 2, 2, 2],
    lineCap: 'round',
  },
  dataLabels: { enabled: false },
  legend: {
    show: true,
    position: 'bottom',
    markers: {
      width: 8,
      height: 8,
      offsetX: -3,
    },
    height: 40,
    itemMargin: {
      horizontal: 10,
      vertical: 0,
    },
    fontSize: '15px',
    fontFamily: 'Open Sans',
    fontWeight: 400,
    labels: {
      colors: headingColor,
      useSeriesColors: false,
    },
    offsetY: 10,
  },
  fill: {
    opacity: [1, 1, 1, 1, 1],
  },
  xaxis: {
    tickAmount: 10,
    categories: [],
    labels: {
      style: {
        colors: labelColor,
        fontSize: '13px',
        fontWeight: 400,
      },
    },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    labels: {
      style: {
        colors: labelColor,
        fontSize: '13px',
        fontWeight: 400,
      },
      formatter(val) {
        return `${val}`;
      },
    },
  },
  responsive: [
    {
      breakpoint: 1400,
      options: {
        chart: { height: 320 },
        xaxis: { labels: { style: { fontSize: '10px' } } },
        legend: {
          itemMargin: { vertical: 0, horizontal: 10 },
          fontSize: '13px',
          offsetY: 12,
        },
      },
    },
    {
      breakpoint: 1025,
      options: {
        chart: { height: 415 },
        plotOptions: { bar: { columnWidth: '50%' } },
      },
    },
    {
      breakpoint: 982,
      options: { plotOptions: { bar: { columnWidth: '30%' } } },
    },
    {
      breakpoint: 480,
      options: {
        chart: { height: 250 },
        legend: { offsetY: 5 },
      },
    },
  ],
})

const updateChartData = (data) => {
    if(data?.total_prospect) {
        const users = data.total_prospect?.map((item) => item.user.name)
        const leadData = data.total_prospect?.map((item) => item.lead_count)
        const prospectData = data.total_prospect?.map((item) => item.prospect_count)
        const presaleData = data.total_prospect?.map((item) => item.presale_count)
        const saleData = data.total_prospect?.map((item) => item.sale_count)
        const deliveryData = data.total_prospect?.map((item) => item.delivery_count)

        config.value.xaxis.categories = users

        series.value = [
            { name: 'Lead', type: 'column', data: leadData },
            { name: 'Prospecto', type: 'line', data: prospectData },
            { name: 'Preventa', type: 'line', data: presaleData },
            { name: 'Venta', type: 'line', data: saleData },
            { name: 'Entrega', type: 'line', data: deliveryData },
        ]
    }
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
    <VCardItem
      title="Reporte por vendedores"
    >
    </VCardItem>
    <VCardText v-if="data?.total_prospect">
      <VueApexCharts
        id="shipment-statistics"
        type="line"
        height="420"
        :series="series"
        :options="config"
      />
    </VCardText>
  </AppCardActions>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";

.v-btn-group--divided .v-btn:not(:last-child) {
  border-inline-end-color: rgba(var(--v-theme-primary), 0.5);
}

#shipment-statistics {
  .apexcharts-legend-text {
    font-size: 16px !important;
  }

  .apexcharts-legend-series {
    border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
    border-radius: 0.375rem;
    block-size: 83%;
    padding-block: 4px;
    padding-inline-end: 12px;
    padding-inline-start: 16px;
  }
}
</style>
