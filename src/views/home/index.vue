<template>
  <div class="flex">
    <!--    left-->
    <div class="flex-1 flex justify-center flex-col items-center">
      <h2 class="text-2xl">欢迎{{userStore.userInfo.username}}</h2>
      <el-card class="mt-20">
        <img :src="userStore.userInfo.avatar" alt="">
      </el-card>
    </div>
    <!--    right-->
    <div class="flex-2 ml-1">
      <el-calendar v-model="date"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from "@/store/modules/user";

const userStore = useUserStore()
const date = ref(new Date())

</script>

<style scoped>

</style>