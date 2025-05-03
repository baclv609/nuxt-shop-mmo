<script setup>
import { reactive } from 'vue'
import { message } from 'ant-design-vue'
import { useAuth } from "@/composables/useAuth";
definePageMeta({ layout: "auth" });

const config = useRuntimeConfig();
const { register } = useAuth();
const formState = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const rules = {
  username: [
    { required: true, message: 'Vui lòng nhập tên đăng nhập', trigger: 'blur' },
  ],
  email: [
    { required: true, message: 'Vui lòng nhập email', trigger: 'blur' },
    { type: 'email', message: 'Email không hợp lệ', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
  ],
  confirmPassword: [
    {
      validator: (_, value) => {
        if (!value) {
          return Promise.reject('Vui lòng xác nhận mật khẩu');
        }
        if (value !== formState.password) {
          return Promise.reject('Mật khẩu xác nhận không khớp');
        }
        return Promise.resolve();
      },
      trigger: 'blur',
    },
  ],

}
onMounted(() => {
  console.log('API base URL:', config.public.apiBaseUrl)
})

const handleSubmit = async () => {
  try {

    const res = await register(formState.username, formState.email, formState.password);
    console.log('register', res)
  } catch (err) {
    message.error('Có lỗi xảy ra, vui lòng thử lại sau')
    console.error(err)
  }
}

const signInWithGoogle = () => {
  message.info('Tính năng Google Sign In chưa được tích hợp.')
}
const signInWithFacebook = () => {
  message.info('Tính năng Facebook Sign In chưa được tích hợp.')
}
</script>

<template>
  <div class="w-full max-w-lg p-6 m-auto !bg-white rounded-lg shadow-md">
    <div class="flex justify-center mx-auto mb-6">
      <img class="w-auto h-8" src="https://merakiui.com/images/logo.svg" alt="Logo" />
    </div>
    <h2 class="text-2xl font-bold text-center text-gray-700 mb-2">Đăng ký</h2>

    <a-form :model="formState" :rules="rules" @finish="handleSubmit" layout="vertical">
      <a-form-item label="Username" name="username">
        <a-input v-model:value="formState.username" placeholder="Nhập tên đăng nhập" class="px-4 py-2" />
      </a-form-item>

      <a-form-item label="Email" name="email">
        <a-input v-model:value="formState.email" placeholder="Nhập email" class="px-4 py-2" />
      </a-form-item>

      <a-form-item label="Password" name="password">
        <a-input-password v-model:value="formState.password" placeholder="Nhập mật khẩu" class="px-4 py-2" />
      </a-form-item>

      <a-form-item label="Confirm Password" name="confirmPassword">
        <a-input-password v-model:value="formState.confirmPassword" placeholder="Xác nhận mật khẩu" class="px-4 py-2" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" class="w-full">
          Đăng ký
        </a-button>
      </a-form-item>
    </a-form>

    <div class="flex items-center justify-between mt-4">
      <span class="w-1/5 border-b"></span>
      <span class="text-xs text-center text-gray-500 uppercase">khác</span>
      <span class="w-1/5 border-b"></span>
    </div>

    <div class="flex items-center mt-6 gap-2">
      <a-button type="primary" danger class="flex-1" @click="signInWithGoogle">
        Đăng ký với Google
      </a-button>
      <a-button class="flex-1" @click="signInWithFacebook">
        <span class="text-sm">Facebook</span>
      </a-button>
    </div>

    <p class="mt-8 text-xs font-light text-center text-gray-400">
      Đã có tài khoản?
      <NuxtLink to="/login" class="font-medium text-gray-700 hover:underline">
        Đăng nhập ngay
      </NuxtLink>
    </p>
  </div>
</template>
