import { registerQuote } from "@/services/Quote/quoteService"

export function useQuote() {
  const loadingQuote = ref(false)
  const quote = ref(null)
  const quotes = ref([])

  const generateQuote = async quoteData => {
    loadingQuote.value = true
    try {
      const response = await registerQuote(quoteData)

      console.log(response)

      quote.value = response.data
      
    }catch (err){
      console.error(err)
    }finally {
      loadingQuote.value = false
    }
  }

  
  return [
    loadingQuote,
    quote,
    quotes,
    generateQuote,
  ]
}
