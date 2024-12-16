import { $api } from "@/utils/api"

export const get = async pagination => {
  return await $api(`/system-log`, {
    method: 'GET',
    params: pagination,
  })
}
