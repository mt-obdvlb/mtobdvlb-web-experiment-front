import {defineStore} from "pinia";

const useUserStore = defineStore('user', {
    state: () => ({
        token: '1',
        userInfo: {
            id: '',
            username: '',
            birth_time: '',
            email: '',
            avatar: ''
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