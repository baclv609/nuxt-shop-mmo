import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  
  // Load auth data from storage if not already loaded
  if (!auth.user) {
    auth.loadAuthFromStorage()
  }

  // Debug logs
  console.log('Admin middleware check:', {
    isLoggedIn: auth.loggedIn,
    isAdmin: auth.isAdmin,
    user: auth.user,
    path: to.path
  })

  if (!auth.loggedIn) {
    return navigateTo('/login')
  }

  if (!auth.isAdmin) {
    console.log('Access denied: Not an admin user')
    return navigateTo('/404')
  }
})