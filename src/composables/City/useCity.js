/* eslint-disable camelcase */
import * as cityService from '@/services/City/cityService'
import { computed, ref } from 'vue'

export function useCity()
{
  const loadingCity = ref(false)
  const error = ref(null)
  const cities = ref([])

  const totalCities = ref(0)

  const allCities = async pagination => {
    try 
    {
      const response = await cityService.allCities(pagination)

      cities.value = response.data.data
      totalCities.value = response.data.total
    } 
    catch(err)
    {
      console.log(err)
    }
  }

  return {
    loadingCity,
    error,
    allCities,
    cities: computed(() => cities.value),
    totalCities: computed(() => totalCities.value),
  }
}


