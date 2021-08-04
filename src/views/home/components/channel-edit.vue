<template>
 <div class="channel-edit">
     <van-cell :border="false">
         <div class="title-text" slot="title">My Channels</div>
         <van-button class="edit-btn" type="danger" plain round size="mini" @click="isEdit = !isEdit">{{isEdit ? 'Finish' : 'Edit'}}</van-button>
     </van-cell>
     <van-grid class="my-grid" :gutter="10">
      <!-- 在props接收了父组件的myChannels后循环渲染 -->
      <van-grid-item class="grid-item" v-for="(channel, index) in myChannels" :key="index" @click="myChannelClick(channel, index)">
          <!-- 同样用自定义插槽方式插入close图标，才能绑定编辑布尔值 fixchannels不允许删除-->
          <van-icon
          slot="icon"
          name="close"
          v-show="isEdit && !fixedChannels.includes(channel.id)">
          </van-icon>
          <!-- 因为要接收父组件的active标签，所以用自定义插槽方式插入要渲染的channel.name -->
          <!-- 判断index是否等于active，如果等于则对该标签进行赋值class为active，然后再当前组件中另外设置active高亮类 -->
          <span
          class="text"
          :class="{active: index === active}"
          slot="text"
          >{{channel.name}}</span>
      </van-grid-item>
     </van-grid>
     <!-- *************** -->
     <van-cell :border="false">
         <div class="title-text" slot="title">Channels Recommendation</div>
     </van-cell>
     <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item class="grid-item" v-for="(channel, index) in recommendChannels" icon="plus" :key="index" :text="channel.name" @click="addChannel(channel)"/>
     </van-grid>
 </div>
</template>

<script>
// 引进的时候要用花括号
import { getAllChannels, addUserChannels, deleteUserChannels } from '@/api/channels.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
export default {
  name: 'ChannelEdit',
  //   需要传入父组件的数据，并渲染在编辑页面中，这里props声明要接受的条件
  props: {
    myChannels: {
      type: Array,
      reuqired: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false,
      //   固定频道不允许删除
      fixedChannels: [0]
    }
  },
  created () {
    this.loadAllChannels()
  },
  computed: {
    ...mapState(['user']),
    // 计算属性会动态观测数据变化，数据会自适应相应重新计算
    recommendChannels () {
      return this.allChannels.filter(item => {
        return !this.myChannels.find(myChannel => {
          return myChannel.id === item.id
        })
      })
    }
    // ********recommendChannels = allChannels - myChannels**********
    // recommendChannels () {
    //   const channels = []
    //   this.allChannels.forEach(item => {
    //     const result = this.myChannels.find(myChannel => {
    //       return myChannel.id === item.id
    //     })
    //     if (!result) { channels.push(item) }
    //   })
    //   return channels
    // }
  },
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('fail to get all data')
      }
    },
    async addChannel (channel) {
      this.myChannels.push(channel)
      // conditions: if not login, data save to localStorage, if login(this.user === true), request server
      if (this.user) {
        try {
          // 后台要求函数提供一个对象形式的参数
          await addUserChannels({
            id: channel.id,
            seq: this.myChannels.length
          })
        } catch (err) {
          this.$toast('fail to update userChannels')
        }
      } else {
        setItem('KEY', this.myChannels)
      }
    },
    myChannelClick (channel, index) {
      // 如果是固定频道，则不允许删除，固定频道已经在data中设置为0
      if (this.fixedChannels.includes(channel.id)) {
        return
      }
      // 这里有两个逻辑， 1：如果编辑状态，点击删除频道，2：如果非编辑状态，点击切换回父组件页面
      // 这里仅仅对页面渲染
      // $emit第三个参数在父组件里有说明，如果仅仅编辑频道不需要跳转回父组件页面则isEditChannelShow为true，otherwise false
      if (this.isEdit) {
        // splice第一个参数是开始索引，第二个是个数
        this.myChannels.splice(index, 1)
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        // deleteUserChannels定义在外层，并把channel对象传出去
        this.deleteChannels(channel)
      } else {
        // 子组件向父组件发出自定义update-active事件，并提供index，update-active事件在父组件里被监听到，然后在父组件里执行操作
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannels (channel) {
      if (this.user) {
        try {
          await deleteUserChannels(channel.id)
        } catch (err) {
          this.$toast('fail to delete data')
        }
      } else {
        // 实际上是对本地存储重新覆盖
        setItem('KEY', this.myChannels)
      }
    }
  }
}

</script>
<style lang="less" scoped>
.channel-edit {
    padding: 85px 0;
    .title-text {
        font-size: 32px;
        color: #333;
    }
    .edit-btn {
        width: 104px;
        height: 48px;
        font-size: 26px;
    }
    /deep/.grid-item {
        width: 160px;
        height: 86px;
        .van-grid-item__content {
            // white-space nowrap不换行显示
            white-space: nowrap;
            background-color: #c4d7eb;
            .van-grid-item__text, .text {
                font-size: 28px;
                color: #222;
                margin-top: 0;
            }
            .active {
                color: red;
            }
            .van-grid-item__icon-wrapper {
                position: unset;
            }
        }
    }
    /deep/.my-grid {
        .grid-item {
            .van-icon-close {
                position: absolute;
                right: -5px;
                top: -5px;
                font-size: 30px;
                // z-index提升显示层级，覆盖其它内容
                z-index: 2;
                color: rgb(220, 123, 123);
            }
        }
    }
    /deep/.recommend-grid {
        .grid-item {
            .van-grid-item__content {
                flex-direction: row;
                .van-icon-plus {
                    font-size: 28px;
                    margin-right: 6px;
                }
            }
        }
    }
}
</style>
