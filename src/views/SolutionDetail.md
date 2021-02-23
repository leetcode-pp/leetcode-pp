第三方依赖:    
- hightlight.js
- markdown-it
- axios
- js-base64

执行步骤:    
1. 组件安装好后，将调用`getSolution`以基于`专题的github地址`获取专题内容（`来自this.$route.query.url`）
2. 如果成功加载了该专题的内容，它将使用markdown-it将markdown转换为HTML。 然后它将通过Vue指令`v-html`呈现HTML。
3. 渲染后，它会调用`highlight.js`以在<code>标签内查找样式的内容