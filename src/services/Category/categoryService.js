import { $api } from "@/utils/api"

export const allCategories = async pagination =>{
  return await $api(`/categories`, {
    method: 'GET',
    params: pagination,
  })
}
