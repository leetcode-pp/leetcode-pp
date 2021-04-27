<template>
  <div class="wrapper">
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
      <h2 class="subtitle" v-if="type === 0">题解详情</h2>
      <div class="desc text-align-left" v-html="desc"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Base64 } from 'js-base64'
import MarkdownIt from 'markdown-it'
import markdownItLatex from '@iktakahiro/markdown-it-katex'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import { getBasicLectureDetails } from '@/apis/91'

const md = new MarkdownIt()
md.use(markdownItLatex)

const URL_REGEX = /(\s+)(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g
const LINK_REGRX = /\[(.*)\]\(\.\.\/(.*)\)/g
const WAREHOURSE_ADDRESS =
  'https://github.com/azl397985856/leetcode/raw/master/'
const ERROR_MSG_DISPLAY_DURATION = 5000

export default {
  data() {
    return {
      type: 0, // 0 :题解 1: 专题 2: 91讲义
      loading: true,
      hasError: false,
      desc: '',
      prettified: false,
      labels: []
    }
  },
  methods: {
    showError() {
      this.hasError = true
      setTimeout(() => {
        this.hasError = false
      }, ERROR_MSG_DISPLAY_DURATION)
    },
    async getSolution() {
      try {
        if (this.type === '2') {
          const data = await getBasicLectureDetails(this.$route.query.id)

          this.loading = false
          this.desc = md.render(data.content)
        } else {
          const res = await axios.get(this.$route.query.url)
          this.loading = false
          this.desc = md.render(
            this.addLinkMarkdown(Base64.decode(res.data.content))
          )
        }
      } catch (error) {
        this.showError()
        this.loading = false
      }
    },
    addLinkMarkdown(content) {
      // 仓库的 markdown 中仓库地址用的相对地址，所以需要 replace 成绝对地址
      return content
        .replace(URL_REGEX, '<$2>')
        .replace(LINK_REGRX, `[$1](${WAREHOURSE_ADDRESS}$2)`)
    }
  },
  async mounted() {
    this.type = this.$route.query.type
    await this.getSolution()
    hljs.configure({ useBR: false })
    document.querySelectorAll('code').forEach(block => {
      hljs.highlightBlock(block)
    })
    document.querySelectorAll('img').forEach(block => {
      // block.style.maxWidth = '340px'
      block.style.width = '100%'
    })
    document
      .getElementsByClassName('wrapper')[0]
      .querySelectorAll('a')
      .forEach(block => {
        block.target = '_blank'
      })
  }
}
</script>

<style lang="less" scoped>
/deep/ p > code {
  display: inline;
}
.wrapper {
  width: 100%;

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
  .desc {
    margin: 20px 10px;
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
}
</style>
