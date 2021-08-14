<template>
 <van-cell class="comment-item">
     <van-image
     slot="icon"
     class="avatar"
     round
     fit="cover"
     :src="comment.aut_photo"
     />
     <div slot="title" class="title-wrap">
         <div calss="user-name">{{comment.aut_name}}</div>
         <!-- :class类名判断，如果comment.is_liking为true，那么class=liked生效 -->
         <van-button
         class="like-btn"
         :class="{
           liked: comment.is_liking
         }"
         :loading="loading"
         @click="onClickComment"
         :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
         >{{comment.like_count > 0 ? comment.like_count : 'Like'}}</van-button>
         </div>
         <div slot="label">
             <p class="comment-content">{{comment.content}}</p>
             <div class="bottom-info">
                 <!-- 时间过滤器relativeTime在 utils/dayjs 里已经全局定义 -->
                 <!-- 点击回复按钮把根组件的popup展示出来，$emit只能向上一级组件发指令 -->
                 <!-- root: index.vue -> parent: comment-list.vue -> child: comment-item.vue -->
                 <!-- 当前指令只能向上传到comment-list.vue -->
                 <span class="comment-pubdate">{{comment.pubdate | relativeTime}}</span>
                 <van-button
                 class="reply-btn"
                 round
                 @click="$emit('replyClick', comment)"
                 >reply{{comment.reply_count}}</van-button>
             </div>
         </div>
 </van-cell>
</template>

<script>
import { likeComment, unlikeComment } from '@/api/comment.js'
export default {
  name: 'CommentItem',
  data () {
    return {
      loading: false
    }
  },
  props: {
    comment: {
      type: Object,
      requred: true
    }
  },
  methods: {
    async onClickComment () {
      this.loading = true
      try {
        if (this.comment.is_liking) {
          await unlikeComment(this.comment.com_id)
          this.comment.like_count--
        } else {
          await likeComment(this.comment.com_id)
          this.comment.like_count++
        }
        this.comment.is_liking = !this.comment.is_liking
      } catch (err) {
        this.$toast.fail('fail to update data')
      }
      this.loading = false
    }
  }
}

</script>
<style lang="less" scoped>
.like-btn {
    &.liked {
        color: #e5645f;
    }
}
</style>
