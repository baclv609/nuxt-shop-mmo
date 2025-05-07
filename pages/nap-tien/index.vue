<template>
    <div class="bg-gray-50 min-h-screen">

        <!-- Main Content -->
        <div class="">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Left Sidebar - Account Info -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div class="flex items-center mb-6">
                            <a-avatar :size="64" class="bg-blue-500 mr-4">
                                <template #icon>
                                    <UserOutlined style="font-size: 32px" />
                                </template>
                            </a-avatar>
                            <div>
                                <h2 class="text-lg font-medium">Nguyễn Văn A</h2>
                                <p class="text-gray-500">ID: #123456</p>
                            </div>
                        </div>
                        <a-divider />
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-gray-500">Số dư tài khoản:</span>
                            <span class="text-xl font-bold text-red-500">2.500.000₫</span>
                        </div>
                        <a-button type="primary" block size="large">
                            <template #icon>
                                <ReloadOutlined />
                            </template>
                            Nạp tiền ngay
                        </a-button>
                    </div>

                </div>

                <!-- Right Content - Recharge Form -->
                <div class="lg:col-span-2">
                    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h2 class="text-xl font-medium mb-6">Nạp tiền vào tài khoản</h2>

                        <a-tabs v-model:activeKey="activeTab">
                            <a-tab-pane key="bank" tab="Chuyển khoản ngân hàng">
                                <div class="space-y-6">
                                    <div class="bg-blue-50 p-4 rounded-lg">
                                        <div class="flex items-start">
                                            <InfoCircleOutlined class="text-blue-500 mt-1 mr-3" />
                                            <div>
                                                <p class="text-sm text-blue-700">
                                                    Chuyển khoản đến tài khoản ngân hàng dưới đây với nội dung chuyển
                                                    khoản là
                                                    ID tài khoản của bạn.
                                                    Hệ thống sẽ tự động cập nhật số dư sau khi nhận được tiền (trong
                                                    vòng 5-10
                                                    phút).
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <a-card
                                            class="border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
                                            @click="selectBank('vietcombank')">
                                            <div class="flex items-center">
                                                <img src="https://placehold.co/80x40/0066b3/ffffff?text=VCB"
                                                    alt="Vietcombank" class="mr-4" />
                                                <div>
                                                    <h4 class="font-medium">Vietcombank</h4>
                                                    <p class="text-gray-500 text-sm">Ngân hàng TMCP Ngoại thương</p>
                                                </div>
                                            </div>
                                        </a-card>

                                        <a-card
                                            class="border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
                                            @click="selectBank('techcombank')">
                                            <div class="flex items-center">
                                                <img src="https://placehold.co/80x40/f03e3e/ffffff?text=TCB"
                                                    alt="Techcombank" class="mr-4" />
                                                <div>
                                                    <h4 class="font-medium">Techcombank</h4>
                                                    <p class="text-gray-500 text-sm">Ngân hàng TMCP Kỹ thương</p>
                                                </div>
                                            </div>
                                        </a-card>
                                    </div>

                                    <div v-if="selectedBank">
                                        <a-divider />
                                        <h3 class="font-medium mb-4">Thông tin chuyển khoản</h3>

                                        <div class="space-y-4">
                                            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                <span class="text-gray-500">Ngân hàng:</span>
                                                <span class="font-medium">{{ bankInfo.name }}</span>
                                            </div>

                                            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                <span class="text-gray-500">Số tài khoản:</span>
                                                <div class="flex items-center">
                                                    <span class="font-medium mr-2">{{ bankInfo.accountNumber }}</span>
                                                    <a-button type="text" size="small"
                                                        @click="copyToClipboard(bankInfo.accountNumber)">
                                                        <template #icon>
                                                            <CopyOutlined />
                                                        </template>
                                                    </a-button>
                                                </div>
                                            </div>

                                            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                <span class="text-gray-500">Chủ tài khoản:</span>
                                                <span class="font-medium">{{ bankInfo.accountName }}</span>
                                            </div>

                                            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                <span class="text-gray-500">Nội dung chuyển khoản:</span>
                                                <div class="flex items-center">
                                                    <span class="font-medium mr-2">NAP 123456</span>
                                                    <a-button type="text" size="small"
                                                        @click="copyToClipboard('NAP 123456')">
                                                        <template #icon>
                                                            <CopyOutlined />
                                                        </template>
                                                    </a-button>
                                                </div>
                                            </div>

                                            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                <span class="text-gray-500">Số tiền:</span>
                                                <div>
                                                    <a-input-number v-model:value="amount"
                                                        :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')"
                                                        :parser="value => value.replace(/\./g, '')" :min="100000"
                                                        :step="100000" class="w-40" addon-after="₫" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mt-6">
                                            <a-button type="primary" size="large" block @click="submitRecharge">
                                                Xác nhận đã chuyển khoản
                                            </a-button>
                                            <p class="text-center text-gray-500 text-sm mt-3">
                                                Sau khi chuyển khoản, vui lòng nhấn nút xác nhận để hệ thống kiểm tra
                                                nhanh hơn
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </a-tab-pane>

                            <a-tab-pane key="e-wallet" tab="Ví điện tử">
                                <div class="space-y-6">
                                    <div class="bg-blue-50 p-4 rounded-lg">
                                        <div class="flex items-start">
                                            <InfoCircleOutlined class="text-blue-500 mt-1 mr-3" />
                                            <div>
                                                <p class="text-sm text-blue-700">
                                                    Chọn ví điện tử bạn muốn sử dụng để nạp tiền. Hệ thống sẽ chuyển bạn
                                                    đến
                                                    trang thanh toán của ví điện tử.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <a-card
                                            class="border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer text-center"
                                            @click="selectWallet('momo')">
                                            <img src="https://placehold.co/60x60/ae2070/ffffff?text=MoMo" alt="MoMo"
                                                class="mx-auto mb-2" />
                                            <h4 class="font-medium">MoMo</h4>
                                        </a-card>

                                        <a-card
                                            class="border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer text-center"
                                            @click="selectWallet('zalopay')">
                                            <img src="https://placehold.co/60x60/0068ff/ffffff?text=ZaloPay"
                                                alt="ZaloPay" class="mx-auto mb-2" />
                                            <h4 class="font-medium">ZaloPay</h4>
                                        </a-card>

                                        <a-card
                                            class="border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer text-center"
                                            @click="selectWallet('vnpay')">
                                            <img src="https://placehold.co/60x60/0066b3/ffffff?text=VNPay" alt="VNPay"
                                                class="mx-auto mb-2" />
                                            <h4 class="font-medium">VNPay</h4>
                                        </a-card>
                                    </div>

                                    <div v-if="selectedWallet">
                                        <a-divider />
                                        <h3 class="font-medium mb-4">Thông tin nạp tiền</h3>

                                        <div class="space-y-4">
                                            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                <span class="text-gray-500">Phương thức:</span>
                                                <span class="font-medium">{{ walletInfo.name }}</span>
                                            </div>

                                            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                <span class="text-gray-500">Số tiền:</span>
                                                <div>
                                                    <a-input-number v-model:value="walletAmount"
                                                        :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')"
                                                        :parser="value => value.replace(/\./g, '')" :min="50000"
                                                        :step="50000" class="w-40" addon-after="₫" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mt-6">
                                            <a-button type="primary" size="large" block @click="processWalletPayment">
                                                Tiến hành thanh toán
                                            </a-button>
                                        </div>
                                    </div>
                                </div>
                            </a-tab-pane>
                        </a-tabs>
                    </div>

                    <div class="bg-white rounded-lg shadow-sm p-6">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-lg font-medium">Lịch sử nạp tiền</h3>
                            <a-button type="link">
                                Xem tất cả
                                <template #icon>
                                    <RightOutlined />
                                </template>
                            </a-button>
                        </div>

                        <a-table :columns="columns" :data-source="transactions" :pagination="{ pageSize: 5 }"
                            size="middle">
                            <template #bodyCell="{ column, text, record }">
                                <template v-if="column.dataIndex === 'amount'">
                                    <span class="font-medium text-red-500">+{{ text }}</span>
                                </template>

                                <template v-if="column.dataIndex === 'status'">
                                    <a-tag :color="getStatusColor(text)">{{ text }}</a-tag>
                                </template>
                            </template>
                        </a-table>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import {
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    BellOutlined,
    DownOutlined,
    ReloadOutlined,
    DashboardOutlined,
    ShoppingOutlined,
    WalletOutlined,
    TransactionOutlined,
    PhoneOutlined,
    InfoCircleOutlined,
    CopyOutlined,
    RightOutlined
} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

