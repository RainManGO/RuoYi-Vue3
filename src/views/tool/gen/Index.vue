<template>
  <div class="container">
    1
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  setup() {
    const data = reactive({

    })
    return { ...toRefs(data) }
  }
})
</script>

<style lang="less" scoped>
</style>
