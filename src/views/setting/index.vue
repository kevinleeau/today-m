<template>
 <div class="setting-container">
   <!-- 在setting-container下有2个页面，分别是未登录状态，已登录状态 -->
   <!-- v-if判断是否拥有user token数据，从而相应渲染 -->
   <div v-if="user" class="header user-info">
    <div class="base-info">
      <div class="left">
       <!-- vant自带的cover模式 -->
       <van-image
       class="avatar"
       round
       fit="cover"
       :src="userInfo.photo"
     />
     <span class="name">{{userInfo.name}}</span>
      </div>
      <div class="right">
        <van-button size="mini" round>Edit</van-button>
      </div>
    </div>
    <div class="data-status">
      <div class="data-item">
        <span class="count">{{userInfo.art_count}}</span>
        <span class="text">Latest</span>
      </div>
      <div class="data-item">
       <span class="count">{{userInfo.follow_count}}</span>
       <span class="text">Subscribed</span>
      </div>
      <div class="data-item">
       <span class="count">{{userInfo.fans_count}}</span>
       <span class="text">Fans</span>
      </div>
      <div class="data-item">
       <span class="count">{{userInfo.like_count}}</span>
       <span class="text">Like</span>
      </div>
    </div>
  </div>
   <!-- **********以下是未登录状态************* -->
   <div v-else class="header not-login">
     <div class="login-btn" @click="$router.push('./login')">
       <img class="not-login-img" src="~@/assets/logo.png" alt="">
       <span class="text">Sign in / Sign up</span>
     </div>
   </div>
   <!-- **************************** -->
   <van-grid class="grid-nav" :column-num="2" clickable>
    <van-grid-item class="grid-item">
      <!-- 使用自定义插槽插入图标和文本 -->
      <i slot="icon" class="iconfont icon-user"></i>
      <span slot="text" class="text">Book mark</span>
    </van-grid-item>
    <van-grid-item class="grid-item">
      <i slot="icon" class="iconfont icon-icon-kfckfc"></i>
      <span slot="text" class="text">History</span>
    </van-grid-item>
   </van-grid>
   <van-cell title="Message" is-link/>
   <van-cell class="mb-9" title="conversation" is-link/>
   <van-cell class="logout-cell" title="Logout" @click="onLogout" clickable/>
   <!-- <van-cell v-if="user" class="logout-cell" title="Logout" @click="onLogout"/> -->
 </div>
</template>

<script>
// 从vuex访问数据判断用户是否拥有token，从而决定渲染login or not login template
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'
export default {
  name: 'SettingIndex',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 1 dialog remainder 2 clear data of login in vuex and localstorage 3 rerender page will be automatically base on data available
    onLogout () {
      this.$dialog.confirm({
        title: 'Logout ?'
      })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {
        // on cancel
        })
    },
    async loadUserInfo () {
      try {
        // 获取数据成功后赋值到本地data中，提供渲染页面的数据源
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {
        this.$toast('fail to get user info')
      }
    }
  }
}

</script>
<style lang="less" scoped>
  .setting-container {
    .header {
      height: 361px;
      /* ~ in front of @ */
      background: url('~@/assets/m.png');
      /* cover可以缩放或填充到容器中 */
      background-size: cover;
    }
    .not-login {
      display: flex;
      justify-content: center;
      align-items: center;
      .login-btn {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .not-login-img {
          width: 132px;
          height: 132px;
        }
        .text {
          font-size: 30px;
        }
      }
    }
    .user-info {
      .base-info {
        height: 231px;
        padding: 76px 32px 23px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          .avatar {
            width: 132px;
            height: 132px;
            margin-right: 23px;
            border: 1px solid black;
          }
          .name {
            font-size: 30;
            color: #fff;
          }
        }
      }
      .data-status {
        display: flex;
        .data-item {
          flex: 1;
          height: 130px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: black;
          .count {
            font-size: 36px;
          }
          .text {
            font-size: 23px;
          }
        }
      }
    }
    .grid-nav {
      .grid-item{
        height: 141px;
        i.iconfont {
          font-size: 45px;
        }
        .icon-user, .icon-icon-kfckfc {
          color: rgb(18, 102, 138);
        }
        span.text {
          font-size: 35px;
        }
      }
    }
  }
</style>
