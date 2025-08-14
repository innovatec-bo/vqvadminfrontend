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

  const fetchCities = async (search = '') => {
    loadingCity.value = true
    await allCities({
      itemsPerPage: 30,
      page: 1,
      search
    })
    loadingCity.value = false
  }
  let ignoreNextSearch = false  
  const onFocusCities = () => {
    ignoreNextSearch = true
    fetchCities('', true)
  }

  let searchTimeout
  const onSearchCities = (search) => {
    if (ignoreNextSearch) {
      ignoreNextSearch = false
      return
    }
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      fetchCities(search, true)
    }, 1200)
  }

  return {
    loadingCity,
    error,
    allCities,
    fetchCities,
    onFocusCities,
    onSearchCities,
    cities: computed(() => cities.value),
    totalCities: computed(() => totalCities.value),
  }
}


