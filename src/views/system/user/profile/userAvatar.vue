<template>
  <div>
    <div
      class="user-info-head"
      @click="editCropper()"
    >
      <img
        :src="options.img"
        title="点击上传头像"
        class="img-circle img-lg"
      >
    </div>
    <el-dialog
      :title="title"
      v-model:visible="open"
      width="800px"
      append-to-body
      @opened="modalOpened"
    >
      <el-row>
        <el-col
          :xs="24"
          :md="12"
          :style="{height: '350px'}"
        >
          <VueCropper
            ref="cropper"
            :img="options.img"
            :info="true"
            :autoCrop="options.autoCrop"
            :autoCropWidth="options.autoCropWidth"
            :autoCropHeight="options.autoCropHeight"
            :fixedBox="options.fixedBox"
            @realTime="realTime"
            v-if="visible"
          />
        </el-col>
        <el-col
          :xs="24"
          :md="12"
          :style="{height: '350px'}"
        >
          <div class="avatar-upload-preview">
            <img
              :src="previews.url"
              :style="previews.img"
            >
          </div>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-col
          :lg="2"
          :md="2"
        >
          <el-upload
            action="#"
            :http-request="requestUpload"
            :show-file-list="false"
            :before-upload="beforeUpload"
          >
            <el-button size="small">
              选择
              <i class="el-icon-upload el-icon--right" />
            </el-button>
          </el-upload>
        </el-col>
        <el-col
          :lg="{span: 1, offset: 2}"
          :md="2"
        >
          <el-button
            icon="el-icon-plus"
            size="small"
            @click="changeScale(1)"
          />
        </el-col>
        <el-col
          :lg="{span: 1, offset: 1}"
          :md="2"
        >
          <el-button
            icon="el-icon-minus"
            size="small"
            @click="changeScale(-1)"
          />
        </el-col>
        <el-col
          :lg="{span: 1, offset: 1}"
          :md="2"
        >
          <el-button
            icon="el-icon-refresh-left"
            size="small"
            @click="rotateLeft()"
          />
        </el-col>
        <el-col
          :lg="{span: 1, offset: 1}"
          :md="2"
        >
          <el-button
            icon="el-icon-refresh-right"
            size="small"
            @click="rotateRight()"
          />
        </el-col>
        <el-col
          :lg="{span: 2, offset: 6}"
          :md="2"
        >
          <el-button
            type="primary"
            size="small"
            @click="uploadImg()"
          >
            提 交
          </el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { useStore } from '@/store'
import { ElMessage } from 'element-plus'
import { UserMutationTypes } from '@/store/modules/user/mutation-types'
import { uploadAvatar } from '@/apis/system/user'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
export default defineComponent({
  components: {
    VueCropper
  },
  props: {

  },
  setup() {
    const cropper = ref<HTMLInputElement | null>(null)
    const dataMap = reactive({
      // 是否显示弹出层
      open: false,
      // 是否显示cropper
      visible: false,
      // 弹出层标题
      title: '修改头像',
      options: {
        img: useStore().state.user.avatar, // 裁剪图片的地址
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true // 固定截图框大小 不允许改变
      },
      previews: {}
    })

    // 编辑头像
    const editCropper = () => {
      dataMap.open = true
    }
    // 打开弹出层结束时的回调
    const modalOpened = () => {
      dataMap.visible = true
    }
    // 覆盖默认的上传行为
    const requestUpload = () => {
      console.log(useStore())
    }
    // 向左旋转
    const rotateLeft = () => {
      (cropper as any).rotateTo(45)
    }
    // 向右旋转
    const rotateRight = () => {
      (cropper.value as any).rotateTo(-45)
    }
    // 图片缩放
    const changeScale = (num = 1) => {
      (cropper.value as any).scaleX(num)
    }
    // 上传预处理
    const beforeUpload = (file: any) => {
      if (file.type.indexOf('image/') === -1) {
        ElMessage.error('文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。')
      } else {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          dataMap.options.img = String(reader.result)
        }
      }
    }
    // 上传图片
    const uploadImg = () => {
      (cropper.value as any).getCroppedCanvas((data: any) => {
        const formData = new FormData()
        formData.append('avatarfile', data)
        uploadAvatar(formData).then((response: any) => {
          dataMap.open = false
          dataMap.options.img = process.env.VUE_APP_BASE_API + response.imgUrl
          useStore().commit(UserMutationTypes.SET_AVATAR, dataMap.options.img)
          ElMessage.success('修改成功')
          dataMap.visible = false
        })
      })
    }
    // 实时预览
    const realTime = (data: {[key: string]: any}) => {
      dataMap.previews = data
    }

    return { ...toRefs(dataMap), requestUpload, modalOpened, editCropper, realTime, uploadImg, beforeUpload, changeScale, rotateRight, rotateLeft }
  }
})
</script>
<style scoped lang="scss">
.user-info-head {
  position: relative;
  display: inline-block;
  height: 120px;
}

.user-info-head:hover:after {
  content: '+';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  color: #eee;
  background: rgba(0, 0, 0, 0.5);
  font-size: 24px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  line-height: 110px;
  border-radius: 50%;
}
</style>
