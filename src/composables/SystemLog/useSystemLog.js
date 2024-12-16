import { get } from "@/services/SystemLog/systemLogService"
import { useRouter } from "vue-router"

export function useSystemLog() {
  const loading = ref(false)
  const systemLog = ref([])
  const router = useRouter()
  const total= ref(0)

  const getSystemLog = async pagination  => {
    try{
      const response = await get(pagination)

      systemLog.value = response.data.data
      total.value = response.data.total
      console.log(response)
    }catch(error){
      console.error(error)
    }
  }
  
  return {
    getSystemLog,
    loading,
    total: computed(() => total.value),

    systemLog: computed(() => systemLog.value),
  }
}
