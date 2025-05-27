<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Tất cả sản phẩm</h1>
    <div v-if="pending" class="text-center py-8">
      <a-spin size="large" />
    </div>
    <div v-else-if="error" class="text-center py-8 text-red-500">
      Có lỗi xảy ra khi tải danh sách sản phẩm
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <product-card 
        v-for="product in products" 
        :key="product.id" 
        :product="product"
        @click="navigateToProduct(product.slug)"
      />
    </div>
  </div>
</template>

<script setup>
import productCard from "~/components/ProductCard.vue";
import { useRuntimeConfig } from '#imports'

definePageMeta({
  middleware: ['public']
})

const config = useRuntimeConfig()
const router = useRouter()

// Fetch products from API
const { data: products, pending, error } = await useAsyncData('products', () =>
  $fetch(`${config.public.apiBaseUrl}/products/user`)
)

// Navigate to product detail page
const navigateToProduct = (slug) => {
  router.push(`/san-pham/${slug}`)
}
</script>
