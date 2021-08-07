<template>
 <div class="search-container">
   <!-- form action设置为空，用户在mobile状态下会弹出search按钮 -->
  <form class="search-form" action="/">
    <van-search
      v-model="searchText"
      show-action
      placeholder="Input..."
      @search="onSearch"
      @cancel="onCancel"
      background="#3e6f9a"
      @focus="isResultShow = false"
      @clear="clearText"
      clearable
    />
  </form>
  <!-- 输入search后有三个子组件模块： 1,search history 2,search suggestion 3,search results -->
  <!-- 进入页面后激活searchHistory, 输入内容后激活searchsuggestion, 按回车后调用函数激活searchresult 输入框@focus被监听到后再把isresultshow关闭-->
  <SearchResult :search-text="searchText" v-if="isResultShow"/>
  <!-- 在子组件容器里绑定要父组件提供的数据 @search监听从子组件传回来的指令-->
  <SearchSuggestion :search-text="searchText" v-else-if="searchText" @search="onSearch"/>
  <SearchHistory :search-histories="searchHistories" @deleteAll="searchHistories=[]" @search="onSearch(item)" v-else/>
 </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import { setItem, getItem } from '@/utils/storage.js'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  data () {
    return {
      searchText: '',
      isResultShow: false,
      // initial histories data: if localstorage had history data, use it, otherwise set to []
      searchHistories: getItem('key') || []
    }
  },
  // watch监视历史记录变化，并及时更新到本地存储
  watch: {
    searchHistories: {
      handler (value) {
        setItem('key', value)
      }
    }
  },
  methods: {
    onSearch (val) {
      // 当用户点击了联想建议的cell单元格后，把val也赋值给输入框searchText
      this.searchText = val
      // 搜索记录不能重复内容，最后的输入内容排在记录最前面，如果没有对应索引，结果为-1
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    },
    clearText () {
      this.searchText = ''
    }
  }
}

</script>
<style lang="less" scoped>
  .search-container {
    padding-top: 110px;
    .van-search__action {
      color: white
    }
    .search-form {
      position: fixed;
      z-index: 1;
      top: 0;
      left: 0;
      right: 0;
    }
  }
</style>
