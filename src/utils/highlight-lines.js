const RE = /{([\d,-]+)}/

export default md => {
  const fence = md.renderer.rules.fence
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx, options, , self] = args
    const token = tokens[idx]

    if (!token.info || !RE.test(token.info)) {
      return fence(...args)
    }

    const lineNumbers = RE.exec(token.info)[1]
      .split(',')
      .map(v => v.split('-').map(v => parseInt(v, 10)))
    const langName = token.info.replace(RE, '').trim()

    const code = options.highlight(token.content, langName)

    const prefix = '<pre class="custom"><code class="hljs">'
    const suffix = '</code></pre>'

    const codeSplits = code
      .slice(prefix.length, -suffix.length)
      .split('<br/>')
      .map((split, index) => {
        const lineNumber = index + 1
        // console.log(split)
        const inRange = lineNumbers.some(([start, end]) => {
          if (start && end) {
            return lineNumber >= start && lineNumber <= end
          }
          return lineNumber === start
        })
        if (inRange) {
          return {
            code: `<span class="highlighted-line">${split}</span><br/>`,
            highlighted: true
          }
        }
        return {
          code: split + '<br/>'
        }
      })
    let highlightedCode = prefix
    codeSplits.forEach(split => {
      if (split.highlighted) {
        highlightedCode += split.code
      } else {
        highlightedCode += `${split.code}`
      }
    })
    highlightedCode += suffix
    console.log(highlightedCode)
    // If custom highlighter wraps code with starting <pre..., don't wrap code
    if (highlightedCode.startsWith('<pre')) {
      return highlightedCode
    }
    const tmpToken = {
      attrs: [['class', langName ? `language-${langName}` : '']]
    }
    const attrs = self.renderAttrs(tmpToken)
    return `<pre${attrs}><code${attrs}>${highlightedCode.trim()}</code></pre>`
  }
}
