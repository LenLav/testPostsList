import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { AxiosResponse } from "axios"
import { instanceJsonPlaceholder } from "@/axios"
import { IUser } from "@/store/users/interfaces"

export const useUserStore = defineStore('user', () => {
  const userList = ref([] as IUser[])

  const userListMap = computed(() =>
    userList.value.reduce((acc: { [key: number]: string }, user) => {
      acc[user.id] = user.name;
      return acc;
    }, {})
  );

  async function getUserList() {
    const response: AxiosResponse<IUser[]> = await instanceJsonPlaceholder.get("/users");
    userList.value = response?.data
    return response?.data
  }

  return { 
    userList,
    userListMap,
    getUserList
  }
})