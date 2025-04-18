<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Sản phẩm nổi bật</h1>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <product-card v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup>
// const products = await $fetch("/api/products");
import productCard from "~/components/ProductCard.vue";
const route = useRoute();
const products = ref([
  { id: 1, name: "Ghế Sofa Cao Cấp", price: 5000000, image: "/img/sofa.jpg" },
  {
    id: 2,
    name: "Bàn Trà Gộ Sồi",
    price: 2500000,
    image: "/img/ban-tra.jpg",
  },
  {
    id: 3,
    name: "Kệ Tivi Hiện Đại",
    price: 3200000,
    image: "/img/ke-tivi.jpg",
  },
  {
    id: 4,
    name: "Bàn Giao Diện",
    price: 1500000,
    image: "/img/ban-giao-dien.jpg",
    }
])
</script>
