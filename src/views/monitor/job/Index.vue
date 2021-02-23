<!--
 * @Description: 定时任务
 * @Author: ZY
 * @Date: 2021-02-22 15:16:05
 * @LastEditors: ZY
 * @LastEditTime: 2021-02-23 14:45:17
-->

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
        label="任务名称"
        prop="jobName"
      >
        <el-input
          v-model="queryParams.jobName"
          placeholder="请输入任务名称"
          clearable
          size="small"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item
        label="任务组名"
        prop="jobGroup"
      >
        <el-select
          v-model="queryParams.jobGroup"
          placeholder="请选择任务组名"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in jobGroupOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="任务状态"
        prop="status"
      >
        <el-select
          v-model="queryParams.status"
          placeholder="请选择任务状态"
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
          v-hasPermi="['monitor:job:add']"
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
          v-hasPermi="['monitor:job:edit']"
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
          v-hasPermi="['monitor:job:remove']"
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
          v-hasPermi="['monitor:job:export']"
        >
          导出
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="el-icon-s-operation"
          size="mini"
          @click="handleJobLog"
          v-hasPermi="['monitor:job:query']"
        >
          日志
        </el-button>
      </el-col>
      <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      />
    </el-row>

    <el-table
      v-loading="loading"
      :data="jobList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column
        label="任务编号"
        align="center"
        prop="jobId"
      />
      <el-table-column
        label="任务名称"
        align="center"
        prop="jobName"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="任务组名"
        align="center"
        prop="jobGroup"
        :formatter="jobGroupFormat"
      />
      <el-table-column
        label="调用目标字符串"
        align="center"
        prop="invokeTarget"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="cron执行表达式"
        align="center"
        prop="cronExpression"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="状态"
        align="center"
      >
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            @change="handleStatusChange(scope.row)"
          />
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
            icon="el-icon-caret-right"
            @click="handleRun(scope.row)"
            v-hasPermi="['monitor:job:changeStatus']"
          >
            执行一次
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleView(scope.row)"
            v-hasPermi="['monitor:job:query']"
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

    <!-- 添加或修改定时任务对话框 -->
    <el-dialog
      :title="title"
      v-model:visible="open"
      width="700px"
      append-to-body
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="任务名称"
              prop="jobName"
            >
              <el-input
                v-model="form.jobName"
                placeholder="请输入任务名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="任务分组"
              prop="jobGroup"
            >
              <el-select
                v-model="form.jobGroup"
                placeholder="请选择"
              >
                <el-option
                  v-for="dict in jobGroupOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="invokeTarget">
              <span>
                调用方法
                <el-tooltip placement="top">
                  <div>
                    Bean调用示例：ryTask.ryParams('ry')
                    <br>Class类调用示例：com.ruoyi.quartz.task.RyTask.ryParams('ry')
                    <br>参数说明：支持字符串，布尔类型，长整型，浮点型，整型
                  </div>
                  <i class="el-icon-question" />
                </el-tooltip>
              </span>
              <el-input
                v-model="form.invokeTarget"
                placeholder="请输入调用目标字符串"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="cron表达式"
              prop="cronExpression"
            >
              <el-input
                v-model="form.cronExpression"
                placeholder="请输入cron执行表达式"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="是否并发"
              prop="concurrent"
            >
              <el-radio-group
                v-model="form.concurrent"
                size="small"
              >
                <el-radio-button label="0">
                  允许
                </el-radio-button>
                <el-radio-button label="1">
                  禁止
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="错误策略"
              prop="misfirePolicy"
            >
              <el-radio-group
                v-model="form.misfirePolicy"
                size="small"
              >
                <el-radio-button label="1">
                  立即执行
                </el-radio-button>
                <el-radio-button label="2">
                  执行一次
                </el-radio-button>
                <el-radio-button label="3">
                  放弃执行
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态">
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
        </el-row>
      </el-form>
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
    </el-dialog>

    <!-- 任务日志详细 -->
    <el-dialog
      title="任务详细"
      v-model:visible="openView"
      width="700px"
      append-to-body
    >
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        size="mini"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="任务编号：">
              {{ form.jobId }}
            </el-form-item>
            <el-form-item label="任务名称：">
              {{ form.jobName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务分组：">
              {{ jobGroupFormat(form) }}
            </el-form-item>
            <el-form-item label="创建时间：">
              {{ form.createTime }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="cron表达式：">
              {{ form.cronExpression }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="下次执行时间：">
              {{ parseTime(form.nextValidTime) }}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="调用目标方法：">
              {{ form.invokeTarget }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务状态：">
              <div v-if="form.status === 0">
                正常
              </div>
              <div v-else-if="form.status === 1">
                失败
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否并发：">
              <div v-if="form.concurrent === 0">
                允许
              </div>
              <div v-else-if="form.concurrent === 1">
                禁止
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="执行策略：">
              <div v-if="form.misfirePolicy === 0">
                默认策略
              </div>
              <div v-else-if="form.misfirePolicy === 1">
                立即执行
              </div>
              <div v-else-if="form.misfirePolicy === 2">
                执行一次
              </div>
              <div v-else-if="form.misfirePolicy === 3">
                放弃执行
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div
        class="dialog-footer"
      >
        <el-button @click="openView = false">
          关 闭
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, toRefs } from 'vue'
import { listJob, getJob, delJob, addJob, updateJob, exportJob, runJob, changeJobStatus } from '@/apis/monitor/job'

export default defineComponent({
  setup() {
    const state = reactive({
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
      // 定时任务表格数据
      jobList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 是否显示详细弹出层
      openView: false,
      // 任务组名字典
      jobGroupOptions: [],
      // 状态字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        jobName: undefined,
        jobGroup: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        jobName: [
          { required: true, message: '任务名称不能为空', trigger: 'blur' }
        ],
        invokeTarget: [
          { required: true, message: '调用目标字符串不能为空', trigger: 'blur' }
        ],
        cronExpression: [
          { required: true, message: 'cron执行表达式不能为空', trigger: 'blur' }
        ]
      }
    })

    const getList = () => {
      state.loading = true
      listJob(state.queryParams).then((res) => {
        state.jobList = res.rows
        state.total = res.total
        state.loading = false
      })
    }

    return {
      ...toRefs(state)
    }
  }
})
</script>
