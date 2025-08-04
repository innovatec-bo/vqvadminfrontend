/* eslint-disable camelcase */
import * as categoryService from '@/services/Category/categoryService'
import { computed, ref } from 'vue'

export function useCategory()
{
  const loadingCategories = ref(false)
  const error = ref(null)
  const categories = ref([])

  const totalCategories = ref(0)

  const allCategories = async pagination => {
    try 
    {
      const response = await categoryService.allCategories(pagination)

      categories.value = response.data.data
      totalCategories.value = response.data.total
    } 
    catch(err)
    {
      console.log(err)
    }
  }

  return {
    loadingCategories,
    error,
    allCategories,
    categories,
    category: computed(() => category.value),
    totalCategories: computed(() => totalCategories.value),
  }
}


