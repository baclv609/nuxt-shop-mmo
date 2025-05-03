<template>
  <div class="border rounded-2xl shadow-sm hover:shadow-lg transition p-4 cursor-pointer bg-white">
    <NuxtLink :to="`/products/${product.slug}`" class="block">
      <!-- Thêm ảnh với srcset để tối ưu hóa SEO và tốc độ tải -->
      <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover rounded-xl mb-3"
        :srcset="`${product.image}?w=600 600w, ${product.image}?w=1200 1200w`"
        sizes="(max-width: 768px) 600px, 1200px" />
      <!-- Tiêu đề sản phẩm -->
      <h2 class="text-lg font-semibold truncate mb-1">{{ product.name }}</h2>
      <!-- Mô tả sản phẩm -->
      <p class="text-gray-500 text-sm mb-2 line-clamp-2">{{ product.description }}</p>
      <!-- Giá sản phẩm -->
      <p class="text-primary text-base font-bold">
        {{ formatPrice(product.discount_price || product.original_price) }}
      </p>
      <a-button type="primary">Mua ngay</a-button>
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
});

// Hàm định dạng giá sản phẩm
const formatPrice = (price) => {
  return price.toLocaleString("vi-VN") + " ₫";
};
</script>

<style scoped>
.text-primary {
  @apply text-blue-600;
}
</style>
