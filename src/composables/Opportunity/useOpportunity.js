import { allOpportunityKanban, getOpportunity } from '@/services/Opportunity/opportunityService'

export function useOpportunity (){
  const loading = ref(false)
  const error = ref(null)

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

    
  const allOpportunityKanbanForUser = async userId => {
    try{
      const response = await allOpportunityKanban(userId)

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

  const saveStateChange= async (state, opportunity) => {
    try{
      
    }catch(error){
      console.error(error)
    }
  }

  
  return {
    loading,
    error,
    opportunity,
    kanban,
    allOpportunityKanbanForUser,
    getOpportunitybyId,
  }
}
