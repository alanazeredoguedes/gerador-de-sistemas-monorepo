import loginPage from "../pages/auth/LoginPage.vue";

const routes = [
    /** Dashboard Routes */
    {
        path: '/',
        component: () => import('@/layouts/DashboardTemplate.vue'),
        children: [
            {
                path: '/',
                name: 'homePage',
                component: () => import('@/pages/dashboard/home/Dashboard.vue'),
                meta: { auth: true }
            },
            {
                path: '/app',
                name: 'app_list',
                component: () => import('@/pages/dashboard/app/App.vue'),
                meta: { auth: true }
            },
            {
                path: '/app/:id',
                name: 'app_edit',
                component: () => import('@/pages/dashboard/app/Edit.vue'),
                meta: { auth: true }
            },
            {
                path: '/diagramas',
                name: 'diagramas_list',
                component: () => import('@/pages/dashboard/diagramas/Diagramas.vue'),
                meta: { auth: true }
            },
        ]

    },
    /** Diagrams Routes */
    {
        path: '/',
        component: () => import('@/layouts/DiagramTemplate.vue'),
        children: [
            {
                path: '/diagrama/:id',
                name: 'diagrama',
                component: () => import('@/pages/diagram/Diagram.vue'),
                meta: { auth: true }
            },
        ]

    },
    /** Auth Routes */
    {
        path: '/',
        component: () => import('@/layouts/AuthTemplate.vue'),
        children: [
            {
                path: '/login',
                name: 'login',
                component: loginPage,
                meta: { auth: false }
            },
            {
                path: '/register',
                name: 'register',
                component: () => import('@/pages/auth/RegisterPage.vue'),
                meta: { auth: false }
            },
            {
                path: '/reset-password',
                name: 'resetPassword',
                component: () => import('@/pages/auth/ResetPassword.vue'),
                meta: { auth: false }
            },
            {
                path: '/new-password',
                name: 'newPassword',
                component: () => import('@/pages/auth/NewPassword.vue'),
                meta: { auth: false }
            },
        ]

    },
    /** Error Routes */
    {
        path: '/',
        component: () => import('@/layouts/BaseTemplate.vue'),
        children: [
            {
                path: '/:pathMatch(.*)*',
                name: 'error404',
                component: () => import('@/pages/error/404.vue'),
                meta: { auth: false }
            },
            {
                path: '/terms',
                name: 'terms',
                component: () => import('@/pages/terms/Terms.vue'),
                meta: { auth: false }
            },
        ]
    },
]

export default routes