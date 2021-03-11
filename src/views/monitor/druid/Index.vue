<template>
  <div
    v-loading="loading"
    :style="'height:'+ height"
  >
    <iframe
      :src="src"
      frameborder="no"
      style="width: 100%;height: 100%"
      scrolling="auto"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
export default defineComponent({
  name: 'Druid',
  setup() {
    const state = reactive({
      src: process.env.VUE_APP_BASE_API + '/druid/index.html',
      height: document.documentElement.clientHeight - 94.5 + 'px;',
      loading: true
    })

    onMounted(() => {
      setTimeout(() => {
        state.loading = false
      }, 230)
      window.onresize = function temp() {
        state.height = document.documentElement.clientHeight - 94.5 + 'px;'
      }
    })

    return { ...toRefs(state) }
  }

})
</script>
