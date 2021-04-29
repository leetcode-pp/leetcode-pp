export const replaceStyle = (id, css) => {
  const style = document.getElementById(id)
  try {
    style.innerHTML = css
  } catch (e) {
    console.log(e)
    style.styleSheet.cssText = css
  }
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(style)
}
