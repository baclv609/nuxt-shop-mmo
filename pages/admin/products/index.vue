
<script setup>
definePageMeta({ 
  layout: "admin",
  middleware: ["admin"]
});

import { ref } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import TableProduct from '~/components/admin/product/TableProduct.vue';
import ProductForm from '~/components/admin/product/ProductForm.vue';

const modalVisible = ref(false);
const isEditing = ref(false);
const selectedProduct = ref(null);

const showModal = () => {
  isEditing.value = false;
  selectedProduct.value = null;
  modalVisible.value = true;
};

const handleEdit = (product) => {
  isEditing.value = true;
  selectedProduct.value = product;
  modalVisible.value = true;
};

const handleModalClose = () => {
  modalVisible.value = false;
  selectedProduct.value = null;
};
</script>

<template>
  <div class="p-4">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">Quản lý sản phẩm</h1>
        <p class="text-gray-500 mt-1">Quản lý danh sách sản phẩm của bạn</p>
      </div>
      <a-button type="primary" @click="showModal">
        <template #icon><PlusOutlined /></template>
        Thêm sản phẩm
      </a-button>
    </div>

    <!-- Product Table -->
    <TableProduct @edit="handleEdit" />

    <!-- Product Form Modal -->
    <ProductForm
      v-model:visible="modalVisible"
      :is-editing="isEditing"
      :product="selectedProduct"
      @close="handleModalClose"
    />
  </div>
</template>

<style scoped>
.p-4 {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
</style>
