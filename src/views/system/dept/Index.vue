<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
    >
      <el-form-item
        label="部门名称"
        prop="deptName"
      >
        <el-input
          v-model="queryParams.deptName"
          placeholder="请输入部门名称"
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
          placeholder="部门状态"
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
      <!-- <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      /> -->
    </el-row>

    <el-table
      v-loading="loading"
      :data="deptList"
      row-key="deptId"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        prop="deptName"
        label="部门名称"
        width="260"
      />
      <el-table-column
        prop="orderNum"
        label="排序"
        width="200"
      />
      <el-table-column
        prop="status"
        label="状态"
        :formatter="statusFormat"
        width="100"
      />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="200"
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
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['system:dict:add']"
          >
            新增
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
                v-hasPermi="['system:dict:remove']"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改部门对话框 -->
    <el-dialog
      :title="title"
      v-model="open"
      width="600px"
    >
      <el-form
        ref="formDialog"
        :model="formVal"
        label-width="80px"
      >
        <el-row>
          <el-col
            :span="24"
            v-if="parentId !== 0"
          >
            <el-form-item
              label="上级部门"
              prop="parentId"
            >
              <!-- <Treeselect
                :multiple="true"
                :disable-branch-nodes="true"
                search-nested
                v-model="form.parentId"
                :options="deptOptions"
                :normalizer="normalizer"
              />
              <treeselect-value :value="value" /> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="部门名称"
              prop="deptName"
            >
              <el-input
                v-model="deptName"
                placeholder="请输入部门名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="显示排序"
              prop="orderNum"
            >
              <el-input-number
                :min="0"
                v-model="orderNum"
                controls-position="right"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="负责人"
              prop="leader"
            >
              <el-input
                v-model="leader"
                placeholder="请输入负责人"
                maxlength="20"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="联系电话"
              prop="phone"
            >
              <el-input
                v-model="phone"
                placeholder="请输入联系电话"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="邮箱"
              prop="email"
            >
              <el-input
                v-model="email"
                placeholder="请输入邮箱"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门状态">
              <el-radio-group v-model="status">
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

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, unref, ref } from 'vue'
import { getDicts } from '@/apis/system/system'
import { listDept, getDept, listDeptExcludeChild, delDept, updateDept, addDept } from '@/apis/system/dept'
// // import the styles
// import Treeselect from 'vue3-treeselect'
// import 'vue3-treeselect/dist/vue3-treeselect.css'
import { handleTree, parseTime } from '@/utils/ruoyi'
import { ElForm, ElMessage } from 'element-plus'
export default defineComponent({
  // components: {
  //   Treeselect
  // },
  setup() {
    const queryForm = ref(ElForm)
    const formDialog = ref(ElForm)

    const dataMap = reactive({
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 表格树数据
      deptList: [],
      // 部门树选项
      deptOptions: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 状态数据字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        deptName: undefined,
        status: undefined
      },
      deptId: '',
      parentId: '',
      deptName: '',
      orderNum: 0,
      leader: '',
      phone: '',
      email: '',
      status: '',
      // 表单参数
      // 表单校验
      rules: {
        parentId: [
          { required: true, message: '上级部门不能为空', trigger: 'blur' }
        ],
        deptName: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' }
        ],
        orderNum: [
          { required: true, message: '显示排序不能为空', trigger: 'blur' }
        ],
        email: [
          {
            type: 'email',
            message: "'请输入正确的邮箱地址",
            trigger: ['blur', 'change']
          }
        ],
        phone: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ]
      },
      test: '8347213498'
    })
    const formVal = ref({
      deptId: dataMap.deptId,
      parentId: dataMap.parentId,
      deptName: dataMap.deptName,
      orderNum: dataMap.orderNum,
      leader: dataMap.leader,
      phone: dataMap.phone,
      email: dataMap.email,
      status: dataMap.status
    })
    /** 查询部门列表 */
    const getList = () => {
      dataMap.loading = true
      listDept(dataMap.queryParams).then((response: any) => {
        dataMap.deptList = handleTree(response.data, 'deptId')
        dataMap.loading = false
      })
    }
    /** 转换部门数据结构 */
    const normalizer = (node: any) => {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.deptId,
        label: node.deptName,
        children: node.children
      }
    }
    // 取消按钮
    const cancel = () => {
      dataMap.open = false
    }

    /** 搜索按钮操作 */
    const handleQuery = () => {
      getList()
    }
    /** 重置按钮操作 */
    const resetQuery = () => {
      const form = unref(queryForm)
      form.resetFields()
      handleQuery()
    }

    /** 新增按钮操作 */
    const handleAdd = async(row: any) => {
      dataMap.deptName = ''
      dataMap.deptId = ''
      dataMap.parentId = ''
      dataMap.orderNum = 0
      dataMap.leader = ''
      dataMap.phone = ''
      dataMap.email = ''
      dataMap.status = ''
      if (row !== undefined) {
        dataMap.parentId = row.deptId
      }
      dataMap.open = true
      dataMap.title = '添加部门'
      const res = await listDept()
      if (res?.code === 200) {
        dataMap.deptOptions = handleTree(res.data, 'deptId')
      }
    }
    /** 修改按钮操作 */
    const handleUpdate = async(row: any) => {
      const result = await getDept(row.deptId)
      if (result?.code === 200) {
        dataMap.deptName = result.data.deptName
        dataMap.deptId = result.data.deptId
        dataMap.parentId = result.data.parentId
        dataMap.orderNum = result.data.orderNum
        dataMap.leader = result.data.leader
        dataMap.phone = result.data.phone
        dataMap.email = result.data.email
        dataMap.status = result.data.status
        dataMap.title = '修改部门'
        dataMap.open = true
      }
      listDeptExcludeChild(row.deptId).then((response: any) => {
        dataMap.deptOptions = handleTree(response.data, 'deptId')
      })
    }
    /** 提交按钮 */
    const submitForm = () => {
      const formNode = unref(formDialog)

      formNode.validate((valid: any) => {
        console.log(valid)
        if (valid) {
          const form = {
            deptId: dataMap.deptId,
            parentId: dataMap.parentId,
            deptName: dataMap.deptName,
            orderNum: Number(dataMap.orderNum),
            leader: dataMap.leader,
            phone: dataMap.phone,
            email: dataMap.email,
            status: dataMap.status
          }
          if (dataMap.deptId !== undefined) {
            updateDept(form).then((res: any) => {
              if (res?.code === 200) {
                ElMessage.success('修改成功')
                dataMap.open = false
                getList()
              } else {
                dataMap.open = false
                ElMessage.error(res?.msg)
              }
            })
          } else {
            addDept(form).then((res: any) => {
              if (res?.code === 200) {
                ElMessage.success('修改成功')
                dataMap.open = false
                getList()
              } else {
                dataMap.open = false
                ElMessage.error(res?.msg)
              }
            })
          }
        }
      })
    }
    /** 删除按钮操作 */
    const handleDelete = async(row: any) => {
      // this.$confirm('是否确认删除名称为"' + row.deptName + '"的数据项?', '警告', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(function() {
      //   return delDept(row.deptId)
      // }).then(() => {
      //   getList()
      //   ElMessage.success('删除成功')
      // })

      const result = await delDept(row.deptId)
      if (result?.code === 200) {
        getList()
      } else {
        ElMessage.error(result?.msg)
      }
    }

    const statusFormat = (row: any) => {
      return row.status === 0 ? '停用' : ' 正常'
    }
    onMounted(() => {
      getList()
      getDicts('sys_normal_disable').then((response: any) => {
        dataMap.statusOptions = response.data
      })
    })

    return { ...toRefs(dataMap), parseTime, formVal, formDialog, statusFormat, queryForm, getList, normalizer, handleDelete, cancel, handleQuery, resetQuery, handleAdd, handleUpdate, submitForm }
  }
})

</script>
