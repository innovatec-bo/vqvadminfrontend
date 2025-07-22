import { $api } from "@/utils/api"

export const allZones = async pagination =>{
  return await $api(`/zones`, {
    method: 'GET',
    params: pagination,
  })
}
