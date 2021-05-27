<template>
  <div class="code-container" ref="container"></div>
</template>

<script>
import * as monaco from 'monaco-editor'
export default {
  props: ['value', 'readOnly', 'language', 'theme'],
  data() {
    return {
      monacoEditor: {},
      monaco
    }
  },
  mounted() {
    // 初始化编辑器，确保dom已经渲染，dialog中要写在opened中
    this.monacoEditor = monaco.editor.create(this.$refs.container, {
      value: this.value,
      readOnly: this.readOnly,
      language: this.language,
      theme: this.theme
    })
  },
  destroyed() {
    this.destroyEditor()
  },
  methods: {
    getEditorValue() {
      return this.monacoEditor.getValue()
    },
    destroyEditor() {
      // 销毁编辑器
      this.monacoEditor.dispose()
    }
  },
  watch: {
    language(v) {
      this.monaco.editor.setModelLanguage(this.monacoEditor.getModel(), v)
    }
  }
}
</script>

<style lang="less" scope>
.code-container {
  min-height: 600px;
  width: 100%;
  text-align: left;
}
</style>
