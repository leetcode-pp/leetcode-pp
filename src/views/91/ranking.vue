<template>
  <div>
    <div class="info">满勤：<a-icon class="all-check" type="carry-out" /></div>
    <div class="info">
      七天内未打卡：<a-icon class="no-check" type="exclamation-circle" />
    </div>
    <!-- <div class="info">
      剩余补签卡：<img class="rank card" src="../../assets/card.svg" />
    </div> -->

    <!-- 注：如果未满勤会自动使用补签卡，使用后满勤也算满勤 -->
    <a-list item-layout="horizontal" :data-source="rankings" class="teachers">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta>
          <div slot="description">
            <div>累计打卡 {{ item.count }} 次</div>
            <div>
              <a-icon v-if="item.allCheck" class="all-check" type="carry-out" />
              <a-icon
                v-if="item.noCheck"
                class="no-check"
                type="exclamation-circle"
              />
              <!-- <img class="rank card" src="../../assets/card.svg" /> x
              {{ item.card || 0 }} -->
            </div>
          </div>
          <div slot="title">
            <a :href="'https://github.com/' + item.login"
              >{{ item.name || item.login }}
            </a>
          </div>
          <div slot="avatar">
            <img
              v-if="item.rank === 1"
              class="rank"
              src="../../assets/golden_metal.svg"
            />
            <img
              v-else-if="item.rank === 2"
              class="rank"
              src="../../assets/silver_metal.svg"
            />
            <img
              v-else-if="item.rank === 3"
              class="rank"
              src="../../assets/bronze_metal.svg"
            />
            <a-avatar v-else shape="square" size="small" class="rank">{{
              item.rank
            }}</a-avatar>
            <a-avatar :src="item.avatar_url"> </a-avatar>
          </div>
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
.rank {
  margin: 0 10px;
  width: 36px;
  height: 36px;
  line-height: 36px;
}
.rank.card {
  width: 18px;
  height: 18px;
}
</style>
