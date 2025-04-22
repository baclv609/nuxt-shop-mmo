<template>
  <a-layout class="min-h-screen">
    <!-- Drawer sidebar cho mobile -->
    <a-drawer
      placement="left"
      :visible="drawerVisible"
      :closable="false"
      @close="drawerVisible = false"
      :body-style="{ padding: 0 }"
      width="200"
    >
      <SidebarContent @close="drawerVisible = false" />
    </a-drawer>

    <!-- Sidebar desktop -->
    <a-layout-sider
      v-if="!isMobile"
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
    >
      <SidebarContent />
    </a-layout-sider>

    <!-- Main layout -->
    <a-layout style="flex-direction: column">
      <a-layout-header class="!bg-white flex items-center justify-between h-16 shadow">
        <!-- Menu toggle -->
        <div>
          <!-- Desktop -->
          <menu-unfold-outlined
            v-if="!isMobile && collapsed"
            class="trigger"
            @click="collapsed = !collapsed"
          />
          <menu-fold-outlined
            v-if="!isMobile && !collapsed"
            class="trigger"
            @click="collapsed = !collapsed"
          />

          <!-- Mobile: hamburger -->
          <menu-unfold-outlined
            v-if="isMobile"
            class="trigger"
            @click="drawerVisible = true"
          />
        </div>

        <!-- Avatar -->
        <div class="p-6">
          <a-dropdown trigger="click">
            <a class="cursor-pointer" @click.prevent>
              <a-avatar :size="32"><UserOutlined /></a-avatar>
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item key="profile"><UserOutlined /> Thông tin</a-menu-item>
                <a-menu-item key="logout" @click="handleLogout"
                  ><UploadOutlined /> Đăng xuất</a-menu-item
                >
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>

      <a-layout-content class="p-6 bg-gray-50 min-h-[calc(100vh-64px)]">
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import SidebarContent from "../user/sidebar/SidebarContent.vue";
import {
  UserOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";

const collapsed = ref(false);
const drawerVisible = ref(false);
const isMobile = ref(false);

const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  updateIsMobile();
  window.addEventListener("resize", updateIsMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateIsMobile);
});

const handleLogout = () => {
  console.log("Logout người dùng");
};
</script>

<style scoped>
.trigger {
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;
  padding: 0 16px;
}
.trigger:hover {
  color: #1890ff;
}
:deep(.ant-layout-header) {
padding: 0 !important;
}

</style>
