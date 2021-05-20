<template>
  <div>
    <div class="info">
      满勤：<a-icon class="all-check" type="carry-out" />
      注：如果未满勤会自动使用补签卡，使用后满勤也算满勤
    </div>
    <div class="info">
      七天内未打卡：<a-icon class="no-check" type="exclamation-circle" />
    </div>
    <a-list item-layout="horizontal" :data-source="rankings" class="teachers">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta>
          <div slot="description">
            累计打卡 {{ item.count }} 次
            <a-icon v-if="item.allCheck" class="all-check" type="carry-out" />
            <a-icon
              v-if="item.noCheck"
              class="no-check"
              type="exclamation-circle"
            />
          </div>
          <div slot="title">
            <a :href="'https://github.com/' + item.login"
              >{{ item.name || item.login }}
            </a>
          </div>
          <a-avatar slot="avatar" :src="item.avatar_url" />
        </a-list-item-meta>
        <div class="more">
          {{ item.bio }}
        </div>
      </a-list-item>
    </a-list>
  </div></template
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
.info {
  margin: 10px 0;
  text-align: left;
}
.more {
  display: flex;
  justify-content: flex-end;
  width: 200px;
  span {
    height: 24px;
    line-height: 24px;
  }
}
.all-check,
.no-check {
  margin-left: 10px;
  font-size: 16px;
}
.all-check {
  color: rgb(0, 128, 79);
}
.no-check {
  color: rgba(255, 0, 0, 0.664);
}
</style>