// State
const activeTab = ref('bank');
const selectedBank = ref('');
const selectedWallet = ref('');
const amount = ref(500000);
const walletAmount = ref(500000);

// Bank information
const bankInfo = computed(() => {
    if (selectedBank.value === 'vietcombank') {
        return {
            name: 'Vietcombank - Ngân hàng TMCP Ngoại thương',
            accountNumber: '1234567890',
            accountName: 'NGUYEN VAN B',
        };
    } else if (selectedBank.value === 'techcombank') {
        return {
            name: 'Techcombank - Ngân hàng TMCP Kỹ thương',
            accountNumber: '0987654321',
            accountName: 'NGUYEN VAN B',
        };
    }
    return {};
});

// Wallet information
const walletInfo = computed(() => {
    if (selectedWallet.value === 'momo') {
        return {
            name: 'Ví MoMo',
            logo: 'momo-logo.png',
        };
    } else if (selectedWallet.value === 'zalopay') {
        return {
            name: 'ZaloPay',
            logo: 'zalopay-logo.png',
        };
    } else if (selectedWallet.value === 'vnpay') {
        return {
            name: 'VNPay',
            logo: 'vnpay-logo.png',
        };
    }
    return {};
});

// Table columns
const columns = [
    {
        title: 'Mã giao dịch',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Thời gian',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: 'Phương thức',
        dataIndex: 'method',
        key: 'method',
    },
    {
        title: 'Số tiền',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
    },
];

