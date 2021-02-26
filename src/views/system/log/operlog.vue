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
        label="系统模块"
        prop="title"
      >
        <el-input
          v-model="queryParams.title"
          placeholder="请输入系统模块"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item
        label="操作人员"
        prop="operName"
      >
        <el-input
          v-model="queryParams.operName"
          placeholder="请输入操作人员"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item
        label="类型"
        prop="operatorType"
      >
        <el-select
          v-model="queryParams.operatorType"
          placeholder="操作类型"
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
      <el-form-item
        label="状态"
        prop="status"
      >
        <el-select
          v-model="queryParams.status"
          placeholder="操作状态"
          clearable
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
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
          :disabled="single"
          @click="handleUpdate"
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
        label="日志编号"
        align="center"
        prop="operId"
      />
      <el-table-column
        label="系统模块"
        align="center"
        prop="title"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="操作类型"
        align="center"
        prop="operatorType"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="请求方式"
        align="center"
        prop="requestMethod"
      />
      <el-table-column
        label="操作人员"
        align="center"
        prop="operName"
        :formatter="typeFormat"
      />
      <el-table-column
        label="主机"
        align="center"
        prop="operIp"
        :formatter="typeFormat"
      />
      <el-table-column
        label="操作地点"
        align="center"
        prop="operLocation"
        :formatter="typeFormat"
      />
      <el-table-column
        label="操作状态"
        align="center"
        prop="status"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="操作日期"
        align="center"
        prop="operTime"
        width="180"
      >
        <template #default="scope">
          <span>{{ scope.row.operTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >
            详细
          </el-button>
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

    <!-- 查看详情对话框 -->
    <el-dialog
      :title="title"
      v-model="open"
      width="500px"
      append-to-body
    >
      <el-row>
        <el-col :span="24">
          <span>参数名称: {{ formData.title }}</span>
        </el-col>
      </el-row>
      <template #footer>
        <div
          class="dialog-footer"
        >
          <el-button @click="cancel">
            关 闭
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import { listOperlog, getDicts, getConfig, delConfig, exportConfig } from '@/apis/system'
import { defineComponent, onMounted, reactive, toRefs, ref, unref } from 'vue'
import { ElForm, ElMessage, ElMessageBox } from 'element-plus'
import { download } from '@/utils/ruoyi'
export default defineComponent({
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
      statusOptions: [],
      // 日期范围
      dateRange: [],
      formData: {
        status: '',
        operName: '',
        requestMethod: '',
        operatorType: '',
        title: '',
        operIp: '',
        operLocation: ''
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: undefined,
        operatorType: undefined,
        operName: undefined
      }
    })
    const getList = () => {
      dataMap.loading = true
      listOperlog(dataMap.queryParams).then(result => {
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

    /** 查看详情操作 */
    const handleUpdate = (row: any) => {
      // resetTable()
      const operId = row.operId || dataMap.ids
      getConfig(operId).then(response => {
        console.log('response', response)
        if (response?.code === 200) {
          dataMap.formData = response.data
          dataMap.open = true
          // dataMap.title = '修改参数'
        }
      })
    }

    // 多选框选中数据
    const handleSelectionChange = (selection: any) => {
      dataMap.ids = selection.map((item: any) => item.operId)
      dataMap.single = selection.length !== 1
      dataMap.multiple = !selection.length
    }

    /** 删除按钮操作 */
    const handleDelete = (row: any) => {
      const operId = row.operId || dataMap.ids
      ElMessageBox.confirm('是否确认删除参数编号为"' + operId + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delConfig(operId)
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
        return exportConfig(queryParams)
      }).then((response) => {
        download(response?.msg)
      })
    }

    onMounted(() => {
      getList()
      getDicts('sys_oper_type').then(response => {
        dataMap.typeOptions = response?.data
      })
      getDicts('sys_common_status').then(response => {
        dataMap.statusOptions = response?.data
      })
    })
    return { ...toRefs(dataMap), handleExport, formDialog, getList, handleQuery, resetQuery, queryForm, handleUpdate, handleSelectionChange, handleDelete }
  }
})
</script>
