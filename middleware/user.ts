import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()
  
  // Tải dữ liệu auth nếu chưa có
  if (!auth.user && process.client) {
    await auth.loadAuthFromStorage()
  }

  // Kiểm tra đăng nhập
  if (!auth.loggedIn) {
    console.log('Chưa đăng nhập, chuyển hướng đến trang login')
    return navigateTo('/login')
  }

  // Kiểm tra quyền user
  if (!auth.isUser && !auth.isAdmin) {
    console.log('Không có quyền user')
    return navigateTo('/403')
  }
})