<template>
  <div>
    <div class="daily-problem">
      <div class="daily-problem-title">{{ dailyProblem.title }}</div>

      <a-button
        type="link"
        class="daily-problem-link"
        :href="dailyProblem.link"
        >{{ dailyProblem.link }}</a-button
      >

      <pre class="daily-problem-desc" v-if="dailyProblem.description">{{
        dailyProblem.description
      }}</pre>

      <div
        class="daily-problem-pres"
        v-if="dailyProblem.pres && dailyProblem.pres.length > 0"
      >
        前置知识：<a-tag
          :color="hashColor(pre)"
          :key="pre"
          v-for="pre in dailyProblem.pres"
        >
          {{ pre }}
        </a-tag>
      </div>
      <div
        class="daily-problem-tags"
        v-if="dailyProblem.tags && dailyProblem.tags.length > 0"
      >
        标签：<a-tag
          :color="hashColor(tag)"
          :key="tag"
          v-for="tag in dailyProblem.tags"
        >
          {{ tag }}
        </a-tag>
      </div>

      <div
        class="daily-problem-whys"
        v-if="dailyProblem.whys && dailyProblem.whys.length > 0"
      >
        入选理由：
        <div
          v-for="why in dailyProblem.whys"
          :key="why"
          class="daily-problem-whys-item"
        >
          {{ why }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dailyProblem: {
      type: Object
    },
    colors: {
      type: Array,
      default() {
        return ['#f50', '#2db7f5', '#87d068', '#108ee9']
      }
    }
  },
  methods: {
    hashColor(text) {
      if (!text) return ''
      let acc = 0
      for (const i in text) {
        acc = (acc + text.charCodeAt(i)) % this.colors.length
      }
      return this.colors[acc]
    }
  }
}
</script>

<style lang="less" scoped>
.daily-problem-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}
.daily-problem-link {
  text-align: left;
}
.daily-problem-desc {
  text-align: left;
  min-height: 150px;
  line-height: 26px;
  font-size: 14px;
  color: #abb2bf;
  padding: 15px;
  background: #282c34;
  border-radius: 5px;
}
.daily-problem-pres,
.daily-problem-whys,
.daily-problem-tags {
  font-size: 14px;
  text-align: left;
  margin: 10px auto;
}

.daily-problem-whys-item {
  font-size: 14px;
  color: #666;
  line-height: 30px;
  font-weight: bold;
}
</style>
