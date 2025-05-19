<template>
    <div class="bg-gray-50 min-h-screen">
        <!-- Header -->


        <!-- Main Content -->
        <div class="">
            <div class="bg-white rounded-lg shadow-sm p-6">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-xl font-medium">Lịch sử mua hàng</h2>
                    <div class="flex space-x-3">
                        <a-range-picker v-model:value="dateRange" format="DD/MM/YYYY"
                            :placeholder="['Từ ngày', 'Đến ngày']" @change="handleDateRangeChange" />
                        <a-button type="primary" @click="handleSearch">
                            <template #icon>
                                <SearchOutlined />
                            </template>
                            Tìm kiếm
                        </a-button>
                        <a-button @click="handleReset">
                            <template #icon>
                                <ReloadOutlined />
                            </template>
                            Đặt lại
                        </a-button>
                    </div>
                </div>

                <!-- Purchase History Table -->
                <div class="purchase-history-table">
                    <div class="flex justify-between items-center mb-4">
                        <div class="flex items-center">
                            <span class="mr-2">Hiển thị</span>
                            <a-select v-model:value="pagination.pageSize" style="width: 80px"
                                @change="handlePageSizeChange">
                                <a-select-option :value="10">10</a-select-option>
                                <a-select-option :value="20">20</a-select-option>
                                <a-select-option :value="50">50</a-select-option>
                                <a-select-option :value="100">100</a-select-option>
                            </a-select>
                            <span class="ml-2">mục</span>
                        </div>
                        <div>
                            <a-input-search v-model:value="searchText" placeholder="Tìm kiếm..." style="width: 250px"
                                @search="handleSearch" />
                        </div>
                    </div>

                    <a-table :columns="columns" :data-source="filteredData" :pagination="pagination" :loading="loading"
                        @change="handleTableChange" bordered size="middle" :scroll="{ x: 1000 }"
                        :locale="{ emptyText: 'Không có dữ liệu trong bảng' }">
                        <!-- Mã giao dịch Column -->
                        <template #bodyCell="{ column, text, record }">
                            <template v-if="column.dataIndex === 'transactionId'">
                                <a-tag color="blue">{{ text }}</a-tag>
                            </template>

                            <!-- Ảnh Column -->
                            <template v-if="column.dataIndex === 'image'">
                                <a-image :width="50" :src="text" :preview="{
                                    src: text,
                                    mask: true
                                }"
                                    fallback="data:image/png;base64,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RMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                                />
                            </template>

                            <!-- Thao tác Column -->
                            <template v-if="column.dataIndex === 'actions'">
                                <div class="flex space-x-2">
                                    <a-button type="primary" size="small" @click="viewDetails(record)">
                                        <template #icon>
                                            <EyeOutlined />
                                        </template>
                                        Chi tiết
                                    </a-button>
                                    <a-button type="default" size="small" @click="downloadInvoice(record)">
                                        <template #icon>
                                            <DownloadOutlined />
                                        </template>
                                        Hóa đơn
                                    </a-button>
                                </div>
                            </template>
                        </template>
                    </a-table>

                    <div class="mt-4 text-gray-500 text-sm">
                        Hiển thị {{ pagination.current > 0 ? (pagination.current - 1) * pagination.pageSize + 1 : 0 }}
                        đến {{ Math.min(pagination.current * pagination.pageSize, filteredData.length) }}
                        của {{ filteredData.length }} mục
                    </div>
                </div>
            </div>
        </div>

        <!-- View Details Modal -->
        <a-modal :open="detailsVisible" title="Chi tiết đơn hàng" width="700px" :footer="null">
            <template v-if="selectedOrder">
                <div class="p-4">
                    <div class="flex justify-between items-start mb-6">
                        <div>
                            <h3 class="text-lg font-medium">Đơn hàng #{{ selectedOrder.transactionId }}</h3>
                            <p class="text-gray-500">{{ selectedOrder.time }}</p>
                        </div>
                        <a-tag :color="getStatusColor(selectedOrder.status)">
                            {{ selectedOrder.status }}
                        </a-tag>
                    </div>

                    <a-divider />

                    <div class="mb-6">
                        <h4 class="font-medium mb-3">Thông tin sản phẩm</h4>
                        <div class="flex items-center">
                            <a-image :width="80" :src="selectedOrder.image" :preview="{ src: selectedOrder.image }"
                                class="mr-4" />
                            <div>
                                <h5 class="font-medium">{{ selectedOrder.sourceName }}</h5>
                                <p class="text-gray-500">Mã sản phẩm: {{ selectedOrder.sourceId }}</p>
                                <p class="text-red-500 font-medium mt-2">{{ selectedOrder.price }}</p>
                            </div>
                        </div>
                    </div>

                    <a-divider />

                    <div class="grid grid-cols-2 gap-6 mb-6">
                        <div>
                            <h4 class="font-medium mb-3">Thông tin thanh toán</h4>
                            <p><span class="text-gray-500">Phương thức:</span> {{ selectedOrder.paymentMethod }}</p>
                            <p><span class="text-gray-500">Trạng thái:</span> {{ selectedOrder.paymentStatus }}</p>
                            <p><span class="text-gray-500">Thời gian:</span> {{ selectedOrder.paymentTime }}</p>
                        </div>
                        <div>
                            <h4 class="font-medium mb-3">Thông tin người mua</h4>
                            <p><span class="text-gray-500">Tên:</span> {{ selectedOrder.customerName }}</p>
                            <p><span class="text-gray-500">Email:</span> {{ selectedOrder.customerEmail }}</p>
                            <p><span class="text-gray-500">Số điện thoại:</span> {{ selectedOrder.customerPhone }}</p>
                        </div>
                    </div>

                    <a-divider />

                    <div class="flex justify-between items-center">
                        <div>
                            <p class="text-gray-500">Tổng tiền:</p>
                            <p class="text-xl font-bold text-red-500">{{ selectedOrder.price }}</p>
                        </div>
                        <div class="flex space-x-3">
                            <a-button @click="downloadInvoice(selectedOrder)">
                                <template #icon>
                                    <DownloadOutlined />
                                </template>
                                Tải hóa đơn
                            </a-button>
                            <a-button type="primary" @click="detailsVisible = false">
                                Đóng
                            </a-button>
                        </div>
                    </div>
                </div>
            </template>
        </a-modal>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, h } from 'vue';

