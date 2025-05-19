<template>
  <div>
    <CategoryManager />
  </div>
</template>

<script setup>
import CategoryManager from '~/components/admin/CategoryManager.vue';

// Kiểm tra quyền admin
const auth = useAuthStore();
// if (!auth.isAdmin) {
//   navigateTo('/');
// }
</script> 