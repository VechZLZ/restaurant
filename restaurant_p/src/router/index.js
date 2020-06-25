import Vue from "vue";
import VueRouter from "vue-router";

const home = () => import(/* webpackChunkName: "store" */ "../components/home");
const menu = () => import(/* webpackChunkName: "menu" */ "../components/menu");
const order = () =>
  import(/* webpackChunkName: "order" */ "../components/order");
  const takeOutOrder = () => import(/* webpackChunkName: "takeOutOrder" */ "../components/takeOutOrder");
const sell = () => import(/* webpackChunkName: "sell" */ "../components/sell");
const activity = () =>
  import(/* webpackChunkName: "activity" */ "../components/activity");
const eweima = () =>
  import(/* webpackChunkName: "eweima" */ "../components/eweima");
const kitchenManagenment = () =>
  import(
    /* webpackChunkName: "kitchenManagenment" */ "../components/kitchenManagenment"
  );
const login = () =>
  import(/* webpackChunkName: "login" */ "../components/login");
  const register = () => import(/* webpackChunkName: "menu" */ "../components/register");

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: login,
    meta: {
      name: "登录",
      needLogin: false,
      isShowLeft: false,
      isShowHeader: false
    }
  },
  {
    path: "/",
    name: "home",
    component: home,
    meta: {
      name: "主页",
      needLogin: true,
      isShowLeft: true,
      isShowHeader: true
    }
  },
  {
    path: "/menu",
    name: "menu",
    component: menu,
    meta: {
      name: "菜单",
      needLogin: true,
      isShowLeft: true,
      isShowHeader: true
    }
  },
  {
    path: "/register",
    name: "register",
    component: register,
    meta: {
      name: "注册",
      needLogin: false,
      isShowLeft: false,
      isShowHeader: false
    }
  },
  {
    path: "/sell",
    name: "sell",
    component: sell,
    meta: {
      name: "营业数据",
      needLogin: true,
      isShowLeft: true,
      isShowHeader: true
    }
  },
  {
    path: "/order",
    name: "order",
    component: order,
    meta: {
      name: "堂食订单",
      needLogin: true,
      isShowLeft: true,
      isShowHeader: true
    }
  },
  {
    path: "/takeOutOrder",
    name: "takeOutOrder",
    component: takeOutOrder,
    meta: {
      name: "外卖订单",
      needLogin: true,
      isShowLeft: true,
      isShowHeader: true
    }
  },
  {
    path: "/activity",
    name: "activity",
    component: activity,
    meta: {
      name: "活动",
      needLogin: true,
      isShowLeft: true,
      isShowHeader: true
    }
  },
  {
    path: "/eweima",
    name: "eweima",
    component: eweima,
    meta: {
      name: "二维码",
      needLogin: true,
      isShowLeft: true,
      isShowHeader: true
    }
  },
  {
    path: "/kitchenManagenment",
    name: "kitchenManagenment",
    component: kitchenManagenment,
    meta: {
      name: "后厨",
      needLogin: true,
      isShowLeft: true,
      isShowHeader: true
    }
  }
];

// eslint-disable-next-line no-new
const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
