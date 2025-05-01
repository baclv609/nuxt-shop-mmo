<script setup>
import { reactive } from 'vue';
import { Form, Input, Button, message } from 'ant-design-vue';
import { useRouter } from 'vue-router';

definePageMeta({
    layout: 'auth',
});

const router = useRouter();

const formState = reactive({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
});

const rules = {
    currentPassword: [
        { required: true, message: 'Vui lòng nhập mật khẩu cũ', trigger: 'blur' },
    ],
    newPassword: [
        { required: true, message: 'Vui lòng nhập mật khẩu mới', trigger: 'blur' },
        { min: 6, message: 'Mật khẩu phải ít nhất 6 ký tự', trigger: 'blur' },
    ],
    confirmPassword: [
        {
            validator: (_, value) => {
                if (!value) {
                    return Promise.reject('Vui lòng xác nhận mật khẩu');
                }
                if (value !== formState.newPassword) {
                    return Promise.reject('Mật khẩu xác nhận không khớp');
                }
                return Promise.resolve();
            },
            trigger: 'blur',
        },
    ],
};

const onFinish = () => {
    // Giả lập đổi mật khẩu thành công
    message.success('Mật khẩu đã được thay đổi thành công!');

    router.push('/login'); // Hoặc ở lại nếu muốn
};

const onFinishFailed = () => {
    message.error('Vui lòng kiểm tra lại thông tin');
};
</script>

<template>
    <div class="w-full max-w-sm p-6 m-auto !bg-white rounded-lg shadow-md">
        <div class="flex justify-center mb-6">
            <img class="w-auto h-8" src="https://merakiui.com/images/logo.svg" alt="Logo" />
        </div>

        <h2 class="text-2xl font-bold text-center text-gray-700 mb-2">Đổi mật khẩu</h2>
        <p class="text-sm text-center text-gray-500 mb-6">
            Nhập mật khẩu cũ, mật khẩu mới và xác nhận mật khẩu của bạn
        </p>

        <Form :model="formState" :rules="rules" @finish="onFinish" @finishFailed="onFinishFailed" layout="vertical">
            <Form.Item label="Mật khẩu cũ" name="currentPassword">
                <Input.Password v-model:value="formState.currentPassword" placeholder="Nhập mật khẩu cũ"
                    class="px-4 py-2" />
            </Form.Item>

            <Form.Item label="Mật khẩu mới" name="newPassword">
                <Input.Password v-model:value="formState.newPassword" placeholder="Nhập mật khẩu mới"
                    class="px-4 py-2" />
            </Form.Item>

            <Form.Item label="Xác nhận mật khẩu" name="confirmPassword">
                <Input.Password v-model:value="formState.confirmPassword" placeholder="Xác nhận mật khẩu"
                    class="px-4 py-2" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" html-type="submit" block>
                    Đổi mật khẩu
                </Button>
            </Form.Item>
        </Form>

        <div class="text-center mt-4">
            <NuxtLink to="/login" class="text-sm text-blue-500 hover:underline">
                Quay lại đăng nhập
            </NuxtLink>
        </div>
    </div>
</template>
