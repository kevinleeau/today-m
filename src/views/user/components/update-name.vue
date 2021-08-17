<template>
 <div class="update-name">
     <van-nav-bar
     class="page-nav-bar"
     title="Reset Username"
     left-text="Cancel"
     right-text="Confirm"
     @click-left="$emit('close')"
     @click-right="updateUser"
     />
 <div class="field-wrap">
     <van-field
  v-model.trim="message"
  rows="2"
  autosize
  type="textarea"
  maxlength="10"
  show-word-limit
/>
 </div>
 </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'
export default {
  name: 'UpdateName',
  props: {
    value: {
      type: String,
      requried: true
    }
  },
  data () {
    // 输入框的message默认为父组件传过来的值
    return {
      message: this.value
    }
  },
  methods: {
    async updateUser () {
      //   in case internet speed slow, prevent user multi clcik and multi request
      //   if request finish, either fail or success, the loading will end automatically
      this.$toast.loading({
        message: 'uploading...',
        forbidClick: true,
        duration: 0
      })
      try {
        const newMessage = this.message
        if (newMessage.length === 0) {
          return this.$toast('Please input valid name')
        } else {
          await updateUserProfile({
            name: newMessage
          })
          //   如果父组件用v-model把user.name传过来，那么子组件就用input指令发回，值就是newMessage
          this.$emit('input', newMessage)
          this.$emit('close')
          this.$toast.success('update messasge successfully')
        }
      } catch (err) {
        this.$toast.fail('fail to update data')
      }
    }
  }
}

</script>
<style lang="less" scoped>
.update-name {
    .field-wrap {
        padding: 20px;
    }
}
</style>
