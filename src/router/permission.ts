import useUserStore from "@/store/modules/user";
import pinia from "@/store";
import nprogress from 'nprogress'
import router from "./index";

const userStore = useUserStore(pinia);

nprogress.configure({
    showSpinner: false
})

console.log(router)

router.beforeEach((to, from, next) => {
    nprogress.start()
    const token = userStore.token
    if(token) {
        Document.documentE
        if(to.path.match('/auth')) {
            next('/')
        } else {
            next()
        }
    }else {
        if(to.path.match('/auth')) {
            next()
        } else {
            next('/auth')
        }
    }
})

router.afterEach(() => {
    nprogress.done()
})