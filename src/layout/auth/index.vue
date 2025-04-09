<template>
  <div class="relative min-w-screen  min-h-screen  bg-[url('@/assets/bg.png')] bg-cover bg-center">
<!--    模糊层-->
    <div class="absolute backdrop-blur-sm z-0 inset-0 "></div>
    <div class="flex justify-center items-center z-10 relative min-h-screen">
      <div class="bg-amber-50 rounded-sm shadow-xl h-100 w-1/2 max-[800px]:h-150 transition-all ease-in-out duration-500">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>