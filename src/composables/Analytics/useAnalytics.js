import { getLogisticsCardStatistics, getProductStatusStatistics, getSalesFunnelStatistics, getSellerSalesStatistics } from '@/services/Analytics/analyticsService';
import { ref } from 'vue';

export function useAnalytics() {
  const logisticsCardData = ref([])
  const salesFunnelData = ref([])
  const productStatusData = ref([])
  const sellerSalesData = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const fetchAnalyticsData = async (startDate, endDate) => {
    isLoading.value = true;
    error.value = null;

    try {
      const [logisticsCardRes, salesFunnelRes, productStatusRes, sellerSalesRes] = await Promise.all([
        getLogisticsCardStatistics(startDate, endDate),
        getSalesFunnelStatistics(startDate, endDate),
        getProductStatusStatistics(startDate, endDate),
        getSellerSalesStatistics(startDate, endDate),
      ]);

      logisticsCardData.value = logisticsCardRes.data
      salesFunnelData.value = salesFunnelRes.data
      productStatusData.value = productStatusRes.data
      sellerSalesData.value = sellerSalesRes.data
    } catch (err) {
      error.value = 'Error fetching analytics data.'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  };

  // Obtiene el rango del mes anterior
  const getLastMonthRange = () => {
    const now = new Date();
    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    return [firstDayLastMonth, lastDayLastMonth];
  };
  
  // Obtiene el rango del mes actual
  const getCurrentMonthRange = () => {
    const now = new Date();
    const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const today = new Date();
    return [firstDayThisMonth, today];
  };
  
  // Obtiene el rango de la última semana
  const getLastWeekRange = () => {
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    return [lastWeek, today];
  };
  
  // Obtiene el rango de los últimos 3 meses
  const getLastThreeMonthsRange = () => {
    const now = new Date();
    const firstDayThreeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1);
    const today = new Date();
    return [firstDayThreeMonthsAgo, today];
  };
  
  // Obtiene el rango desde el inicio del año hasta hoy
  const getYearToDateRange = () => {
    const now = new Date();
    const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
    const today = new Date();
    return [firstDayOfYear, today];
  };

  return {
    logisticsCardData,
    salesFunnelData,
    productStatusData,
    sellerSalesData,
    fetchAnalyticsData,
    getLastMonthRange,
    getCurrentMonthRange,
    getLastWeekRange,
    getLastThreeMonthsRange,
    getYearToDateRange,
    isLoading,
    error,
  }
}
