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
        label="字典名称"
        prop="dictType"
      >
        <el-select
          v-model="queryParams.dictType"
          size="small"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.dictId"
            :label="item.dictName"
            :value="item.dictType"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="字典标签"
        prop="dictLabel"
      >
        <el-input
          v-model="queryParams.dictLabel"
          placeholder="请输入字典标签"
          clearable
          size="small"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item
        label="状态"
        prop="status"
      >
        <el-select
          v-model="queryParams.status"
          placeholder="数据状态"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
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

    <el-row
      :gutter="10"
      class="mb8"
    >
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:dict:add']"
        >
          新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:dict:edit']"
        >
          修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:dict:remove']"
        >
          删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:dict:export']"
        >
          导出
        </el-button>
      </el-col>
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      />
    </el-row>

    <el-table
      v-loading="loading"
      :data="dataList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column
        label="字典编码"
        align="center"
        prop="dictCode"
      />
      <el-table-column
        label="字典标签"
        align="center"
        prop="dictLabel"
      />
      <el-table-column
        label="字典键值"
        align="center"
        prop="dictValue"
      />
      <el-table-column
        label="字典排序"
        align="center"
        prop="dictSort"
      />
      <el-table-column
        label="状态"
        align="center"
        prop="status"
        :formatter="statusFormat"
      />
      <el-table-column
        label="备注"
        align="center"
        prop="remark"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="180"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
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
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:dict:edit']"
          >
            修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:dict:remove']"
          >
            删除
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

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog
      :title="title"
      v-model="open"
      width="500px"
      append-to-body
    >
      <el-form
        ref="form"
        :model="formVal"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="字典类型">
          <el-input
            v-model="formVal.dictType"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          label="数据标签"
          prop="dictLabel"
        >
          <el-input
            v-model="formVal.dictLabel"
            placeholder="请输入数据标签"
          />
        </el-form-item>
        <el-form-item
          label="数据键值"
          prop="dictValue"
        >
          <el-input
            v-model="formVal.dictValue"
            placeholder="请输入数据键值"
          />
        </el-form-item>
        <el-form-item
          label="显示排序"
          prop="dictSort"
        >
          <el-input-number
            v-model="formVal.dictSort"
            controls-position="right"
            :min="0"
          />
        </el-form-item>
        <el-form-item
          label="状态"
          prop="status"
        >
          <el-radio-group v-model="formVal.status">
            <el-radio
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >
              {{ dict.dictLabel }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="备注"
          prop="remark"
        >
          <el-input
            v-model="formVal.remark"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div
          class="dialog-footer"
        >
          <el-button
            type="primary"
            @click="submitForm"
          >
            确 定
          </el-button>
          <el-button @click="cancel">
            取 消
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import { listData, getData, delData, addData, updateData, exportData, listType, getType, getDicts } from '@/apis/system/system'

import { ElForm, ElMessage, ElMessageBox } from 'element-plus'
import { defineComponent, onMounted, reactive, ref, toRefs, unref } from 'vue'
import { useRoute } from 'vue-router'
import { download, selectDictLabel, parseTime } from '@/utils/ruoyi'
export default defineComponent({
  setup() {
    const queryForm = ref(ElForm)
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
      // 字典表格数据
      dataList: [],
      // 默认字典类型
      defaultDictType: '',
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 状态数据字典
      statusOptions: [],
      // 类型数据字典
      typeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        dictName: undefined,
        dictType: '',
        status: undefined
      },
      // 表单参数
      formVal: {
        dictCode: undefined,
        dictLabel: undefined,
        dictValue: '',
        dictSort: 0,
        status: '0',
        remark: '',
        dictType: ''

      },
      // 表单校验
      rules: {
        dictLabel: [
          { required: true, message: '数据标签不能为空', trigger: 'blur' }
        ],
        dictValue: [
          { required: true, message: '数据键值不能为空', trigger: 'blur' }
        ],
        dictSort: [
          { required: true, message: '数据顺序不能为空', trigger: 'blur' }
        ]
      }
    })

    /** 查询字典数据列表 */
    const getList = () => {
      dataMap.loading = true
      listData(dataMap.queryParams).then((response: any) => {
        dataMap.dataList = response.rows
        dataMap.total = response.total
        dataMap.loading = false
      })
    }
    /** 查询字典类型详细 */
    const getTypes = (dictId: number) => {
      getType(dictId).then((response: any) => {
        dataMap.queryParams.dictType = response.data.dictType
        dataMap.defaultDictType = response.data.dictType
        getList()
      })
    }
    /** 查询字典类型列表 */
    const getTypeList = () => {
      listType().then(response => {
        dataMap.typeOptions = response?.rows
      })
    }
    // 表单重置
    const reset = () => {
      dataMap.formVal = {
        dictCode: undefined,
        dictLabel: undefined,
        dictValue: '',
        dictSort: 0,
        status: '0',
        remark: '',
        dictType: ''
      }
      // this.resetForm('form')
    }
    /** 搜索按钮操作 */
    const handleQuery = () => {
      dataMap.queryParams.pageNum = 1
      getList()
    }
    // 数据状态字典翻译
    const statusFormat = (row: {[key: string]: any}) => {
      return selectDictLabel(dataMap.statusOptions, row.status)
    }
    // 取消按钮
    const cancel = () => {
      dataMap.open = false
      reset()
    }

    /** 新增按钮操作 */
    const handleAdd = () => {
      reset()
      dataMap.open = true
      dataMap.title = '添加字典数据'
      dataMap.formVal.dictType = dataMap.queryParams.dictType
    }
    // 多选框选中数据
    const handleSelectionChange = (selection: any) => {
      dataMap.ids = selection.map((item: any) => item.dictCode)
      dataMap.single = selection.length !== 1
      dataMap.multiple = !selection.length
    }

    /** 修改按钮操作 */
    const handleUpdate = (row: {[key: string]: any}) => {
      reset()
      const dictCode = row.dictCode || dataMap.ids
      getData(dictCode).then((response) => {
        dataMap.formVal = response?.data
        dataMap.open = true
        dataMap.title = '修改字典数据'
      })
    }
    /** 提交按钮 */
    const submitForm = () => {
      const formValid = unref(queryForm)
      formValid.validate((valid: Boolean) => {
        if (valid) {
          if (dataMap.formVal.dictCode !== undefined) {
            updateData(dataMap.formVal).then(() => {
              ElMessage.success('修改成功')
              dataMap.open = false
              getList()
            })
          } else {
            addData(dataMap.formVal).then(() => {
              ElMessage.success('新增成功')
              dataMap.open = false
              getList()
            })
          }
        }
      })
    }
    /** 删除按钮操作 */
    const handleDelete = (row: {[key: string]: any}) => {
      const dictCodes = row.dictCode || dataMap.ids
      ElMessageBox.confirm('是否确认删除字典编码为"' + dictCodes + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delData(dictCodes)
      }).then((response: any) => {
        response?.code === 200 ? ElMessage.success('删除成功') : ElMessage.error(response.msg)
        getList()
      })
    }
    /** 导出按钮操作 */
    const handleExport = () => {
      const queryParams = dataMap.queryParams
      ElMessageBox.confirm('是否确认导出所有数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportData(queryParams)
      }).then(response => {
        download(response?.msg)
      })
    }
    const initData = () => {
      const dictId = useRoute().params && useRoute().params.id
      getTypes(Number(dictId))
      getTypeList()
      getDicts('sys_normal_disable').then(response => {
        dataMap.statusOptions = response?.data
      })
    }

    /** 重置按钮操作 */
    const resetQuery = () => {
      // this.resetForm('queryForm')
      const formValid = unref(queryForm)
      formValid.resetFields()
      dataMap.queryParams.dictType = dataMap.defaultDictType
      handleQuery()
    }
    onMounted(() => {
      initData()
    })

    return { ...toRefs(dataMap), initData, parseTime, queryForm, handleExport, handleDelete, submitForm, handleUpdate, handleSelectionChange, handleAdd, resetQuery, cancel, statusFormat, handleQuery, reset, getTypeList, getTypes, getList }
  }
})
</script>
