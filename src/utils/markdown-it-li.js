function makeRule(md) {
  return function replaceListItem() {
    // eslint-disable-next-line
    md.renderer.rules.list_item_open = function replaceOpen() {
      return '<li><p class="md-p">'
    }
    // eslint-disable-next-line
    md.renderer.rules.list_item_close = function replaceClose() {
      return '</p></li>'
    }
  }
}

export default md => {
  md.core.ruler.push('replace-li', makeRule(md))
}
