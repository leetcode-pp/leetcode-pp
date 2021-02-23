3rd party libiries used:    
- hightlight.js
- markdown-it
- axios

Executing Steps:    
1. Once component mounted it will call `getProlem` to get the question detail based on the `id`(from `this.$route.params`)
2. If it successfully loaded the problem, it will make another call `getSolution` to get the soltution for this problem
3. Once solution text is retrieved, it'll use `markdown-it` to convert markdown to HTML. Then it will render the HTML via Vue directive `v-html`
4. After it is rendered, it'll envoke `highlight.js` to find style the content from within `<code>` tags
