/* eslint-disable camelcase */
import * as zoneService from '@/services/Zone/zoneService'
import { computed, ref } from 'vue'

export function useZone()
{
  const loadingZone = ref(false)
  const error = ref(null)
  const zones = ref([])

  const totalZones = ref(0)

  const allZones = async pagination => {
    try 
    {
      const response = await zoneService.allZones(pagination)

      zones.value = response.data.data
      totalZones.value = response.data.total
    } 
    catch(err)
    {
      console.log(err)
    }
  }

  return {
    loadingZone,
    error,
    allZones,
    zones: computed(() => zones.value),
    totalZones: computed(() => totalZones.value),
  }
}


