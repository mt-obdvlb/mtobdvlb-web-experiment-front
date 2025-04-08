<template>
  <div class="relative w-screen  h-screen bg-[url('@/assets/bg.png')] bg-cover bg-center">
    <div class="absolute backdrop-blur-sm z-0 inset-0 ">
      <div class="flex justify-center items-center z-10 relative h-full">
        <div class="bg-amber-50 rounded-sm shadow-xl h-100 w-150 flex ">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>