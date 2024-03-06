<script setup lang="ts">
import { usePostStore } from '@/store/posts';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/store/users';
import type { IUser } from '@/store/users/interfaces';

const postStore = usePostStore()
const { postList } = storeToRefs(postStore)

const userStore = useUserStore()
const { userList, userListMap } = storeToRefs(userStore)

let filterString = ref("")
let userIds = ref([] as number[])
let timeout = ref()
let loading = ref(false)

onMounted(() => {
  init()
})

async function init() {
  await userStore.getUserList()
  await getPostList()
}

async function getPostList() {
  await postStore.getPostList({userId: userIds.value})
}

function inputFilterString() {
  loading.value = true
  clearTimeout(timeout.value)
  timeout.value = setTimeout(async () => {
    const filterStringLowerCase = filterString.value.toLowerCase()
    userIds.value = userList.value
                    .filter((user: IUser) => user.name.toLowerCase().includes(filterStringLowerCase))
                    .map((user: IUser) => user.id)                
    await getPostList()
  loading.value = false
  }, 500)
}

</script>

<template lang="pug">
.container 
  .row.justify-content-center
    .input-group.col-12.col-md-4.col-xl-6.my-4
      .input-group-prepend
        .input-group-text
          i.bi.bi-search
      input.form-control(v-model="filterString" @input="inputFilterString" type="text" placeholder="Filter by auther...") 
  .text-center.text-muted(v-if="filterString && !userIds.length && !loading") no filter data
  .card-columns(v-else)
    .card(v-for="post in postList" :key="post.id")
      .card-body
        h5.card-title.text-primary {{ post.title }}
        p.card-text {{ post.body }}
        p.card-text(v-if="userListMap[post.userId]") 
          small.text-muted {{ userListMap[post.userId] }}

</template>

<style >

#app {
  background-color: #edf2f8;
  min-height: 100vh;
}

@media (min-width: 576px) {
  .card-columns {
    column-count: 2 !important
  }
}

@media (min-width: 768px) {
  .card-columns {
    column-count: 3 !important
  }
}

@media (min-width: 1200px) {
  .card-columns {
    column-count: 4 !important
  }
}

.input-group-prepend .input-group-text {
  background-color: white;
}

.card-text::first-letter, .card-title::first-letter {
  text-transform: uppercase
}

</style>
