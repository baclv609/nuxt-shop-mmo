<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Main Content -->
    <main class="">
      <div v-if="pending">Đang tải...</div>
      <div v-else-if="error">Không tìm thấy sản phẩm</div>

      <div v-else-if="product" class="flex flex-col lg:flex-row gap-6">
        <!-- Left Content -->
        <div class="w-full lg:w-3/4 bg-white rounded-lg shadow-sm">
          <!-- Product Image Section -->
          <div class="p-6 border-b border-gray-100">
            <h2 class="text-xl font-medium text-center mb-6">Ảnh sản phẩm</h2>
            <div class="relative rounded-lg overflow-hidden border border-gray-200">
              <a-image :src="product.image_url" :alt="product.name" :preview="false"
                class="w-full h-auto object-cover min-h-[300px] min-w-[300px]" />
            </div>
          </div>

          <!-- Product Description Section -->
          <div class="p-6">
            <h2 class="text-xl font-medium text-center mb-6">Mô tả sản phẩm</h2>
            <div class="prose max-w-none">
              <h3 class="text-lg font-bold text-gray-800 mb-4">{{ product.name }}</h3>
              <div v-html="product.description"></div>

              <!-- Features List -->
              <!-- <div class="mt-6">
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
</div> -->

              <!-- Requirements -->
              <!-- <div class="mt-6">
                <h4 class="font-medium mb-3">Yêu cầu hệ thống:</h4>
                <a-list bordered size="small">
                  <a-list-item v-for="(req, index) in product.requirements" :key="index">
                    <template #prefix>
                      <InfoCircleOutlined class="mr-2 text-blue-500" />
                    </template>
                    {{ req }}
                  </a-list-item>
                </a-list>
              </div> -->
            </div>
          </div>
        </div>

        <!-- Right Sidebar -->
        <div class="w-full lg:w-1/4">
          <div class="bg-white rounded-lg shadow-sm p-6 sticky top-6">
            <h2 class="text-lg font-medium mb-4">Tổng quan</h2>

            <div class="space-y-4">
              <div>
                <p class="text-gray-500 text-sm">
                  ID sản phẩm: #<span class="font-medium text-black">{{
                    product.id
                    }}</span>
                </p>
              </div>

              <div>
                <p class="text-gray-500 text-sm">Thời gian phát hành:</p>
                <p class="font-medium">
                  {{
                    new Date(product.created_at).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }}
                </p>
              </div>

              <div>
                <p class="text-gray-500 text-sm">Giá:</p>
                <p class="text-xl font-bold text-red-500">{{ product.discount_price }}</p>
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
                  class="flex items-center justify-center bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
                  @click="isModalOpen = true">
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

    <PaymentConfirmationModal :isOpen="isModalOpen" :price="product?.discount_price" :product="product"
      @confirm="handleConfirm" @cancel="handleCancel" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  EyeOutlined,
  ShoppingOutlined,
  TagOutlined,
  MessageOutlined,
  SyncOutlined,
} from "@ant-design/icons-vue";
import { useRoute, useHead, useRouter } from "#imports";
import PaymentConfirmationModal from '~/components/modal/PaymentConfirmationModal.vue';
import { usePayment } from '~/composables/usePayment';
import { message } from "ant-design-vue";

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const slug = route.params.slug;
const isModalOpen = ref(false);

const { setCurrentPayment, processPurchase, loadCurrentPayment, clearCurrentPayment } = usePayment();


onMounted(() => {
  loadCurrentPayment();
});

// Fetch product data from API based on slug using IIFE
const { data: product, pending, error } = await useAsyncData(`san-pham/${slug}`, () =>
  $fetch(`${config.public.apiBaseUrl}/products/slug/${slug}`)
);

// SEO
useHead(() => ({
  title: product.value?.meta_title || product.value?.name || "Chi tiết sản phẩm",
  meta: [
    { name: "description", content: product.value?.meta_description || "" },
    { property: "og:title", content: product.value?.meta_title || "" },
    { property: "og:image", content: product.value?.image_url || "" },
  ],
}));

const handleConfirm = async () => {
  try {
    if (!product.value) return

    // Lưu sản phẩm đang thanh toán
    setCurrentPayment({
      id: product.value.id,
      name: product.value.name,
      price: Number(product.value.discount_price),
      image_url: product.value.image_url,
    })

    // Gọi API thanh toán
    await processPurchase()

    message.success('Mua hàng thành công!')
    isModalOpen.value = false
  } catch (err) {
    message.error(err.message || 'Thanh toán thất bại!')
  } finally {
    clearCurrentPayment()
  }
}

const handleCancel = () => {
  clearCurrentPayment();
  isModalOpen.value = false;
};
</script>
