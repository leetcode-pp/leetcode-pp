function makeRule(md) {
  return function replaceListItem() {
    // eslint-disable-next-line
    md.renderer.rules.list_item_open = function replaceOpen() {
      return '<li><section>'
    }
    // eslint-disable-next-line
    md.renderer.rules.list_item_close = function replaceClose() {
      return '</section></li>'
    }
  }
}

export default md => {
  md.core.ruler.push('replace-li', makeRule(md))
}
