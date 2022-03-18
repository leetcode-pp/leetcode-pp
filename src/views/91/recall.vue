<template>
  <div>
    How to Use?

    <div style="text-align: left">
      <div>
        1. 输入你的用户名（当然你也可以输入仰慕的人的用户名 eg: lilyzhaoyilu）
      </div>
      <idv>2. 选择想要查看的题目，如果当前用户没有写题解，则无法选择</idv>
      <div>3. Go</div>
      <div>选择导出可以将题解导出，这样就可以收藏了~</div>
    </div>
    <a-input
      style="width: 300px;margin:0 20px;"
      placeholder="请输入你的 Github 用户名"
      v-model="username"
    />
    <a-select
      style="width: 200px"
      v-model="currentDay"
      placeholder="请选择题目"
    >
      <a-select-option
        v-for="solution in solutions"
        :value="solution.day"
        :disabled="!solution.body"
        :key="solution.day"
      >
        {{ `【Day ${solution.day}】` + solution.title }}
      </a-select-option>
    </a-select>

    <a-button class="btn" @click="load" type="primary"> 查看本题题解 </a-button>

    <a-button class="btn" @click="exportSolutions"> 导出全部 </a-button>

    <div v-if="dailyProblem">
      <Q :dailyProblem="dailyProblem" />
      <a-button type="link" @click="goToRenderRaw" target="_blank"
        >查看题解</a-button
      >
    </div>
  </div>
</template>

<script>
import writer from 'file-writer'

import Q from './QuestionDecription.vue'
import { setStorage } from '../../utils/storage'
import my from './db/my-6.json'
import dailyProblems from './db/solution-6.json'

export default {
  components: {
    Q
  },
  data() {
    return {
      username: undefined,
      currentDay: undefined,
      dailyProblem: undefined
    }
  },
  methods: {
    async goToRenderRaw() {
      await setStorage(
        'github-reader',
        my[this.username][this.currentDay - 1].body
      )
      this.$router.push('/solutionDetail?type=5')
    },
    load() {
      if (!this.currentDay) return
      this.dailyProblem = this.solutions[this.currentDay - 1]
    },
    exportSolutions() {
      writer(
        'solution.json',
        JSON.stringify(this.solutions.map(q => ({ ...q, content: undefined }))),
        {}
      )
    }
  },
  computed: {
    solutions() {
      return (my[this.username] || []).map((s, i) =>
        s ? { ...s, ...dailyProblems[i + 1] } : dailyProblems[i + 1]
      )
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
  margin: 0 10px;
}
</style>
