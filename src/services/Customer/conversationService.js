import { $api } from "@/utils/api"

export const  listConversationPaginate = async pagination => {
  return await $api('conversations/list-paginated', {
    method: 'GET',
    params: pagination,
  })
}

export const updateStatusConversation  = async (id, status) => {
  return await $api(`/conversations/update-status/${id}/${status}`, {
    method: 'PATCH',
  })
}

