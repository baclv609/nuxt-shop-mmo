<template>
  <div class="h-screen flex items-center justify-center text-center">
    <div>
      <h1 class="text-6xl font-bold text-red-600 mb-4">{{ error.statusCode }}</h1>
      <p class="text-xl text-gray-600">{{ error.message }}</p>
      <NuxtLink to="/" class="text-blue-500 mt-4 block">Quay lại trang chủ</NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  error: Object,
});
</script>
