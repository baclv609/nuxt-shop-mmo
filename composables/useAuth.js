import { message } from "ant-design-vue";

export const useAuth = () => {
    const config = useRuntimeConfig();
    const auth = useAuthStore();
    const router = useRouter();
  
    // Hàm login
    const login = async (email, password) => {
      try {
        const { data, error } = await useFetch(`${config.public.apiBaseUrl}/auth/login`, {
          method: "POST",
          body: { email, password },
        });
    
        if (error.value) {
          throw new Error(error.value.data?.message || "Đăng nhập thất bại");
        }

        if (data.value?.code === 200) {
          // Debug log
          console.log('Login response:', data.value);
          
          // Lưu thông tin user và token
          auth.setAuth(data.value.token, data.value.user);
          
          // Debug log sau khi lưu
          console.log('Auth state after login:', {
            token: auth.token,
            user: auth.user,
            isAdmin: auth.isAdmin
          });

          message.success(data.value.message || "Đăng nhập thành công");
          return data.value;
        } else {
          message.error(data.value?.message || "Đăng nhập thất bại");
          throw new Error(data.value?.message || "Đăng nhập thất bại");
        }
      } catch (err) {
        console.error('Login error:', err);
        throw err;
      }
    };
  
    // Hàm register
    const register = async (username, email, password) => {
      try {
        const { data, error } = await useFetch(`${config.public.apiBaseUrl}/auth/register`, {
          method: "POST",
          body: {
            name: username,
            email: email,
            password: password,
          },
        });
    
        if (error.value) {
          throw new Error(error.value.data?.message || "Đăng ký thất bại");
        }

        if (data.value?.code === 201) {
          // Debug log
          console.log('Register response:', data.value);
          
          // Lưu thông tin user và token sau khi đăng ký thành công
          auth.setAuth(data.value.token, data.value.user);
          
          // Debug log sau khi lưu
          console.log('Auth state after register:', {
            token: auth.token,
            user: auth.user,
            isAdmin: auth.isAdmin
          });

          message.success(data.value.message || "Đăng ký thành công");
          return data.value;
        } else {
          message.error(data.value?.message || "Đăng ký thất bại");
          throw new Error(data.value?.message || "Đăng ký thất bại");
        }
      } catch (err) {
        console.error('Register error:', err);
        throw err;
      }
    };

    // Hàm logout
    const logout = () => {
      auth.logout();
      message.success("Đăng xuất thành công");
      router.push("/login");
    };
  
    return { login, register, logout };
};
