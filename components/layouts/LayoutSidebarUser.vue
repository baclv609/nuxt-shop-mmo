<template>
  <a-layout class="min-h-screen">
    <!-- Drawer sidebar cho mobile -->
    <a-drawer placement="left" :visible="drawerVisible" :closable="false" @close="drawerVisible = false"
      :body-style="{ padding: 0 }" width="200">
      <SidebarContent @close="drawerVisible = false" />
    </a-drawer>

    <!-- Sidebar desktop -->
    <a-layout-sider v-if="!isMobile" v-model:collapsed="collapsed" :trigger="null" collapsible>
      <SidebarContent />
    </a-layout-sider>

    <!-- Main layout -->
    <a-layout style="flex-direction: column">
      <a-layout-header class="!bg-white flex items-center justify-between h-16 shadow">
        <!-- Menu toggle -->
        <div class="flex items-center"> 
          <!-- Desktop -->
          <menu-unfold-outlined v-if="!isMobile && collapsed" class="trigger" @click="collapsed = !collapsed" />
          <menu-fold-outlined v-if="!isMobile && !collapsed" class="trigger" @click="collapsed = !collapsed" />

          <!-- Mobile: hamburger -->
          <menu-unfold-outlined v-if="isMobile" class="trigger" @click="drawerVisible = true" />

          <a-input-search
            v-model:value="inputSearchValue"
            placeholder="Nhập từ khóa tìm kiếm"
            allow-clear
            enter-button
            class="!ml-4 min-w-[180px]"
            @input="onSearchInput"
            @search="onSearch"
          />

        </div>

        <!-- Avatar + Tiền -->
        <div class="flex items-center gap-4 pr-6">
          <!-- Nút hiển thị số tiền - chỉ hiển thị khi đã đăng nhập và có số dư -->
          <a-button v-if="auth.loggedIn && auth.wallet" 
            type="default" shape="round"
            class="flex items-center gap-2 !text-green-600 !border-green-300 hover:!border-green-500 hover:!text-green-700 shadow-sm">
            <template #icon>
              <WalletOutlined />
            </template>
            {{ walletBalance }} ₫
          </a-button>

          <!-- Avatar dropdown -->
          <a-dropdown trigger="click">
            <a class="cursor-pointer" @click.prevent>
              <a-avatar :size="32">
                <UserOutlined />
              </a-avatar>
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item key="profile">
                  <UserOutlined /> Thông tin
                </a-menu-item>
                <a-menu-item key="logout" @click="handleLogout">
                  <UploadOutlined /> Đăng xuất
                </a-menu-item>
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

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import SidebarContent from "../user/sidebar/SidebarContent.vue";
import debounce from "lodash.debounce"
import { useAuthStore } from '~/stores/auth'

import {
  UserOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  WalletOutlined,
} from "@ant-design/icons-vue";

const auth = useAuthStore();
const collapsed = ref(false);
const drawerVisible = ref(false);
const isMobile = ref(false);

const inputSearchValue = ref('');

// Debug logs
onMounted(() => {
  console.log('LayoutSidebarUser mounted - Auth state:', {
    isLoggedIn: auth.loggedIn,
    user: auth.user,
    wallet: auth.wallet,
    balance: auth.wallet?.balance
  });
});

// Computed property để lấy số dư ví
const walletBalance = computed(() => {
  return auth.walletBalance
});

// Hàm lấy số dư mới nhất
const refreshWalletBalance = async () => {
  try {
    await auth.fetchLatestWalletBalance();
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
  }
};

// Lấy số dư mới khi component được mount
onMounted(async () => {
  updateIsMobile();
  window.addEventListener("resize", updateIsMobile);
  
  if (auth.loggedIn) {
    await refreshWalletBalance();
  }
});

// debounce function: gọi sau 500ms
const debouncedSearch = debounce((val) => {
  console.log("Đã tìm kiếm:", val);
  // TODO: gọi API hoặc lọc dữ liệu ở đây
}, 500);

// Gọi khi input thay đổi
const onSearchInput = (e) => {
  const target = e.target;
  inputSearchValue.value = target.value;
  debouncedSearch(target.value);
};

const onSearch = (val) => {
  console.log("Ấn Enter/Search:", val);
  // Optional: xử lý thêm khi user nhấn Enter
};
const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateIsMobile);
});

const handleLogout = () => {
  try {
    auth.logout();
    // Chuyển hướng về trang login sau khi đăng xuất
    navigateTo('/login');
  } catch (error) {
    console.error('Logout error:', error);
  }
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

:deep(.ant-input-search) {
  margin-left: 16px;
  max-width: 300px;
}

@media (max-width: 768px) {
  :deep(.ant-input-search) {
    width: 100%;
    margin: 8px 0;
  }
}

</style>
