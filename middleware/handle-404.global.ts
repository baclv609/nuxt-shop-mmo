// middleware/handle-404.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
    const matched = to.matched.length > 0
    if (!matched) {
    //   throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
      return navigateTo('/404')
    }
  })
  