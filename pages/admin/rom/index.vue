<script setup>
import TableRom from '~/components/admin/rom/TableRom.vue';

definePageMeta({ 
  layout: "admin",
  middleware: ["admin"]
});
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold mb-4">Quản lý Rom</h1>
      <a-button type="primary">Thêm mới</a-button>
    </div>
    <TableRom />
  </div>
</template>
