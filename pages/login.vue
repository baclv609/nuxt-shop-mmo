<script setup>
definePageMeta({ layout: "auth" });
</script>

<template>
  <div class="max-w-md w-full bg-white p-6 rounded shadow">
    <h1 class="text-2xl font-bold mb-4">Đăng nhập</h1>
    <form class="space-y-4">
      <input type="email" placeholder="Email" class="border p-2 w-full" />
      <input type="password" placeholder="Mật khẩu" class="border p-2 w-full" />
      <button class="bg-blue-600 text-white w-full py-2 rounded">Đăng nhập</button>
    </form>
    <p class="mt-4 text-sm text-center">
      Chưa có tài khoản?
      <NuxtLink to="/register" class="text-blue-500 underline">Đăng ký</NuxtLink>
    </p>
  </div>
</template>
