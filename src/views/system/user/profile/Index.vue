<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col
        :span="6"
        :xs="24"
      >
        <el-card class="box-card">
          <template #header />
          <div
            class="clearfix"
          >
            <span>个人信息</span>
          </div>
          <div>
            <div class="text-center">
              <userAvatar :user="user" />
            </div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                <svg-icon icon-class="user" />用户名称
                <div class="pull-right">
                  {{ user.userName }}
                </div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="phone" />手机号码
                <div class="pull-right">
                  {{ user.phonenumber }}
                </div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="email" />用户邮箱
                <div class="pull-right">
                  {{ user.email }}
                </div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="tree" />所属部门
                <div
                  class="pull-right"
                  v-if="user.dept"
                >
                  {{ user.dept.deptName }} / {{ postGroup }}
                </div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="peoples" />所属角色
                <div class="pull-right">
                  {{ roleGroup }}
                </div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="date" />创建日期
                <div class="pull-right">
                  {{ user.createTime }}
                </div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col
        :span="18"
        :xs="24"
      >
        <el-card>
          <template #header>
            <div
              class="clearfix"
            >
              <span>基本资料</span>
            </div>
          </template>
          <el-tabs v-model="activeTab">
            <el-tab-pane
              label="基本资料"
              name="userinfo"
            >
              <userInfo :user="user" />
            </el-tab-pane>
            <el-tab-pane
              label="修改密码"
              name="resetPwd"
            >
              <resetPwd :user="user" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang='ts'>
import userAvatar from './userAvatar.vue'
import userInfo from './userInfo.vue'
import resetPwd from './resetPwd.vue'
import { getUserProfile } from '@/apis/system/user'
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'Profile',
  components: { userAvatar, userInfo, resetPwd },
  setup() {
    const dataMap = reactive({
      user: {},
      roleGroup: {},
      postGroup: {},
      activeTab: 'userinfo'
    })
    const getUser = () => {
      getUserProfile().then(response => {
        dataMap.user = response.data
        dataMap.roleGroup = response.roleGroup
        dataMap.postGroup = response.postGroup
      })
    }
    onMounted(() => {
      getUser()
    })
    return { ...toRefs(dataMap), getUser }
  }
})
</script>
