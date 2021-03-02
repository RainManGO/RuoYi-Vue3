<!--
 * @Description:
 * @Autor: scy🤗
 * @Date: 2021-03-02 09:08:32
 * @LastEditors: scy😎
 * @LastEditTime: 2021-03-02 09:09:56
-->
<template>
  <div
    :class="{'hidden': hidden}"
    class="pagination-container"
  >
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent } from 'vue'
import { scrollTo } from '@/utils/scroll_to'

export default defineComponent({
  props: {
    total: {
      required: true,
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },

    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  emits: ['pagination', 'update:page', 'update:limit'],
  setup(props, ctx) {
    const currentPage = computed({
      get() {
        return props.page
      },
      set(val) {
        ctx.emit('update:page', val)
      }
    })
    const pageSize = computed({
      get() {
        return props.limit
      },
      set(val) {
        ctx.emit('update:limit', val)
      }
    })
    const handleSizeChange = (val: number) => {
      ctx.emit('pagination', { page: currentPage, limit: val })
      if (props.autoScroll) {
        scrollTo(0, 800)
      }
    }
    const handleCurrentChange = (val: number) => {
      ctx.emit('pagination', { page: val, limit: props.pageSizes })
      if (props.autoScroll) {
        scrollTo(0, 800)
      }
    }

    return { handleCurrentChange, handleSizeChange, currentPage, pageSize }
  }
})

</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
.pagination-container.hidden {
  display: none;
}
</style>
