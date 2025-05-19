<!-- components/ProductCard.vue -->
<template>
  <div class="border rounded-2xl shadow-sm hover:shadow-lg transition p-4 cursor-pointer bg-white">
    <NuxtLink :to="`/san-pham/${product.slug}`" class="block">
      <img :src="product.image_url" :alt="product.alt_text || product.name"
        class="w-full h-48 object-cover rounded-xl mb-3"
        :srcset="`${product.image_url}?w=600 600w, ${product.image_url}?w=1200 1200w`"
        sizes="(max-width: 768px) 600px, 1200px" />
      <h2 class="text-lg font-semibold truncate mb-1">{{ product.name }}</h2>
      <p class="text-gray-500 text-sm mb-1 line-clamp-2">{{ product.meta_description }}</p>
      <div class="text-xs text-gray-400 mb-2 flex gap-3">
        <span>{{ product.view_count }} lượt xem</span>
        <span v-if="product.sold">{{ product.sold }} đã bán</span>
      </div>
      <p class="text-primary text-base font-bold">
        {{ formatPrice(product.flash_sale_price || product.discount_price || product.original_price) }}
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
})

const formatPrice = (price) => {
  if (!price) return 'Liên hệ';
  return parseInt(price).toLocaleString("vi-VN") + " ₫";
}
</script>

<style scoped>
.text-primary {
  @apply text-blue-600;
}
</style>
