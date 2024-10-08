import { $microservice } from "@/utils/api"

export const createThread = async () =>{
  return await $microservice(`/openai/thread/create-thread`, {
    method: 'POST',
  })
}
