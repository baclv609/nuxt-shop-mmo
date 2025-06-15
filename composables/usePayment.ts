import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useRuntimeConfig, useFetch } from "#app";

interface PaymentItem {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

interface PurchaseResponse {
  message: string;
  order_id: number;
  total_amount: number;
}

export const usePayment = () => {
  const currentPayment = ref<PaymentItem | null>(null);
  const authStore = useAuthStore();
  const config = useRuntimeConfig();
  const isProcessing = ref(false);

  const loadCurrentPayment = () => {
    const storedPayment = localStorage.getItem("current_payment");
    if (storedPayment) {
      currentPayment.value = JSON.parse(storedPayment);
    }
  };

  const setCurrentPayment = (item: PaymentItem) => {
    currentPayment.value = { ...item };
    saveToLocalStorage();
  };

  const clearCurrentPayment = () => {
    currentPayment.value = null;
    localStorage.removeItem("current_payment");
  };

  const saveToLocalStorage = () => {
    if (currentPayment.value) {
      localStorage.setItem(
        "current_payment",
        JSON.stringify(currentPayment.value)
      );
    }
  };

  const formatPrice = (price: number | string) => {
    if (!price) return "Liên hệ";
    const numericPrice = typeof price === "string" ? parseFloat(price) : price;
    return (
      numericPrice.toLocaleString("vi-VN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) + " ₫"
    );
  };

  const parseCurrency = (value: string | number): number => {
    if (typeof value === "string") {
      // Loại bỏ dấu chấm ngăn cách và chuyển dấu phẩy thành dấu chấm
      return parseFloat(value.replace(/\./g, "").replace(",", "."));
    }
    return value;
  };

  const hasEnoughBalance = (price: number | string) => {
    const numericPrice = parseCurrency(price);
    const numericBalance = parseCurrency(authStore.walletBalance);
    return numericBalance >= numericPrice;
  };

  const getFormattedBalance = () => {
    console.log("authStore.walletBalance", authStore.walletBalance);
    return formatPrice(authStore.walletBalance);
  };

 const processPurchase = async (router?: any) => {
  if (!currentPayment.value || !authStore.token) {
    throw new Error("Thiếu thông tin mua hàng hoặc chưa đăng nhập");
  }

    if (!hasEnoughBalance(currentPayment.value.price)) {
      throw new Error("Số dư ví không đủ");
    }

    try {
      isProcessing.value = true;

      const { data, error } = await useFetch<PurchaseResponse>(
        `${config.public.apiBaseUrl}/orders/buy-now`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
          body: {
            user_id: authStore.user?.id,
            product_id: currentPayment.value.id,
          },
        }
      );

      if (error.value) {
        throw new Error(error.value.data?.message || "Lỗi mua hàng");
      }

      if (data.value?.total_amount) {
        // Trừ ví thủ công phía client (nếu server không trả số dư mới)
        const newBalance =
          parseFloat(authStore.walletBalance) - data.value.total_amount;
        authStore.updateWalletBalance(newBalance.toFixed(2));
        clearCurrentPayment();
        return {
          success: true,
          order_id: data.value.order_id,
          message: "Mua hàng thành công",
        };
      }

      throw new Error("Giao dịch thất bại");
    } catch (err: any) {
      throw new Error(err.message || "Lỗi khi xử lý mua hàng");
    } finally {
      isProcessing.value = false;
    }
  };

  return {
    currentPayment,
    isProcessing,
    loadCurrentPayment,
    setCurrentPayment,
    clearCurrentPayment,
    formatPrice,
    hasEnoughBalance,
    getFormattedBalance,
    processPurchase,
  };
};
