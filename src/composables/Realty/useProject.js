import { allProjects, getProject, registerProject, updateProject } from "@/services/Realty/projectService"
import { computed } from "vue"
import { useRouter } from 'vue-router'

export function useProject() {
  const loading = ref(false)
  const error = ref(null)
  const router = useRouter()
  const project = ref(null)
  const projects = ref([])
  const totalProjects = ref(0)
  const userData = useCookie('userData').value

  const getallProjects = async pagination => {
    try{
      const defaultPagination = {
        itemsPerPage: pagination.itemsPerPage.value,
        page: pagination.page.value,
        orderBy: pagination.orderBy.value,
        sortBy: pagination.sortBy.value,
        search: pagination.q.value,
      }
  
      const response = await allProjects(defaultPagination)

      console.log(response)
  
      projects.value = response.data.data
      totalProjects.value = response.data.total
    } catch(err){
      console.log(err)
    }
  }

  const addProyect= async data => {
    loading.value = true
    error.value = null
    try{
      const response =await registerProject(data)

      console.log('Respuesta del servidor:', response)
      showSuccessNotification('CREACION EXITOSA', 'EL PROYECTO FUE REGISTRADO EXITOSAMENTE')

    } catch (err) {
      console.log(err)
      if(err.response && err.response.status== 422){
        showWarningNotification('ERROR', 'FALTAN DATOS POR RELLENAR')
      }
    } finally {
      loading.value = false
    }
  }

  const editProyect= async (data, projectId) => {
    loading.value = true
    error.value = null
    try{
      const response =await updateProject(projectId, data)

      console.log('Respuesta del servidor:', response)
      showSuccessNotification('ACTUALIZACION EXITOSA', 'EL PROYECTO FUE ACTUALIZADO EXITOSAMENTE')

    } catch (err) {
      console.log(err)
      if(err.response && err.response.status== 422){
        showWarningNotification('ERROR', 'FALTAN DATOS POR RELLENAR')
      }
    } finally {
      loading.value = false
    }
  }

  const getProjectId = async projectId => {
    try{
      const response = await getProject(projectId)

      project.value= response.data
    } catch(err){
      console.log(err)
    }
  }

  
  return {
    loading,
    error,
    addProyect,
    editProyect,
    getProjectId,
    getallProjects,
    project,
    projects: computed(()=>projects.value),
    totalProjects: computed(()=>totalProjects.value),
  }
}

