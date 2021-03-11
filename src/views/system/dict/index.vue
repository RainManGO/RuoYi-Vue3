<!--
 * @Description:
 * @Autor: scy😊
 * @Date: 2021-02-03 16:48:44
 * @LastEditors: scy😊
 * @LastEditTime: 2021-02-04 10:03:35
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
        prop="dictName"
      >
        <el-input
          v-model="queryParams.dictName"
          placeholder="请输入字典名称"
          size="small"
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item
        label="字典类型"
        prop="dictType"
      >
        <el-input
          v-model="queryParams.dictType"
          placeholder="请输入字典类型"
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
          placeholder="字典状态"
          clearable
          style="width: 240px"
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
          type="primary"
          plain
          icon="el-icon-plus"
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
          @click="handleExport"
          v-hasPermi="['system:dict:export']"
        >
          导出
        </el-button>
      </el-col>
      <right-toolbar
        v-model:show-search="showSearch"
        @queryTable="getList"
      />
    </el-row>

    <el-table
      v-loading="loading"
      :data="typeList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column
        label="字典编号"
        align="center"
        prop="dictId"
      />
      <el-table-column
        label="字典名称"
        align="center"
        prop="dictName"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="字典类型"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template #default="scope">
          <router-link
            :to="'/system/dict/type/data/' + scope.row.dictId"
            class="link-type"
          >
            <span>{{ scope.row.dictType }}</span>
          </router-link>
        </template>
      </el-table-column>
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
          <span>{{ scope.row.createTime }}</span>
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
            v-hasPermi="['system:dict:edit']"
          >
            修改
          </el-button>
          <el-button
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
        ref="postFormNode"
        :model="formData"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item
          label="字典名称"
          prop="dictName"
        >
          <el-input
            v-model="formData.dictName"
            placeholder="请输入字典名称"
          />
        </el-form-item>
        <el-form-item
          label="字典类型"
          prop="dictType"
        >
          <el-input
            v-model="formData.dictType"
            placeholder="请输入字典类型"
          />
        </el-form-item>
        <el-form-item
          label="状态"
          prop="status"
        >
          <el-radio-group v-model="formData.status">
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
            v-model="formData.remark"
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

<script lang="ts">
import { reactive, toRefs, defineComponent, onMounted, ref, unref } from 'vue'
import { listType, getType, addType, updateType, getDicts, delType, exportType } from '@/apis/system/system'
import { ElForm, ElMessage, ElMessageBox } from 'element-plus'
// import { ElMessage } from 'element-plus'
import { download } from '@/utils/ruoyi'
import pagination from '@/components/pagination/Index.vue'

export default defineComponent({
  components: {
    pagination
  },
  name: 'App',
  setup() {
    const postFormNode = ref(ElForm)
    const queryForm = ref(ElForm)
    const data = reactive({
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
      typeList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 状态数据字典
      statusOptions: [],
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 100,
        dictName: '',
        dictType: undefined,
        status: undefined
      },
      // 表单参数
      formData: {
        dictId: '',
        dictName: '',
        dictType: '',
        status: '0',
        remark: ''
      },
      // 表单校验
      rules: {
        dictName: [
          { required: true, message: '字典名称不能为空', trigger: 'blur' }
        ],
        dictType: [
          { required: true, message: '字典类型不能为空', trigger: 'blur' }
        ]
      }
    })

    /** 查询字典类型列表 */
    const getList = () => {
      data.loading = true
      listType(data.queryParams).then(response => {
        if (response) {
          data.typeList = response.rows ?? []
          data.total = response.total
          data.loading = false
        }
      }
      )
    }
    //   // 字典状态字典翻译
    //  const  statusFormat = (row)=> {
    //     return this.selectDictLabel(this.statusOptions, row.status)
    //   }

    // 表单重置
    const reset = () => {
      data.formData = {
        dictId: '',
        dictName: '',
        dictType: '',
        status: '0',
        remark: ''
      }
      // this.resetForm('form')
    }
    const statusFormat = (row: any) => {
      return row.status === 0 ? '停用' : ' 正常'
    }
    // 取消按钮
    const cancel = () => {
      data.open = false
      reset()
    }
    /** 搜索按钮操作 */
    const handleQuery = () => {
      data.queryParams.pageNum = 1
      getList()
    }
    /** 重置按钮操作 */
    const resetQuery = () => {
      const form = unref(queryForm)
      form.resetFields()
      data.dateRange = []
      handleQuery()
    }

    /** 新增按钮操作 */
    const handleAdd = () => {
      reset()
      data.open = true
      data.title = '添加字典类型'
    }
    // 多选框选中数据
    const handleSelectionChange = (selection: any) => {
      data.ids = selection.map((item: any) => item.dictId)
      data.single = selection.length !== 1
      data.multiple = !selection.length
    }
    /** 修改按钮操作 */
    const handleUpdate = (row: any) => {
      reset()
      const dictId = row.dictId || data.ids
      getType(dictId).then(response => {
        if (response) {
          data.formData = response.data
          data.open = true
          data.title = '修改字典类型'
        }
      })
    }
    /** 提交按钮 */
    const submitForm = () => {
      const form = unref(postFormNode)
      form.validate((valid: Boolean) => {
        if (valid) {
          if (data.formData?.dictId !== undefined) {
            updateType(data.formData).then((res: {[key: string]: any} | null) => {
              res?.code === 0 ? ElMessage.success('修改成功') : ElMessage.error(res?.msg)
            })
          } else {
            addType(data.formData).then((res: {[key: string]: any} | null) => {
              res?.code === 0 ? ElMessage.success('新增成功') : ElMessage.error(res?.msg)
            })
          }
          data.open = false
          getList()
        }
      })
    }
    /** 删除按钮操作 */
    const handleDelete = async(row: {[key: string]: any}) => {
      const dictIds = row.dictId || data.ids
      ElMessageBox.confirm('是否确认删除字典编号为"' + dictIds + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delType(dictIds)
      }).then((response: {[key: string]: any} |null) => {
        if (response?.code === 0) {
          getList()
          ElMessage.success('删除成功')
        } else {
          ElMessage.error(response?.msg)
        }
      })
    }
    /** 导出按钮操作 */
    const handleExport = () => {
      const queryParams = data.queryParams
      ElMessageBox.confirm('是否确认导出所有类型数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportType(queryParams)
      }).then((response: any) => {
        download(response.msg)
      })
    }
    onMounted(() => {
      getList()
      getDicts('sys_normal_disable').then((response: any) => {
        data.statusOptions = response.data
      })
    })
    return { ...toRefs(data), queryForm, statusFormat, postFormNode, getList, cancel, reset, handleQuery, handleExport, handleDelete, submitForm, resetQuery, handleAdd, handleSelectionChange, handleUpdate }
  }
})
</script>

<style lang="scss" scoped>
</style>
