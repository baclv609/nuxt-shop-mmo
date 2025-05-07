<template>
    <div class="bg-gray-50 min-h-screen">
        <!-- Main Content -->
        <div class="">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <!-- Left Sidebar - Account Menu -->
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
                        <a-button type="primary" block>
                            <template #icon>
                                <ReloadOutlined />
                            </template>
                            Nạp tiền ngay
                        </a-button>
                    </div>

                    <div class="bg-white rounded-lg shadow-sm p-6">
                        <h3 class="text-base font-medium mb-4">Quản lý tài khoản</h3>
                        <a-menu mode="inline" class="border-none" :selectedKeys="['profile']">
                            <a-menu-item key="dashboard">
                                <template #icon>
                                    <DashboardOutlined />
                                </template>
                                Bảng điều khiển
                            </a-menu-item>
                            <a-menu-item key="orders">
                                <template #icon>
                                    <ShoppingOutlined />
                                </template>
                                Đơn hàng của tôi
                            </a-menu-item>
                            <a-menu-item key="recharge">
                                <template #icon>
                                    <WalletOutlined />
                                </template>
                                Nạp tiền
                            </a-menu-item>
                            <a-menu-item key="transactions">
                                <template #icon>
                                    <TransactionOutlined />
                                </template>
                                Lịch sử giao dịch
                            </a-menu-item>
                            <a-menu-item key="profile" class="bg-blue-50 text-blue-500">
                                <template #icon>
                                    <UserOutlined />
                                </template>
                                Thông tin cá nhân
                            </a-menu-item>
                            <a-menu-item key="contact">
                                <template #icon>
                                    <PhoneOutlined />
                                </template>
                                Liên hệ hỗ trợ
                            </a-menu-item>
                        </a-menu>
                    </div>
                </div>

                <!-- Right Content - Profile Information -->
                <div class="lg:col-span-3">
                    <!-- Profile Tabs -->
                    <a-tabs v-model:activeKey="activeTab" class="bg-white rounded-lg shadow-sm p-6">
                        <a-tab-pane key="info" tab="Thông tin cá nhân">
                            <div class="profile-section">
                                <div class="flex flex-col md:flex-row md:items-start mb-8">
                                    <div class="flex-shrink-0 mb-4 md:mb-0 md:mr-8">
                                        <div class="relative">
                                            <a-avatar :size="120"
                                                src="https://placehold.co/200x200/e2e8f0/1e293b?text=User" />
                                            <div class="absolute bottom-0 right-0">
                                                <a-button type="primary" shape="circle" size="small"
                                                    class="flex items-center justify-center">
                                                    <template #icon>
                                                        <EditOutlined />
                                                    </template>
                                                </a-button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex-grow">
                                        <h2 class="text-2xl font-medium mb-2">Nguyễn Văn A</h2>
                                        <p class="text-gray-500 mb-4">Thành viên từ: 15/03/2023</p>
                                        <div class="flex flex-wrap gap-2">
                                            <a-tag color="blue">Khách hàng VIP</a-tag>
                                            <a-tag color="green">Đã xác thực</a-tag>
                                            <a-tag color="gold">Thành viên tích cực</a-tag>
                                        </div>
                                    </div>
                                </div>

                                <a-divider />

                                <h3 class="text-lg font-medium mb-4">Thông tin cơ bản</h3>
                                <a-form :model="userInfo" layout="vertical">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <a-form-item label="Họ và tên" name="fullName">
                                            <a-input v-model:value="userInfo.fullName" placeholder="Nhập họ và tên" />
                                        </a-form-item>

                                        <a-form-item label="Tên hiển thị" name="displayName">
                                            <a-input v-model:value="userInfo.displayName"
                                                placeholder="Nhập tên hiển thị" />
                                        </a-form-item>

                                        <a-form-item label="Email" name="email">
                                            <a-input v-model:value="userInfo.email" placeholder="Nhập email" disabled />
                                            <div class="text-xs text-gray-500 mt-1">Email đã được xác thực
                                                <CheckCircleFilled class="text-green-500" />
                                            </div>
                                        </a-form-item>

                                        <a-form-item label="Số điện thoại" name="phone">
                                            <a-input v-model:value="userInfo.phone" placeholder="Nhập số điện thoại" />
                                            <div class="text-xs text-gray-500 mt-1">Số điện thoại đã được xác thực
                                                <CheckCircleFilled class="text-green-500" />
                                            </div>
                                        </a-form-item>

                                        <a-form-item label="Ngày sinh" name="birthday">
                                            <a-date-picker v-model:value="userInfo.birthday" format="DD/MM/YYYY"
                                                placeholder="Chọn ngày sinh" class="w-full" />
                                        </a-form-item>

                                        <a-form-item label="Giới tính" name="gender">
                                            <a-select v-model:value="userInfo.gender" placeholder="Chọn giới tính">
                                                <a-select-option value="male">Nam</a-select-option>
                                                <a-select-option value="female">Nữ</a-select-option>
                                                <a-select-option value="other">Khác</a-select-option>
                                            </a-select>
                                        </a-form-item>
                                    </div>

                                    <a-divider />

                                    <h3 class="text-lg font-medium mb-4">Địa chỉ</h3>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <a-form-item label="Tỉnh/Thành phố" name="province">
                                            <a-select v-model:value="userInfo.province"
                                                placeholder="Chọn tỉnh/thành phố">
                                                <a-select-option value="hcm">TP. Hồ Chí Minh</a-select-option>
                                                <a-select-option value="hn">Hà Nội</a-select-option>
                                                <a-select-option value="dn">Đà Nẵng</a-select-option>
                                                <a-select-option value="other">Khác</a-select-option>
                                            </a-select>
                                        </a-form-item>

                                        <a-form-item label="Quận/Huyện" name="district">
                                            <a-select v-model:value="userInfo.district" placeholder="Chọn quận/huyện">
                                                <a-select-option value="q1">Quận 1</a-select-option>
                                                <a-select-option value="q2">Quận 2</a-select-option>
                                                <a-select-option value="q3">Quận 3</a-select-option>
                                                <a-select-option value="other">Khác</a-select-option>
                                            </a-select>
                                        </a-form-item>

                                        <a-form-item label="Phường/Xã" name="ward" class="md:col-span-2">
                                            <a-select v-model:value="userInfo.ward" placeholder="Chọn phường/xã">
                                                <a-select-option value="p1">Phường 1</a-select-option>
                                                <a-select-option value="p2">Phường 2</a-select-option>
                                                <a-select-option value="p3">Phường 3</a-select-option>
                                                <a-select-option value="other">Khác</a-select-option>
                                            </a-select>
                                        </a-form-item>

                                        <a-form-item label="Địa chỉ chi tiết" name="address" class="md:col-span-2">
                                            <a-textarea v-model:value="userInfo.address"
                                                placeholder="Nhập địa chỉ chi tiết" :rows="3" />
                                        </a-form-item>
                                    </div>

                                    <a-divider />

                                    <div class="flex justify-end">
                                        <a-button class="mr-2">Hủy</a-button>
                                        <a-button type="primary" @click="saveProfile">Lưu thay đổi</a-button>
                                    </div>
                                </a-form>
                            </div>
                        </a-tab-pane>

                        <a-tab-pane key="security" tab="Bảo mật">
                            <div class="security-section">
                                <h3 class="text-lg font-medium mb-4">Đổi mật khẩu</h3>
                                <a-form :model="passwordForm" layout="vertical">
                                    <a-form-item label="Mật khẩu hiện tại" name="currentPassword"
                                        :rules="[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]">
                                        <a-input-password v-model:value="passwordForm.currentPassword"
                                            placeholder="Nhập mật khẩu hiện tại" />
                                    </a-form-item>

                                    <a-form-item label="Mật khẩu mới" name="newPassword" :rules="[
                                        { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                                        { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' }
                                    ]">
                                        <a-input-password v-model:value="passwordForm.newPassword"
                                            placeholder="Nhập mật khẩu mới" />
                                        <div class="text-xs text-gray-500 mt-1">Mật khẩu phải có ít nhất 8 ký tự, bao
                                            gồm chữ
                                            hoa, chữ thường, số và ký tự đặc biệt</div>
                                    </a-form-item>

                                    <a-form-item label="Xác nhận mật khẩu mới" name="confirmPassword" :rules="[
                                        { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
                                        { validator: validateConfirmPassword }
                                    ]">
                                        <a-input-password v-model:value="passwordForm.confirmPassword"
                                            placeholder="Xác nhận mật khẩu mới" />
                                    </a-form-item>

                                    <a-form-item>
                                        <a-button type="primary" @click="changePassword">Đổi mật khẩu</a-button>
                                    </a-form-item>
                                </a-form>

                                <a-divider />

                                <h3 class="text-lg font-medium mb-4">Xác thực hai yếu tố (2FA)</h3>
                                <div class="bg-gray-50 p-4 rounded-lg mb-4">
                                    <div class="flex items-start">
                                        <div class="mr-4 mt-1">
                                            <LockOutlined class="text-blue-500 text-xl" />
                                        </div>
                                        <div>
                                            <h4 class="font-medium mb-1">Bảo vệ tài khoản của bạn</h4>
                                            <p class="text-gray-500 text-sm mb-2">
                                                Xác thực hai yếu tố bổ sung một lớp bảo mật cho tài khoản của bạn. Mỗi
                                                khi đăng
                                                nhập, bạn sẽ cần nhập mã xác thực từ ứng dụng xác thực.
                                            </p>
                                            <div class="flex items-center">
                                                <span class="mr-2">Trạng thái:</span>
                                                <a-tag v-if="twoFactorEnabled" color="success">Đã bật</a-tag>
                                                <a-tag v-else color="error">Chưa bật</a-tag>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <a-button v-if="!twoFactorEnabled" type="primary" @click="setupTwoFactor">
                                    Thiết lập xác thực hai yếu tố
                                </a-button>
                                <a-button v-else type="default" danger @click="disableTwoFactor">
                                    Tắt xác thực hai yếu tố
                                </a-button>

                                <a-divider />

                                <h3 class="text-lg font-medium mb-4">Phiên đăng nhập</h3>
                                <a-table :columns="sessionColumns" :data-source="sessionData"
                                    :pagination="{ pageSize: 5 }" size="middle">
                                    <template #bodyCell="{ column, text, record }">
                                        <template v-if="column.dataIndex === 'device'">
                                            <div class="flex items-center">
                                                <span v-if="record.deviceType === 'desktop'" class="mr-2">
                                                    <DesktopOutlined />
                                                </span>
                                                <span v-else-if="record.deviceType === 'mobile'" class="mr-2">
                                                    <MobileOutlined />
                                                </span>
                                                <span v-else class="mr-2">
                                                    <TabletOutlined />
                                                </span>
                                                {{ text }}
                                            </div>
                                        </template>

                                        <template v-if="column.dataIndex === 'status'">
                                            <a-tag v-if="record.isCurrentSession" color="processing">Hiện tại</a-tag>
                                            <a-tag v-else color="default">Hoạt động</a-tag>
                                        </template>

                                        <template v-if="column.dataIndex === 'action'">
                                            <a-button type="text" danger @click="terminateSession(record)"
                                                :disabled="record.isCurrentSession">
                                                Đăng xuất
                                            </a-button>
                                        </template>
                                    </template>
                                </a-table>

                                <div class="mt-4">
                                    <a-button danger @click="terminateAllSessions">
                                        Đăng xuất khỏi tất cả các thiết bị khác
                                    </a-button>
                                </div>
                            </div>
                        </a-tab-pane>

                        <a-tab-pane key="notifications" tab="Thông báo">
                            <div class="notifications-section">
                                <h3 class="text-lg font-medium mb-4">Tùy chọn thông báo</h3>
                                <p class="text-gray-500 mb-6">Quản lý cách bạn nhận thông báo từ hệ thống.</p>

                                <div class="space-y-6">
                                    <div class="notification-group">
                                        <h4 class="font-medium mb-3">Thông báo qua Email</h4>
                                        <div class="space-y-3">
                                            <div
                                                class="flex justify-between items-center py-2 border-b border-gray-100">
                                                <div>
                                                    <p class="font-medium">Cập nhật tài khoản</p>
                                                    <p class="text-gray-500 text-sm">Thông báo về các thay đổi trên tài
                                                        khoản
                                                        của bạn</p>
                                                </div>
                                                <a-switch v-model:checked="notificationSettings.email.accountUpdates" />
                                            </div>

                                            <div
                                                class="flex justify-between items-center py-2 border-b border-gray-100">
                                                <div>
                                                    <p class="font-medium">Giao dịch</p>
                                                    <p class="text-gray-500 text-sm">Thông báo khi có giao dịch mới hoặc
                                                        thay
                                                        đổi trạng thái giao dịch</p>
                                                </div>
                                                <a-switch v-model:checked="notificationSettings.email.transactions" />
                                            </div>

                                            <div
                                                class="flex justify-between items-center py-2 border-b border-gray-100">
                                                <div>
                                                    <p class="font-medium">Tin tức & Khuyến mãi</p>
                                                    <p class="text-gray-500 text-sm">Nhận thông tin về tin tức, cập nhật
                                                        và
                                                        khuyến mãi mới</p>
                                                </div>
                                                <a-switch v-model:checked="notificationSettings.email.marketing" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="notification-group">
                                        <h4 class="font-medium mb-3">Thông báo trên Web</h4>
                                        <div class="space-y-3">
                                            <div
                                                class="flex justify-between items-center py-2 border-b border-gray-100">
                                                <div>
                                                    <p class="font-medium">Cập nhật tài khoản</p>
                                                    <p class="text-gray-500 text-sm">Thông báo về các thay đổi trên tài
                                                        khoản
                                                        của bạn</p>
                                                </div>
                                                <a-switch v-model:checked="notificationSettings.web.accountUpdates" />
                                            </div>

                                            <div
                                                class="flex justify-between items-center py-2 border-b border-gray-100">
                                                <div>
                                                    <p class="font-medium">Giao dịch</p>
                                                    <p class="text-gray-500 text-sm">Thông báo khi có giao dịch mới hoặc
                                                        thay
                                                        đổi trạng thái giao dịch</p>
                                                </div>
                                                <a-switch v-model:checked="notificationSettings.web.transactions" />
                                            </div>

                                            <div
                                                class="flex justify-between items-center py-2 border-b border-gray-100">
                                                <div>
                                                    <p class="font-medium">Tin tức & Khuyến mãi</p>
                                                    <p class="text-gray-500 text-sm">Nhận thông tin về tin tức, cập nhật
                                                        và
                                                        khuyến mãi mới</p>
                                                </div>
                                                <a-switch v-model:checked="notificationSettings.web.marketing" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="notification-group">
                                        <h4 class="font-medium mb-3">Thông báo qua SMS</h4>
                                        <div class="space-y-3">
                                            <div
                                                class="flex justify-between items-center py-2 border-b border-gray-100">
                                                <div>
                                                    <p class="font-medium">Cập nhật tài khoản</p>
                                                    <p class="text-gray-500 text-sm">Thông báo về các thay đổi trên tài
                                                        khoản
                                                        của bạn</p>
                                                </div>
                                                <a-switch v-model:checked="notificationSettings.sms.accountUpdates" />
                                            </div>

                                            <div
                                                class="flex justify-between items-center py-2 border-b border-gray-100">
                                                <div>
                                                    <p class="font-medium">Giao dịch</p>
                                                    <p class="text-gray-500 text-sm">Thông báo khi có giao dịch mới hoặc
                                                        thay
                                                        đổi trạng thái giao dịch</p>
                                                </div>
                                                <a-switch v-model:checked="notificationSettings.sms.transactions" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <a-divider />

                                <div class="flex justify-end">
                                    <a-button class="mr-2">Đặt lại</a-button>
                                    <a-button type="primary" @click="saveNotificationSettings">Lưu thay đổi</a-button>
                                </div>
                            </div>
                        </a-tab-pane>

                        <a-tab-pane key="activity" tab="Hoạt động">
                            <div class="activity-section">
                                <h3 class="text-lg font-medium mb-4">Lịch sử hoạt động</h3>

                                <div class="mb-4 flex flex-wrap gap-2">
                                    <a-radio-group v-model:value="activityFilter" button-style="solid">
                                        <a-radio-button value="all">Tất cả</a-radio-button>
                                        <a-radio-button value="login">Đăng nhập</a-radio-button>
                                        <a-radio-button value="profile">Thông tin cá nhân</a-radio-button>
                                        <a-radio-button value="security">Bảo mật</a-radio-button>
                                        <a-radio-button value="transaction">Giao dịch</a-radio-button>
                                    </a-radio-group>
                                </div>

                                <a-timeline>
                                    <a-timeline-item v-for="(activity, index) in filteredActivities" :key="index"
                                        :color="getActivityColor(activity.type)">
                                        <div class="flex flex-col md:flex-row md:justify-between md:items-start">
                                            <div>
                                                <p class="font-medium">{{ activity.title }}</p>
                                                <p class="text-gray-500 text-sm">{{ activity.description }}</p>
                                            </div>
                                            <div class="text-gray-400 text-sm mt-1 md:mt-0 md:ml-4 whitespace-nowrap">
                                                {{ activity.time }}
                                            </div>
                                        </div>
                                    </a-timeline-item>
                                </a-timeline>

                                <div class="mt-4 flex justify-center">
                                    <a-button type="default" @click="loadMoreActivities">
                                        Xem thêm
                                        <template #icon>
                                            <DownOutlined />
                                        </template>
                                    </a-button>
                                </div>
                            </div>
                        </a-tab-pane>
                    </a-tabs>
                </div>
            </div>
        </div>

        <!-- Setup 2FA Modal -->
        <a-modal v-model:visible="twoFactorModal" title="Thiết lập xác thực hai yếu tố" :footer="null" width="500px">
            <div class="p-4">
                <div class="text-center mb-6">
                    <div class="bg-gray-100 p-4 inline-block rounded-lg mb-4">
                        <LockOutlined class="text-blue-500 text-4xl" />
                    </div>
                    <h3 class="text-lg font-medium">Quét mã QR bằng ứng dụng xác thực</h3>
                    <p class="text-gray-500">Sử dụng Google Authenticator, Authy hoặc ứng dụng xác thực khác</p>
                </div>

                <div class="flex justify-center mb-6">
                    <div class="bg-white p-2 border border-gray-200 rounded-lg">
                        <img src="https://placehold.co/200x200/e2e8f0/1e293b?text=QR+Code" alt="QR Code"
                            class="w-48 h-48" />
                    </div>
                </div>

                <div class="mb-6">
                    <p class="text-gray-500 text-sm mb-2">Hoặc nhập mã này vào ứng dụng xác thực của bạn:</p>
                    <div class="flex">
                        <a-input value="ABCD EFGH IJKL MNOP" readonly class="font-mono text-center" />
                        <a-button type="text" class="ml-2" @click="copyToClipboard('ABCD EFGH IJKL MNOP')">
                            <template #icon>
                                <CopyOutlined />
                            </template>
                        </a-button>
                    </div>
                </div>

                <a-divider />

                <div class="mb-6">
                    <h4 class="font-medium mb-2">Xác nhận thiết lập</h4>
                    <p class="text-gray-500 text-sm mb-4">Nhập mã từ ứng dụng xác thực để hoàn tất thiết lập</p>

                    <a-form layout="vertical">
                        <a-form-item label="Mã xác thực" name="verificationCode"
                            :rules="[{ required: true, message: 'Vui lòng nhập mã xác thực!' }]">
                            <a-input v-model:value="twoFactorCode" placeholder="Nhập mã 6 chữ số" maxlength="6" />
                        </a-form-item>
                    </a-form>
                </div>

                <div class="flex justify-end">
                    <a-button class="mr-2" @click="twoFactorModal = false">Hủy</a-button>
                    <a-button type="primary" @click="confirmTwoFactor">Xác nhận</a-button>
                </div>
            </div>
        </a-modal>
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
    EditOutlined,
    LockOutlined,
    CheckCircleFilled,
    CopyOutlined,
    DesktopOutlined,
    MobileOutlined,
    TabletOutlined,
    EnvironmentOutlined,
    FacebookFilled,
    TwitterOutlined,
    InstagramFilled,
    YoutubeFilled
} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import dayjs from 'dayjs';

