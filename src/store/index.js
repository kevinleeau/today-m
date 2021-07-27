import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'
Vue.use(Vuex)
const TOKEN_KEY = 'USER'
export default new Vuex.Store({
  state: {
    // 预定义user对象，保存用户token等后台返回的数据，转换为对象并保存
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    // 通过mutations更新后台返回的数据
    setUser (state, data) {
      state.user = data
      // 为了防止刷新网页vuex数据丢失，user同时需要保存在localstorage里，user要转化为json格式
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
