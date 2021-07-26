<template>
  <div id="app">
    <router-view/>
    <h1>today-m</h1>
    <i class="iconfont icon-comment"></i>
    <van-button type="primary">Primary</van-button>
<van-button type="info">Info</van-button>
<van-button type="default">Default</van-button>
<van-button type="danger">Danger</van-button>
<van-button type="warning">Warning</van-button>
<van-cell-group>
  <van-cell title="Cell title" value="Content" />
  <van-cell title="Cell title" value="Content" label="Description" />
</van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
</style>
