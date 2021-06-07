<template>
  <div class="card-container">
    <a-card :key="card.id" hoverable class="card" v-for="card in cards">
      <a
        slot="extra"
        v-if="card.viewUrl"
        :href="card.viewUrl"
        :target="card.external ? '_blank' : ''"
      >
        查看
      </a>
      <img
        class="card-img"
        :alt="card.image.alt || card.title"
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
  max-width: 200px;
  // height: 200px;
}
.card-desc {
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 3; // 设置显示行数
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-action {
  margin-left: 5px;
}
</style>
