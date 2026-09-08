import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Success from '@/views/Success.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    // 建议添加一个 404 页面，防止路径错误时页面空白
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'), // 稍后需要创建这个文件
    },
    {
      path:'/home',
      name:'home',
      component: Home,
    },
    {
      path:'/success',
      name:'success',
      component:Success,
    },
    {
      path: '/post/:postId',
      name: 'PostDetail',
      component: () => import('@/views/post/PostDetail.vue'),
    },
  ],
})

export default router
