<script setup>
definePageMeta({ layout: "auth" });
</script>

<template>
  <div class="max-w-md w-full bg-white p-6 rounded shadow">
    <h1 class="text-2xl font-bold mb-4">Đăng ký</h1>
    <form class="space-y-4">
      <input type="text" placeholder="Họ và tên" class="border p-2 w-full" />
      <input type="email" placeholder="Email" class="border p-2 w-full" />
      <input type="password" placeholder="Mật khẩu" class="border p-2 w-full" />
      <button class="bg-green-600 text-white w-full py-2 rounded">Đăng ký</button>
    </form>
    <p class="mt-4 text-sm text-center">
      Đã có tài khoản?
      <NuxtLink to="/login" class="text-blue-500 underline">Đăng nhập</NuxtLink>
    </p>
  </div>
</template>
