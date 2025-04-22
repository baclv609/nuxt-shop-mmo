<script setup>
import UserTable from '~/components/admin/UserTable.vue';

definePageMeta({ layout: "admin" });
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between">
        <h1 class="text-2xl font-bold mb-4">Quản lý người dùng</h1>
        <a-button type="primary">Tạo người dùng</a-button>
    </div>
    <UserTable />
  </div>
</template>