import {
    UserOutlined,
    SearchOutlined,
    ReloadOutlined,
    EyeOutlined,
    DownloadOutlined
} from '@ant-design/icons-vue';
import { message, Image as AImage } from 'ant-design-vue';

// Table columns
const columns = [
    {
        title: 'Mã giao dịch',
        dataIndex: 'transactionId',
        key: 'transactionId',
        sorter: (a, b) => a.transactionId.localeCompare(b.transactionId),
    },
    {
        title: 'Mã source',
        dataIndex: 'sourceId',
        key: 'sourceId',
        sorter: (a, b) => a.sourceId.localeCompare(b.sourceId),
    },
    {
        title: 'Tên source',
        dataIndex: 'sourceName',
        key: 'sourceName',
        sorter: (a, b) => a.sourceName.localeCompare(b.sourceName),
    },
    {
        title: 'Ảnh',
        dataIndex: 'image',
        key: 'image',
        render: (_, record) => {
            return h(AImage, {
                src: record.image,
                width: 80,
                fallback: 'https://via.placeholder.com/80?text=No+Image',
                alt: record.image_url,
            });
            }

    },
    {
        title: 'Thời gian',
        dataIndex: 'time',
        key: 'time',
        sorter: (a, b) => new Date(a.time) - new Date(b.time),
    },
    {
        title: 'Thao tác',
        dataIndex: 'actions',
        key: 'actions',
    },
];

