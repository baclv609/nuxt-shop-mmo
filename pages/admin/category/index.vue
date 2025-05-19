<script setup>

definePageMeta({
  layout: "admin",
  middleware: ["admin"]
});
import CategoryManager from '~/components/admin/CategoryManager.vue';


</script>

<template>
  <div class="p-4">
    <CategoryManager />
  </div>
</template>