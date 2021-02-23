<template>
  <div>
    <div v-if="loading" class="spinner-container">
      <a-spin size="large"></a-spin>
    </div>
    <div v-if="!loading" class="container">
      <div class="max-width-800">
        <a-alert
          v-if="hasError"
          message="很抱歉，目前请求无法执行，请稍候再试。"
          type="error"
        />
      </div>
      <h1>{{ title }}</h1>
      <p class="tags">
        <a-tag
          v-for="(label, index) in labels"
          :key="label.id"
          :color="randomColor(index)"
          label.name
          >{{ label.name }}</a-tag
        >
      </p>
      <h2 class="subtitle">题目详情</h2>
      <div class="desc text-align-left" v-html="desc"></div>
      <h2 class="subtitle">题解</h2>
      <div class="solution text-align-left" v-html="solution"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
const md = new MarkdownIt()
const URL_REGEX = /(\s+)(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g
/** 
  The above regex will match the following cases
  http://www.foufos.gr
  https://www.foufos.gr
  http://foufos.gr
  http://www.foufos.gr/kino
  http://werer.gr
  www.foufos.gr
  www.mp3.com
  www.t.co
  http://t.co
  http://www.t.co
  https://www.t.co
  www.aa.com
  http://aa.com
  http://www.aa.com
  https://www.aa.com
 */
const ERROR_MSG_DISPLAY_DURATION = 5000
const COLORS = [
  'pink',
  'red',
  'orange',
  'green',
  'cyan',
  'blue',
  'purple',
  '#87d068'
]
export default {
  data() {
    return {
      loading: true,
      hasError: false,
      title: '',
      desc: '',
      createDate: '',
      issueUrl: '',
      solution: '',
      prettified: false,
      labels: []
    }
  },
  methods: {
    randomColor(index) {
      return COLORS[index % COLORS.length]
    },
    showError() {
      this.hasError = true
      setTimeout(() => {
        this.hasError = false
      }, ERROR_MSG_DISPLAY_DURATION)
    },
    async getProlem() {
      try {
        const res = await axios.get(
          `https://api.github.com/repos/azl397985856/leetcode/issues/${this.$route.params.id}?githubClientId=e6dafd54b96fcef74c56&githubClientSecret=64ec9c15ee608c201f0b5f4b3fde881b07d2bc31`
        )
        this.loading = false
        this.title = res.data.title
        this.desc = md.render(this.addLinkMarkdown(res.data.body))
        this.createDate = res.data.created_at
        this.issueUrl = res.data.comments_url
        this.labels = res.data.labels
      } catch (error) {
        this.showError()
        this.loading = false
      }
    },
    addLinkMarkdown(content) {
      return content.replace(URL_REGEX, '<$2>')
    },
    async getSolution() {
      try {
        const res = await axios.get(this.issueUrl)
        this.loading = false
        this.solution = (res.data[0] && res.data[0].body) || ''

        // Markdown to HTML
        this.solution = md.render(this.solution)
      } catch (error) {
        this.showError()
        this.loading = false
      }
    }
  },
  async mounted() {
    await this.getProlem()
    if (this.title) {
      await this.getSolution()
      hljs.configure({ useBR: false })
      document.querySelectorAll('code').forEach(block => {
        hljs.highlightBlock(block)
      })
      document.querySelectorAll('img').forEach(block => {
        // block.style.maxWidth = '340px'
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ p > code {
  display: inline;
}
h2.subtitle {
  margin-top: 50px;
  margin-bottom: 30px;
  font-size: 32px;
  font-weight: bold;
}
.max-width-800 {
  max-width: 800px;
  margin: 30px auto;
}
.text-align-left {
  text-align: left;
}
.container {
  max-width: 1080px;
  margin: 30px auto;
}
.desc,
.solution {
  max-width: 800px;
  margin: 20px auto;
}
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
.spinner-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.tags {
  margin-bottom: 30px;
}
</style>
