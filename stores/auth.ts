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
  wallet?: Wallet;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as User | null,
  }),

  getters: {
    loggedIn: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin',
    isUser: (state) => state.user?.role === 'user',
    userWallet: (state) => state.user?.wallet,
  },

  actions: {
    setAuth(token: string, user: User) {
      this.token = token;
      this.user = user;
      if (process.client) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
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
            console.log('Loaded auth data:', { token, user }); // Debug log
          }
        } catch (error) {
          console.error('Error loading auth data:', error);
          this.logout(); // Clear invalid data
        }
      }
    },

    logout() {
      this.token = null;
      this.user = null;
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
      if (this.user?.wallet) {
        this.user.wallet.balance = balance;
        if (process.client) {
          localStorage.setItem('user', JSON.stringify(this.user));
        }
      }
    }
  },
});
