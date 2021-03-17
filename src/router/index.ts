import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/posts'
  },
  {
    path: '/posts',
    component: () => import('@/views/Posts.vue')
  },
  {
    path: '/post-detail/:id',
    name: 'Post Detail',
    component: () => import('@/views/Post-detail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
