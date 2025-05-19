export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()

  if (process.client && (!auth.user || !auth.token)) {
    await auth.loadAuthFromStorage()
  }
console.log('auth.loggedIn', auth.loggedIn);
console.log('auth.isAdmin', auth.isAdmin);

  console.log('Middleware:', {
    loggedIn: auth.loggedIn,
    isAdmin: auth.isAdmin,
    user: auth.user
  })

  // if (!auth.loggedIn) return navigateTo('/login')
  // if (!auth.isAdmin) return navigateTo('/404')
})
