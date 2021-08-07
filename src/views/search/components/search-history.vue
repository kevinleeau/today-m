<template>
 <div class="search-history">
   <van-cell title="History">
     <div v-if="isDeleteShow">
       <!-- 在子组件里不能对父组件的数据重新赋值，必须发回给父组件处理 -->
      <span @click="$emit('deleteAll')">Delete All</span>&nbsp;&nbsp;/&nbsp;&nbsp;
      <span @click="isDeleteShow=false">Finish</span>
     </div>
    <van-icon v-else name="delete" @click="isDeleteShow=true"></van-icon>
   </van-cell>
   <van-cell v-for="(item, index) in searchHistories" :key="index" :title="item" @click="searchItems(item, index)">
     <van-icon v-show="isDeleteShow" name="close"></van-icon>
   </van-cell>
 </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  // props父传子如果是普通数据不能修改，如果是引用数据类型array,object可以修改，不能重新赋值
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  methods: {
    // 如果删除状态，那么删除，如果非删除状态，那么点击请求后台调数据渲染
    searchItems (item, index) {
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
      } else {
        // 把要搜索的item发回给父组件处理，因为父组件里有后台请求功能，在子组件里就不再发后台请求了
        this.$emit('search', item)
      }
    }
  }
}

</script>
<style>
</style>
