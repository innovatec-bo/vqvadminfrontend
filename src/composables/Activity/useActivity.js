import { allTypeActivities, changeStatus, get, register } from "@/services/Activity/activityService"
import { computed } from "vue"
import { useRouter } from 'vue-router'

export function useActivity() {
  const loadingActivity = ref(false)
  const error = ref(null)
  const activity = ref(null)
  const activities = ref([])
  const typeActivities = ref([])
  const totalActivities = ref(0)
  const router = useRouter()

  const registerActivity= async data => {
    loadingActivity.value = true
    error.value = null
    try{
      const response =await register(data)

      activity.value= response.data
      showSuccessNotification('CREACION EXITOSA', 'EL PROYECTO FUE REGISTRADO EXITOSAMENTE')
    } catch (err) {
      //todo: mejorar los mensajes de error
      console.log(err)
      if(err.response && err.response.status== 422){
        showWarningNotification('ERROR', 'FALTAN DATOS POR RELLENAR')
      }
      error.value =  err.message
    } finally {
      loadingActivity.value = false
    }
  }
  
  const getActivityId = async activityId => {
    loadingActivity.value = true
    error.value = null
    try{
      const response = await get(activityId)

      activity.value= response.data
    } catch(err){
      //todo: mejorar los mensajes de error

      error.value =  err.message
    }finally{
      loadingActivity.value = false
    }
  }

  const getallTypeActivities = async ()  => {
    try{
      const response = await allTypeActivities()

      console.log(response.data)

      typeActivities.value = response.data
    } catch(err){
      //todo: mejorar los mensajes de error

      console.log(err)
    }
  }

  const changeStatusActivity= async (id, data )=> {
    loadingActivity.value = true
    error.value = null
    try{
      const response =await changeStatus(id, data)

      activity.value= response.data
    } catch (err) {
      console.log(err)
      error.value =  err.message
    } finally {
      loadingActivity.value = false
    }
  }

  const getallActivitiesByOportunity = async (oportunityId, asesorId)  => {
    loadingActivity.value = true
    error.value = null
    try{
      const response = await getByOportunity(oportunityId, asesorId)

      activities.value = response.data.data
    } catch(err){
      //todo: mejorar los mensajes de error

      error.value =  err.message
    } finally {
      loadingActivity.value = false
    }
  }

  const getallActivitiesByAsesorFecha= async (asesorid, pagination)  => {
    loadingActivity.value = true
    error.value = null
    try{
      const response = await getByAsesorFecha(asesorid, pagination)

      activities.value = response.data.data
    } catch(err){
      //todo: mejorar los mensajes de error

      error.value =  err.message
    } finally {
      loadingActivity.value = false
    }
  }

  const getallActivitiesByAsesorRangoFecha= async (asesorid, pagination)  => {
    loadingActivity.value = true
    error.value = null
    try{
      const response = await getByAsesorRangoFecha(asesorid, pagination)

      activities.value = response.data.data
    } catch(err){
      //todo: mejorar los mensajes de error

      error.value =  err.message
    } finally {
      loadingActivity.value = false
    }
  }
 
  return {
    loadingActivity,
    error,
    registerActivity,
    getActivityId,
    getallTypeActivities,
    changeStatusActivity,
    getallActivitiesByOportunity,
    getallActivitiesByAsesorFecha,
    getallActivitiesByAsesorRangoFecha,
    activity,
    activities: computed(()=>activities.value),
    typeActivities: computed(()=>typeActivities.value),
  }
}
