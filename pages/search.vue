<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Tìm kiếm sản phẩm</h1>
    <input
      v-model="keyword"
      placeholder="Nhập từ khóa..."
      class="border p-2 w-full mb-4"
    />
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <!-- <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      /> -->
    </div>
  </div>
</template>

<script setup>
const keyword = ref("");
// const products = await $fetch("/api/products");

// const filteredProducts = computed(() =>
//   products.filter((p) => p.name.toLowerCase().includes(keyword.value.toLowerCase()))
// );
</script>
