
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: '首頁',
            component: () => import('../Home.vue'),

        },
        {
            path: "/thome",
            name: '臨時首頁',
            component: () => import('../TemporaryHome.vue'),
            //params: update url
            props: (route) => ({ view: route.query.view })
        }

    ]
})

export default router;


/*
import {createRouter, createWebHistory } from 'vue-router'
import Home from '../Home.vue'

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    // 添加其他路由配置...
];

const router = createRouter({
    history: createWebHistory (),
    routes
});

export default router;
*/