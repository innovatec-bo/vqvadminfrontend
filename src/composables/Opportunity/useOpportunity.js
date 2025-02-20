import { useCookie } from '@/@core/composable/useCookie'
import { allOpportunityKanban, changeStatus, convertOpportunityProspect, getOpportunity, updateOpportunity } from '@/services/Opportunity/opportunityService'
import { showSuccessNotification } from "@/utils/notifications"

export function useOpportunity (){
  const loadingOpportunity = ref(false)
  const error = ref(null)
  const userData = useCookie('userData').value

  const opportunity = ref({
    description: '',
    customer: {
      name: '',
      email: '',
      phone: '',
      ci: '',
    },
    stage: {
      id: '',
      name: '',
      description: '',
    },
    property: {
      id: '',
      title: '',
      code: '',
      description: '',
    },
  })

  const kanban = ref(null)
    
  const allOpportunityKanbanForUser = async () => {
    try{
      const response = await allOpportunityKanban(userData.id)

      console.log(response.data)
      kanban.value = response.data
      console.log(kanban)
    }catch(error){
      console.error(error)
    }
  }

  const getOpportunitybyId= async opportunityId => {
    try{
      const response = await getOpportunity(opportunityId)

      opportunity.value = response.data
      console.log('esta es la oportunidad: ', opportunity.value)
      
    }catch(error){
      console.error(error)
    }
  }

  const generateProspect = async (id, opportunityData) =>{
    try{
      const response = await convertOpportunityProspect(id, opportunityData)

      console.log(response)

      opportunity.value = response.data
    }catch(err){
      console.error(err)
    }finally {

    }
  }

  const changeOpportunity = async (id, opportunityData) => {
    loadingOpportunity.value = true // Establecer el estado de carga en verdadero
    try {
      const response = await updateOpportunity(id, opportunityData) // Asegúrate de que `updateOpportunity` sea una función que acepte estos argumentos

      opportunity.value = response.data // Actualizar el estado de la oportunidad
      console.log('Oportunidad actualizada: ', opportunity.value)
      showSuccessNotification('Oportunidad actualizada correctamente', 'Los detalles de la oportunidad han sido modificados.')
    } catch (err) {
      error.value = err // Capturar el error
      console.error(err)
    } finally {
      loadingOpportunity.value = false // Establecer el estado de carga en falso al final
    }
  }

  const changeStatusByOpportunity = async (id, stageId, $data) => {
    loadingOpportunity.value = true
    try {
      const response = await changeStatus(id, stageId, $data)

      console.log('Oportunidad actualizada: ', response)
      opportunity.value = response.data
      
      if(stageId!= 6 && stageId!= 7 ){
        showSuccessNotification('¡Oportunidad avanzó a una nueva etapa!')
      }else if (stageId == 7) {
        showSuccessNotification('¡Oportunidad fue completada!')
      } else {
        showSuccessNotification('¡Oportunidad fue dada de Baja!')
      }
    }catch (err){
      console.log(err)
      if(err.response && err.response.status== 500){
        showWarningNotification('Advertencia', err.response._data.message)
      }
    }finally {
      loadingOpportunity.value = false
    }
  }
  
  return {
    loadingOpportunity,
    error,
    opportunity,
    kanban,
    allOpportunityKanbanForUser,
    changeStatusByOpportunity,
    getOpportunitybyId,
    changeOpportunity,
    generateProspect,
  }
}
