<template>
   <van-button
      v-if="isFollowed"
      class="follow-btn"
      @click="onFollow"
      round
      :loading="followLoading"
      size="small">
      Followed, Click to Unfollow
   </van-button>
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
         Click to Follow
        </van-button>
</template>

<script>
import { addFollow, unFollow } from '@/api/user.js'
export default {
  name: 'followUser',
  //   isFollowed, userId在父组件中命名，在子组件里用props规定接收
  props: {
    //  value: {}
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      followLoading: false
    }
  },
  methods: {
    async onFollow () {
      this.followLoading = true
      try {
        if (this.isFollowed) {
          await unFollow(this.userId)
          //   在子组件里发出需要父组件处理的指令名字叫undate，参数为isFollowed取反
          this.$emit('undate', !this.isFollowed)
        } else {
          await addFollow(this.userId)
          this.$emit('undate', !this.isFollowed)
        }
        this.followLoading = false
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast('You cannot follow yourself')
        }
        this.$toast('fail to update')
      }
      this.followLoading = false
    }
  }
}

</script>
<style>
</style>
