// plugins/auth-init.client.ts
import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(() => {
  const auth = useAuthStore()
  auth.loadAuthFromStorage()
})
