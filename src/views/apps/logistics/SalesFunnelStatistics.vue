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

const chartColors = {
  bar: {
    series1: '#858585',
    series2: '#666666',
    series3: '#474747',
    series4: '#292929',
    series5: '#0A0A0A',
  },
}

const series = ref([
  {
    data: [
      props.data.total_leads,
      props.data.total_prospect,
      props.data.total_presales,
      props.data.total_sales,
      props.data.total_delivery,
    ],
  },
])

const config = ref({
  chart: {
    height: 270,
    type: 'bar',
    toolbar: { show: false },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '70%',
      distributed: true,
      startingShape: 'rounded',
      borderRadius: 7,
    },
  },
  labels: [
    'Oportunidad',
    'Prospecto',
    'Preventa',
    'Venta',
    'Entrega',
  ],
  colors: [
    chartColors.bar.series1,
    chartColors.bar.series2,
    chartColors.bar.series3,
    chartColors.bar.series4,
    chartColors.bar.series5,
  ],
  grid: {
    strokeDashArray: 10,
    xaxis: { lines: { show: true } },
    yaxis: { lines: { show: false } },
    padding: {
      top: -35,
      bottom: -12,
    },
  },
  dataLabels: {
    enabled: true,
    style: {
      colors: ['#fff'],
      fontWeight: 200,
      fontSize: '13px',
    },
    offsetX: 0,
    dropShadow: { enabled: false },
    formatter(val, opt) {
      return config.value.labels[opt.dataPointIndex];
    },
  },
  legend: { show: false },
  tooltip: {
    enabled: true,
    style: { fontSize: '12px' },
    onDatasetHover: { highlightDataSeries: false },
  },
  xaxis: {
    categories: ['5', '4', '3', '2', '1'],
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: {
      style: {
        colors: 'rgba(var(--v-theme-on-background), var(--v-disabled-opacity))',
        fontSize: '13px',
      },
      formatter(val) {
        return `${val}`;
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: 'rgba(var(--v-theme-on-background), var(--v-disabled-opacity))',
        fontSize: '13px',
      },
    },
  },
})

const topicsData = ref([
  {
    title: 'Oportunidad',
    value: props.data.total_leads,
    color: chartColors.bar.series1,
  },
  {
    title: 'Prospecto',
    value: props.data.total_prospect,
    color: chartColors.bar.series2,
  },
  {
    title: 'Preventa',
    value: props.data.total_presales,
    color: chartColors.bar.series3,
  },
  {
    title: 'Venta',
    value: props.data.total_sales,
    color: chartColors.bar.series4,
  },
  {
    title: 'Entrega',
    value: props.data.total_delivery,
    color: chartColors.bar.series5,
  },
])

watch(() => props.data, (newData) => {
    series.value[0].data = [
      newData.total_leads,
      newData.total_prospect,
      newData.total_presales,
      newData.total_sales,
      newData.total_delivery,
    ]

    topicsData.value = [
      { title: 'Oportunidad', value: newData.total_leads, color: chartColors.bar.series1 },
      { title: 'Prospecto', value: newData.total_prospect, color: chartColors.bar.series2 },
      { title: 'Preventa', value: newData.total_presales, color: chartColors.bar.series3 },
      { title: 'Venta', value: newData.total_sales, color: chartColors.bar.series4 },
      { title: 'Entrega', value: newData.total_delivery, color: chartColors.bar.series5 },
    ]
  },
  { deep: true }
)
</script>

<template>
      <AppCardActions
        v-model:loading="props.isLoading"
        noActions
      >
        <VCardItem title="Reporte por etapas">
        </VCardItem>
        <VCardText>
          <VRow>
            <VCol
              cols="12"
              md="12"
            >
              <div>
                <VueApexCharts
                  type="bar"
                  height="300"
                  :series="series"
                  :options="config"                  
                />
              </div>
            </VCol>
            <VCol
              cols="12"
              md="12"
            >
              <div
                class="d-flex flex-wrap gap-x-2 gap-y-4 mx-auto"
              >
                <div
                  v-for="topic in topicsData"
                  :key="topic.title"
                  class="d-flex gap-x-1"
                >
                  <VBadge
                    dot
                    inline
                    class="mt-1 custom-badge"
                    :color="topic.color"
                  />
                  <div>
                    <div
                      class="text-body-1"
                      style="min-inline-size: 90px;"
                    >
                      {{ topic.title }}
                    </div>
                    <h4 class="text-h4">
                      {{ topic.value }}
                    </h4>
                  </div>
                </div>
              </div>
            </VCol>
          </VRow>
        </VCardText>
      </AppCardActions>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>