// Sample data
const generateMockData = () => {
    const data = [];
    const products = [
        { name: 'ACTIVE GEM PHONE FARM', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SbyCg1l9hG9o305W5SWwpv1Mtc4ZaV.png', price: '1.500.000₫' },
        { name: 'AUTO FACEBOOK MANAGER', image: 'https://placehold.co/600x400/3b82f6/ffffff?text=FB+Manager', price: '990.000₫' },
        { name: 'INSTAGRAM GROWTH TOOL', image: 'https://placehold.co/600x400/ec4899/ffffff?text=IG+Tool', price: '1.200.000₫' },
        { name: 'TIKTOK AUTOMATION PRO', image: 'https://placehold.co/600x400/f97316/ffffff?text=TikTok+Pro', price: '1.800.000₫' },
        { name: 'YOUTUBE STUDIO HELPER', image: 'https://placehold.co/600x400/ef4444/ffffff?text=YT+Helper', price: '2.500.000₫' },
    ];

    const statuses = ['Hoàn thành', 'Đang xử lý', 'Đã hủy'];
    const paymentMethods = ['Chuyển khoản ngân hàng', 'Ví điện tử', 'Thẻ tín dụng'];
    const paymentStatuses = ['Đã thanh toán', 'Chưa thanh toán', 'Hoàn tiền'];

    for (let i = 1; i <= 25; i++) {
        const product = products[Math.floor(Math.random() * products.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
        const paymentStatus = paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];

        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));

        data.push({
            key: i.toString(),
            transactionId: `TX${String(i).padStart(6, '0')}`,
            sourceId: `PRD${String(Math.floor(Math.random() * 1000)).padStart(4, '0')}`,
            sourceName: product.name,
            image: product.image,
            time: date.toLocaleString('vi-VN'),
            status: status,
            price: product.price,
            paymentMethod: paymentMethod,
            paymentStatus: paymentStatus,
            paymentTime: date.toLocaleString('vi-VN'),
            customerName: 'Nguyễn Văn A',
            customerEmail: 'nguyenvana@example.com',
            customerPhone: '0987654321',
        });
    }

    return data;
};

// State
const dataSource = ref([]);
const loading = ref(true);
const searchText = ref('');
const dateRange = ref([]);
const pagination = ref({
    current: 1,
    pageSize: 10,
    showSizeChanger: false,
    showQuickJumper: false,
});
const detailsVisible = ref(false);
const selectedOrder = ref(null);

// Computed
const filteredData = computed(() => {
    let result = [...dataSource.value];

    // Apply search filter
    if (searchText.value) {
        const searchLower = searchText.value.toLowerCase();
        result = result.filter(item =>
            item.transactionId.toLowerCase().includes(searchLower) ||
            item.sourceId.toLowerCase().includes(searchLower) ||
            item.sourceName.toLowerCase().includes(searchLower)
        );
    }

    // Apply date range filter
    if (dateRange.value && dateRange.value.length === 2 && dateRange.value[0] && dateRange.value[1]) {
        const startDate = dateRange.value[0].valueOf();
        const endDate = dateRange.value[1].valueOf();

        result = result.filter(item => {
            const itemDate = new Date(item.time).valueOf();
            return itemDate >= startDate && itemDate <= endDate;
        });
    }

    return result;
});

// Methods
const handleTableChange = (pag) => {
    pagination.value.current = pag.current;
};

const handlePageSizeChange = (size) => {
    pagination.value.pageSize = size;
    pagination.value.current = 1;
};

const handleSearch = () => {
    pagination.value.current = 1;
};

const handleReset = () => {
    searchText.value = '';
    dateRange.value = [];
    pagination.value.current = 1;
    message.success('Đã đặt lại bộ lọc');
};

const handleDateRangeChange = (dates) => {
    if (dates && dates.length === 2) {
        pagination.value.current = 1;
    }
};

const viewDetails = (record) => {
    selectedOrder.value = record;
    detailsVisible.value = true;
};

const downloadInvoice = (record) => {
    message.success(`Đã tải xuống hóa đơn cho đơn hàng #${record.transactionId}`);
};

const getStatusColor = (status) => {
    switch (status) {
        case 'Hoàn thành':
            return 'success';
        case 'Đang xử lý':
            return 'processing';
        case 'Đã hủy':
            return 'error';
        default:
            return 'default';
    }
};

// Lifecycle hooks
onMounted(() => {
    // Simulate API call
    setTimeout(() => {
        dataSource.value = generateMockData();
        loading.value = false;
    }, 1000);
});
</script>

<style scoped>
/* Custom styles for the table */
:deep(.ant-table-thead > tr > th) {
    background-color: #f5f7fa;
    font-weight: 600;
}

:deep(.ant-pagination-item-active) {
    border-color: #1890ff;
}

:deep(.ant-pagination-item-active a) {
    color: #1890ff;
}

:deep(.ant-table-row:hover) {
    background-color: #f0f7ff !important;
}
</style>