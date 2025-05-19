import { defineStore } from 'pinia';

interface Product {
  id: number;
  category_id: number;
  name: string;
  description: string;
  original_price: string;
  discount_price: string;
  hot: number;
  image_url: string;
  download_link: string;
  created_at: string;
  updated_at: string;
  view_count: number;
  purchase_count: number;
  flash_sale_price: string | null;
  flash_sale_start: string | null;
  flash_sale_end: string | null;
  is_free: number;
  meta_title: string | null;
  meta_description: string | null;
  slug: string | null;
  alt_text: string | null;
}

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getProducts: (state) => state.products,
    getHotProducts: (state) => state.products.filter(p => p.hot === 1),
    getProductById: (state) => (id: number) => state.products.find(p => p.id === id),
  },

  actions: {
    async fetchProducts() {
      this.loading = true;
      try {
        const config = useRuntimeConfig();
        const response = await $fetch<Product[]>(`${config.public.apiBaseUrl}/products`);
        this.products = response;
      } catch (error: any) {
        this.error = error.message || 'Không thể tải danh sách sản phẩm';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createProduct(product: Partial<Product>) {
      this.loading = true;
      try {
        const config = useRuntimeConfig();
        const response = await $fetch<Product>(`${config.public.apiBaseUrl}/products`, {
          method: 'POST',
          body: product,
        });
        await this.fetchProducts();
        return response;
      } catch (error: any) {
        this.error = error.message || 'Không thể tạo sản phẩm';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateProduct(id: number, product: Partial<Product>) {
      this.loading = true;
      try {
        const config = useRuntimeConfig();
        const response = await $fetch<Product>(`${config.public.apiBaseUrl}/products/${id}`, {
          method: 'PUT',
          body: product,
        });
        await this.fetchProducts();
        return response;
      } catch (error: any) {
        this.error = error.message || 'Không thể cập nhật sản phẩm';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteProduct(id: number) {
      this.loading = true;
      try {
        const config = useRuntimeConfig();
        await $fetch(`${config.public.apiBaseUrl}/products/${id}`, {
          method: 'DELETE',
        });
        await this.fetchProducts();
      } catch (error: any) {
        this.error = error.message || 'Không thể xóa sản phẩm';
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});