import { allProjects, getProject, registerProject, updateProject } from "@/services/Realty/projectService"
import { computed } from "vue"
import { useRouter } from 'vue-router'

export function useProject() {
  const loadingProject = ref(false)
  const error = ref(null)
  const router = useRouter()
  const project = ref(null)
  const projects = ref([])
  const totalProjects = ref(0)
  const userData = useCookie('userData').value

  const getallProjects = async pagination => {
    try{
      const response = await allProjects(pagination)

      console.log(response)
  
      projects.value = response.data.data
      totalProjects.value = response.data.total
    } catch(err){
      console.log(err)
    }
  }

  const addProyect= async data => {
    loadingProject.value = true
    error.value = null
    try{
      const response =await registerProject(data)

      console.log('Respuesta del servidor:', response)
      showSuccessNotification('El proyecto se agrego correctamente', 'Se acaba de registrar un nuevo proyecto al sistema de inventario.')
      router.push('/realty/project/list-projects')
    } catch (err) {
      console.log(err)
      if(err.response && err.response.status== 422){
        showWarningNotification('Advertencia', 'Faltan Datos por Rellenar')
      }
    } finally {
      loadingProject.value = false
    }
  }

  const editProyect= async ( projectId, data) => {
    loadingProject.value = true
    error.value = null
    try{
      console.log('entro aqui')
      console.log(data, projectId)

      const response =await updateProject(projectId, data)

      console.log('Respuesta del servidor:', response)
      showSuccessNotification('Se Actualizo correctamente el Proyecto', 'El proyecto fue actualizado correctamente en el sistema.')
      router.push('/realty/project/list-projects')
    } catch (err) {
      console.log(err)
      if(err.response && err.response.status== 422){
        showWarningNotification('Advertencia', 'Faltan Datos por Rellenar')
      }
    } finally {
      loadingProject.value = false
    }
  }

  const getProjectId = async projectId => {
    loadingProject.value = true
    try{
      const response = await getProject(projectId)

      project.value= response.data
    } catch(err){
      console.log(err)
    }finally{
      loadingProject.value = false
    }
  }

  
  return {
    loadingProject,
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

