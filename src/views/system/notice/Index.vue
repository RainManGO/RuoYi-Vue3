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
        label="公告标题"
        prop="noticeTitle"
      >
        <el-input
          v-model="queryParams.noticeTitle"
          placeholder="请输入公告标题"
          clearable
          size="small"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item
        label="操作人员"
        prop="createBy"
      >
        <el-input
          v-model="queryParams.createBy"
          placeholder="请输入操作人员"
          clearable
          size="small"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item
        label="类型"
        prop="noticeType"
      >
        <el-select
          v-model="queryParams.noticeType"
          placeholder="公告类型"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in typeOptions"
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
          v-hasPermi="['system:notice:edit']"
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
          v-hasPermi="['system:notice:remove']"
        >
          删除
        </el-button>
      </el-col>
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      />
    </el-row>

    <el-table
      v-loading="loading"
      :data="noticeList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column
        label="序号"
        align="center"
        prop="noticeId"
        width="100"
      />
      <el-table-column
        label="公告标题"
        align="center"
        prop="noticeTitle"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="公告类型"
        align="center"
        prop="noticeType"
        :formatter="typeFormat"
        width="100"
      />
      <el-table-column
        label="状态"
        align="center"
        prop="status"
        :formatter="statusFormat"
        width="100"
      />
      <el-table-column
        label="创建者"
        align="center"
        prop="createBy"
        width="100"
      />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="100"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime,'{y}-{m}-{d}' ) }}</span>
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
            v-hasPermi="['system:notice:edit']"
          >
            修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:notice:remove']"
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

    <!-- 添加或修改公告对话框 -->
    <el-dialog
      :title="title"
      v-model="open"
      width="780px"
      append-to-body
    >
      <el-form
        ref="queryForm"
        :model="formVal"
        :rules="rules"
        label-width="80px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="公告标题"
              prop="noticeTitle"
            >
              <el-input
                v-model="formVal.noticeTitle"
                placeholder="请输入公告标题"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="公告类型"
              prop="noticeType"
            >
              <el-select
                v-model="formVal.noticeType"
                placeholder="请选择"
              >
                <el-option
                  v-for="dict in typeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态">
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
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容">
              <Editor
                v-model="formVal.noticeContent"
                :min-height="192"
              />
            </el-form-item>
          </el-col>
        </el-row>
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
import { defineComponent, onMounted, reactive, toRefs, ref, unref } from 'vue'
import { listNotice, getNotice, delNotice, addNotice, updateNotice } from '@/apis/system/notice'
import { getDicts } from '@/apis/system/system'
import { selectDictLabel, parseTime } from '@/utils/ruoyi'
import Editor from '@/components/editor/Index.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import pagination from '@/components/pagination/Index.vue'
export default defineComponent({
  components: {
    Editor,
    pagination
  },
  setup() {
    const queryForm = ref<HTMLInputElement | null>(null)
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
      // 公告表格数据
      noticeList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 类型数据字典
      statusOptions: [],
      // 状态数据字典
      typeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        noticeTitle: undefined,
        createBy: undefined,
        status: undefined
      },
      // 表单参数
      formVal: {
        noticeId: '',
        noticeTitle: '',
        noticeType: '',
        noticeContent: '',
        status: '0'
      },
      // 表单校验
      rules: {
        noticeTitle: [
          { required: true, message: '公告标题不能为空', trigger: 'blur' }
        ],
        noticeType: [
          { required: true, message: '公告类型不能为空', trigger: 'change' }
        ]
      }
    })

    /** 查询公告列表 */
    const getList = () => {
      dataMap.loading = true
      listNotice(dataMap.queryParams).then(response => {
        dataMap.noticeList = response.rows
        dataMap.total = response.total
        dataMap.loading = false
      })
    }
    // 公告状态字典翻译
    const statusFormat = (row: {[key: string]: any}) => {
      return selectDictLabel(dataMap.statusOptions, row.status)
    }
    // 公告状态字典翻译
    const typeFormat = (row: {[key: string]: any}) => {
      return selectDictLabel(dataMap.typeOptions, row.noticeType)
    }
    /** 搜索按钮操作 */
    const handleQuery = () => {
      dataMap.queryParams.pageNum = 1
      getList()
    }
    // 表单重置
    const reset = () => {
      (queryForm.value as any).resetFields()
      const form = unref(queryForm)
      console.log(form)
    }
    // 取消按钮
    const cancel = () => {
      reset()
      dataMap.open = false
    }

    /** 重置按钮操作 */
    const resetQuery = () => {
      reset()
      handleQuery()
    }
    // 多选框选中数据
    const handleSelectionChange = (selection: any) => {
      dataMap.ids = selection.map((item: {[key: string]: any}) => item.noticeId)
      dataMap.single = selection.length !== 1
      dataMap.multiple = !selection.length
    }
    /** 新增按钮操作 */
    const handleAdd = () => {
      reset()
      dataMap.open = true
      dataMap.title = '添加公告'
    }

    /** 修改按钮操作 */
    const handleUpdate = (row: {[key: string]: any}) => {
      reset()
      const noticeId = row.noticeId || dataMap.ids
      getNotice(noticeId).then(response => {
        dataMap.formVal = response.data
        dataMap.open = true
        dataMap.title = '修改公告'
      })
    }
    /** 提交按钮 */
    const submitForm = () => {
      (queryForm.value as any).validate((valid: Boolean) => {
        if (valid) {
          if (dataMap.formVal.noticeId !== undefined) {
            updateNotice(dataMap.formVal).then(() => {
              ElMessage.success('修改成功')
              dataMap.open = false
              getList()
            })
          } else {
            addNotice(dataMap.formVal).then(() => {
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
      const noticeIds = row.noticeId || dataMap.ids
      ElMessageBox.confirm('是否确认删除公告编号为"' + noticeIds + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delNotice(noticeIds)
      }).then(() => {
        getList()
        ElMessage.success('删除成功')
      })
    }

    onMounted(() => {
      getList()
      getDicts('sys_notice_status').then(response => {
        dataMap.statusOptions = response?.data
      })
      getDicts('sys_notice_type').then(response => {
        dataMap.typeOptions = response?.data
      })
    })

    return { ...toRefs(dataMap), parseTime, typeFormat, statusFormat, getList, reset, cancel, resetQuery, handleAdd, handleSelectionChange, queryForm, handleDelete, handleUpdate, submitForm, handleQuery }
  }
})

</script>
