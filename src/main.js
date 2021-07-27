import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// mobile vant组件全局整体引入
import Vant from 'vant'
import 'vant/lib/index.css'

// 加载动态设置rem基准值
import 'amfe-flexible'
// 最后才引进index.less
import './styles/index.less'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
