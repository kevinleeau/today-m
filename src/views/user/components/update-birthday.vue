<template>
 <div class="update-birthday">
     <van-datetime-picker
  v-model="currentDate"
  type="date"
  title="Choose Date"
  :min-date="minDate"
  :max-date="maxDate"
  @cancel="$emit('close')"
  @confirm="onConfirm"
/>
 </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      //   从后台返回的birthday数据是string，需要转换为日期格式，并作为原始数据渲染到页面
      currentDate: new Date(this.value)
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
        // vant生成的是日期格式对象，而后台需要日期字符串
        const newBirthday = dayjs(this.currentDate).format('YYYY-MM-DD')
        await updateUserProfile({
          birthday: newBirthday
        })
        //   如果父组件用v-model把user.name传过来，那么子组件就用input指令发回，值就是newMessage
        this.$emit('input', newBirthday)
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
