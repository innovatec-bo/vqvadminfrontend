<script setup>
import { useAnalytics } from '@/composables/Analytics/useAnalytics'
import { formatDate } from '@/utils/dateFormatter'
import { formatDateTime } from '@/utils/datetimeFormatter'

const { pastSellerActivityData, futureSellerActivityData, fetchPastSellerActivity, fetchFutureSellerActivity, isLoading, error } = useAnalytics()

const headingColor = 'rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity))'
const labelColor = 'rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity))'

const userData = useCookie('userData').value

const calculatePercentage = (value, total) => (total > 0 ? Math.round((value / total) * 100) : 0)

const mapTypeData = computed(() => {
  const total = futureSellerActivityData.value.total_activity || 0
  
  return [
    {
      title: 'Visita',
      tasks: futureSellerActivityData.value.total_activity_visit || 0,
      progress: calculatePercentage(futureSellerActivityData.value.total_activity_visit, total),
      color: 'primary',
    },
    {
      title: 'Llamada',
      tasks: futureSellerActivityData.value.total_activity_call || 0,
      progress: calculatePercentage(futureSellerActivityData.value.total_activity_call, total),
      color: 'success',
    },
    {
      title: 'Cotización',
      tasks: futureSellerActivityData.value.total_activity_quote || 0,
      progress: calculatePercentage(futureSellerActivityData.value.total_activity_quote, total),
      color: 'secondary',
    },
    {
      title: 'Otros',
      tasks: futureSellerActivityData.value.total_activity_other || 0,
      progress: calculatePercentage(futureSellerActivityData.value.total_activity_other, total),
      color: 'warning',
    },
  ]
})

const statusActivitiesChartSeries = computed(() => [
  pastSellerActivityData.value.total_activity_pending || 0,
  pastSellerActivityData.value.total_activity_complet || 0,
  pastSellerActivityData.value.total_activity_cancell || 0,
  pastSellerActivityData.value.total_activity_discard || 0,
])

const typeActivitiesChartSeries = computed(() => [
  pastSellerActivityData.value.total_activity_visit || 0,
  pastSellerActivityData.value.total_activity_call || 0,
  pastSellerActivityData.value.total_activity_quote || 0,
  pastSellerActivityData.value.total_activity_other || 0,
])

const statusActivitiesChartConfig = {
  chart: {
    height: 300,
    type: 'donut',
    toolbar: { show: false },
  },
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: true,
          value: {
            fontSize: '16px',
            color: headingColor,
            fontWeight: 500,
            offsetY: -15,
            formatter(val) {
              return `${Number.parseInt(val)} Actividades`
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
              return `${pastSellerActivityData.value.total_activity || 0} Actividades`
            },
          },
        },
      },
    },
  },
  labels: [
    'Pendiente',
    'Completado',
    'Cancelado',
    'Descartado',
  ],
  colors: [
    'rgb(168, 170, 174)',
    'rgb(40, 199, 111)',
    'rgb(255, 159, 67)',
    'rgb(234, 84, 85)',
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
}

const typeActivitiesChartConfig = {
  chart: {
    height: 300,
    type: 'donut',
    toolbar: { show: false },
  },
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: true,
          value: {
            fontSize: '16px',
            color: headingColor,
            fontWeight: 500,
            offsetY: -15,
            formatter(val) {
              return `${Number.parseInt(val)} Actividades`
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
              return `${pastSellerActivityData.value.total_activity || 0} Actividades`
            },
          },
        },
      },
    },
  },
  labels: [
    'Visita',
    'Llamada',
    'Cotización',
    'Otros',
  ],
  colors: [
    'rgb(0, 207, 232)',
    'rgb(40, 199, 111)',
    'rgb(168, 170, 174)',
    'rgb(255, 159, 67)',
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
}

const loadSellerActivityStatistics = () => {
  fetchPastSellerActivity("2024-01-01", formatDate(new Date()), 0, userData.id)
  fetchFutureSellerActivity(formatDateTime(new Date()), formatDate(new Date(new Date().setFullYear(new Date().getFullYear() + 1))), 0, userData.id)
}

onMounted(() => {
  loadSellerActivityStatistics()
})
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="12"
    >
      <AppCardActions no-actions>
        <VCardItem title="Actividades futuras" />
        <VCardText>
          <VRow>
            <VCol
              v-for="item in mapTypeData"
              :key="item.title"
              cols="6"
              md="3"
            >
              <div class="d-flex align-center gap-1">
                <div>
                  <VProgressCircular
                    v-model="item.progress"
                    :size="54"
                    :color="item.color"
                  >
                    <span class="text-body-1 text-high-emphasis font-weight-medium">
                      {{ item.progress }}%
                    </span>
                  </VProgressCircular>
                </div>
                <div class="d-flex flex-column">
                  <span class="text-h6 font-weight-medium">{{ item.title }}</span>
                  <span class="text-xs">
                    {{ item.tasks }} actividades
                  </span>
                </div>
              </div>
            </VCol>
          </VRow>
        </VCardText>
      </AppCardActions>
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <AppCardActions no-actions>
        <VCardItem title="Reporte por estado" />
        <VCardText>
          <VueApexCharts
            type="donut"
            height="300"
            :series="statusActivitiesChartSeries"            
            :options="statusActivitiesChartConfig"
          />
        </VCardText>
      </AppCardActions>
    </VCol>
    <VCol
      cols="12"
      md="6"
    >
      <AppCardActions no-actions>
        <VCardItem title="Reporte por tipo" />
        <VCardText>
          <VueApexCharts
            type="donut"
            height="300"
            :series="typeActivitiesChartSeries"            
            :options="typeActivitiesChartConfig"
          />
        </VCardText>
      </AppCardActions>
    </VCol>
  </VRow>
</template>

<style scoped>
.report-card {
  padding: 16px;
  margin-block-start: 20px;
}
</style>
