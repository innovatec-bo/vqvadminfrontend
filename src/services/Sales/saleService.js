import { $api } from "@/utils/api"

export const  createSale = async saleData =>{
  return await $api('/sale', {
    method: 'POST',
    body: saleData,
  })
}

export const  createSaleChangeStage = async saleData =>{
  return await $api('/sale/changeStage', {
    method: 'POST',
    body: saleData,
  })
}

export const getSale = async id => {
  return await $api(`/sale/${id}`, {
    method: 'GET',
  })
}

export const changeStatusSale = async (id, saleData) =>{
  return await $api(`/sale/${id}/status`, {
    method: 'PATCH',
    body: saleData,
  })
}

export const changeStageSignature = async id =>{
  return await $api(`/sale/${id}/status/signature`, {
    method: 'PATCH',
  })
}

export const discardSale = async id =>{
  return await $api(`/sale/${id}/discard`, {
    method: 'PATCH',
  })
}

export const updateSale = async (id, saleData) => {
  return await $api(`/sale/${id}`, {
    method: 'PATCH',
    body: saleData,
  })
}

export const getSaleByOpportunity = async id => {
  return await $api(`/sale/opportunity/${id}`, {
    method: 'GET',
  })
}

export const listSalesPaginated = async pagination =>{
  return await $api('sales/list-paginated', {
    method: 'GET',
    params: pagination,
  })
}
