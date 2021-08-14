<template>
 <div class="comment-post">
     <van-field
     class="post-field"
     v-model="message"
     rows="2"
     autosize
     type="textarea"
     maxlength="50"
     placeholder="Please leave your comment here"
     show-word-limit/>
     <!-- if message.trim().length false, the button disabled -->
     <van-button
     class="post-btn" @click="onPost" :disabled="!message.trim().length">Post</van-button>
 </div>
</template>

<script>
import { addComment } from '@/api/comment.js'
export default {
  name: 'CommentPost',
  data () {
    return {
      message: ''
    }
  },
  // 如果根组件用provide提供数据，后代组件用inject接收
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  props: {
    targetId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onPost () {
      this.$toast.loading({
        message: 'Posting...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await addComment({
          //   target are either article's id or article's comment's id
          target: this.targetId.toString(),
          content: this.message,
          //   art_id is article's id, if make comment on article, no need, if reply to comment, it needed
          art_id: this.articleId ? this.articleId.toString() : null
        })
        // 请求成功后再把全部数据发回给父组件，由父组件决定选择哪些具体数据渲染
        this.message = ''
        this.$emit('updatePost', data.data)
        this.$toast.success('Post successfully')
      } catch (err) {
        this.message = ''
        this.$toast.fail('fail to post comment')
        // if fail, the popup also need close by its parent
        this.$emit('updatePost')
      }
    }
  }
}

</script>
<style lang="less" scoped>
.comment-post {
    display: flex;
    align-items: center;
    padding: 32px 0 32px 32px;
    .post-field {
        background-color: #f5f7f9;
    }
    .post-btn {
        width: 150px;
        border: none;
        padding: 0;
        color: #6ba3d8;
        &::before {
            display: none;
        }
    }
}
</style>
