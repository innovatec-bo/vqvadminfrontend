import { $api } from "@/utils/api"

export const getLogisticsCardStatistics = async (params) => {
    return await $api(`/dashboard/general`, {
        method: 'GET',
        params: params
    })
}

export const getSalesFunnelStatistics = async (params) => {
    return await $api(`/dashboard/sale`, {
        method: 'GET',
        params: params
    })
}

export const getProductStatusStatistics = async (params) => {
    return await $api(`/dashboard/properties`, {
        method: 'GET',
        params: params
    })
}

export const getSellerSalesStatistics = async (params) => {
    return await $api(`/dashboard/seller`, {
        method: 'GET',
        params: params
    })
}

export const getSellerActivityStatistics = async (params) => {
    return await $api(`/dashboard/activities`, {
        method: 'GET',
        params: params
    })
}
