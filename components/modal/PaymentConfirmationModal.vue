<template>
  <a-modal :open="isOpen" :footer="null" centered width="400">
    <div class="flex flex-col items-center text-center">
      <div
        class="w-20 h-20 flex items-center justify-center rounded-full border border-blue-300 text-3xl text-blue-400 mb-4">
        ?
      </div>
      <h2 class="text-xl font-semibold mb-2">Xác nhận thanh toán</h2>
      <p class="mb-2">
        Bạn có chắc chắn muốn mua sản phẩm
        <span class="font-semibold">{{ product.name }}</span>
        với giá
        <span class="font-semibold text-red-500">{{ formatPrice(price) }}</span> không?
      </p>
      <p class="mb-6 text-sm">
        Số dư hiện tại: <span class="font-semibold">{{ walletBalance }}</span>
      </p>
      <div v-if="!hasEnoughBalance(price)" class="mb-4 text-red-500">
        Số dư không đủ để thực hiện giao dịch
      </div>
      <div class="flex gap-4">
        <a-button 
          type="primary" 
          class="bg-blue-500 hover:bg-blue-600" 
          @click="handleConfirm"
          :disabled="!hasEnoughBalance(price)"
        >
          Có, thanh toán ngay
        </a-button>
        <a-button type="primary" danger @click="handleCancel">
          Không
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import { usePayment } from '~/composables/usePayment'
import { useAuthStore } from '~/stores/auth'
const { 
  setCurrentPayment, 
  formatPrice, 
  hasEnoughBalance,
  getFormattedBalance 
} = usePayment()

const auth = useAuthStore();
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  price: {
    type: [Number, String],
    required: true
  },
  product: {
    type: Object,
    required: true
  }
})

const walletBalance = computed(() => getFormattedBalance())

const emit = defineEmits(['update:isOpen', 'confirm', 'cancel'])


const handleConfirm = () => {
  // Set current payment
  setCurrentPayment({
    id: props.product.id,
    name: props.product.name,
    price: Number(props.price),
    image_url: props.product.image_url,
    quantity: 1
  })
  
  emit('confirm')
}

const handleCancel = () => {
  emit('update:isOpen', false)
  emit('cancel')
}
</script> 