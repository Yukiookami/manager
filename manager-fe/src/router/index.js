/*
 * @Author: zxy
 * @Date: 2021-10-09 18:48:23
 * @LastEditTime: 2022-01-10 15:17:21
 * @FilePath: /manager-i/manager-fe/src/router/index.js
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import storage from './../utils/storage'
import API from './../api'
import utils from './../utils/utils'

const routes = [
    {
        name: 'home',
        path: '/',
        meta: {
            title: 'ホームページ'
        },
        component: Home,
        redirect: '/welcome',
        children: [
            {
                name: 'welcome',
                path: '/welcome',
                meta: {
                    title: 'ようこそSKU企業管理システム'
                },
                component: () => import('@/views/Welcome.vue')
            }
        ]
    },
    {
        name: 'login',
        path: '/login',
        meta: {
            title: 'ログイン'
        },
        component: () => import('@/views/Login.vue')
    },
    {
        name: '404',
        path: '/404',
        meta: {
            title: '页面不存在'
        },
        component: () => import('@/views/404.vue')
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

async function loadAsyncRoutes() {
    let userInfo = storage.getItem('userInfo') || {}
    if (userInfo.token) {
        try {
            const { menuList } = await API.getPermissionList()
            let routes = utils.generateRoute(menuList)
            routes.map(route => {
                let url = `./../views/${route.component}.vue`
                route.component = () => import(url);
                router.addRoute("home", route);
            })
        } catch (error) {

        }
    }
}
loadAsyncRoutes();
// 判断当前地址是否可以访问
/*
function checkPermission(path) {
    let hasPermission = router.getRoutes().filter(route => route.path == path).length;
    if (hasPermission) {
        return true;
    } else {
        return false;
    }
}
*/
// 导航守卫
router.beforeEach(async (to, from, next) => {
    if (to.name) {
        if (router.hasRoute(to.name)) {
            document.title = to.meta.title;
            next()
        } else {
            next('/404')
        }
    } else {
        await loadAsyncRoutes()
        let curRoute = router.getRoutes().filter(item => item.path == to.path)
        if (curRoute?.length) {
            document.title = curRoute[0].meta.title;
            next({ ...to, replace: true })
        } else {
            next('/404')
        }
    }
})

export default router