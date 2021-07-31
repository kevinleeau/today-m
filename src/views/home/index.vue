<template>
<div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button class="search-btn" slot="title" type="info" size="small" round icon="search">Search</van-button>
    </van-nav-bar>
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab v-for="channel in channels" :key="channel.id" :title="channel.name">
        <!-- ************************************************************ -->
        <!-- 父组件里面的子组件容器 规定这个子组件要绑定父组件的channel数据-->
        <!-- ************************************************************ -->
        <article-list :channel="channel" />
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hambuger-btn">
        <i class="iconfont icon-a-listview"></i>
      </div>
    </van-tabs>
</div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from '@/views/home/components/article-list.vue'
export default {
  name: 'HomeIndex',
  components: { ArticleList },
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('fail to access data from channesl')
      }
    }
  }
}

</script>
<style lang="less" scoped>
  .home-container {
    padding-top: 174px;
    padding-bottom: 100px;
    /* 使用/deep/对第三方组件vant自带的class进行重新深定义 */
    /deep/.van-nav-bar__title {
      max-width: unset;
    }
    .search-btn {
      width: 555px;
      height: 64px;
      background-color: rgb(189, 214, 214);
      border: none;
      font-size: 28px;
      color: rgb(45, 45, 54);
      .van-icon {
        color: rgb(45, 45, 54);
      }
    }
    /deep/.channel-tabs {
      .van-tabs__wrap {
        position: fixed;
        top: 92px;
        z-index: 1;
        left: 0;
        right: 0;
        height: 82px;
      }
      .van-tab {
        min-width: 200px;
        border-right: 1px solid black;
        font-size: 30px;
        color: #777;
      }
      .van-tab--active {
        color: #333;
      }
      .van-tabs__nav {
        padding-bottom: 0;
      }
      .van-tabs__line {
        bottom: 8px;
        width: 31px !important;
        height: 6px;
        background-color: darkblue;
      }
      .placeholder {
        flex-shrink: 0;
        width: 66px;
        height: 82px;
      }
      .hambuger-btn {
        position: fixed;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 66px;
        height: 82px;
        opacity: 0.3;
        i.iconfont {
          font-size: 33px;
        }
        /* 在hambuger前有一个分割线，用&给div设置伪元素，然后给伪元素设置一个背景图，定位到div的左侧 */
        &:before {
          content: '';
          position: absolute;
          left: 0;
          width: 5px;
          height: 100%;
          background-image: url(~@/assets/logo.png);
          background-size: contain;
        }
      }
    }
  }
</style>
