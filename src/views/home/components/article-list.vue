<!-- 将home下面不同的频道列表再细分为不同的子组件 -->
<template>
 <div class="article-list">
     <!-- van-pull-refresh needs to contain all content needed to rerender -->
    <van-pull-refresh v-model="isRefershLoading" @refresh="onRefresh" :success-text="updateSuccessfully" :success-duration="1000">
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="Finished"
    @load="onLoad"
    :error.sync="error"
    error-text="Request failed. Click to reload">
    <article-item v-for="(article, index) in list" :key="index" :article="article"/>
    </van-list>
  </van-pull-refresh>
 </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  //   *************************************
  //   在子组件里用props接收父组件的channel数据
  //   *************************************
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isRefershLoading: false,
      updateSuccessfully: ''
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  },
  async onRefresh () {
    try {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      const { results } = data.data
      this.list.unshift(...results)
      this.isRefershLoading = false
      this.updateSuccessfully = `update ${results.length} message successfully`
    } catch (err) {
      this.updateSuccessfully = 'Please try agian'
      this.isRefershLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
    /* 当用户上下滚动文章列表时，仅对当前channel滚动，不会导致整个body改变位置 */
    .article-list {
        height: 79vh;
        overflow-y: auto;
    }
</style>
