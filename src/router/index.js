import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/people/create',
                    component: () => import(/* webpackChunkName: "createpeople" */ '../components/page/people/Creation.vue'),
                    meta: { title: '新建' }
                },
                {
                    path: '/people/children',
                    component: () => import(/* webpackChunkName: "children" */ '../components/page/people/Children.vue'),
                    meta: { title: '儿童' }
                },
                {
                    path: '/inoculation/create',
                    component: () => import(/* webpackChunkName: "createinoculation" */ '../components/page/inoculation/Creation.vue'),
                    meta: { title: '新建' }
                },
                {
                    path: '/inoculation/detail',
                    component: () => import(/* webpackChunkName: "inoculationdetail" */ '../components/page/inoculation/Detail.vue'),
                    meta: { title: '详情' }
                },
                {
                    path: '/vaccine/create',
                    component: () => import(/* webpackChunkName: "createvaccine" */ '../components/page/vaccine/Creation.vue'),
                    meta: { title: '新建' }
                },
                {
                    path: '/vaccine/detail',
                    component: () => import(/* webpackChunkName: "vaccinedetail" */ '../components/page/vaccine/Detail.vue'),
                    meta: { title: '详情' }
                },
                {
                    path: '/user/create',
                    component: () => import(/* webpackChunkName: "createuser" */ '../components/page/user/Creation.vue'),
                    meta: { title: '新建' }
                },
                {
                    path: '/user/detail',
                    component: () => import(/* webpackChunkName: "createadetail" */ '../components/page/user/Detail.vue'),
                    meta: { title: '详情' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },

                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
