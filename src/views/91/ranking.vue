<template>
  <a-list item-layout="horizontal" :data-source="rankings" class="teachers">
    <a-list-item slot="renderItem" slot-scope="item">
      <a-list-item-meta :description="'累计打卡' + item.count + '次'">
        <a slot="title" :href="'https://github.com/' + item.login">{{
          item.name || item.login
        }}</a>
        <a-avatar slot="avatar" :src="item.avatar" />
      </a-list-item-meta>
      <div class="more">
        <a-button
          type="link"
          :href="'https://github.com/' + item.login"
          target="_blank"
          >关注 ta</a-button
        >
      </div>
    </a-list-item>
  </a-list></template
>

<script>
export default {
  props: {
    rankings: {
      type: Array
    }
  }
}
</script>
<style lang="less" scoped>
.more {
  display: flex;
  justify-content: flex-end;
  width: 200px;
  span {
    height: 24px;
    line-height: 24px;
  }
}
</style>
