<template>
 <div class="layout-container">
     <!-- children router出口 -->
     <router-view/>
     <!-- parent router container -->
     <!-- route开启路由导航模式 -->
     <van-tabbar class="layout-tabbar" route>
    <!-- use slot to insert icon from outsource(icon.less) -->
      <van-tabbar-item to="/">
          <i slot="icon" class="iconfont icon-comment"></i>
          <span class="text">Home</span>
      </van-tabbar-item>
      <!-- below icons from vant -->
      <van-tabbar-item to="/qa" icon="search">Questions</van-tabbar-item>
      <van-tabbar-item to="/video" icon="friends-o">Video</van-tabbar-item>
      <van-tabbar-item to="/setting" icon="setting-o">{{$store.state.user ? 'Setting' : 'Login'}}</van-tabbar-item>
     </van-tabbar>

 </div>
</template>

<script>
export default {
  name: 'layoutIndex',
  data () {
    return {
    }
  }
}

</script>
<style lang="less" scoped>
.layout-container {
    .layout-tabbar {
        i.iconfont {
            font-size: 40px;
        }
        span.text {
            font-size: 30px;
        }
    }
}
</style>
