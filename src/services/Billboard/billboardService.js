import { $api } from "@/utils/api"

export const registerBillboard = async data => {
  return await $api('/billboards', {
    method: 'POST',
    body: data,
  })
}

export const getBillboardById = async id => {
  return await $api(`/billboards/${id}`, {
    method: 'GET',
  })
}

export const allBillboards = async pagination =>{
  return await $api(`/billboards`, {
    method: 'GET',
    params: pagination,
  })
}

export const updateBillboard = async (id, data)=> {
  return await $api(`/billboards/${id}`, {
    method: 'POST',
    body: data,
  })
}