// Active tab
const activeTab = ref('info');

// User information
const userInfo = reactive({
    fullName: 'Nguyễn Văn A',
    displayName: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0987654321',
    birthday: dayjs('1990-01-01'),
    gender: 'male',
    province: 'hcm',
    district: 'q1',
    ward: 'p1',
    address: '123 Đường ABC, Phường 1, Quận 1',
});

// Password form
const passwordForm = reactive({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
});

// Validate confirm password
const validateConfirmPassword = (rule, value) => {
    if (value !== passwordForm.newPassword) {
        return Promise.reject('Mật khẩu xác nhận không khớp!');
    }
    return Promise.resolve();
};

// Two-factor authentication
const twoFactorEnabled = ref(false);
const twoFactorModal = ref(false);
const twoFactorCode = ref('');

// Session columns
const sessionColumns = [
    {
        title: 'Thiết bị',
        dataIndex: 'device',
        key: 'device',
    },
    {
        title: 'Địa điểm',
        dataIndex: 'location',
        key: 'location',
    },
    {
        title: 'IP',
        dataIndex: 'ip',
        key: 'ip',
    },
    {
        title: 'Thời gian đăng nhập',
        dataIndex: 'loginTime',
        key: 'loginTime',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Thao tác',
        dataIndex: 'action',
        key: 'action',
    },
];

