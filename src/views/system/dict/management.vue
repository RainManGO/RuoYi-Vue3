<!--
 * @Description:
 * @Autor: scy😊
 * @Date: 2021-02-03 16:46:33
 * @LastEditors: scy😊
 * @LastEditTime: 2021-02-03 17:01:24
-->
<template>
  <div class="app-container">
    <el-form
      v-show="showSearch"
      ref="queryForm"
      :model="queryParams"
      :inline="true"
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
          @click="getTypeList"
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
          type="primary"
          plain
          icon="el-icon-plus"
          @click="handleAdd"
        >
          新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          :disabled="single"
          @click="handleUpdate"
        >
          修改
        </el-button>
      </el-col>
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
      :data="dataList"
      border
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
        <!-- <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template> -->
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
          >
            修改
          </el-button>

          <el-popconfirm
            title="确定删除该字典项吗"
            @confirm="handleDelete(scope.row)"
          >
            <template #reference>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <el-dialog
      :title="title"
      v-model="open"
      width="500px"
      append-to-body
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="字典类型">
          <el-input
            v-model="form.dictType"
          />
        </el-form-item>
        <el-form-item
          label="数据标签"
          prop="dictLabel"
        >
          <el-input
            v-model="form.dictLabel"
            placeholder="请输入数据标签"
          />
        </el-form-item>
        <el-form-item
          label="数据键值"
          prop="dictValue"
        >
          <el-input
            v-model="form.dictValue"
            placeholder="请输入数据键值"
          />
        </el-form-item>
        <el-form-item
          label="显示排序"
          prop="dictSort"
        >
          <el-input-number
            v-model="form.dictSort"
            controls-position="right"
            :min="0"
          />
        </el-form-item>
        <el-form-item
          label="状态"
          prop="status"
        >
          <el-radio-group v-model:value="form.status">
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
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
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

<script>
import { ElMessage } from 'element-plus'
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import {
  listData,
  getData,
  delData,
  addData,
  updateData,
  exportData,
  listType,
  getTypeApi,
  getDicts
} from '@/apis/system'
import { useRoute } from 'vue-router'
export default defineComponent({
  setup() {
    const route = useRoute()
    console.log(route)
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
        dictType: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
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
    const getList = async() => {
      dataMap.loading = true
      const result = await listData(dataMap.queryParams)

      console.log(result)
      if (result.code === 200) {
        dataMap.dataList = result.rows
        dataMap.total = result.total
        dataMap.loading = false
      }
    }
    const getType = async(dictId) => {
      const result = await getTypeApi(dictId)
      if (result.code === 200) {
        dataMap.queryParams.dictType = result.data.dictType
        dataMap.defaultDictType = result.data.dictType
        getList()
      }
    }
    /** 查询字典类型列表 */
    const getTypeList = async() => {
      const result = await listType(dataMap.queryParams)
      if (result.code === 200) {
        // dataMap.typeOptions = result.rows
        dataMap.dataList = result.rows
      }
    }

    // 数据状态字典翻译
    const statusFormat = (row) => {
      return row.status === 0 ? '停用' : ' 正常'
    }

    // 表单重置
    const reset = () => {
      dataMap.form = {
        dictCode: undefined,
        dictLabel: undefined,
        dictValue: undefined,
        dictSort: 0,
        status: '0',
        remark: undefined
      }
      //   this.resetForm('form')
    }

    // 取消按钮
    const cancel = () => {
      dataMap.open = false
      reset()
    }

    /** 搜索按钮操作 */
    const handleQuery = () => {
      dataMap.queryParams.pageNum = 1
      getList()
    }
    /** 重置按钮操作 */
    const resetQuery = () => {
      //   this.resetForm('queryForm')
      dataMap.queryParams.dictType = dataMap.defaultDictType
      handleQuery()
    }
    /** 新增按钮操作 */
    const handleAdd = () => {
      reset()
      dataMap.open = true
      dataMap.title = '添加字典数据'
      dataMap.form.dictType = dataMap.queryParams.dictType
    }
    // 多选框选中数据
    const handleSelectionChange = (selection) => {
      dataMap.ids = selection.map((item) => item.dictCode)
      dataMap.single = selection.length !== 1
      dataMap.multiple = !selection.length
    }
    /** 修改按钮操作 */
    const handleUpdate = (row) => {
      reset()
      const dictCode = row.dictCode || this.ids
      getData(dictCode).then((response) => {
        this.form = response.data
        this.open = true
        this.title = '修改字典数据'
      })
    }
    /** 提交按钮 */
    const submitForm = () => {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (dataMap.form.dictCode !== undefined) {
            updateData(this.form).then((response) => {
              console.log(response)
              dataMap.msgSuccess('修改成功')
              dataMap.open = false
              getList()
            })
          } else {
            addData(this.form).then((response) => {
              console.log(response)
              this.msgSuccess('新增成功')
              this.open = false
              getList()
            })
          }
        }
      })
    }
    /** 删除按钮操作 */
    const handleDelete = async(row) => {
      console.log(row)
      const dictCodes = row.dictCode || this.ids
      const result = await delData(dictCodes)
      if (result.code === 200) {
        getList()
        ElMessage.success('删除成功')
      }
    }
    /** 导出按钮操作 */
    const handleExport = () => {
      const queryParams = dataMap.queryParams
      this.$confirm('是否确认导出所有数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return exportData(queryParams)
        })
        .then((response) => {
          this.download(response.msg)
        })
    }
    onMounted(() => {
      const id = route.query && route.params.dictId
      getType(id)
      getTypeList()
      getList()
      getDicts('sys_normal_disable').then((response) => {
        dataMap.statusOptions = response.data
      })
    })

    return {
      ...toRefs(dataMap),
      getTypeList,
      getList,
      getType,
      reset,
      cancel,
      handleDelete,
      handleExport,
      submitForm,
      handleUpdate,
      handleSelectionChange,
      handleAdd,
      resetQuery,
      handleQuery,
      statusFormat
    }
  }
})
</script>

<style lang="scss" scoped>
.mb8 {
  margin-bottom: 18px;
}
</style>
