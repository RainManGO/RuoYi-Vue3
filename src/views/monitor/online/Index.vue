<!--
 * @Description: 在线用户
 * @Author: ZY
 * @Date: 2021-02-22 15:07:22
 * @LastEditors: scy😎
 * @LastEditTime: 2021-03-12 14:13:46
-->
<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      label-width="68px"
    >
      <el-form-item
        label="登录地址"
        prop="ipaddr"
      >
        <el-input
          v-model="queryParams.ipaddr"
          placeholder="请输入登录地址"
          clearable
          size="small"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item
        label="用户名称"
        prop="userName"
      >
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入用户名称"
          clearable
          size="small"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
        >
          搜索
        </el-button>
        <el-button
          icon="el-icon-refresh"
          size="mini"
          @click="resetQuery"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      :data="list.slice((pageNum-1)*pageSize,pageNum*pageSize)"
      style="width: 100%;"
    >
      <el-table-column
        label="序号"
        type="index"
        align="center"
      >
        <template #default="scope">
          <span>{{ (pageNum - 1) * pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="会话编号"
        align="center"
        prop="tokenId"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="登录名称"
        align="center"
        prop="userName"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="部门名称"
        align="center"
        prop="deptName"
      />
      <el-table-column
        label="主机"
        align="center"
        prop="ipaddr"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="登录地点"
        align="center"
        prop="loginLocation"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="浏览器"
        align="center"
        prop="browser"
      />
      <el-table-column
        label="操作系统"
        align="center"
        prop="os"
      />
      <el-table-column
        label="登录时间"
        align="center"
        prop="loginTime"
        width="180"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.loginTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleForceLogout(scope.row)"
            v-hasPermi="['monitor:online:forceLogout']"
          >
            强退
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="pageNum"
      v-model:limit="pageSize"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue'
import { list, forceLogout } from '@/apis/monitor/online'
import { OnlineUserModel } from '@/model/monitor/onlineUserModel'
import { ElMessageBox, ElMessage } from 'element-plus'
import { parseTime } from '@/utils/index'
import pagination from '@/components/pagination/Index.vue'
export default defineComponent({
  name: 'Online',
  components: {
    pagination
  },
  setup() {
    const queryForm = ref(null)
    const state = reactive({
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 表格数据
      list: Array<OnlineUserModel>(),
      pageNum: 1,
      pageSize: 10,
      // 查询参数
      queryParams: {
        ipaddr: undefined,
        userName: undefined
      }
    })

    const getList = () => {
      state.loading = true
      list(state.queryParams).then((res) => {
        if (res === null) return
        state.list = res.rows
        state.total = res.total
        state.loading = false
      })
    }

    const handleQuery = () => {
      state.pageNum = 1
      getList()
    }

    const resetQuery = () => {
      (queryForm.value as any).resetFields()
      handleQuery()
    }

    const handleForceLogout = (model: OnlineUserModel) => {
      ElMessageBox.confirm('是否确认强退名称为"' + model.userName + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return forceLogout(model.tokenId)
      }).then((res: any) => {
        getList()
        res?.code === 200 ? ElMessage.success('强退成功') : ElMessage.error(res.msg)
      })
    }
    onBeforeMount(() => {
      getList()
    })

    return {
      queryForm,
      resetQuery,
      handleForceLogout,
      handleQuery,
      parseTime,
      ...toRefs(state)
    }
  }
})
</script>
