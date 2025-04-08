const routes = [
    {
        path: '/auth',
        name: 'auth',
        component: () => import('@/layout/auth/index.vue'),
        redirect: '/auth/login',
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('@/views/auth/login/index.vue')
            },
            {
                path: 'register',
                name: 'register',
                component: () => import('@/views/auth/register/index.vue')
            },
            {
                path: 'forget-password',
                name: 'forget-password',
                component: () => import('@/views/auth/forget-password/index.vue')
            }
        ]
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404/index.vue')
    },
    {
        path: '/',
        name: 'layout',
        component: () => import('@/layout/index.vue'),
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/home/index.vue')
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        redirect: '/404'
    }
]

export default routes