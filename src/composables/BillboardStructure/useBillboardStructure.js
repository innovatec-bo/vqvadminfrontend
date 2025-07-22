/* eslint-disable camelcase */
import * as billboardStructureService from '@/services/BillboardStructure/billboardStructureService'
import { computed, ref } from 'vue'

export function useBillboardStructure()
{
  const loadingBillboardStructures = ref(false)
  const error = ref(null)
  const billboardStructures = ref([])

  const totalBillboardStructures = ref(0)

  const allBillboardStructures = async pagination => {
    try 
    {
      const response = await billboardStructureService.allBillboardStructures(pagination)

      billboardStructures.value = response.data.data
      totalBillboardStructures.value = response.data.total
    } 
    catch(err)
    {
      console.log(err)
    }
  }

  return {
    loadingBillboardStructures,
    error,
    allBillboardStructures,
    billboardStructures: computed(() => billboardStructures.value),
    totalBillboardStructures: computed(() => totalBillboardStructures.value),
  }
}


