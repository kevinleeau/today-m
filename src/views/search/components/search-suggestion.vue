<template>
 <div class="search-suggestion">
    <!-- 当用户点击cell单元格的时候也要发请求，这个请求用emit发回给父组件，把text传回去 -->
    <van-cell v-for="(text, index) in suggestionsData" :key="index" :title="text" icon="search" @click="$emit('search', text)">
      <!-- 为了将联想建议里面地字符串高亮显示，这里使用自定义插槽，然后v-html调用字符串处理函数-->
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
    <van-cell v-if="this.suggestionsData == ''">No Result</van-cell>
 </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search.js'
// ~~~~lodash撸大师😁~~~~
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  data () {
    return {
      suggestionsData: []
    }
  },
  //   子组件里接收父组件的数据
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  //   父组件用户在搜索框输入的数据searchText必须动态地被监视到，并动态地发起后台请求，从而获得联想数据
  watch: {
    searchText: {
      // 设置debounce间隔500毫秒后才触发请求
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 500),
      //   在监听一开始立即调用
      immediate: true
    }
  },
  methods: {
    // 这个请求仅仅是请求建议数据，并不是请求搜索结果
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestionsData = data.data.options
      } catch (err) {
        this.$toast('fail to load data')
      }
    },
    highlight (text) {
      // replace不改变原始数据结构
      // replace的第一个参数使用正则表达式，g全部替换，i忽略大小写，第二个参数指定将要替换目标
      // 如果需要对变量进行正则表达式匹配，则需要new RegExp!!!!!!!!!!!
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, `<span class="activeText">${this.searchText}</span>`)
    }
  }
}

</script>
<style lang="less" scoped>
.search-suggestion {
  /deep/span.activeText {
    color: red;
  }
}
</style>
