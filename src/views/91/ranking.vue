<template>
  <a-list item-layout="horizontal" :data-source="rankings" class="teachers">
    <a-list-item slot="renderItem" slot-scope="item">
      <a-list-item-meta>
        <div slot="description">
          累计打卡 {{ item.count }} 次
          <a-icon v-if="item.allCheck" class="all-check" type="carry-out" />
        </div>
        <div slot="title">
          <a :href="'https://github.com/' + item.login"
            >{{ item.name || item.login }}
          </a>
        </div>
        <a-avatar slot="avatar" :src="item.avatar_url" />
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
.all-check {
  margin-left: 10px;
  font-size: 20px;
}
</style>
