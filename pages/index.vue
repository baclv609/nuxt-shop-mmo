<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Sản phẩm nổi bật 1</h1>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 scoll-list-card">
      <product-card v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "default" });

import { ref, onMounted } from "vue";
import productCard from "~/components/ProductCard.vue";

const products = ref([]);

function generateSampleProducts(count = 10) {
  const categories = [
    { id: 1, name: "Nội thất" },
    { id: 4, name: "Linh kiện RAM" }
  ];
  const ramNames = [
    "RAM DDR4 8GB 2666MHz", "RAM DDR4 16GB 3200MHz", "RAM Laptop DDR4 8GB 3200MHz",
    "RAM DDR5 16GB 5600MHz", "RAM Laptop DDR5 8GB 4800MHz"
  ];
  const furnitureNames = [
    "Kệ sách Gỗ Sồi", "Bàn làm việc chân sắt", "Tủ giày 2 cánh MDF",
    "Ghế ngồi bọc nệm cao cấp", "Giá treo quần áo đứng"
  ];

  const slugify = str => str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');

  const products = [];

  for (let i = 1; i <= count; i++) {
    const isRam = i % 2 === 0;
    const category = isRam ? categories[1] : categories[0];
    const name = isRam
      ? ramNames[Math.floor(Math.random() * ramNames.length)]
      : furnitureNames[Math.floor(Math.random() * furnitureNames.length)];

    const basePrice = Math.floor(Math.random() * 2000000) + 500000;
    const discount = Math.floor(basePrice * (Math.random() * 0.2));
    const createdAt = new Date(Date.now() - i * 3600 * 1000).toISOString().slice(0, 19).replace('T', ' ');

    products.push({
      id: 100 + i,
      category_id: category.id,
      name: name,
      slug: slugify(name),
      description: `${name} chất lượng cao, phù hợp nhu cầu sử dụng thực tế.`,
      meta_title: name,
      meta_description: `Thông tin chi tiết về ${name}, giá cả hợp lý.`,
      original_price: basePrice,
      discount_price: basePrice - discount,
      hot: Math.random() < 0.3,
      image_url: "https://source.unsplash.com/featured/?furniture,technology," + i,
      alt_text: name,
      main_link: `https://example.com/${slugify(name)}`,
      backup_link: `https://backup.com/${slugify(name)}`,
      views: Math.floor(Math.random() * 1000),
      sold: Math.floor(Math.random() * 200),
      created_at: createdAt,
      updated_at: createdAt
    });
  }

  return products;
}

// Gọi hàm tạo dữ liệu khi component được mount
onMounted(() => {
  products.value = generateSampleProducts(24);
});
</script>
<style>
.scoll-list-card{
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}
</style>