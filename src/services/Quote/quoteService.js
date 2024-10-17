import { $api } from "@/utils/api"

export const registerQuote = async quoteData => {
  return await $api('/quote/register', {
    method: 'POST',
    body: quoteData,
  })
}

export const changeStatus = async (id, data)=> {
  return await $api(`/quote/${id}/change_status`, {
    method: 'PATCH',
    body: data,
  })
}
