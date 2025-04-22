<template>
  <a-layout class="min-h-screen">
    <!-- Sidebar -->
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <!-- Menu -->
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item v-for="item in menuItems" :key="item.key">
          <router-link :to="`/admin${item.to}`">
            <component :is="item.icon" />
            <span>{{ item.label }}</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <!-- Main Layout -->
    <a-layout style="display: flex; flex-direction: column">
      <a-layout-header
        style="background: #fff; padding: 0; height: 64px"
        class="flex items-center justify-between"
      >
        <div>
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="collapsed = !collapsed"
          />
          <menu-fold-outlined v-else class="trigger" @click="collapsed = !collapsed" />
        </div>

        <div class="pr-6">
          <a-dropdown trigger="click">
            <a class="cursor-pointer flex items-center gap-2" @click.prevent>
              <a-avatar :size="32" class="cursor-pointer">
                <template #icon><UserOutlined /></template>
              </a-avatar>
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item key="profile">
                  <template #icon><UserOutlined /></template>
                  Thông tin cá nhân
                </a-menu-item>
                <a-menu-item key="logout" @click="handleLogout">
                  <template #icon><UploadOutlined /></template>
                  Đăng xuất
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>

      <a-layout-content
        style="flex: 1; margin: 24px 16px; padding: 24px; background: #fff"
      >
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";

const collapsed = ref(false);
const selectedKeys = ref(["home"]);

const menuItems = ref([
  {
    key: "home",
    icon: UserOutlined,
    label: "Trang chủ",
    to: "/", // Đường dẫn cho mục Trang chủ
  },
  {
    key: "user",
    icon: UserOutlined,
    label: "Quản lý Người dùng",
    to: "/user",
  },
  {
    key: "rom",
    icon: UserOutlined,
    label: "Quản lý ROM",
    to: "/rom", // Đường dẫn cho mục Quản lý ROM
  },
  {
    key: "tool",
    icon: VideoCameraOutlined,
    label: "Quản lý Tool",
    to: "/tool", // Đường dẫn cho mục Quản lý Tool
  },
  {
    key: "account",
    icon: UploadOutlined,
    label: "Quản lý Tài khoản",
    to: "/account", // Đường dẫn cho mục Quản lý Tài khoản
  },
]);

const handleLogout = () => {
  // Xuất tài khoản
  console.log("Đăng xuat");
};
</script>

<style scoped>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}
</style>
