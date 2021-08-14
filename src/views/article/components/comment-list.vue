<template>
  <!-- :immediate-check是vant list内置属性，在页面下拉时不再触发onload函数，因为onload在created里已经被触发了，默认为true，会造成多次渲染 -->
 <van-list
  v-model="loading"
  :finished="finished"
  finished-text="Finished"
  :error="error"
  error-text="fail to download"
  @load="onLoad"
  :immediate-check="false"
>
<!-- commentItem封装为子组件 起个名字叫comment，把item绑给它，然后传给子组件-->
<!-- 监听子组件comment-item.vue发过来的指令replyClick，并继续向上一级组件发送同名的指令，同时把子组件的$event一并携带出去 -->
  <CommentItem v-for="(item, index) in list" :key="index" :comment="item" @replyClick="$emit('replyClick', $event)"/>
</van-list>
</template>

<script>
import { getComments } from '@/api/comment.js'
import CommentItem from './comment-item.vue'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, //  获取下一页数据的标记
      limit: 10, //  每页评论条数
      error: false
    }
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      // 如果引用对象，需要用函数定义
      default: function () {
        return {}
      }
    },
    type: {
      type: String,
      // validate val either a or c, return true, otherwise return false
      validator (val) {
        return ['a', 'c'].includes(val)
      },
      // 如果普通对象，无需函数定义
      default: 'a'
    }
  },
  //   onLoad must in created, as comment data needed rendering at first stage
  created () {
    this.loading = true
    this.onLoad()
  },
  methods: {
    async onLoad () {
    //   1: request data, 2: reassign value to data, 3: loading false, 4: if data, request next page data, if no, finished true
      try {
        const { data } = await getComments({
          //   根据后台规则，a表示获取文章的评论，c表示获取评论的回复
          type: this.type,
          source: this.articleId.toString(),
          offset: this.offset,
          limit: this.limit
        })
        const { res } = data.data
        this.list.push(...res)
        this.$emit('commentData', data.data)
        this.loading = false
        if (res.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.loading = false
        this.error = true
      }
    }
  }
}

</script>
<style>
</style>
