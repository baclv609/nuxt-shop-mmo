<script setup>
import { reactive } from 'vue';
import { Form, Input, Button, message } from 'ant-design-vue';
import { useRouter } from 'vue-router';

definePageMeta({
    layout: 'auth',
});

const router = useRouter();

const formState = reactive({
    email: '',
});

const rules = {
    email: [
        { required: true, message: 'Vui lòng nhập email', trigger: 'blur' },
        { type: 'email', message: 'Email không hợp lệ', trigger: ['blur', 'change'] },
    ],
};

const onFinish = () => {
    // Giả lập gửi email thành công
    message.success('Đã gửi yêu cầu đặt lại mật khẩu. Vui lòng kiểm tra email!');
    router.push('/reset-password'); // hoặc ở lại, tuỳ bạn
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

        <h2 class="text-2xl font-bold text-center text-gray-700 mb-2">Quên mật khẩu</h2>
        <p class="text-sm text-center text-gray-500 mb-6">
            Nhập email để đặt lại mật khẩu
        </p>

        <Form :model="formState" :rules="rules" @finish="onFinish" @finishFailed="onFinishFailed" layout="vertical">
            <Form.Item label="Email" name="email">
                <Input v-model:value="formState.email" placeholder="Nhập email của bạn" class="px-4 py-2"/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" class="px-4 py-2" html-type="submit" block>
                    Gửi yêu cầu
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
