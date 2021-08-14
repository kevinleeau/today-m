<template>
 <div class="comment-reply">
  <van-nav-bar
  :title="currentComment.reply_count > 0 ? `${currentComment.reply_count}Reply` : 'No Reply'">
  <van-icon slot="left" name="cross" @click="$emit('close')"/>
  </van-nav-bar>

  <div class="main-content">
  <!-- 调用commentitem组件，他需要参数comment，所以把currentComment传递给它 -->
  <CommentItem :comment="currentComment"/>
  <van-cell title="All Reply"/>
  <!-- 调用commentlist组件，它需要source 把它的list绑给这里的commentList-->
  <CommentList :source="currentComment.com_id" type="c" :list="commentList"/>
  </div>

  <div class="post-wrap">
    <van-button class="post-btn" size="small" round @click="isPostShow=true">Leave Comment</van-button>
  </div>
  <van-popup v-model="isPostShow" position="bottom">
    <CommentPost
    :target="currentComment.com_id"
    @updatePost="handleReply"/>
  </van-popup>
 </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommentList from './comment-list.vue'
import CommentPost from './comment-post.vue'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  data () {
    return {
      isPostShow: false,
      commentList: []
    }
  },
  props: {
    currentComment: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleReply (data) {
      this.currentComment.com_count++
      this.isPostShow = false
      this.commentList.unshift(data.new_obj)
    }
  }
}

</script>
<style lang="less" scoped>
.comment-reply {
   .main-content {
     position: fixed;
     top: 92px;
     right: 0;
     left: 0;
     bottom: 88px;
     overflow-y: auto;
   }
   .post-wrap {
     height: 88px;
     position: fixed;
     bottom: 0;
     left: 0;
     right: 0;
     display: flex;
     align-items: center;
     justify-content: center;
     background-color: rgb(47, 68, 171);
     border-top: 1px solid rgb(126, 124, 124);
     .post-btn {
       width: 60%;
     }
   }
}
</style>
