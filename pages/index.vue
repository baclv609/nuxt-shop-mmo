<!-- pages/san-pham.vue -->
<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Sản phẩm nổi bật</h1>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 scoll-list-card">
      <product-card v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup>
import { useSeoMeta, useRuntimeConfig } from 'nuxt/app'
import { ref } from 'vue'
import productCard from '~/components/ProductCard.vue'

definePageMeta({
  layout: 'default',
})

// Lấy config từ runtime
const config = useRuntimeConfig()

// Khởi tạo danh sách sản phẩm
const products = ref([])

try {
  // Gọi API từ server (SSR)
  const fetchedProducts = await $fetch(`${config.public.apiBaseUrl}/products/user`)
  products.value = fetchedProducts || []
} catch (error) {
  console.error('Không thể lấy danh sách sản phẩm từ server:', error)
}

// Tối ưu SEO
useSeoMeta({
  title: 'Danh sách sản phẩm nổi bật - Mua bán công cụ, thiết bị',
  description: 'Khám phá các sản phẩm nổi bật như tai nghe, chuột, công cụ root Android giá tốt. Ưu đãi hấp dẫn mỗi ngày!',
  ogTitle: 'Danh sách sản phẩm nổi bật',
  ogDescription: 'Tổng hợp sản phẩm hot như tai nghe Sony, chuột Logitech, công cụ Android. Giá siêu tốt, ưu đãi flash sale!',
  ogImage: products.value[0]?.image_url || '/default-thumbnail.jpg',
  ogUrl: 'https://yourdomain.com/san-pham',
  twitterCard: 'summary_large_image',
})
</script>

<style>
.scoll-list-card {
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}
</style>
