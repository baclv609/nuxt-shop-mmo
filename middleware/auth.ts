import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useAuthStore();
  if (!user.loggedIn) {
    return navigateTo("/login");
  }
});
