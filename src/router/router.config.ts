import Layout from '@/layouts'
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    meta: { title: '首页' },
    component: Layout,
    children: [
      {
        path: 'home',
        alias: '/',
        name: 'home',
        component: () =>
          import(/* webpackChunkName: "view-home" */ '@/views/Home.vue')
      },
      {
        path: 'solution',
        component: () =>
          import(/* webpackChunkName: "view-solution" */ '@/views/Solution.vue')
      },
      {
        path: 'solutionDetail',
        component: () =>
          import(
            /* webpackChunkName: "view-solution-detail" */ '@/views/SolutionDetail.vue'
          )
      },
      {
        path: 'everyday/:id',
        component: () =>
          import(
            /* webpackChunkName: "view-solution" */ '@/views/ProblemDetail.vue'
          )
      },
      {
        path: 'everyday',
        component: () =>
          import(/* webpackChunkName: "view-everyday" */ '@/views/Everyday.vue')
      },
      {
        path: 'download',
        component: () =>
          import(/* webpackChunkName: "view-download" */ '@/views/Download.vue')
      },
      {
        path: 'video',
        component: () =>
          import(/* webpackChunkName: "view-video" */ '@/views/Video.vue')
      },
      {
        path: '91-intro',
        component: () =>
          import(/* webpackChunkName: "view-91" */ '@/views/91.vue')
      },
      {
        path: '91',
        component: () =>
          import(/* webpackChunkName: "view-91algo" */ '@/views/91algo.vue')
      },
      {
        path: 'book',
        component: () =>
          import(/* webpackChunkName: "view-book" */ '@/views/Book.vue')
      },
      {
        path: 'book-code',
        component: () =>
          import(/* webpackChunkName: "view-book" */ '@/views/BookCode.vue')
      },
      {
        path: 'solution-code',
        component: () =>
          import(/* webpackChunkName: "view-book" */ '@/views/SolutionCode.vue')
      }
    ]
  }
]

// 基础路由
export const constantRouterMap = []
