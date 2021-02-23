import router from '@/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

const installNProgress = {
  install: function() {
    router.beforeEach((to, from, next) => {
      nProgress.start()
      next()
    })
    router.afterEach(() => nProgress.done())
  }
}
export default installNProgress
