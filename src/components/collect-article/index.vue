<template>
 <van-button
 :loading="loading"
 :icon="value ? 'star' : 'star-o'"
 :color="value ? '#ffa500' : ''"
 :class="{ collected: value }"
 @click="onCollect"
 />
 <!-- if value true, apply class collected, if false, apply nothing -->
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article.js'
export default {
  name: 'CollectArticle',
  data () {
    return {
      loading: false
    }
  },
  //   如果在父组件使用v-model传递数据，那么子组件用value接收
  props: {
    value: {
      type: Boolean,
      requried: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onCollect () {
      this.loading = true
      try {
        if (this.value) {
          await deleteCollect(this.articleId)
        } else {
          await addCollect(this.articleId)
        }
        // 如果父组件用了v-model绑定需要传递并修改的数据，那么子组件发起$emit，input是默认固定行为，参数是!this.value
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? 'Article Collected' : 'Collection Removed')
      } catch (err) {
        this.$toast.fail('fail to update data')
      }
      this.loading = false
    }
  }
}

</script>
<style lang="less" scoped>
.collected {
    .van-icon {
        color: #ffa500;
    }
}
</style>
