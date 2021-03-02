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
        label="岗位编码"
        prop="postCode"
      >
        <el-input
          v-model="queryParams.postCode"
          placeholder="请输入岗位编码"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item
        label="岗位名称"
        prop="postName"
      >
        <el-input
          v-model="queryParams.postName"
          placeholder="请输入岗位名称"
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
          placeholder="岗位状态"
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
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      />
    </el-row>

    <el-table
      v-loading="loading"
      :data="postList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column
        label="岗位编号"
        align="center"
        prop="postId"
      />
      <el-table-column
        label="岗位编码"
        align="center"
        prop="postCode"
      />
      <el-table-column
        label="岗位名称"
        align="center"
        prop="postName"
      />
      <el-table-column
        label="岗位排序"
        align="center"
        prop="postSort"
      />
      <el-table-column
        label="状态"
        align="center"
        prop="status"
        :formatter="statusFormat"
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
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >
            修改
          </el-button>
          <el-button
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
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

    <!-- 添加或修改岗位对话框 -->
    <el-dialog
      :title="title"
      v-model="open"
      width="500px"
      append-to-body
    >
      <el-form
        ref="formNode"
        :model="formData"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item
          label="岗位名称"
          prop="postName"
        >
          <el-input
            v-model="formData.postName"
            placeholder="请输入岗位名称"
          />
        </el-form-item>
        <el-form-item
          label="岗位编码"
          prop="postCode"
        >
          <el-input
            v-model="formData.postCode"
            placeholder="请输入编码名称"
          />
        </el-form-item>
        <el-form-item
          label="岗位顺序"
          prop="postSort"
        >
          <el-input-number
            v-model="formData.postSort"
            controls-position="right"
            :min="0"
          />
        </el-form-item>
        <el-form-item
          label="岗位状态"
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

// import { listPost, getPost, delPost, addPost, updatePost, exportPost, getDicts } from '@/apis/system'
import { listPost, getDicts, updatePost, addPost, getPost, delPost, exportPost } from '@/apis/system/system'
import { ElForm, ElMessage, ElMessageBox } from 'element-plus'
import { download, parseTime } from '@/utils/ruoyi'
import pagination from '@/components/pagination/Index.vue'

import { defineComponent, onMounted, reactive, toRefs, ref, unref } from 'vue'

export default defineComponent({
  components: {
    pagination
  },
  setup() {
    const formNode = ref(ElForm)
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
      // 岗位表格数据
      postList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 状态数据字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        postCode: undefined,
        postName: undefined,
        status: undefined
      },
      // 表单参数
      formData: {
        status: '',
        postSort: 0,
        postCode: '',
        postName: '',
        postId: ''
      },
      // 表单校验
      rules: {
        postName: [
          { required: true, message: '岗位名称不能为空', trigger: 'blur' }
        ],
        postCode: [
          { required: true, message: '岗位编码不能为空', trigger: 'blur' }
        ],
        postSort: [
          { required: true, message: '岗位顺序不能为空', trigger: 'blur' }
        ]
      }
    })

    const getList = (data?: any) => {
      dataMap.loading = true
      listPost(data).then((response: any) => {
        dataMap.postList = response.rows
        dataMap.total = response.total
        dataMap.loading = false
      })
    }
    /** 搜索按钮操作 */
    const handleQuery = () => {
      dataMap.queryParams.pageNum = 1
      getList(dataMap.queryParams)
    }
    const statusFormat = (row: any) => {
      return row.status === 0 ? '停用' : ' 正常'
    }
    const resetTable = () => {
      const form = unref(formNode)
      form.resetFields()
    }
    //     /** 新增按钮操作 */
    const handleAdd = () => {
      dataMap.open = true
      dataMap.title = '添加岗位'
    }
    //     /** 提交按钮 */
    const submitForm = () => {
      const form = unref(formNode)
      form.validate((valid: any) => {
        if (valid) {
          if (dataMap.formData.postId !== '') {
            form.resetFields()

            updatePost(dataMap.formData).then(() => {
              ElMessage.success('修改成功')
              dataMap.open = false
              getList(dataMap.queryParams)
            })
          } else {
            form.resetFields()
            addPost(dataMap.formData).then(() => {
              ElMessage.success('新增成功')
              dataMap.open = false
              getList(dataMap.queryParams)
            })
          }
        }
      })
    }

    /** 修改按钮操作 */
    const handleUpdate = (row: any) => {
      const postId = row.postId || dataMap.ids
      getPost(postId).then((response: any) => {
        console.log(response.data)
        dataMap.formData = response.data
        dataMap.open = true
        dataMap.title = '修改岗位'
      })
    }

    //     // 多选框选中数据
    const handleSelectionChange = (selection: any) => {
      dataMap.ids = selection.map((item: any) => item.postId)
      dataMap.single = selection.length !== 1
      dataMap.multiple = !selection.length
    }

    //     /** 删除按钮操作 */
    const handleDelete = (row: any) => {
      const postIds = row.postId || dataMap.ids
      ElMessageBox.confirm('是否确认删除岗位编号为"' + postIds + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delPost(postIds)
      }).then((res) => {
        if (res?.code === 200) {
          getList()
          ElMessage.success('删除成功')
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
        return exportPost(queryParams)
      }).then((response) => {
        download(response?.msg)
      })
    }

    onMounted(() => {
      getList(dataMap.queryParams)
      getDicts('sys_normal_disable').then(response => {
        dataMap.statusOptions = response?.data
      })
    })

    return { ...toRefs(dataMap), parseTime, getList, handleQuery, statusFormat, handleAdd, submitForm, formNode, resetTable, handleUpdate, handleSelectionChange, handleDelete, handleExport }
  }
})
</script>
