import { $api } from "@/utils/api"

export const registerQuote = async quoteData => {
  return await $api('/quote/register', {
    method: 'POST',
    body: quoteData,
  })
}
