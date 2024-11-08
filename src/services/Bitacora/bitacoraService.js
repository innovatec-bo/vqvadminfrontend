import { $api } from "@/utils/api"

export const get = async id => {
  return await $api(`/customer/${id}/bitacora`, {
    method: 'GET',
  })
}
