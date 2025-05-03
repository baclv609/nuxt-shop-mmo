export const useAuth = () => {
    const config = useRuntimeConfig();
  
    // Hàm login
    const login = async (email, password) => {
      console.log(email, password);
      const { data, error } = await useFetch(`${config.public.apiBaseUrl}/auth/login`, {
        method: "POST",
        body: { email, password },
      });
  
      if (error.value) {
        throw error.value;
      }
  
      return data.value;
    };
  
    // Hàm register
    const register = async (username, email, password) => {
      try {
        // Gọi API đăng ký
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
        if (data.value?.status === 'success') {
          return data.value;
        } else {
          // Trường hợp response có status 200 nhưng là lỗi logic
          message.error(data.value?.message || 'Đăng ký thất bại');
        }
      } catch (err) {
        console.error(err);
        throw new Error("Có lỗi xảy ra, vui lòng thử lại sau");
      }
    };
  
    // Trả về cả hai hàm login và register
    return { login, register };
  };
