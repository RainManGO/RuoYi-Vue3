<!--
 * @Description: 菜单管理
 * @Author: ZY
 * @Date: 2021-02-23 15:09:41
 * @LastEditors: scy😊
 * @LastEditTime: 2021-02-26 14:21:13
-->

<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
    >
      <el-form-item
        label="菜单名称"
        prop="menuName"
      >
        <el-input
          v-model="queryParams.menuName"
          placeholder="请输入菜单名称"
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
          placeholder="菜单状态"
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
          v-hasPermi="['system:menu:add']"
        >
          新增
        </el-button>
      </el-col>
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      />
    </el-row>

    <el-table
      v-loading="loading"
      :data="menuList"
      row-key="menuId"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        prop="menuName"
        label="菜单名称"
        :show-overflow-tooltip="true"
        width="160"
      />
      <el-table-column
        prop="icon"
        label="图标"
        align="center"
        width="100"
      >
        <template #default="scope">
          <svg
            class="icon"
            aria-hidden="true"
            font-size="20px"
          >
            <use :xlink:href="scope.row.icon" />
          </svg>
          <!-- <svg
            class="icon"
            aria-hidden="true"
            font-size="20px"
          >
            <use xlink:href="#icondashboard" />
          </svg> -->
        </template>
      </el-table-column>
      <el-table-column
        prop="orderNum"
        label="排序"
        width="60"
      />
      <el-table-column
        prop="perms"
        label="权限标识"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="component"
        label="组件路径"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="status"
        label="状态"
        :formatter="statusFormat"
        width="80"
      />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
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
            v-hasPermi="['system:menu:edit']"
          >
            修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['system:menu:add']"
          >
            新增
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:menu:remove']"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改菜单对话框 -->
    <el-dialog
      :title="title"
      v-model="open"
      width="600px"
      append-to-body
      @opened="showDialog"
    >
      <el-form
        ref="dialogForm"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级菜单">
              <Treeselect
                :treeProps="props"
                placeholder="请选择上级菜单"
                :defalut="form.parentId"
                :options="menuOptions"
                :originOptions="menuNoTreeList"
                :accordion="isAccordion"
                @getValue="getParentValue($event)"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="菜单类型"
              prop="menuType"
            >
              <el-radio-group v-model="form.menuType">
                <el-radio label="M">
                  目录
                </el-radio>
                <el-radio label="C">
                  菜单
                </el-radio>
                <el-radio label="F">
                  按钮
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              v-if="form.menuType !== 'F'"
              label="菜单图标"
            >
              <el-input
                v-model="form.icon"
                placeholder="请前往iconfont 选择symbol图标粘贴"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="菜单名称"
              prop="menuName"
            >
              <el-input
                v-model="form.menuName"
                placeholder="请输入菜单名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="显示排序"
              prop="orderNum"
            >
              <el-input-number
                v-model="form.orderNum"
                controls-position="right"
                :min="0"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              v-if="form.menuType !== 'F'"
              label="是否外链"
            >
              <el-radio-group v-model="form.isFrame">
                <el-radio label="0">
                  是
                </el-radio>
                <el-radio label="1">
                  否
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              v-if="form.menuType !== 'F'"
              label="路由地址"
              prop="path"
            >
              <el-input
                v-model="form.path"
                placeholder="请输入路由地址"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              v-if="form.menuType !== 'F'"
              label="显示状态"
            >
              <el-radio-group v-model="form.visible">
                <el-radio
                  v-for="dict in visibleOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >
                  {{ dict.dictLabel }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              v-if="form.menuType !== 'F'"
              label="菜单状态"
            >
              <el-radio-group v-model="form.status">
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
          <el-col
            :span="12"
            v-if="form.menuType === 'C'"
          >
            <el-form-item
              label="组件路径"
              prop="component"
            >
              <el-input
                v-model="form.component"
                placeholder="请输入组件路径"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              v-if="form.menuType !== 'M'"
              label="权限标识"
            >
              <el-input
                v-model="form.perms"
                placeholder="请权限标识"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              v-if="form.menuType === 'C'"
              label="是否缓存"
            >
              <el-radio-group v-model="form.isCache">
                <el-radio label="0">
                  缓存
                </el-radio>
                <el-radio label="1">
                  不缓存
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
import { defineComponent, onBeforeMount, reactive, toRefs, getCurrentInstance } from 'vue'
import { listMenu, getMenu, delMenu, addMenu, updateMenu, getDicts } from '@/apis/system/system'
import { DictKey } from '@/constant/dictKey'
import { selectDictLabel, handleTree } from '@/utils/ruoyi'
import { ElMessage, ElMessageBox } from 'element-plus'
import { MenuModel } from '@/model/system/menuModel'
import { parseTime } from '@/utils/index'
import Treeselect from '@/components/tree-select/Index.vue'
export default defineComponent({
  components: {
    Treeselect
  },
  setup() {
    const { ctx } = getCurrentInstance() as any
    // const queryForm = ref(null)
    const state = reactive({
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 菜单表格树数据
      menuNoTreeList: Array<MenuModel>(),
      // 菜单表格树数据
      menuList: Array<MenuModel>(),
      // 菜单树选项
      menuOptions: [],
      // 添加主类目，非菜单树数据源
      menuMainSelectList: [],
      props: { // 配置项（必选）
        value: 'menuId',
        label: 'menuName',
        children: 'children'
        // disabled:true
      },
      isClearable: true, // 可清空（可选）
      isAccordion: true, // 可收起（可选）
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 显示状态数据字典
      visibleOptions: Array<any>(),
      // 菜单状态数据字典
      statusOptions: Array<any>(),
      // 查询参数
      queryParams: {
        menuName: undefined,
        visible: undefined
      },
      // 表单参数
      form: {} as MenuModel,
      // 表单校验
      rules: {
        menuName: [
          { required: true, message: '菜单名称不能为空', trigger: 'blur' }
        ],
        orderNum: [
          { required: true, message: '菜单顺序不能为空', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '路由地址不能为空', trigger: 'blur' }
        ]
      }
    })

    const getParentValue = (e: any) => {
      console.log(e)
    }

    /** 查询菜单列表 */
    const getList = () => {
      state.loading = true
      listMenu(state.queryParams).then((res) => {
        state.menuList = handleTree(res?.data, 'menuId')
        state.loading = false
      })
    }

    onBeforeMount(() => {
      getList()
      getDicts(DictKey.SYS_SHOW_HIDE).then((res) => {
        state.visibleOptions = res?.data
      })
      getDicts(DictKey.SYS_NORMAL_DISABLE).then((res) => {
        state.statusOptions = res?.data
      })
    })

    /** 转换菜单数据结构 */
    const normalizer = (node: any) => {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.menuId,
        label: node.menuName,
        children: node.children
      }
    }

    /** 查询菜单下拉树结构 */
    const getTreeselect = () => {
      listMenu({}).then(response => {
        state.menuOptions = []
        const menu = { menuId: 0, menuName: '主类目', children: [] }
        menu.children = response && handleTree(response.data, 'menuId');
        (state.menuOptions as any).push(menu)

        state.menuNoTreeList = response && response.data as any
      })
    }

    // 显示状态字典翻译
    const visibleFormat = (row: MenuModel) => {
      if (row.menuType === 'F') {
        return ''
      }
      return selectDictLabel(state.visibleOptions as [], row.visible)
    }

    // 菜单状态字典翻译
    const statusFormat = (row: MenuModel) => {
      if (row.menuType === 'F') {
        return ''
      }
      return selectDictLabel(state.statusOptions as [], row.status)
    }

    // 表单重置
    const reset = () => {
      state.form = {
        menuId: -1,
        parentId: 0,
        menuName: '',
        icon: '',
        menuType: 'M',
        orderNum: '',
        isFrame: '1',
        isCache: '0',
        visible: '0',
        status: '0'
      } as any

      // (ctx.$refs.dialogForm as any).resetFields()
    }

    // 取消按钮
    const cancel = () => {
      state.open = false
      reset()
    }

    /** 搜索按钮操作 */
    const handleQuery = () => {
      getList()
    }

    /** 重置按钮操作 */
    const resetQuery = () => {
      (ctx.$refs.queryForm as any).resetFields()
      handleQuery()
    }

    /** 新增按钮操作 */
    const handleAdd = (row: MenuModel) => {
      reset()
      if (row !== null && row.menuId) {
        state.form.parentId = row.menuId
      } else {
        state.form.parentId = 0
      }
      state.open = true
      state.title = '添加菜单'
    }

    /** 修改按钮操作 */
    const handleUpdate = (row: MenuModel) => {
      reset()
      getMenu(row.menuId.toString()).then(response => {
        state.form = response && response.data as any
        console.log(state.form)

        state.open = true
        state.title = '修改菜单'
      })
    }

    /** 提交按钮 */
    const submitForm = () => {
      (ctx.$refs.dialogForm as any).validate((valid: Boolean) => {
        if (valid) {
          if (state.form.menuId !== undefined) {
            updateMenu(state.form).then(() => {
              ElMessage.success('修改成功')
              state.open = false
              getList()
            })
          } else {
            addMenu(state.form).then(() => {
              ElMessage.success('新增成功')
              state.open = false
              getList()
            })
          }
        }
      })
    }

    /** 删除按钮操作 */
    const handleDelete = (row: MenuModel) => {
      ElMessageBox.confirm('是否确认删除名称为"' + row.menuName + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return delMenu(row.menuId.toString())
      }).then(() => {
        getList()
        ElMessage.success('删除成功')
      })
    }

    const showDialog = () => {
      getTreeselect()
    }

    return {
      ...toRefs(state),
      showDialog,
      getParentValue,
      normalizer,
      handleDelete,
      submitForm,
      handleUpdate,
      handleAdd,
      handleQuery,
      resetQuery,
      cancel,
      statusFormat,
      visibleFormat,
      parseTime
    }
  }
})

</script>
