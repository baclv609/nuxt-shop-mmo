export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();
  
  // Kiểm tra đăng nhập
  if (!auth.loggedIn) {
    return navigateTo('/login');
  }
  
  // Kiểm tra quyền truy cập trang admin
  if (to.path.startsWith('/admin') && !auth.isAdmin) {
    return navigateTo('/404');
  }
  
  // Kiểm tra quyền truy cập trang user
  if (to.path.startsWith('/account') && !auth.isUser) {
    return navigateTo('/404');
  }
});