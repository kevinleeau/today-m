<template>
  <van-cell class="article-item" :to="`/article/${article.art_id}`">
    <!-- vant的cell可以通过slot在不同位置设置不同的自定义插槽 -->
    <!-- van-multi-ellipsis是vant自带属性，让title最多显示两行，剩余内容用...提示 -->
    <div class="title van-multi-ellipsis--12" slot="title">{{article.title}}</div>
    <div slot="label">
      <!-- 对后台返回的图片数量进行判断，从而渲染在不同位置 -->
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div class="cover-item" v-for="(img, index) in article.cover.images" :key="index">
          <van-image
          class="cover-item-img"
          fit="cover"
          :src="img"/>
        </div>
      </div>
      <div class="label-info-wrap">
      <span>{{article.aut_name}}</span>
      <span>{{article.comm.count}}</span>
      <!-- 使用全局时间过滤器relativeTime，在utils里全局定义，在main.js里引进 -->
      <span>{{article.pubdate | relativeTime}}</span>
      </div>
    </div>
    <!-- 对后台返回的数据进行判断，从而渲染不同的图片和其渲染位置 -->
      <van-image
       v-if="article.cover.type === 1"
       slot="default"
       class="right-cover"
       fit="cover"
       :src="article.cover.images[0]"/>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  //   props规定从父组件传过来的数据要求
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}

</script>
<style lang="less" scoped>
  .article-itme {
    title {
      font-size: 32px;
      color: #3a3a3a;
    }
    /* vant自带class，默认为flex 1，unset让text分布整行 */
    .van-cell__value {
      flex: unset;
      width: 232px;
      height: 146px;
      padding-left: 25px;
    }
    .right-cover {
      width: 232px;
      height: 143px;
    }
    .label-info-wrap span {
      font-size: 22px;
      color: #b4b4b4;
      margin-right: 25px;
    }
    .cover-wrap {
      padding: 30px 0;
      display: flex;
      .cover-item {
        flex: 1;
        height: 146px;
        /* &:not(:last-child)选择父元素但不包括最后一个子元素 */
        &:not(:last-child) {
          padding-right: 4px;
        }
        .cover-item-img {
          width: 100%;
          height: 146px;
        }
      }
    }
  }
</style>
