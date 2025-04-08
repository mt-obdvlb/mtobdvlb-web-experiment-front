<template>
  <div class="flex flex-col justify-center items-center bg-cover min-h-screen bg-no-repeat text-center ">
    <img src="@/assets/404.png" alt="404" class="mb-4 h-auto w-50">
    <router-link to="/" class="text-stone-900  transition duration-300 ease-in-out hover:scale-105 hover:text-stone-600">
        <p class="text-5xl font-black text-shadow-lg">找不到页面</p>
        <p class="text-lg text-shadow-lg mt-2">返回页面</p>
    </router-link>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>