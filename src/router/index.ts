import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
// import  HomeView  from '@/views/HomeView.vue'
 console.log(routes)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // routes: [
  //   {
  //     path: '/',
  //     name: 'home',
  //     component: HomeView
  //   },
  //   {
  //     path: '/projects',
  //     name: 'projects',
  //     component: () => import('@/views/ProjectsView.vue')
  //   },
  //   {
  //     path: '/projects/:id',
  //     name: 'singleProject',
  //     component: () => import('@/views/SingleProjectView.vue')
  //   },
  //   {
  //     path: '/:catchAll(.*)*',
  //     name: 'NotFound',
  //     component: () => import('@/views/ErrorView.vue')
  //   }
  // ]
})

export default router
