import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import './styles.scss'
import '../style/theme/index.css'
import VCharts from "v-charts"
import animated from 'animate.css'
import axios from 'axios'
import VueQr from 'vue-qr'
Vue.prototype.$axios = axios
Vue.prototype.$elementUI = ElementUI

Vue.use(animated)

Vue.use(VCharts)
Vue.use(ElementUI, { locale })

Vue.use(VueQr)

Vue.config.productionTip = false

//添加请求拦截器
axios.interceptors.request.use(config => {
  if (store.state.token !== null) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.token = store.state.token;
  }
  return config
}, (error) => {
  return Promise.reject(error)
})


//添加响应拦截器
axios.interceptors.response.use(response => {
    //对响应数据做些事，比如说把loading动画关
    return response
}, error => {
    //请求错误时做些事
    return Promise.reject(error)
})



router.beforeEach((to, from, next) => {
  if (to.meta.needLogin){
    if (!store.state.isLogin){
      ElementUI.Message({
        message: '身份验证过期或未登录，请重新登录',
        type: 'warning'
      });
      next(
          {
            path:'/login'
          }
      )

    }else{
      next();
    }
  }else{
    next();
  }

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
