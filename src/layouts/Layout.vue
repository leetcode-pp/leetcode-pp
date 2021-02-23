<template>
  <a-layout class="layout">
    <a-layout-header class="layout-header">
      <LayoutHeader />
    </a-layout-header>
    <a-layout-content class="layout-content">
      <LayoutContent class="w-1280" />
    </a-layout-content>
    <a-layout-footer class="layout-footer">
      <LayoutFooter />
    </a-layout-footer>
  </a-layout>
</template>

<script>
import LayoutHeader from '@/components/LayoutHeader'
import LayoutContent from '@/components/LayoutContent'
import LayoutFooter from '@/components/LayoutFooter'
import { createComponent } from '@vue/composition-api'

export default createComponent({
  components: { LayoutHeader, LayoutContent, LayoutFooter }
})
</script>

<style lang="less" scoped>
.layout {
  min-height: 100vh;
}

.layout-header {
  display: flex;
  justify-content: center;
  padding: 0;
}
@media screen and(min-width: 1080px) {
  .layout-content {
    display: flex;
    justify-content: center;
  }
}

.layout-footer {
  padding: 8px 20px 4px;
  background-color: #444;
}
</style>