// Session data
const sessionData = [
    {
        key: '1',
        device: 'Chrome trên Windows',
        deviceType: 'desktop',
        location: 'TP. Hồ Chí Minh, Việt Nam',
        ip: '123.45.67.89',
        loginTime: '15/05/2023 14:30',
        isCurrentSession: true,
    },
    {
        key: '2',
        device: 'Safari trên iPhone',
        deviceType: 'mobile',
        location: 'TP. Hồ Chí Minh, Việt Nam',
        ip: '123.45.67.90',
        loginTime: '14/05/2023 09:15',
        isCurrentSession: false,
    },
    {
        key: '3',
        device: 'Firefox trên Windows',
        deviceType: 'desktop',
        location: 'Hà Nội, Việt Nam',
        ip: '123.45.67.91',
        loginTime: '10/05/2023 18:45',
        isCurrentSession: false,
    },
    {
        key: '4',
        device: 'Chrome trên Android',
        deviceType: 'mobile',
        location: 'Đà Nẵng, Việt Nam',
        ip: '123.45.67.92',
        loginTime: '05/05/2023 11:20',
        isCurrentSession: false,
    },
];

// Notification settings
const notificationSettings = reactive({
    email: {
        accountUpdates: true,
        transactions: true,
        marketing: false,
    },
    web: {
        accountUpdates: true,
        transactions: true,
        marketing: true,
    },
    sms: {
        accountUpdates: true,
        transactions: true,
    },
});

