<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Sản phẩm nổi bật 1</h1>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <product-card v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "default" });
// const products = await $fetch("/api/products");
import productCard from "~/components/ProductCard.vue";
const route = useRoute();
const products = ref([
  { id: 1, name: "Ghế Sofa Cao Cấp", price: 5000000, image: "https://images.unsplash.com/photo-1593642634367-d91a135587b2" },
  {
    id: 2,
    name: "Bàn Trà Gỗ Sồi",
    price: 2500000,
    image: "https://images.unsplash.com/photo-1617103222062-6e5060fa1ea3",
  },
  {
    id: 3,
    name: "Kệ Tivi Hiện Đại",
    price: 3200000,
    image: "https://images.unsplash.com/photo-1622521043531-e543568a2b8a",
  },
  {
    id: 4,
    name: "Bàn Giao Diện",
    price: 1500000,
    image: "https://images.unsplash.com/photo-1593642634367-d91a135587b2",
  }
])

</script>
