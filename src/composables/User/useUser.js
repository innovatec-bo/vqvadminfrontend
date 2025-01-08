import { getUsersPaginate } from "@/services/User/userService"

export function useUser(){
  const user = ref(null)
  const users= ref([])
  const totalUsers=ref(null)
  const loading = ref(false)
  const error = ref(null)

  const allSellerUsers = async () => {
    loading.value = true
    try {
      const response = await getUsersPaginate()

      users.value = response.data
      totalUsers.value = response.total
    } catch (error) {
      console.error(error)
      error.value = error.message
    }finally{
      loading.value = false
    }
  }

  
  return {
    allSellerUsers,
    user,
    users,
    totalUsers,
    loading,
    error,
  }
}

