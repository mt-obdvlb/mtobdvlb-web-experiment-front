import {defineStore} from "pinia";

const useUserStore = defineStore('user', {
    state: () => ({
        token: '',
    }),
    getters: {

    },
    actions: {
        setToken(token: string) {
            this.token = token;
        },
    },
});

export default useUserStore;