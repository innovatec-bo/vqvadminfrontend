<script setup>
import { useAnalytics } from '@/composables/Analytics/useAnalytics';
import { useProject } from '@/composables/Realty/useProject';
import { formatDate } from '@/utils/dateFormatter';
import LogisticsCardStatistics from '@/views/apps/logistics/LogisticsCardStatistics.vue';
import ProductStatusStatistics from '@/views/apps/logistics/ProductStatusStatistics.vue';
import SalesFunnelStatistics from '@/views/apps/logistics/SalesFunnelStatistics.vue';
import SellerSalesStatistics from '@/views/apps/logistics/SellerSalesStatistics.vue';
import { onMounted, ref } from 'vue';

const { 
  logisticsCardData,
  salesFunnelData,
  productStatusData,
  sellerSalesData,
  fetchAnalyticsData,
  getLastWeekRange,
  getLastMonthRange,
  getCurrentMonthRange,
  getLastThreeMonthsRange,
  getYearToDateRange,
  isLoading,
  error,
} = useAnalytics()
const { getallProjects, projects } = useProject()

const panel = ref(0)
const project = ref(1)
const projectList = ref([])
const selectedRange = ref('lastWeek')
const rawDateRange = ref('')
const dateRange = ref(getLastWeekRange())

const selectedRangeList = [
  { title: 'Última semana', value: 'lastWeek' },
  { title: 'Mes anterior', value: 'lastMonth' },
  { title: 'Mes actual', value: 'currentMonth' },
  { title: 'Últimos 3 meses', value: 'lastThreeMonths' },
  { title: 'Lo que va del año', value: 'yearToDate' },
  { title: 'Otro rango de fecha', value: 'dateRange' }
]

const handleFilter = () => {
  loadAnalyticsData()
}

const loadAnalyticsData = () => {
  if (dateRange?.value?.length == 2) {
    fetchAnalyticsData(formatDate(dateRange.value[0]), formatDate(dateRange.value[1]), project.value)
  }
}

watch(() => selectedRange.value, (newSelectedRange) => {
    switch (newSelectedRange) {
    case 'lastWeek':
      dateRange.value = getLastWeekRange()
      break;
    case 'lastMonth':
      dateRange.value = getLastMonthRange()
      break;
    case 'currentMonth':
      dateRange.value = getCurrentMonthRange()
      break;
    case 'lastThreeMonths':
      dateRange.value = getLastThreeMonthsRange()
      break;
    case 'yearToDate':
      dateRange.value = getYearToDateRange()
      break;
    default:
      dateRange.value = []
      rawDateRange.value = ''
  }
}, { deep: true });

onMounted(() => {
  getallProjects({ itemsPerPage: 10, page: 1 }).then(() => {
    projectList.value = [{ id: 0, title: 'TODOS' }, ...projects.value];
  });
  loadAnalyticsData()
});
</script>

<template>
  <VRow class="match-height">
    <VCol cols="12">
      <VExpansionPanels v-model="panel">
        <VExpansionPanel>
          <VExpansionPanelTitle>
            Filtro avanzado
          </VExpansionPanelTitle>
          <VExpansionPanelText>
            <VRow>
            <VCol cols="12" md="12">
              <div class="d-flex flex-wrap align-end mb-3 gap-x-5 ">
                <span style="min-inline-size: 15rem;">
                  <AppSelect
                    v-model="project"
                    label="Por proyecto"
                    placeholder="Seleccione una opción"
                    :items="projectList"
                    :item-title="item => item.title"
                    :item-value="item => item.id"
                    :config="{ position: 'auto right' }"
                  />
                </span> 
                <span style="min-inline-size: 15rem;">
                  <AppSelect
                    v-model="selectedRange"
                    label="En el tiempo"
                    placeholder="Seleccione una opción"
                    :items="selectedRangeList"
                    :config="{ position: 'auto right' }"
                  />
                </span>            
                <span 
                  v-if="selectedRange === 'dateRange'" 
                  style="min-inline-size: 15rem;"
                >
                  <AppDateTimePicker
                    v-model="rawDateRange"
                    label="Rango de fecha"
                    placeholder="Seleccione las fechas"
                    :config="{ 
                      mode: 'range', 
                      dateFormat: 'Y-m-d', 
                      maxDate: new Date(), 
                      defaultDate: dateRange,
                      onValueUpdate: (selectedDates) => { 
                        if (selectedDates?.length > 0) {
                          dateRange = selectedDates;
                        }
                    }}"
                  />
                </span>
                <VBtn type="submit" @click="handleFilter" class="clear-filter-btn">
                  Filtrar
                </VBtn>
              </div>
            </VCol>
          </VRow>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
    </VCol>

    <!-- 👉 Logistics Card Statistics -->
    <VCol cols="12">
      <LogisticsCardStatistics :data="logisticsCardData" :isLoading="isLoading" />
    </VCol>

    <!-- 👉 Sales Funnel Statistics -->
    <VCol
      cols="12"
      md="8"
    >
      <SalesFunnelStatistics :data="logisticsCardData" :isLoading="isLoading" />
    </VCol>

    <!-- 👉 Product Status Statistics -->
    <VCol
      cols="12"
      md="4"
    >
      <ProductStatusStatistics :data="productStatusData" :isLoading="isLoading" />
    </VCol> 

    <!-- 👉 Seller Sales Statistics --> 
    <VCol
      cols="12"
      md="12"
    >
      <SellerSalesStatistics :data="sellerSalesData" :isLoading="isLoading" />
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>
