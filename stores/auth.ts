import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as null | { name: string },
    token: null as null | string,
  }),
  getters: {
    loggedIn: (state : any) => !!state.user,
  },
  actions: {
    login(name: string) {
      this.user = { name };
      this.token = "fake-token";
    },
    logout() {
      this.user = null;
      this.token = null;
    },
  },
});