import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/HomeView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: Home,
    //meta:{title: '攀登者'}
  },
  {
    path: '/about',
    name: '关于我们',
    component: () => import('../views/aboutView.vue')
  },
  {
    path: '/contact',
    name: '联系我们',
    component: () => import('../views/contactView.vue')
  },
  {
    path: '/menber',
    name: '人员组成',
    component: () => import('../views/menberView.vue')
  },
  {
    path: '/blog',
    name: '博客',
    component: () => import('../views/blogView.vue')
  }

    //component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
]

const router = new VueRouter({
  routes
})

export default router
