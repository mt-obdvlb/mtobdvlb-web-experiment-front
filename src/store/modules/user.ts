import {defineStore} from "pinia";

const useUserStore = defineStore('user', {
    state: () => ({
        token: '',
        userInfo: {
            id: '',
            username: '',
            birthTime: '',
            email: '',
            avatar: ''
        },
    }),
    getters: {

    },
    actions: {

    },
    persist: true
});

export default useUserStore;