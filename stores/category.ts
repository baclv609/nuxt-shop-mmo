import { defineStore } from "pinia";

interface Category {
  id: number;
  name: string;
  description: string;
}

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [] as Category[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getCategories: (state) => state.categories,
    getCategoryById: (state) => (id: number) =>
      state.categories.find((c) => c.id === id),
  },

  actions: {
    async fetchCategories() {
      this.loading = true;
      this.error = null;
      try {
        const config = useRuntimeConfig();
        const data = await $fetch<{ categories: Category[] }>(`${config.public.apiBaseUrl}/categories`);

        if (data?.categories) {
          this.categories = data.categories;
        } else if (Array.isArray(data)) {
          this.categories = data;
        } else {
          this.categories = [];
        }
      } catch (error: any) {
        console.error("Fetch error:", error);
        this.error = error?.data?.message || error.message || "Lỗi không xác định";
        this.categories = [];
      // Instead of throwing error, return empty array and let component handle display
      return [];
      } finally {
        this.loading = false;
      }
    },

    async createCategory(category: Partial<Category>) {
      this.loading = true;
      this.error = null;
      try {
        const config = useRuntimeConfig();
        const data = await $fetch<Category>(`${config.public.apiBaseUrl}/categories`, {
          method: "POST",
          body: category,
        });

        await this.fetchCategories();
        return data;
      } catch (error: any) {
        this.error = error?.data?.message || error.message || "Không thể tạo danh mục";
        return [];
      } finally {
        this.loading = false;
      }
    },

       async updateCategory(id: number, category: Partial<Category>) {
      this.loading = true;
      this.error = null;
      try {
        const config = useRuntimeConfig();
        const data = await $fetch<Category>(`${config.public.apiBaseUrl}/categories/${id}`, {
          method: "PUT",
          body: category,
        });

        await this.fetchCategories();
        return data;
      } catch (error: any) {
        this.error = error?.data?.message || error.message || "Không thể cập nhật danh mục";
        return [];
      } finally {
        this.loading = false;
      }
    },

  async deleteCategory(id: number) {
      this.loading = true;
      this.error = null;
      try {
        const config = useRuntimeConfig();
        await $fetch(`${config.public.apiBaseUrl}/categories/${id}`, {
          method: "DELETE",
        });

        await this.fetchCategories();
      } catch (error: any) {
        this.error = error?.data?.message || error.message || "Không thể xóa danh mục";
        return [];
      } finally {
        this.loading = false;
      }
    },
  },
});
