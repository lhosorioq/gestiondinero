import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Principal.vue')
  },
  {
    path: '/team',
    name: 'Team',
    component: () => import('../views/Equipo.vue')
  },
  {
    path: '/movements',
    name: 'Movements',
    component: () => import('../views/Movimientos.vue')
  },

  {
    path: '/info',
    name: 'Info',
    component: () => import('../views/Info.vue')
  },

  {
    path: '/totals',
    name: 'Totals',
    component: () => import('../views/Totals.vue')
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
