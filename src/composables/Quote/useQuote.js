import { changeStatus, getQuote, listQuotePaginate, registerQuote } from "@/services/Quote/quoteService"
import { showSuccessNotification, showWarningNotification } from "@/utils/notifications"
import { useRouter } from "vue-router"

export function useQuote() {
  const loadingQuote = ref(false)
  const quote = ref(null)
  const quotes = ref([])
  const router = useRouter()
  const totalQuotes= ref(0)

  const getQuotebyId = async id => {
    try{
      const response = await getQuote(id)

      quote.value = response.data
      console.log(quote.value)
      
    }catch(error){
      console.error(error)
    }
  }

  const generateQuote = async quoteData => {
    loadingQuote.value = true
    try {
      const response = await registerQuote(quoteData)

      console.log(response)
      quote.value = response.data
      showSuccessNotification('¡Cotización registrada exitosamente!', 'La cotización ha sido generada y registrada en el sistema. ¡Buen trabajo!')
      router.push(`/quote/${quote.value.id}`)

    }catch (err){
      if(err.response && err.response.status == 422){
        showWarningNotification('Validación fallida', 'Faltan datos por rellenar')
        
        return { success: false, message: 'Validación fallida' }
      }
      showErrorNotification('Advertencia', 'Hubo un problema al registrar la Cotizacion. Contactese con Soporte.')
      
      return { success: false, message: 'Error al Registrar' }
    }finally {
      loadingQuote.value = false
    }
  }

  const changeStatusQuotes = async (id, data )=> {
    loadingQuote.value = true
    try{
      const response = await changeStatus(id, data)

      quote.value = response.data

      console.log(response)
      showSuccessToast('¡El estado de la cotización ha cambiado! ', 'La cotización ha pasado a un nuevo estado')
    } catch (err) {
      console.log(err)
    } finally {
      loadingQuote.value = false
    }
  }

  const allQuotePaginate = async paginated =>{
    loadingQuote.value = true
    try {
      const response=await listQuotePaginate(paginated)

      console.log(response)
      quotes.value = response.data.data
      totalQuotes.value = response.data.total
    }catch (err){
      console.log(err)
    }finally{
      loadingQuote.value = false
    }
  }
  
  return {
    changeStatusQuotes,
    getQuotebyId,
    loadingQuote,
    quote,
    quotes: computed(() => quotes.value),
    totalQuotes: computed(()=> totalQuotes.value),
    generateQuote,
    allQuotePaginate,
  }
}
