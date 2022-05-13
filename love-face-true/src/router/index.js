import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Layout from '../views/Layout.vue'
import List from '../views/List.vue'
import Detail from '../views/Detail.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/love-face-true',
    component: Layout,
    children: [
      {
        path: '/list',
        name: 'list',
        component: List
      },
      {
        path: '/detail/:RowNumber',
        name: 'detail',
        component: Detail
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
