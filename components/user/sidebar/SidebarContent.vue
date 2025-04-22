<template>
  <div>
    <div class="logo text-white text-center py-4 font-bold text-lg bg-[#001529]">
      🛒 MyStore
    </div>
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <a-menu-item v-for="item in menuItems" :key="item.key" @click="onClickMenuItem">
        <router-link :to="item.to">
          <component :is="item.icon" />
          <span>{{ item.label }}</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  ShoppingCartOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";

const selectedKeys = ref(["products"]);
const emit = defineEmits(["close"]);

const menuItems = [
  { key: "products", label: "Sản phẩm", to: "/user/products", icon: AppstoreOutlined },
  { key: "orders", label: "Đơn hàng", to: "/user/orders", icon: ShoppingCartOutlined },
  { key: "cart", label: "Giỏ hàng", to: "/user/cart", icon: ShoppingCartOutlined },
  { key: "settings", label: "Cài đặt", to: "/user/settings", icon: SettingOutlined },
];

const onClickMenuItem = () => {
  emit("close"); // Đóng drawer nếu đang ở mobile
};
</script>
