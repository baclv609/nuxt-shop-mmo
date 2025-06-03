// ~/stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRuntimeConfig, useFetch } from '#app'

interface Wallet {
  id: number
  user_id: number
  balance: string
  created_at: string
}

interface User {
  id: number
  name: string
  email: string
  role: 'user' | 'admin'
}

interface WalletResponse {
  message: string
  wallet: Wallet
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<User | null>(null)
  const wallet = ref<Wallet | null>(null)

  // Getters
  const loggedIn = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isUser = computed(() => user.value?.role === 'user')
  const userWallet = computed(() => wallet.value)
  const walletBalance = computed(() => wallet.value?.balance || '0')

  // Actions
  const setAuth = (newToken: string, newUser: User, newWallet: Wallet) => {
    token.value = newToken
    user.value = newUser
    wallet.value = newWallet

    if (process.client) {
      localStorage.setItem('token', newToken)
      localStorage.setItem('user', JSON.stringify(newUser))
    }
  }

  const loadAuthFromStorage = async () => {
    try {
      if (!process.client) return
      const storedToken = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')

      if (storedToken && storedUser) {
        token.value = storedToken
        user.value = JSON.parse(storedUser)

        try {
          await fetchLatestWalletBalance()
        } catch (walletError) {
          console.warn('Lỗi khi load wallet:', walletError)
        }
      }
    } catch (err) {
      console.error('Lỗi khi load dữ liệu auth:', err)
      logout()
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    wallet.value = null
    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }

  const updateUserData = (userData: Partial<User>) => {
    if (user.value) {
      user.value = { ...user.value, ...userData }
      if (process.client) {
        localStorage.setItem('user', JSON.stringify(user.value))
      }
    }
  }

  const updateWalletBalance = (balance: string) => {
    if (wallet.value) {
      wallet.value.balance = balance
    }
  }

  const fetchLatestWalletBalance = async (): Promise<Wallet | null> => {
    if (!token.value) return null

    const config = useRuntimeConfig()
    const { data, error } = await useFetch<WalletResponse>(
      `${config.public.apiBaseUrl}/wallets`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      }
    )

    if (error.value) {
      throw new Error(error.value.data?.message || 'Lỗi khi lấy ví')
    }

    if (data.value?.wallet) {
      wallet.value = data.value.wallet
      return wallet.value
    }

    return null
  }

  return {
    // state
    token,
    user,
    wallet,

    // getters
    loggedIn,
    isAdmin,
    isUser,
    userWallet,
    walletBalance,

    // actions
    setAuth,
    loadAuthFromStorage,
    logout,
    updateUserData,
    updateWalletBalance,
    fetchLatestWalletBalance,
  }
})
