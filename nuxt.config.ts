import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  compatibilityDate: "2025-04-18",
  css: [
    '@/assets/css/tailwind.css',
    'ant-design-vue/dist/reset.css' // hoặc 'antd.css' nếu bạn dùng bản cũ hơn
  ],
  components: true, // Đảm bảo bật auto import components
})
