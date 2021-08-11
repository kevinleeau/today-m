<template>
 <div class="article-container">
   <van-nav-bar
   class="page-nav-bar"
   left-arrow
   title="Today Breaking News">
   </van-nav-bar>
   <div calss="main-wrap">
     <!-- 默认loading true -->
     <div v-if="loading" class="loading-wrap">
       <van-loading
       color="#3296fa"
       vertical>
       </van-loading>
     </div>
     <!-- 如果后台有数据返回则loading false -->
     <div v-else-if="article.title" class="article-details">
       <h1 class="article-title">{{article.title}}</h1>
       <van-cell class="user-info" center :border="false">
         <van-image
         class="avatar"
         slot="icon"
         round
         fit="cover"
         :src="article.aut_photo"
         />
         <div slot="title" class="user-name">{{article.aut_name}}</div>
         <div slot="label" class="publish-date">{{article.pubdate | relativeTime}}</div>
         <!-- 从后台返回的数据判断渲染unfollow OR followed，使用同一个函数-->
         <!-- follow模块化 在父组件里布置容器，并把article.is_followed命名为isFollowed传出去-->
         <!-- 监听子组件的update指令，并按要求将子组件的参数event赋值给article.is_followed -->
         <follow-user
         :isFollowed="article.is_followed"
         :userId="article.aut_id"
         class="follow-btn"
         @update="article.is_followed = $event"/>

         <!-- ***************************** -->
         <!-- 如果数据article.is_followed要传递给子组件，同时需要修改，那么在组件容器里用v-model -->
         <!-- 等于生成一个了value属性，值是article.is_followed，同时会自动监听@input事件，并把对应值article.is_followed同步-->
         <!-- 等于： value="article.is_followed" -->
         <!-- @input="article.is_followed = $event" -->
         <!-- <follow-user
         v-model="article.is_followed"
         :userId="article.aut_id"
         class="follow-btn"/> -->

         <!-- ************************************************** -->
         <!-- <van-button
         v-if="article.is_followed"
         class="follow-btn"
         @click="onFollow"
         round
         :loading="followLoading"
         size="small">
         Followed, Click to Unfollow</van-button>
         <van-button
         v-else
         class="follow-btn"
         type="info"
         color="#3296fa"
         round
         :loading="followLoading"
         @click="onFollow"
         size="small"
         icon="plus">
         Click to Follow</van-button> -->

       </van-cell>
       <div class="article-content markdown-body" v-html="article.content" ref="article.content"></div>
       <van-divider></van-divider>
     </div>
     <div v-else-if="errorType === 404" class="error-wrap">
       <van-icon name="failure"/>
       <p class="text">Article Removed</p>
     </div>
     <div v-else class="error-wrap">
       <van-icon name="failure"/>
       <p class="text">Fail to download</p>
       <van-button class="retry-btn" @click="loadArticles">Try Again</van-button>
     </div>
     <div class="article-bottom">
       <van-button
       class="comment-btn"
       type="default"
       round
       size="small">Comment</van-button>
       <van-icon
       class="comment-icon"
       name="comment-o"
       info="123"
       color="#777"/>
       <!-- 对于需要传递并修改的子组件数据用v-model绑定，对于article.id则单独传递 -->
       <CollectArticle class="btn-item" v-model="article.is_collected" :articleId="article.art_id"/>
       <LikeArticle class="btn-item" v-model="article.attitude" :articleId="article.art_id"/>
       <van-icon name="share"></van-icon>
     </div>
   </div>
 </div>
</template>

<script>
import { getArticlesById } from '@/api/article.js'
// ImagePreview属于vant自带属性，但是需要独立加载才能使用
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article/index.vue'
import LikeArticle from '@/components/like-article/index.vue'
export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle
  },
  props: {
    // 接收将要渲染的article的id，可能是多种类型数据，这个数据从**路由**携带过来
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      article: {},
      loading: true,
      // 请求失败有2种可能，1：后台不存在这个id数据(404)，2：网络问题
      errorType: 0,
      followLoading: false
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    async loadArticles () {
      this.loading = true
      try {
        const { data } = await getArticlesById(this.articleId)
        this.article = data.data
        this.loading = false
        setTimeout(() => {
          this.previewImage()
        }, 0)
      } catch (err) {
        this.loading = false
        if (err.response && err.response.status === 404) {
          this.errorType = 404
        } else {
          this.$toast('fail to download data')
        }
      }
    },
    previewImage () {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const images = []
      imgs.forEach((items, index) => {
        images.push(items.src)
        items.onClick = () => {
          ImagePreview({
            images: images,
            startPosition: index
          })
        }
      })
    }
    // 同一个函数判断是否已关注，分别调用不同处理方法
    // in case internet speed slow，set loading to true to remind user that request is on the way, to prevent multi request
    // async onFollow () {
    //   this.followLoading = true
    //   try {
    //     if (this.article.is_followed) {
    //       await unFollow(this.article.aut.id)
    //       this.article.is_followed = false
    //     } else {
    //       await addFollow(this.article.aut.id)
    //       this.article.is_followed = true
    //     }
    //     this.followLoading = false
    //   } catch (err) {
    //     if (err.response && err.response.status === 400) {
    //       this.$toast('You cannot follow yourself')
    //     }
    //     this.$toast('fail to update')
    //   }
    //   this.followLoading = false
    // }
  }
}

</script>
<style lang="less" scoped>
@import './github-markdown.css';
</style>
