<template>
  <div class="app-container">
    <el-row>
      <el-col
        :span="24"
        class="card-box"
      >
        <el-card>
          <div>
            <span>基本信息</span>
          </div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table
              cellspacing="0"
              style="width: 100%"
            >
              <tbody>
                <tr>
                  <td>
                    <div class="cell">
                      Redis版本
                    </div>
                  </td>
                  <td>
                    <div
                      v-if="cache"
                      class="cell"
                    >
                      {{ cache.redis_version }}
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      运行模式
                    </div>
                  </td>
                  <td>
                    <div
                      v-if="cache"
                      class="cell"
                    >
                      {{ cache.redis_mode === "standalone" ? "单机" : "集群" }}
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      端口
                    </div>
                  </td>
                  <td>
                    <div
                      v-if="cache"
                      class="cell"
                    >
                      {{ cache.tcp_port }}
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      客户端数
                    </div>
                  </td>
                  <td>
                    <div
                      v-if="cache"
                      class="cell"
                    >
                      {{ cache.connected_clients }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="cell">
                      运行时间(天)
                    </div>
                  </td>
                  <td>
                    <div
                      v-if="cache"
                      class="cell"
                    >
                      {{ cache.uptime_in_days }}
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      使用内存
                    </div>
                  </td>
                  <td>
                    <div
                      v-if="cache"
                      class="cell"
                    >
                      {{ cache.used_memory_human }}
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      使用CPU
                    </div>
                  </td>
                  <td>
                    <div
                      v-if="cache"
                      class="cell"
                    >
                      {{ parseFloat(cache.used_cpu_user_children).toFixed(2) }}
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      内存配置
                    </div>
                  </td>
                  <td>
                    <div
                      v-if="cache"
                      class="cell"
                    >
                      {{ cache.maxmemory_human }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="cell">
                      AOF是否开启
                    </div>
                  </td>
                  <td>
                    <div
                      v-if="cache"
                      class="cell"
                    >
                      {{ cache.aof_enabled === "0" ? "否" : "是" }}
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      RDB是否成功
                    </div>
                  </td>
                  <td>
                    <div
                      v-if="cache"
                      class="cell"
                    >
                      {{ cache.rdb_last_bgsave_status }}
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      Key数量
                    </div>
                  </td>
                  <td>
                    <div
                      class="cell"
                    >
                      238
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      网络入口/出口
                    </div>
                  </td>
                  <td>
                    <div
                      v-if="cache"
                      class="cell"
                    >
                      {{ cache.instantaneous_input_kbps }}kps/{{ cache.instantaneous_output_kbps }}kps
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>

      <el-col
        :span="12"
        class="card-box"
      >
        <el-card>
          <div>
            <span>命令统计</span>
          </div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <div
              ref="commandstats"
              style="height: 420px"
              id="commandstats"
            />
          </div>
        </el-card>
      </el-col>

      <el-col
        :span="12"
        class="card-box"
      >
        <el-card>
          <div>
            <span>内存信息</span>
          </div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <div
              ref="usedmemory"
              style="height: 420px"
              id="usedmemory"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script lang='typescript'>
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { init } from 'echarts'
import { getCache } from '@/apis/monitor/cache'
import { ElLoading } from 'element-plus'
export default defineComponent({
  setup() {
    const dataMap = reactive({
      loading: {},
      cache: {},
      usedmemory: null,
      dbSize: '238'
    })
    // 打开加载层
    const openLoading = () => {
      const loading = ElLoading.service({
        lock: true,
        text: '拼命读取中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      return loading
    }
    /** 查缓存询信息 */
    const getList = async() => {
      const res = await getCache()
      openLoading().close()
      dataMap.cache = res && res.data.info
      const el = document.getElementById('commandstats')
      const usedmemoryEl = document.getElementById('usedmemory')
      const commandstatsNode = el && init(el, 'macarons')
      const data = res && res.data.commandStats
      const series = [
        {
          name: '命令',
          type: 'pie',
          roseType: 'radius',
          radius: [15, 95],
          center: ['50%', '38%'],
          data,
          animationEasing: 'cubicInOut',
          animationDuration: 1000
        }
      ]
      commandstatsNode && commandstatsNode.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series
      })
      const usedmemorys = usedmemoryEl && init(usedmemoryEl, 'macarons')
      const UsedMemoryHuman = res && res.data.info.used_memory_human
      usedmemorys && usedmemorys.setOption({
        tooltip: {
          formatter: '{b} <br/>{a} : ' + UsedMemoryHuman
        },
        series: [
          {
            name: '峰值',
            type: 'gauge',
            min: 0,
            max: 1000,
            detail: {
              formatter: UsedMemoryHuman
            },
            data: [
              {
                value: parseFloat(UsedMemoryHuman),
                name: '内存消耗'
              }
            ]
          }
        ]
      })
    }

    onMounted(() => {
      getList()
      openLoading()
    })
    return { ...toRefs(dataMap), getList, openLoading }
  }
})
</script>
