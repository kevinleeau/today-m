<template>
 <van-button
 :loading="loading"
 :icon="value === 1 ? 'good-job' : 'good-job-o'"
 :color="value ? '#ffa500' : ''"
 :class="{ liked: value === 1 }"
 @click="onLike"
 />
</template>

<script>
import { addLike, deleteLike } from '@/api/article.js'
export default {
  name: 'LikeArticle',
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onLike () {
      this.loading = true
      try {
        // status -1 means no like
        let status = -1
        if (this.value === 1) {
          await deleteLike(this.articleId)
        } else {
          await addLike(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(this.status === 1 ? 'Article Liked' : 'Article Unliked')
      } catch (err) {
        this.$toast.fail('fail to update')
      }
      this.loading = false
    }
  }
}

</script>
<style lang="less" scoped>
.liked {
    .van-icon {
        color: #e5645f;
    }
}
</style>
