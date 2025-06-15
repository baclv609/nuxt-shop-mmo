<script setup>
import UserTable from '~/components/admin/UserTable.vue';

definePageMeta({
  layout: "admin",
  middleware: ["admin"]
});
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold mb-4">Danh sách user</h1>
    </div>
    <UserTable />
  </div>
</template>