// Sample transaction data
const transactions = [
    {
        key: '1',
        id: 'TX123456',
        time: '15/05/2023 14:30',
        method: 'Chuyển khoản ngân hàng',
        amount: '1.000.000₫',
        status: 'Thành công',
    },
    {
        key: '2',
        id: 'TX123455',
        time: '10/05/2023 09:15',
        method: 'Ví MoMo',
        amount: '500.000₫',
        status: 'Thành công',
    },
    {
        key: '3',
        id: 'TX123454',
        time: '05/05/2023 18:45',
        method: 'Chuyển khoản ngân hàng',
        amount: '2.000.000₫',
        status: 'Thành công',
    },
    {
        key: '4',
        id: 'TX123453',
        time: '01/05/2023 11:20',
        method: 'ZaloPay',
        amount: '300.000₫',
        status: 'Thành công',
    },
    {
        key: '5',
        id: 'TX123452',
        time: '25/04/2023 16:10',
        method: 'Chuyển khoản ngân hàng',
        amount: '1.500.000₫',
        status: 'Đang xử lý',
    },
    {
        key: '6',
        id: 'TX123451',
        time: '20/04/2023 08:30',
        method: 'VNPay',
        amount: '800.000₫',
        status: 'Thành công',
    },
];

// Methods
const selectBank = (bank) => {
    selectedBank.value = bank;
};

const selectWallet = (wallet) => {
    selectedWallet.value = wallet;
};

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    message.success('Đã sao chép vào clipboard');
};

const submitRecharge = () => {
    message.success('Đã gửi yêu cầu xác nhận nạp tiền thành công!');
};

const processWalletPayment = () => {
    message.success(`Đang chuyển hướng đến trang thanh toán ${walletInfo.value.name}...`);
};

const getStatusColor = (status) => {
    switch (status) {
        case 'Thành công':
            return 'success';
        case 'Đang xử lý':
            return 'processing';
        case 'Thất bại':
            return 'error';
        default:
            return 'default';
    }
};
</script>

<style scoped>
:deep(.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn) {
    color: #1890ff;
}

:deep(.ant-tabs-ink-bar) {
    background-color: #1890ff;
}

:deep(.ant-input-number-group-addon) {
    background-color: #f0f2f5;
    color: #1f2937;
}
</style>