// Activity filter
const activityFilter = ref('all');

// Activity data
const activities = ref([
    {
        type: 'login',
        title: 'Đăng nhập thành công',
        description: 'Đăng nhập từ Chrome trên Windows',
        time: '15/05/2023 14:30',
    },
    {
        type: 'profile',
        title: 'Cập nhật thông tin cá nhân',
        description: 'Thay đổi số điện thoại liên hệ',
        time: '14/05/2023 10:15',
    },
    {
        type: 'security',
        title: 'Thay đổi mật khẩu',
        description: 'Mật khẩu đã được thay đổi thành công',
        time: '10/05/2023 09:30',
    },
    {
        type: 'transaction',
        title: 'Nạp tiền thành công',
        description: 'Nạp 1.000.000₫ qua chuyển khoản ngân hàng',
        time: '05/05/2023 16:45',
    },
    {
        type: 'login',
        title: 'Đăng nhập thành công',
        description: 'Đăng nhập từ Safari trên iPhone',
        time: '01/05/2023 08:20',
    },
    {
        type: 'transaction',
        title: 'Mua hàng thành công',
        description: 'Mua ACTIVE GEM PHONE FARM với giá 1.500.000₫',
        time: '28/04/2023 14:10',
    },
    {
        type: 'security',
        title: 'Bật xác thực hai yếu tố',
        description: 'Xác thực hai yếu tố đã được kích hoạt',
        time: '25/04/2023 11:30',
    },
    {
        type: 'profile',
        title: 'Cập nhật ảnh đại diện',
        description: 'Thay đổi ảnh đại diện',
        time: '20/04/2023 09:15',
    },
]);

