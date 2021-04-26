<template>
  <div class="download-container">
    <div class="download-nav">
      <a-radio-group v-model="current" button-style="solid">
        <a-radio-button value="book">
          电子书
        </a-radio-button>

        <a-radio-button value="leetcode-cheat">
          刷题插件
        </a-radio-button>

        <a-radio-button value="anki">
          anki
        </a-radio-button>
      </a-radio-group>
    </div>

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
              target="_blank"
              class="card-action card-action-view"
              >查看</a
            >
          </template>
        </a-card-meta>
      </a-card>
    </div>
  </div>
</template>

<script language="typescript">
import { anki, book, leetcodeCheat } from './download-data.js'

export default {
  data() {
    return {
      current: 'book',
      book,
      leetcodeCheat,
      anki
    }
  },
  computed: {
    cards() {
      if (this.current === 'book') return this.book
      if (this.current === 'leetcode-cheat') return this.leetcodeCheat
      return this.anki
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
  color: #333;
}
</style>
