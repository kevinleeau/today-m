<template>
 <div class="user-profile">
     <van-nav-bar
     left-arrow
     class="page-nav-bar"
     title="User Profile"
     @click-left="$router.back()"/>
     <!-- vant内置input file,  @change监听用户有没有选择准备上传的文件-->
     <input type="file" ref="file" hidden @change="onFileChange">
     <!-- 当点击van-image单元格的时候，手动触发点击事件 -->
     <van-cell title="Photo" is-link center class="photo-cell" @click="$refs.file.click()">
           <van-image
           class="avatar"
           fit="cover"
           round
           :src="user.photo"
           />
     </van-cell>
     <van-cell title="Nickname" @click="isUpdateNicknameShow=true" :value="user.name" is-link/>
     <van-cell title="Gender" @click="isUpdateGenderShow=true" :value="user.gender === 0 ? 'Female' : 'Male'" is-link/>
     <van-cell title="Birthday" @click="isUpdateBirthdayShow=true" :value="user.birthday" is-link/>

     <!-- **************** -->
     <van-popup v-model="isUpdateNicknameShow" class="nickName" position="bottom">
         <!-- 给子组件传了个:userName，值是user.name，如果子组件需要并且可以修改再返回上一级组件，用v-model  -->

         <!-- only when van-popup 的 isUpdateNicknameShow true to render update-name -->

         <update-name v-if="isUpdateNicknameShow" @close="isUpdateNicknameShow=false" v-model="user.name"/>
     </van-popup>

<!-- *************************** -->
      <van-popup v-model="isUpdateGenderShow" class="nickName" position="bottom">
        <!-- Only when van-popup 的 isUpdateGenderShow 为true的时候触发子组件 -->
         <update-gender v-if="isUpdateGenderShow" @close="isUpdateGenderShow=false" v-model="user.gender"/>
     </van-popup>

<!-- *************************** -->
      <van-popup v-model="isUpdateBirthdayShow" class="nickName" position="bottom">
        <!-- Only when van-popup 的 isUpdateBirthdayShow 为true的时候触发子组件 -->
         <update-birthday v-if="isUpdateBirthdayShow" @close="isUpdateBirthdayShow=false" v-model="user.birthday"/>
     </van-popup>

<!-- ***************************** -->
     <van-popup v-model="isUpdatePhotoShow" class="nickName" position="bottom">
       <!-- 在父组件里定义img，把imgFromUser赋值给它并传出去 -->
       <UpdatePhoto v-if="isUpdatePhotoShow" :img="imgFromUser" @close="isUpdatePhotoShow=false" @newImg="user.photo=$event"/>
     </van-popup>
 </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  data () {
    return {
      user: {},
      isUpdateNicknameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      imgFromUser: null
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        this.$toast.fail('fail to download data')
      }
    },
    onFileChange () {
      // 取得dom对象里面的具体文件位置
      const file = this.$refs.file.files[0]
      const data = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true
      this.imgFromUser = data
      // file如果选择相同的文件将不会被触发，因为没有@change，所有每次触发后清空内容
      this.$refs.file.value = ''
    }
  }
}

</script>
<style lang="less" scoped>
.user-profile {
    .avatar {
        width: 60px;
        height: 60px;
    }
    .nickName {
        height: 100%;
    }
    .van-popup {
        background-color: #d6e2e0;
    }
}
</style>
