import { message } from "ant-design-vue";

export const useAuth = () => {
  const config = useRuntimeConfig();
  const auth = useAuthStore();
  const router = useRouter();

  // Hàm login
  const login = async (email, password) => {
    try {
      const { data, error } = await useFetch(
        `${config.public.apiBaseUrl}/auth/login`,
        {
          method: "POST",
          body: { email, password },
        }
      );

      if (error.value) {
        throw new Error(error.value.data?.message || "Đăng nhập thất bại");
      }

      if (data.value?.token && data.value?.user) {
        console.log("user", data.value.user);
        console.log("wallet", data.value.wallet);

        // Lưu thông tin user, token và wallet
        auth.setAuth(data.value.token, data.value.user, data.value.wallet);

        // Hiển thị thông báo thành công
        message.success(data.value.message || "Đăng nhập thành công");

        return data.value;
      } else {
        // Trường hợp bất thường
        message.error(
          data.value?.message ||
            "Đăng nhập thất bại vui lòng kiểm tra lại tài khoản và mật khẩu"
        );
        throw new Error(data.value?.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      console.error("Login error:", err);
      message.error(err.message || "Đăng nhập thất bại");
      throw err;
    }
  };

  const register = async (username, email, password) => {
    try {
      const { data, error } = await useFetch(
        `${config.public.apiBaseUrl}/auth/register`,
        {
          method: "POST",
          body: {
            name: username,
            email,
            password,
          },
        }
      );

      if (error.value) {
        throw new Error(error.value.data?.message || "Đăng ký thất bại");
      }

      if (data.value?.token && data.value?.user) {
        // Lưu thông tin user, token và wallet
        auth.setAuth(data.value.token, data.value.user, data.value.wallet);

        //  Hiển thị thông báo thành công
        message.success(data.value.message || "Đăng ký thành công");

        return data.value;
      } else {
        message.error(data.value?.message || "Đăng ký thất bại");
        throw new Error(data.value?.message || "Đăng ký thất bại");
      }
    } catch (err) {
      console.error("Register error:", err);
      message.error(err.message || "Đăng ký thất bại");
      throw err;
    }
  };
  const refreshWalletBalance = async () => {
    try {
      await auth.fetchLatestWalletBalance();
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
    }
  };

  // Hàm logout
  const logout = () => {
    auth.logout();
    message.success("Đăng xuất thành công");
    router.push("/login");
  };

  return { login, register, logout, refreshWalletBalance };
};
