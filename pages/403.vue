<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-red-600">403</h1>
      <p class="text-xl mt-4">Không có quyền truy cập</p>
      <p class="mt-2 text-gray-600">Bạn không có quyền để truy cập trang này</p>
      <NuxtLink 
        to="/" 
        class="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Về trang chủ
      </NuxtLink>
    </div>
  </div>
</template>