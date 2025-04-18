<template>
  <div v-if="product">
    <h1 class="text-2xl font-bold">{{ product.name }}</h1>
    <img :src="product.image" class="w-full max-w-md my-4" />
    <p class="text-xl font-semibold text-red-500">
      {{ product.price.toLocaleString() }}đ
    </p>
    <h2>Product details</h2>
  </div>
  <div v-else>
    <p class="text-red-500">Không tìm thấy sản phẩm!</p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { id } = route.params;

const products = ref([
  { id: 1, name: "Ghế Sofa Cao Cấp", price: 5000000, image: "/img/sofa.jpg" },
  { id: 2, name: "Bàn Trà Gỗ Sồi", price: 2500000, image: "/img/ban-tra.jpg" },
  { id: 3, name: "Kệ Tivi Hiện Đại", price: 3200000, image: "/img/ke-tivi.jpg" },
  { id: 4, name: "Bàn Giao Diện", price: 1500000, image: "/img/ban-giao-dien.jpg" },
]);

const product = computed(() => products.value.find((p) => p.id === Number(id)));
</script>
