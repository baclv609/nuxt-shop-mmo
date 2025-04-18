<template>
  <div
    class="border rounded-2xl shadow-sm hover:shadow-lg transition p-4 cursor-pointer bg-white"
  >
    <NuxtLink :to="`/products/${product.id}`">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-48 object-cover rounded-xl mb-3"
      />
      <h2 class="text-lg font-semibold truncate mb-1">{{ product.name }}</h2>
      <p class="text-gray-500 text-sm mb-2 line-clamp-2">{{ product.description }}</p>
      <p class="text-primary text-base font-bold">
        {{ formatPrice(product.price) }}
      </p>
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

const formatPrice = (price) => {
  return price.toLocaleString("vi-VN") + " ₫";
};
</script>

<style scoped>
.text-primary {
  @apply text-blue-600;
}
</style>
