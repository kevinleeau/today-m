<template>
 <div class="update-gender">
     <van-picker
  show-toolbar
  title="Please select your gender"
  :columns="columns"
  @confirm="onConfirm"
  @cancel="$emit('close')"
  default-index="value"
  @change="onPickChange"
/>
 </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'
export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['Male', 'Female', 'Unknow'],
      //   把父组件的value的index作为默认渲染项
      index: this.value
    }
  },
  methods: {
    async onConfirm () {
      //   in case internet speed slow, prevent user multi clcik and multi request
      //   if request finish, either fail or success, the loading will end automatically
      this.$toast.loading({
        message: 'uploading...',
        forbidClick: true,
        duration: 0
      })
      try {
        const newIndex = this.index
        await updateUserProfile({
          gender: newIndex
        })
        //   如果父组件用v-model把user.name传过来，那么子组件就用input指令发回，值就是newMessage
        this.$emit('input', newIndex)
        this.$emit('close')
        this.$toast.success('update messasge successfully')
      } catch (err) {
        this.$toast.fail('fail to update data')
      }
    },
    // index0: male, index1: female, index2: unknow
    onPickChange (picker, value, index) {
      this.newIndex = index
    }
  }
}

</script>
<style>
</style>
