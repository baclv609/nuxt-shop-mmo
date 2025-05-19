import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  compatibilityDate: "2025-04-18",
  css: [
    '@/assets/css/tailwind.css',
  ],
  components: true, // Đảm bảo bật auto import components
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,
    }
  }
})
