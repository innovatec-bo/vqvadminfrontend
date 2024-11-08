import { get } from "@/services/Bitacora/bitacoraService"
import { useRouter } from "vue-router"

export function useBitacora() {
  const loadingBitacora = ref(false)
  const bitacoras = ref([])
  const router = useRouter()
  const totalbitacora= ref(0)

  const getBitacorabyId = async id => {
    try{
      const response = await get(id)

      bitacoras.value = response
      console.log(response)
    }catch(error){
      console.error(error)
    }
  }
  
  return {
    getBitacorabyId,
    loadingBitacora,

    bitacoras: computed(() => bitacoras.value),

  }
}
