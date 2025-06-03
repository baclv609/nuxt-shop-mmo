// ~/composables/useAuth.ts
import { useAuthStore } from "~/stores/auth";
import { useRuntimeConfig, useFetch } from "#app";

interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: "user" | "admin";
  };
  wallet: {
    id: number;
    user_id: number;
    balance: string;
    created_at: string;
  };
}

export const useAuth = () => {
  const authStore = useAuthStore();
  const config = useRuntimeConfig();

  const login = async (email: string, password: string) => {
    const { data, error } = await useFetch<AuthResponse>(
      `${config.public.apiBaseUrl}/auth/login`,
      {
        method: "POST",
        body: { email, password },
      }
    );

    if (error.value) {
      throw new Error(error.value.data?.message || "Đăng nhập thất bại");
    }

    if (data.value?.token && data.value.user && data.value.wallet) {
      authStore.setAuth(data.value.token, data.value.user, data.value.wallet);
      return true;
    }

    throw new Error("Dữ liệu phản hồi không hợp lệ");
  };

  const register = async (name: string, email: string, password: string) => {
    const { data, error } = await useFetch<AuthResponse>(
      `${config.public.apiBaseUrl}/auth/register`,
      {
        method: "POST",
        body: { name, email, password },
      }
    );

    if (error.value) {
      throw new Error(error.value.data?.message || "Đăng ký thất bại");
    }

    if (data.value?.token && data.value.user && data.value.wallet) {
      authStore.setAuth(data.value.token, data.value.user, data.value.wallet);
      return true;
    }

    throw new Error("Dữ liệu phản hồi không hợp lệ");
  };

  const logout = () => {
    authStore.logout();
    navigateTo("/dang-nhap");
  };

  return {
    login,
    register,
    logout,
  };
};
