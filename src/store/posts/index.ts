import { defineStore } from "pinia"
import { ref } from "vue"
import { IPost } from "@/store/posts/interfaces"
import { AxiosResponse } from "axios"
import { instanceJsonPlaceholder } from "@/axios"

export const usePostStore = defineStore('post', () => {
  const postList = ref([] as IPost[])

  async function getPostList(body?: {
    userId: number[]
  }) {
    const response: AxiosResponse<IPost[]> = await instanceJsonPlaceholder.get("/posts", {params: body});
    postList.value = response?.data
    return response?.data
  }

  return { 
    postList,
    getPostList
  }
})