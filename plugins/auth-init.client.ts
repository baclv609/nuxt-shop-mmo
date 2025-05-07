// plugins/auth-init.client.ts
import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(() => {
  const auth = useAuthStore()
  
  // Load auth data on app start
  auth.loadAuthFromStorage()
  
  // Debug log
  console.log('Initial auth state:', {
    isLoggedIn: auth.loggedIn,
    isAdmin: auth.isAdmin,
    user: auth.user
  })
})
