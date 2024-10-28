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
export const  listQuotePaginate = async pagination => {
  return await $api('quote/list-paginated', {
    method: 'GET',
    params: pagination,
  })
}


export const getQuote = async id => {
  return await $api(`/quote/${id}`, {
    method: 'GET',
  })
}
