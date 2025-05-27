import { defineStore } from 'pinia';
import { message } from 'ant-design-vue';

interface OrderItem {
  id: number;
  name: string;
  image_url: string;
  price: number;
  quantity: number;
  download_link: string;
}

interface Order {
  id: number;
  items: OrderItem[];
  total_amount: number;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

interface OrderState {
  currentOrder: Order | null;
  loading: boolean;
}

export const useOrderStore = defineStore('order', {
  state: (): OrderState => ({
    currentOrder: null,
    loading: false,
  }),

  actions: {
    async createOrder(product: any) {
      try {
        this.loading = true;
        const config = useRuntimeConfig();
        
        const response = await $fetch<Order>(`${config.public.apiBaseUrl}/orders`, {
          method: 'POST',
          body: {
            items: [{
              product_id: product.id,
              quantity: 1,
              price: product.flash_sale_price || product.discount_price || product.original_price
            }]
          }
        });

        this.currentOrder = response;
        return response;
      } catch (error: any) {
        message.error(error.message || 'Có lỗi xảy ra khi tạo đơn hàng');
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async processPayment(orderId: number) {
      try {
        this.loading = true;
        const config = useRuntimeConfig();
        
        const response = await $fetch<Order>(`${config.public.apiBaseUrl}/orders/${orderId}/payment`, {
          method: 'POST',
          body: {
            payment_method: 'wallet'
          }
        });

        if (response.status === 'completed') {
          message.success('Thanh toán thành công!');
          // Cập nhật trạng thái đơn hàng
          this.currentOrder = response;
          return response;
        } else {
          throw new Error('Thanh toán thất bại');
        }
      } catch (error: any) {
        message.error(error.message || 'Có lỗi xảy ra khi xử lý thanh toán');
        throw error;
      } finally {
        this.loading = false;
      }
    },

    clearOrder() {
      this.currentOrder = null;
    }
  }
}); 