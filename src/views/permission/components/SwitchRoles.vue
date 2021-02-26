<!--
 * @Description:  切换角色控件
 * @Author: ZY
 * @Date: 2021-01-11 15:45:24
 * @LastEditors: scy😊
 * @LastEditTime: 2021-02-03 16:14:49
-->
<template>
  <div>
    <div style="margin-bottom:15px;">
      {{ t('permission.roles') }}： {{ roles }}
    </div>
    {{ t('permission.switchRoles') }}：
    <el-radio-group v-model="currentRole">
      <el-radio-button label="editor" />
      <el-radio-button label="admin" />
    </el-radio-group>
  </div>
</template>
<script lang="ts">
import { useStore } from '@/store'
import { UserActionTypes } from '@/store/modules/user/action-types'
import { computed, defineComponent, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const store = useStore()
    const roles = computed(() => store.state.user.roles)
    const currentRole = ref(roles.value[0])
    watch(currentRole, (value) => {
      store.dispatch(UserActionTypes.ACTION_CHANGE_ROLES, value)
    })
    return {
      t,
      roles,
      currentRole
    }
  }
})
</script>
