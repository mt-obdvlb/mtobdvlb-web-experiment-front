import {defineStore} from "pinia";

const useUserStore = defineStore('user', {
    state: () => ({
        token: '',
        userInfo: {
            id: '',
            username: '',
            birth_time: ''
        }
    }),
    getters: {

    },
    actions: {
        setToken(token: string) {
            this.token = token;
        },
    },
    persist: true
});

export default useUserStore;