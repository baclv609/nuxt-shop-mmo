export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();

  // Tải dữ liệu auth nếu chưa có
  if (!auth.user) {
    console.log('Tải dữ liệu auth');
    console.log("auth.user", auth.user);
    auth.loadAuthFromStorage();
  }
  
  // Kiểm tra đăng nhập
  // if (!auth.loggedIn) {
  //   return navigateTo('/login');
  // }
  
  // // Kiểm tra quyền truy cập trang admin
  // if (to.path.startsWith('/admin') && !auth.isAdmin) {
  //   return navigateTo('/404');
  // }
  
});