// Computed
const filteredActivities = computed(() => {
    if (activityFilter.value === 'all') {
        return activities.value;
    }
    return activities.value.filter(activity => activity.type === activityFilter.value);
});

// Methods
const saveProfile = () => {
    message.success('Thông tin cá nhân đã được cập nhật thành công!');
};

const changePassword = () => {
    message.success('Mật khẩu đã được thay đổi thành công!');
    passwordForm.currentPassword = '';
    passwordForm.newPassword = '';
    passwordForm.confirmPassword = '';
};

const setupTwoFactor = () => {
    twoFactorModal.value = true;
};

const confirmTwoFactor = () => {
    if (twoFactorCode.value.length === 6) {
        twoFactorEnabled.value = true;
        twoFactorModal.value = false;
        message.success('Xác thực hai yếu tố đã được kích hoạt thành công!');
        twoFactorCode.value = '';
    } else {
        message.error('Vui lòng nhập mã xác thực 6 chữ số!');
    }
};

const disableTwoFactor = () => {
    twoFactorEnabled.value = false;
    message.success('Xác thực hai yếu tố đã được tắt!');
};

const terminateSession = (session) => {
    message.success(`Đã đăng xuất khỏi thiết bị ${session.device}!`);
};

const terminateAllSessions = () => {
    message.success('Đã đăng xuất khỏi tất cả các thiết bị khác!');
};

const saveNotificationSettings = () => {
    message.success('Cài đặt thông báo đã được lưu thành công!');
};

const getActivityColor = (type) => {
    switch (type) {
        case 'login':
            return 'blue';
        case 'profile':
            return 'green';
        case 'security':
            return 'red';
        case 'transaction':
            return 'gold';
        default:
            return 'gray';
    }
};

const loadMoreActivities = () => {
    // Simulate loading more activities
    message.info('Đang tải thêm hoạt động...');
};

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    message.success('Đã sao chép vào clipboard');
};
</script>

<style scoped>
:deep(.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn) {
    color: #1890ff;
}

:deep(.ant-tabs-ink-bar) {
    background-color: #1890ff;
}

:deep(.ant-timeline-item-tail) {
    border-left: 2px solid #e6e6e6;
}

:deep(.ant-form-item-label > label) {
    font-weight: 500;
}
</style>