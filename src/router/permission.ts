import useUserStore from "@/store/modules/user";
import nprogress from 'nprogress'
import router from "./index";



nprogress.configure({
    showSpinner: false
})

console.log(router)

router.beforeEach((to, from, next) => {
    nprogress.start()
    const userStore = useUserStore()
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