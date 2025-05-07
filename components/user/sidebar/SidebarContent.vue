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

<script setup>
import { ref } from "vue";
import {
  ShoppingCartOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";

const selectedKeys = ref(["products"]);
const emit = defineEmits(["close"]);

const menuItems = [
  { key: "products", label: "Sản phẩm", to: "/", icon: AppstoreOutlined },
  { key: "orders", label: "Đơn hàng", to: "/don-hang", icon: ShoppingCartOutlined },
  { key: "cart", label: "Nạp tiền", to: "/nap-tien", icon: ShoppingCartOutlined },
  { key: "settings", label: "Profile", to: "/profile", icon: SettingOutlined },
];

const onClickMenuItem = () => {
  emit("close"); // Đóng drawer nếu đang ở mobile
};
</script>
