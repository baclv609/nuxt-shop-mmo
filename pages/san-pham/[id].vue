<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Main Content -->
    <main class="">
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Left Content -->
        <div class="w-full lg:w-3/4 bg-white rounded-lg shadow-sm">
          <!-- Product Image Section -->
          <div class="p-6 border-b border-gray-100">
            <h2 class="text-xl font-medium text-center mb-6">Ảnh sản phẩm</h2>
            <div class="relative rounded-lg overflow-hidden border border-gray-200">
              <a-image :src="product.image" :alt="product.name" :preview="false" class="w-full h-auto object-cover" />
            </div>
          </div>

          <!-- Product Description Section -->
          <div class="p-6">
            <h2 class="text-xl font-medium text-center mb-6">Mô tả sản phẩm</h2>
            <div class="prose max-w-none">
              <h3 class="text-lg font-bold text-gray-800 mb-4">{{ product.name }}</h3>
              <div v-html="product.description"></div>

              <!-- Features List -->
              <div class="mt-6">
                <h4 class="font-medium mb-3">Tính năng chính:</h4>
                <a-list item-layout="horizontal" :data-source="product.features">
                  <template #renderItem="{ item }">
                    <a-list-item>
                      <template #actions>
                        <a-tag v-if="item.tag" :color="item.tagColor">{{ item.tag }}</a-tag>
                      </template>
                      <a-list-item-meta>
                        <template #avatar>
                          <CheckCircleOutlined class="text-green-500 text-lg" />
                        </template>
                        <template #title>{{ item.title }}</template>
                        <template #description>{{ item.description }}</template>
                      </a-list-item-meta>
                    </a-list-item>
                  </template>
                </a-list>
              </div>

              <!-- Requirements -->
              <div class="mt-6">
                <h4 class="font-medium mb-3">Yêu cầu hệ thống:</h4>
                <a-list bordered size="small">
                  <a-list-item v-for="(req, index) in product.requirements" :key="index">
                    <template #prefix>
                      <InfoCircleOutlined class="mr-2 text-blue-500" />
                    </template>
                    {{ req }}
                  </a-list-item>
                </a-list>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Sidebar -->
        <div class="w-full lg:w-1/4">
          <div class="bg-white rounded-lg shadow-sm p-6 sticky top-6">
            <h2 class="text-lg font-medium mb-4">Tổng quan</h2>

            <div class="space-y-4">
              <div>
                <p class="text-gray-500 text-sm">ID sản phẩm:</p>
                <p class="font-medium">{{ product.id }}</p>
              </div>

              <div>
                <p class="text-gray-500 text-sm">Thời gian phát hành:</p>
                <p class="font-medium">{{ product.releaseDate }}</p>
              </div>

              <div>
                <p class="text-gray-500 text-sm">Giá:</p>
                <p class="text-xl font-bold text-red-500">{{ product.price }}</p>
              </div>

              <a-divider />

              <!-- Action Buttons -->
              <div class="space-y-3">
                <a-button block size="large" class="flex items-center justify-center">
                  <template #icon>
                    <EyeOutlined />
                  </template>
                  Demo
                </a-button>

                <a-button type="primary" block size="large"
                  class="flex items-center justify-center bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600">
                  <template #icon>
                    <ShoppingOutlined />
                  </template>
                  Mua
                </a-button>

                <a-button type="default" block size="large"
                  class="flex items-center justify-center text-yellow-500 border-yellow-500 hover:text-yellow-600 hover:border-yellow-600">
                  <template #icon>
                    <TagOutlined />
                  </template>
                  Áp voucher
                </a-button>
              </div>

              <!-- Additional Info -->
              <a-divider />

              <div>
                <h3 class="font-medium mb-2">Hỗ trợ:</h3>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <MessageOutlined class="mr-2 text-blue-500" />
                    <span>Hỗ trợ trực tuyến 24/7</span>
                  </div>
                  <div class="flex items-center">
                    <SyncOutlined class="mr-2 text-blue-500" />
                    <span>Cập nhật miễn phí</span>
                  </div>
                </div>
              </div>

              <!-- Rating -->
              <div>
                <h3 class="font-medium mb-2">Đánh giá:</h3>
                <div class="flex items-center">
                  <a-rate :default-value="4.5" allow-half disabled />
                  <span class="ml-2 text-gray-500">(25 đánh giá)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>


  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  UserOutlined,
  ShoppingCartOutlined,
  EyeOutlined,
  ShoppingOutlined,
  TagOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  ZoomInOutlined,
  DownloadOutlined,
  MessageOutlined,
  SyncOutlined,
  MailOutlined,
  PhoneOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined
} from '@ant-design/icons-vue'

// Mô phỏng dữ liệu sản phẩm
const product = ref({
  id: 73,
  name: 'ACTIVE GEM PHONE FARM',
  image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SbyCg1l9hG9o305W5SWwpv1Mtc4ZaV.png',
  price: '1.500.000₫',
  releaseDate: '05:49 23/02/2025',
  description: `
    <p>ACTIVE GEM PHONE FARM là công cụ giúp bạn quản lý và tự động hóa các tài khoản Facebook trên nhiều thiết bị di động. Công cụ này đặc biệt hữu ích cho việc quản lý tài khoản quảng cáo, tương tác tự động và các hoạt động marketing trên Facebook.</p>
    <p>Với giao diện trực quan và dễ sử dụng, bạn có thể dễ dàng thiết lập và quản lý các luồng công việc tự động cho nhiều tài khoản cùng lúc.</p>
  `,
  features: [
    {
      title: 'Quản lý nhiều tài khoản',
      description: 'Quản lý hàng trăm tài khoản Facebook trên cùng một giao diện',
      tag: 'Hot',
      tagColor: 'red'
    },
    {
      title: 'Tự động hóa tương tác',
      description: 'Tự động like, comment, share và tương tác với nội dung theo lịch trình',
      tag: 'Mới',
      tagColor: 'green'
    },
    {
      title: 'Bảo mật cao',
      description: 'Hệ thống proxy và fingerprint giúp tài khoản an toàn khỏi các hạn chế',
    },
    {
      title: 'Báo cáo chi tiết',
      description: 'Theo dõi hiệu suất của từng tài khoản với báo cáo trực quan',
    },
  ],
  requirements: [
    'Windows 10/11 64-bit',
    'RAM: tối thiểu 8GB (khuyến nghị 16GB)',
    'Ổ cứng: 10GB dung lượng trống',
    'Kết nối internet ổn định',
    'Hỗ trợ kết nối với các thiết bị Android'
  ]
})
</script>

<style>
/* Có thể thêm CSS tùy chỉnh nếu cần */
</style>