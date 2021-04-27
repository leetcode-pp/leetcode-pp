<template>
  <div class="card-container">
    <a-card :key="card.id" hoverable class="card" v-for="card in cards">
      <img
        class="card-img"
        :alt="card.image.alt"
        :src="card.image.url"
        slot="cover"
      />
      <a-card-meta :title="card.title">
        <template slot="description">
          <div class="card-desc">{{ card.desc }}</div>
          <a
            v-if="card.downloadUrl"
            :href="card.downloadUrl"
            class="card-action"
            >下载</a
          >
          <a
            v-if="card.viewUrl"
            :href="card.viewUrl"
            :target="card.external ? _blank : ''"
            class="card-action card-action-view"
            >查看</a
          >
        </template>
      </a-card-meta>
    </a-card>
  </div>
</template>

<script>
export default {
  props: {
    cards: {
      type: Array
    }
  }
}
</script>

<style lang="less" scoped>
.card-container {
  flex-flow: row wrap;
  display: flex;
  // height: 400px;
  margin: 50px 0;
}
.card {
  width: 30vw;
  margin: 5px;
  max-width: 200px;
}
.card-img {
  height: 200px;
}
.card-desc {
  height: 100px;
}
.card-action {
  margin-left: 5px;
}
.card-action-view {
  // color: #333;
}
</style>
