import Vue from 'vue'
import VueRouter from 'vue-router'



const kitchenManagenment = () => import(/* webpackChunkName: "kitchenManagenment" */  "../components/kitchenManagenment");
const login = () => import(/* webpackChunkName: "login" */  "../components/login");


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component:login,
    meta:{"name":'登录',"needLogin":false,"isShowLeft":false,"isShowHeader":false,}
  },

  {
    path: '/',
    name: 'kitchenManagenment',
    component:kitchenManagenment,
    meta:{"name":'后厨',"needLogin":true,"isShowLeft":true,"isShowHeader":true,}
  },
]

// eslint-disable-next-line no-new
const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
