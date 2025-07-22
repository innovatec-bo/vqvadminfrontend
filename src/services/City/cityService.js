import { $api } from "@/utils/api"

export const allCities = async pagination =>{
  return await $api(`/cities`, {
    method: 'GET',
    params: pagination,
  })
}
