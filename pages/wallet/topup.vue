<template>
    <section class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <div class="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
            <h1 class="text-2xl font-bold text-gray-800 mb-4">Nạp tiền</h1>
            <p class="text-gray-600 mb-8">Quét mã QR để thực hiện thanh toán</p>

            <!-- QR Code -->
            <div class="flex justify-center mb-6">
                <a-qrcode :value="qrValue" :size="192" :bordered="false" class="rounded-lg border" />
            </div>

            <!-- Amount -->
            <div class="text-lg font-semibold text-blue-600 mb-6">
                Số tiền: <span class="text-2xl">{{ amount.toLocaleString() }} đ</span>
            </div>

            <!-- Countdown Timer (optional) -->
            <div v-if="countdown > 0" class="text-sm text-gray-500 mb-4">
                Vui lòng hoàn tất trong <span class="font-medium">{{ countdown }}</span> giây
            </div>

            <!-- Confirm Button -->
            <a-button type="primary" block size="large" class="mt-4" @click="confirmPayment">
                Tôi đã thanh toán
            </a-button>

            <!-- Back Home -->
            <a-button type="link" block class="mt-2 text-gray-500" @click="goHome">
                Quay về trang chủ
            </a-button>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const amount = 100000 // Ví dụ 100k
const qrValue = ref('https://your-payment-link.com') // Link thanh toán hoặc nội dung mã QR

const countdown = ref(300) // 5 phút
let interval = null

const router = useRouter()

onMounted(() => {
    interval = setInterval(() => {
        if (countdown.value > 0) {
            countdown.value--
        } else {
            clearInterval(interval)
            router.push('/')
        }
    }, 1000)
})

onUnmounted(() => {
    if (interval) clearInterval(interval)
})

function confirmPayment() {
    alert('Cảm ơn bạn đã thanh toán!')
    router.push('/')
}

function goHome() {
    router.push('/')
}
</script>