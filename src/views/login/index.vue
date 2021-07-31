<template>
 <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="Sign in / Sign up">
      <van-icon slot="left" name="cross" @click="$router.back()"/>
    </van-nav-bar>
  <van-form @submit="onSubmit" ref="loginFormRef">
    <!-- 使用vant自带图标 此时van-field是自闭合标签 rules是表单预验证-->
    <van-field
    v-model="user.mobile"
    name="mobile"
    label="Username"
    placeholder="Username/Mobile/Email"
    left-icon="manager"
    type="number"
    maxlength="11"
    :rules="userFormRules.mobile"/>
    <!-- 使用自定义插槽插入图标库里的图标 -->
    <van-field
    v-model="user.code"
    name="Password"
    label="Code"
    type="Password"
    placeholder="Password"
    :rules="userFormRules.code">
    <i slot="left-icon" class="iconfont icon-loupe"></i>
    <template #button>
      <!-- 倒计时组件和发送验证码按钮同级 -->
    <van-count-down v-if="isCountDownShow" :time="1000 * 60" format="ss s" @finish="isCountDownShow = false"/>
    <van-button v-else class="smsBtn" round size="small" type="default" @click="sendSms" native-type="button">Send SMS</van-button>
    </template>
    </van-field>
    <div style="margin: 16px;">
    <van-button class="submitBtn" block type="info" native-type="submit">
      Submit
    </van-button>
    </div>
  </van-form>
 </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      isCountDownShow: false,
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [
          { required: true, message: 'Please input valid data' },
          { pattern: /^0[4|3|5]\d{9}$/, message: 'The mobile incorrect' }
        ],
        code: [
          { required: true, message: 'Please input valid data' },
          { pattern: /^\d{6}$/, message: 'The code incorrect' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async sendSms () {
      // 1 验证手机号是否有效，这也是一个异步方法 2 显示倒计时 3 异步请求后台发送验证码
      try {
        await this.$refs.loginFormRef.validate('mobile')
      } catch (err) { return err }
      this.isCountDownShow = true
      try {
        // sendSms have been defined at api/user.js
        await sendSms(this.user.mobile)
        this.$toast('code sent successfully')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('Sending message too frequent, Please try again after 1 min')
        } else { this.$toast('fail to send message') }
      }
    },
    async onSubmit (values) {
    //   1 获取表单数据 2 对表单进行验证 3 提交请求 4 根据后台响应结果进行相应处理
      const user = this.user
      //   $toast是vant内置方法 forbidClick当message正在展示时，不允许点击其它页面 duration为0会一直展示
      this.$toast.loading({
        message: 'Loading...',
        forbidClick: true,
        duration: 0
      })
      try {
        //   login数据请求在api/user.js进行了封装，user是访问时携带的参数，将后台返回的token（data.data）通过mutations里的setUser方法更新在state里
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        // if new toast actived, old toast will be closed automatically
        this.$toast.success('Success')
        this.$router.back()
      } catch (err) {
        //   这是后台数据校验
        if (err.response.status === 400) {
          this.$toast.fail('Data inputed invalid')
        } else {
          this.$toast.fail('Login fail, Please try again later')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
    .iconfont {
        font-size: 30px;
    }
    .smsBtn {
        background-color: #ededed;
    }
    .submitBtn {
        border: none;
    }
}
</style>
