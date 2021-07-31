<template>
  <van-cell class="article-item">
    <!-- vant的cell可以通过slot在不同位置设置不同的自定义插槽 -->
    <div class="title" slot="title">{{article.title}}</div>
    <div slot="label">
      <!-- 对后台返回的图片数量进行判断，从而渲染在不同位置 -->
      <div v-if="article.cover.type === 2" class="cover-wrap">
        <div class="cover-item" v-for="(img, index) in article.cover.images" :key="index">
          <van-image
          width="100"
          height="100"
          :src="img"/>
        </div>
      </div>
      <div>
      <span>{{article.aut_name}}</span>
      <span>{{article.comm.count}}</span>
      <span>{{article.pubdate}}</span>
      </div>
    </div>
    <!-- 对后台返回的数据进行判断，从而渲染不同的图片和其渲染位置 -->
      <van-image
       v-if="article.cover.type === 1"
       slot="default"
       width="100"
       height="100"
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
</style>
