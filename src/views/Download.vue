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

    <card :cards="cards" />
  </div>
</template>

<script language="typescript">
import Card from '@/components/Card'
import { anki, book, leetcodeCheat } from './download-data.js'

export default {
  components: {
    card: Card
  },
  data() {
    return {
      current: 'leetcode-cheat',
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

<style lang="less" scoped></style>
