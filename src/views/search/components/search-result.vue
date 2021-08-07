<template>
 <div class="search-result">
   <!-- error.sync是vant内置属性 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="Finished"
      @load="onLoad"
      :error.sync="error"
      error-text="Fail to download, Please try again"
    >
    <van-cell v-for="(item, index) in list" :key="index" :title="item.title" />
</van-list>
 </div>
</template>

<script>
import { getSearchResult } from '@/api/search.js'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      total_count: '',
      error: false
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        const { res } = data.data
        this.list.push(...res)
        this.loading = false
        if (res.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}

</script>
<style>
</style>
