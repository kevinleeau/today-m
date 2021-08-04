import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用相对时间处理方法
dayjs.extend(relativeTime)
// 引进vue，并定义全局过滤器，就可以在其它任何组件HTML template模板中使用
// 参数1：过滤器名称  参数2：过滤器函数  使用：{{ 表达式 | 过滤器名称 }}
Vue.filter('relativeTime', value => {
//   计算dayjs()当前时间 --> to --> dayjs.(value)外界传入的时间，从而得出的时间差
  return dayjs().to(dayjs(value))
})
