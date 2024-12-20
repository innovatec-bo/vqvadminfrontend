import { $api } from "@/utils/api"

export const getLogisticsCardStatistics = async (startDate, endDate, projectId) => {
    return await $api(`/dashboard/general`, {
        method: 'GET',
        params: { project_id: projectId, fromDate: startDate, toDate: endDate }
    })
}

export const getSalesFunnelStatistics = async (startDate, endDate, projectId) => {
    return await $api(`/dashboard/sale`, {
        method: 'GET',
        params: { project_id: projectId, fromDate: startDate, toDate: endDate }
    })
}

export const getProductStatusStatistics = async (startDate, endDate, projectId) => {
    return await $api(`/dashboard/properties`, {
        method: 'GET',
        params: { project_id: projectId, fromDate: startDate, toDate: endDate }
    })
}

export const getSellerSalesStatistics = async (startDate, endDate, projectId) => {
    return await $api(`/dashboard/seller`, {
        method: 'GET',
        params: { project_id: projectId, fromDate: startDate, toDate: endDate }
    })
}
