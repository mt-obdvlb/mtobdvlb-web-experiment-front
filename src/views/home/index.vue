<template>
  <div class="flex">
    <!--    left-->
    <div class="flex-1 flex justify-center flex-col items-center">
      <h2 class="text-2xl">欢迎username</h2>
      <el-card class="mt-20">
        <img src="https://mtobdvlb-web.oss-cn-beijing.aliyuncs.com/2.png" alt="">
      </el-card>
    </div>
    <!--    right-->
    <div class="flex-2 ml-1">
      <el-calendar v-model="date"/>
    </div>
  </div>
</template>

<script setup lang="ts">


const date = ref(new Date())

</script>

<style scoped>

</style>