// plugins/antdv.client.ts
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css' // dùng "reset.css" để tránh xung đột

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(Antd)
})
