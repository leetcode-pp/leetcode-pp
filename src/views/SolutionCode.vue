<template>
  <div class="max-width-600-center">
    <a-button type="link" :href="block.link">文章地址</a-button>
    <form>
      <div class="drown-wrapper">
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link" href="#">
            {{ selctedChapterLabel }} <a-icon type="caret-down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item v-for="(block, index) in blocks" :key="index">
              <a @click="handleCHchange(block)">{{ block.name }}</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </form>
    <div v-bind:key="item.title" v-for="item in block.list">
      <div class="code-block-title">{{ item.title }}</div>
      <a-tabs
        @change="handleLanguageChange"
        tabPosition="left"
        v-if="selctedChapterId"
      >
        <a-tab-pane
          :tab="code.language"
          v-bind:key="code.language"
          v-for="code in item.codes"
          ><div class="text-align-left" v-html="render(code)"></div
        ></a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import 'highlight.js/styles/github.css'
import copy from 'markdown-it-code-copy'

const md = new MarkdownIt()
md.use(copy, {
  buttonStyle:
    'position: absolute; top: 7.5px; right: 6px; cursor: pointer; border: none;border-radius:10px'
})

function render(s) {
  return md.render(s)
}

export default {
  data() {
    return {
      block: {},
      selctedChapterId: '',
      selctedChapterLabel: '请选择章节',
      blocks: []
    }
  },
  created() {
    import('./solutionCode.js').then(m => {
      this.blocks = m.default
      this.selctedChapterId = '01'
      this.selctedChapterLabel = '01.堆专题'
      this.handleLanguageChange()
    })
  },
  methods: {
    render(code) {
      return render('```' + code.language + '\n' + code.content + '```')
    },
    handleLanguageChange() {
      this.$nextTick(() =>
        document.querySelectorAll('code').forEach(hljs.highlightBlock)
      )
    },
    handleCHchange({ id, name }) {
      this.selctedChapterId = id
      this.selctedChapterLabel = name
      this.handleLanguageChange()
    }
  },
  watch: {
    selctedChapterId: {
      handler(id) {
        this.block = this.blocks.find(b => b.id === id) || {}
        console.log(this.block.link)
      },
      immediate: false
    }
  }
}
</script>

<style lang="less" scoped>
.code-block-title {
  font-weight: bold;
  font-size: 18px;
  margin: 10px 0;
}
.text-align-left {
  text-align: left;
}

.drown-wrapper {
  display: flex;
  justify-content: end;
  align-items: center;
  text-align: left;
  width: 240px;
  margin-left: 10px;

  background-color: #e6f7ff;
  border: 1px solid #87e8de;
  border-radius: 4px;
  a {
    font-size: 14px;
    color: #1890ff;
  }
}
.ant-dropdown-link {
  width: 100%;
  color: #fff;
  text-align: center;
  font-weight: 600;
  position: relative;
  text-decoration: none;
  i {
    position: absolute;
    right: 10px;
    top: 2px;
  }
}
.max-width-600-center {
  margin: 10px auto;
}
</style>
