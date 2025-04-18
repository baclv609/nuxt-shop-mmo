
<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>
    <table class="w-full border text-left text-sm">
      <thead class="bg-gray-200">
        <tr>
          <th class="p-2">Tên sản phẩm</th>
          <th class="p-2">Giá</th>
          <th class="p-2">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id" class="border-t">
          <td class="p-2">{{ product.name }}</td>
          <td class="p-2">{{ product.price }}đ</td>
          <td class="p-2">
            <button class="text-blue-600 hover:underline">Sửa</button> |
            <button class="text-red-600 hover:underline">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
definePageMeta({ layout: "admin" });
import { ref } from "vue";
// const products = await $fetch("/api/products");
const products = ref([
  {
    id: 1,
    name: "Sản phẩm 1",
    price: 100000,
  },
  {
    id: 2,
    name: "Sản phẩm 2",
    price: 200000,
  },
  {
    id: 3,
    name: "Sản phẩm 3",
    price: 300000,
  },
]);
</script>
