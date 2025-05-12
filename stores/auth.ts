// ~/stores/auth.ts
import { defineStore } from 'pinia'

interface Wallet {
  id: number;
  user_id: number;
  balance: string;
  created_at: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthResponse {
  message: string;
  token: string;
  user: User;
  wallet: Wallet;
}

interface WalletResponse {
  message: string;
  wallet: Wallet;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as User | null,
    wallet: null as Wallet | null,
  }),

  getters: {
    loggedIn: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin',
    isUser: (state) => state.user?.role === 'user',
    userWallet: (state) => state.wallet,
    walletBalance: (state) => state.wallet?.balance || '0',
  },

  actions: {
    setAuth(token: string, user: User, wallet: Wallet) {
      console.log('Setting auth data:', { token, user, wallet });
      this.token = token;
      this.user = user;
      this.wallet = wallet;
      
      if (process.client) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(this.user));
      }
    },

    loadAuthFromStorage() {
      if (process.client) {
        try {
          const token = localStorage.getItem('token');
          const userStr = localStorage.getItem('user');
          
          if (token && userStr) {
            const user = JSON.parse(userStr);
            this.token = token;
            this.user = user;
            // Fetch latest wallet balance when loading from storage
            this.fetchLatestWalletBalance();
            console.log('Loaded auth data:', { token, user });
          }
        } catch (error) {
          console.error('Error loading auth data:', error);
          this.logout();
        }
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      this.wallet = null;
      if (process.client) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },

    updateUserData(userData: Partial<User>) {
      if (this.user) {
        this.user = { ...this.user, ...userData };
        if (process.client) {
          localStorage.setItem('user', JSON.stringify(this.user));
        }
      }
    },

    updateWalletBalance(balance: string) {
      if (this.wallet) {
        this.wallet.balance = balance;
      }
    },

    async fetchLatestWalletBalance() {
      if (!this.token) return null;

      try {
        const config = useRuntimeConfig();
        const { data, error } = await useFetch<WalletResponse>(
          `${config.public.apiBaseUrl}/wallets`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          }
        );

        if (error.value) {
          throw new Error(error.value.data?.message || "Lỗi khi lấy thông tin ví");
        }
        if (data.value) {
          this.wallet = data.value.wallet
          console.log('Wallet balance:', this.wallet);
        }
        if (data.value?.wallet) {
          this.wallet = data.value.wallet;
          return data.value.wallet;
        }
      } catch (err) {
        console.error("Fetch wallet error:", err);
        throw err;
      }
    }
  },
});
