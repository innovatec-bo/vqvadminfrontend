import { allTypeActivities, changeStatus, completedActivity, discardActivity, get, getByAsesorFecha, getByAsesorFechaFuture, getByAsesorFechaPast, getByAsesorRangoFecha, register, update } from "@/services/Activity/activityService"
import { computed } from "vue"
import { useRouter } from 'vue-router'

export function useActivity() {
  const loadingActivity = ref(false)
  const error = ref(null)
  const activity = ref(null)
  const activities = ref([])
  const activitiesPast = ref([])
  const activitiesFuture = ref([])
  const typeActivities = ref([])
  const totalActivities = ref(0)
  const router = useRouter()

  const registerActivity= async data => {
    loadingActivity.value = true
    error.value = null
    try{
      const response =await register(data)

      activity.value= response.data
      showSuccessNotification('Cita agendada correctamente', response.data.message)
    } catch (err) {
      //todo: mejorar los mensajes de error
      console.log(err)
      if(err.response && err.response.status== 422){
        showWarningNotification('Advertencia', 'Faltan Datos por Rellenar')
      }
      error.value =  err.message
    } finally {
      loadingActivity.value = false
    }
  }

  const updateActivity= async (id, data) => {
    loadingActivity.value = true
    error.value = null
    try{
      const response =await update(id, data)

      console.log(response)
      activity.value= response.data
      showSuccessNotification('Actividad Actualizada correctamente', 'Se actualizo una actividad')
    } catch (err) {
      //todo: mejorar los mensajes de error
      console.log(err)
      if(err.response && err.response.status== 422){
        showWarningNotification('Advertencia', 'Faltan Datos por Rellenar')
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

      console.log(response)
      activity.value= response.data
      showSuccessNotification('Actividad Completada', '')
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

      activities.value = response.data
      console.log(activities)
    } catch(err){
      //todo: mejorar los mensajes de error

      error.value =  err.message
    } finally {
      loadingActivity.value = false
    }
  }

  const getallActivitiesByAsesorFecha= async asesorid  => {
    loadingActivity.value = true
    error.value = null

    const today = new Date().toISOString().split('T')[0]
    try{
      const pagination = { fecha: today }

      const response = await getByAsesorFecha(asesorid, pagination)

      activities.value = response.data
      console.log('Actividades de hoy:', activities.value)
    } catch(err){
      //todo: mejorar los mensajes de error

      error.value =  err.message
    } finally {
      loadingActivity.value = false
    }
  }

  const getallActivitiesByFechaFuture= async asesorid  => {
    loadingActivity.value = true
    error.value = null
    try{
      const response = await getByAsesorFechaFuture(asesorid)

      activitiesFuture.value = response.data
      console.log('Actividades futuras:', activitiesFuture.value)
    } catch(err){
      //todo: mejorar los mensajes de error
      error.value =  err.message
    } finally {
      loadingActivity.value = false
    }
  }

  const getallActivitiesByFechaPast= async asesorid  => {
    loadingActivity.value = true
    error.value = null
    try{
      const response = await getByAsesorFechaPast(asesorid)

      activitiesPast.value = response.data
      console.log('Actividades pasadas:', activitiesPast.value)
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

  const completedActivityAndRegister = async (idActivity, data) => {
    loadingActivity.value = true
    try{
      const response = await completedActivity(idActivity, data)

      showSuccessNotification('Nueva actividad registrada', 'Se completó la actividad anterior y se agregó una nueva.')

      console.log(response)

    }catch (err){
      //todo: mejorar los mensajes de error
      error.value =  err.message
    }finally {
      loadingActivity.value = false
    }
  }

  const discardActivityOpportunity= async idActivity => {
    loadingActivity.value = true
    try{
      const response = await discardActivity(idActivity)

      console.log(response)

    }catch (err){
      //todo: mejorar los mensajes de error
      error.value =  err.message
    }finally {
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
    getallActivitiesByFechaPast,
    getallActivitiesByFechaFuture,
    updateActivity,
    completedActivityAndRegister,
    discardActivityOpportunity,
    activity,
    activities: computed(()=>activities.value),
    activitiesPast: computed(()=>activitiesPast.value),
    activitiesFuture: computed(()=>activitiesFuture.value),
    typeActivities: computed(()=>typeActivities.value),
  }
}
