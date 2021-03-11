<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
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
          style="width: 240px"
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
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item
        label="状态"
        prop="status"
      >
        <el-select
          v-model="queryParams.status"
          placeholder="登录状态"
          clearable
        >
          <el-option
            v-for="dict in typeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="登录时间">
        <el-date-picker
          v-model="dateRange"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="handleQuery"
        >
          搜索
        </el-button>
        <el-button
          icon="el-icon-refresh"
          @click="resetQuery"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <el-row
      :gutter="10"
      class="mb8"
    >
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          :disabled="multiple"
          @click="handleDelete"
        >
          删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-edit"
          @click="handleClean"
        >
          清空
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          @click="handleExport"
        >
          导出
        </el-button>
      </el-col>
    </el-row>

    <el-table
      v-loading="loading"
      :data="configList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column
        label="访问编号"
        align="center"
        prop="infoId"
      />
      <el-table-column
        label="用户名称"
        align="center"
        prop="userName"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="登录地址"
        align="center"
        prop="ipaddr"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="登录地点"
        align="center"
        prop="loginLocation"
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
        label="登录状态"
        align="center"
        prop="status"
        :formatter="statusFormat"
      />
      <el-table-column
        label="操作信息"
        align="center"
        prop="msg"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="登录日期"
        align="center"
        prop="loginTime"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.loginTime }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script lang='ts'>
import { listLogin, getDicts, delLogin, exportLogin, cleanLogin } from '@/apis/system/system'
import { defineComponent, onMounted, reactive, toRefs, ref, unref } from 'vue'
import { ElForm, ElMessage, ElMessageBox } from 'element-plus'
import { download } from '@/utils/ruoyi'
import pagination from '@/components/pagination/Index.vue'

export default defineComponent({
  components: {
    pagination
  },
  setup() {
    const queryForm = ref(ElForm)
    const formDialog = ref(ElForm)
    const dataMap = reactive({
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 参数表格数据
      configList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 类型数据字典
      typeOptions: [],
      // 日期范围
      dateRange: [],
      formData: {
        status: '',
        browser: '',
        os: '',
        msg: '',
        loginLocation: '',
        ipaddr: '',
        userName: '',
        infoId: ''
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        ipaddr: undefined,
        status: undefined
      }
    })

    const getList = () => {
      dataMap.loading = true
      listLogin(dataMap.queryParams).then(result => {
        if (result) {
          dataMap.configList = result.rows ?? []
          dataMap.total = result.total
          dataMap.loading = false
        }
      }
      )
    }

    /** 搜索按钮操作 */
    const handleQuery = () => {
      dataMap.queryParams.pageNum = 1
      getList()
    }
    const resetTable = () => {
      const form = unref(queryForm)
      form.resetFields()
    }
    const resetQuery = () => {
      resetTable()
      handleQuery()
    }
    /** 清空按钮操作 */
    const handleClean = () => {
      ElMessageBox.confirm('是否确认清空所有操作日志数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return cleanLogin(dataMap.queryParams)
      }).then((res) => {
        if (res?.code === 200) {
          getList()
          ElMessage.error('删除成功')
        } else {
          ElMessage.error(res?.msg)
        }
      })
    }
    // 状态
    const statusFormat = (row: any) => {
      return row.status === '0' ? '成功' : ' 失败'
    }
    // 多选框选中数据
    const handleSelectionChange = (selection: any) => {
      dataMap.ids = selection.map((item: any) => item.infoId)
      dataMap.single = selection.length !== 1
      dataMap.multiple = !selection.length
    }

    /** 删除按钮操作 */
    const handleDelete = (row: any) => {
      const infoIds = row.infoId || dataMap.ids
      ElMessageBox.confirm('是否确认删除参数编号为"' + infoIds + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delLogin(infoIds)
      }).then((res) => {
        if (res?.code === 200) {
          getList()
          ElMessage.error('删除成功')
        } else {
          ElMessage.error(res?.msg)
        }
      })
    }

    /** 导出按钮操作 */
    const handleExport = () => {
      const queryParams = dataMap.queryParams
      ElMessageBox.confirm('是否确认导出所有参数数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportLogin(queryParams)
      }).then((response) => {
        download(response?.msg)
      })
    }
    onMounted(() => {
      getList()
      getDicts('sys_common_status').then(response => {
        dataMap.typeOptions = response?.data
      })
    })
    return { ...toRefs(dataMap), handleExport, formDialog, statusFormat, handleClean, getList, handleQuery, resetQuery, queryForm, handleSelectionChange, handleDelete }
  }
})
</script>
