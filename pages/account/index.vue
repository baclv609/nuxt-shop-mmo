<script setup>
definePageMeta({
  layout: "auth",
  middleware: ["auth"]
});
const auth = useAuthStore();
</script>

<template>
  <div class="max-w-md mx-auto bg-white p-4 rounded shadow">
    <h1 class="text-xl font-bold">Thông tin tài khoản</h1>
    <p>Họ tên: {{ auth.user?.name }}</p>
    <p>Email: {{ auth.user?.email }}</p>
  </div>
</template>

