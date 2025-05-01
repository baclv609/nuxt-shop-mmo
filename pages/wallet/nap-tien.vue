<template>
    <div class="bg-gray-100 font-sans text-gray-800 py-8">
        <div class="container mx-auto px-4">
            <div class="bg-white rounded-lg shadow-sm mb-6 p-6">
                <h2 class="text-xl font-medium mb-1">Nạp tiền qua ngân hàng</h2>
                <p class="text-gray-500 text-sm mb-6">
                    Chuyển khoản ngân hàng để nạp tiền vào tài khoản của bạn
                </p>

                <!-- Amount Input -->
                <div class="mb-8">
                    <label for="amount" class="block text-base font-medium mb-2 text-gray-700">
                        Số tiền cần nạp
                    </label>
                    <input v-model="amountInput" @input="handleAmountInput" type="text" id="amount"
                        class="w-full px-4 py-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Nhập số tiền" />
                    <p v-if="amountText" class="mt-2 text-sm text-gray-500">{{ amountText }}</p>
                </div>

                <!-- Bank Tabs -->
                <div class="mb-8">
                    <h3 class="text-base font-medium mb-4 text-gray-700">
                        Chọn ngân hàng để chuyển khoản
                    </h3>
                    <div class="border border-gray-200 rounded-lg">
                        <div class="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
                            <button v-for="bank in banks" :key="bank.id"
                                :class="['tab-btn py-3 px-4 text-center font-medium', activeBank === bank.id ? 'text-primary-500 border-b-2 border-primary-500' : 'text-gray-500 hover:bg-gray-100']"
                                @click="activeBank = bank.id">
                                {{ bank.name }}
                            </button>
                        </div>

                        <div v-for="bank in banks" :key="bank.id" v-show="activeBank === bank.id" class="p-5">
                            <div class="flex items-center justify-between mb-5">
                                <div class="flex items-center">
                                    <div class="w-[120px] h-10 bg-gray-100 rounded flex items-center justify-center">
                                        <img :src="bank.logo" alt="bank logo" class="max-h-8" />
                                    </div>
                                    <div class="ml-4">
                                        <h4 class="font-medium">{{ bank.name }}</h4>
                                        <p class="text-sm text-gray-500">{{ bank.branch }}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-3">
                                <InfoItem title="Số tài khoản" :content="bank.accountNumber" />
                                <InfoItem title="Chủ tài khoản" :content="bank.accountHolder" />
                                <InfoItem title="Nội dung chuyển khoản" :content="transferContent" />
                            </div>

                            <div class="flex items-start p-4 mt-4 bg-blue-50 text-blue-600 rounded-md">
                                <i class="fas fa-info-circle mt-1 mr-3"></i>
                                <p class="text-sm">
                                    Vui lòng chuyển khoản đúng nội dung để hệ thống xác nhận giao dịch.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Confirm Form -->
                <div>
                    <h3 class="text-base font-medium mb-4 text-gray-700">
                        Xác nhận giao dịch
                    </h3>
                    <form @submit.prevent="handleSubmit">
                        <div class="mb-4">
                            <label for="transactionId" class="block text-sm font-medium mb-2 text-gray-700">
                                Mã giao dịch (nếu có)
                            </label>
                            <input v-model="transactionId" type="text" id="transactionId"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Nhập mã giao dịch" />
                        </div>

                        <div v-if="successMessage"
                            class="flex items-start p-4 mb-4 bg-green-50 text-green-600 rounded-md">
                            <i class="fas fa-check-circle mt-1 mr-3"></i>
                            <p>Giao dịch đã ghi nhận. Sẽ xác nhận và cập nhật số dư sớm nhất.</p>
                        </div>

                        <button type="submit"
                            class="w-full py-4 bg-primary-500 text-white rounded-md font-medium hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-primary-300 disabled:cursor-not-allowed"
                            :disabled="!amountInput || loading">
                            {{ loading ? 'Đang xử lý...' : 'Xác nhận đã chuyển khoản' }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const amountInput = ref('')
const amountText = ref('')
const transactionId = ref('')
const activeBank = ref('vietcombank')
const loading = ref(false)
const successMessage = ref(false)

const banks = [
    { id: 'vietcombank', name: 'Vietcombank', branch: 'Chi nhánh Hà Nội', accountNumber: '1234567890', accountHolder: 'NGUYEN VAN A', logo: 'https://placehold.co/120x40' },
    { id: 'techcombank', name: 'Techcombank', branch: 'Chi nhánh HCM', accountNumber: '9876543210', accountHolder: 'NGUYEN VAN A', logo: 'https://placehold.co/120x40' },
    { id: 'mbbank', name: 'MB Bank', branch: 'Chi nhánh Đà Nẵng', accountNumber: '0123456789', accountHolder: 'NGUYEN VAN A', logo: 'https://placehold.co/120x40' }
]

const transferContent = ref('NAPTIEN ***')

function handleAmountInput() {
    let value = amountInput.value.replace(/\D/g, '')
    if (value) {
        const formattedValue = new Intl.NumberFormat('vi-VN').format(parseInt(value))
        amountInput.value = formattedValue
        transferContent.value = `NAPTIEN ${formattedValue}`
        amountText.value = `Bằng chữ: ${formattedValue} đồng`
    } else {
        transferContent.value = 'NAPTIEN ***'
        amountText.value = ''
    }
}

function handleSubmit() {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        successMessage.value = true

        setTimeout(() => {
            successMessage.value = false
            amountInput.value = ''
            transactionId.value = ''
            transferContent.value = 'NAPTIEN ***'
            amountText.value = ''
        }, 5000)
    }, 1500)
}
</script>

<!-- Component InfoItem -->
<script>
export default {
    components: {
        InfoItem: {
            props: ['title', 'content'],
            template: `
          <div class="flex justify-between items-center p-3 bg-gray-50 rounded-md">
            <div>
              <p class="text-sm text-gray-500">{{ title }}</p>
              <p class="font-medium">{{ content }}</p>
            </div>
            <button @click="copyToClipboard(content)" class="p-2 bg-white border border-gray-200 rounded hover:bg-gray-50">
              <i class="fas fa-copy text-gray-500"></i>
            </button>
          </div>
        `,
            methods: {
                copyToClipboard(text) {
                    navigator.clipboard.writeText(text)
                }
            }
        }
    }
}
</script>

<style scoped>
.tab-btn.active {
    color: #3b82f6;
    border-bottom: 2px solid #3b82f6;
}
</style>