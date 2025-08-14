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

const fetchZones = async (search = '') => {
    loadingZone.value = true
    await allZones({
      itemsPerPage: 30,
      page: 1,
      search
    })
    loadingZone.value = false
  }
  
  let ignoreNextSearch = false  
  const onFocusZones = () => {
    ignoreNextSearch = true
    fetchZones('', true)
  }

  let searchTimeout
  const onSearchZones = (search) => {
    if (ignoreNextSearch) {
      ignoreNextSearch = false
      return
    }
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      fetchZones(search, true)
    }, 1200)
  }

  return {
    loadingZone,
    error,
    allZones,
    fetchZones,
    onFocusZones,
    onSearchZones,
    zones: computed(() => zones.value),
    totalZones: computed(() => totalZones.value),
  }
}


