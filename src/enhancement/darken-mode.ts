export default {
  install(Vue: any) {
    import('./darken-mode.less')

    Vue.component('dark-mode-toggle', (resolve: any) => {
      import('../../external/dark-mode.js').then(darken => {
        resolve({
          created() {
            this.instance = new darken.default({
              onChange: (isDark: boolean) => (this.isDark = isDark)
            })
          },
          data() {
            return {
              isDark: false,
              instance: null
            }
          },
          render(h: any) {
            return h('a-switch', {
              props: {
                checked: this.isDark,
                checkedChildren: '暗黑系',
                unCheckedChildren: '光明系'
              },

              on: {
                click: () => this.instance.toggle.call(this.instance),
                change: (isDark: boolean) => (this.isDark = isDark)
              }
            })
          }
        })
      })
    })
  }
}
