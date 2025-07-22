import { $api } from "@/utils/api"

export const allBillboardStructures = async pagination =>{
  return await $api(`/billboard_structures`, {
    method: 'GET',
    params: pagination,
  })
}
