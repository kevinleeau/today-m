<template>
 <div class="update-photo">
     <img class="avatar" :src="img" alt="" ref="img">
     <div class="toolbar">
         <div class="cancel" @click="$emit('close')">Cancel</div>
         <div class="confirm" @click="onConfirm">Confirm</div>
     </div>
 </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user.js'
export default {
  name: 'UpdatePhoto',
  data () {
    return {
      cropper: null
    }
  },
  // created: trigger before render html
  created () {},
  // mounted: trigger after render html, do something on dom
  mounted () {
    // refer to https://github.com/fengyuanchen/cropperjs
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  props: {
    img: {
      type: [Object, String],
      required: true
    }
  },
  methods: {
    onConfirm () {
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        // if serve require content-type is multipart/form-data, formData is required
        const formData = new FormData()
        formData.append('photo', blob)
        this.toast.loading({
          message: 'uploading...',
          forbidClick: true,
          duration: 0
        })
        try {
          const { data } = await updateUserPhoto(formData)
          this.$toast.success('upload photo successfully')
          this.$emit('close')
          this.$emit('newImg', data.data.photo)
        } catch (err) {
          this.toast.fail('fail to upload photo')
        }
      })
    }
  }
}

</script>
<style lang="less" scoped>
.update-photo {
    background-color: #000;
    height: 100%;
    .toolbar {
        position: fixed;
        right: 20px;
        left: 20px;
        bottom: 0;
        display: flex;
        justify-content: space-between!important;
        .cancel, .confirm {
            width: 90px;
            height: 90px;
            font-size: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
        }
    }
}
.avatar {
        max-width: 100%;
        display: block;
    }
</style>
