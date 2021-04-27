<template>
  <div>
    <div v-if="!started">
      <div>我们 <span class="time">2021-06-01</span> 见~</div>

      <counter :time="time" />
    </div>

    <div v-if="!pay">
      <a-alert :message="errorMessage" type="error" />
      <a-button v-if="!name" type="link" :href="loginUrl">Github 登录</a-button>
      <a-button type="link" href="/91-intro">活动介绍及报名方式</a-button>
    </div>

    <div v-else class="hello">
      <a-avatar :size="64" :src="avatar" />
      <div>
        欢迎回来，{{ name }} ~ 今天有没有比昨天进步一点点呢？
        <a-button type="link" @click="handlLogoutClick">退出登录</a-button>
      </div>
    </div>

    <div>
      <!-- 正在为大家准备讲义~ TODO: 讲师介绍，讲义查看，打卡跳到
      Github（做到如果不打卡，
      用这个网站就够了就行了。再多一点新花样，比如上面提到的讲师介绍等等） -->

      <a-tabs v-model="activeTab">
        <a-tab-pane key="teachers" tab="讲师介绍">
          <a-list
            item-layout="horizontal"
            :data-source="teachers"
            class="teachers"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta
                :description="item.description || '这个人太懒了，什么也没有写'"
              >
                <a slot="title" :href="item.homepage">{{ item.title }}</a>
                <a-avatar slot="avatar" :src="item.avatar" />
              </a-list-item-meta>
              <a-button
                class="homepage"
                type="link"
                v-if="item.homepage"
                :href="item.homepage"
                target="_blank"
                >关注 ta</a-button
              >
              <div v-else class="homepage">连主页都没有呢~</div>
            </a-list-item>
          </a-list>
        </a-tab-pane>
        <a-tab-pane key="jy1" tab="讲义（基础篇）" :disabled="!pay">
          <card :cards="basicLecturs" />
        </a-tab-pane>
        <a-tab-pane key="jy2" tab="讲义（专题篇）" disabled>
          尚未开启
        </a-tab-pane>
        <a-tab-pane key="jy3" tab="讲义（进阶篇）" disabled>
          尚未开启
        </a-tab-pane>

        <a-tab-pane key="sign" tab="打卡" :disabled="!pay">
          <!-- 后期考虑使用 https://microsoft.github.io/monaco-editor/index.html 来进行本地打卡 -->
          本期暂时不支持在此打卡，还请大家去
          <a-button
            type="link"
            href="https://github.com/leetcode-pp/91alg-3/issues"
            target="_blank"
            >仓库</a-button
          >
          找到当天的题目进行打卡~
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import counter from '@/components/Counter'
import request from '@/apis/request'
import Card from '@/components/Card'
import { getBasicLecture } from '@/apis/91'
import { logout } from '@/apis/user'

const clientId = 'c16b80e7b58a5a007157'
const host = 'https://a91algo.herokuapp.com'
// const host = 'http://localhost:3000'
const time = new Date()

time.setMonth(5)
time.setDate(1)
time.setHours(0)
time.setMinutes(0)
time.setSeconds(0)

// console.log(time.getTime())

export default {
  components: {
    counter,
    card: Card
  },
  data() {
    return {
      name: '', // 当前登录人
      avatar: '',
      basicLecturs: [],
      teachers: [
        {
          title: '西法',
          homepage: 'https://github.com/azl397985856',
          avatar:
            'https://tva1.sinaimg.cn/large/008i3skNly1gpy3e38277j30cs0csjso.jpg',
          description:
            'Github 40K star 的架构师，同时也是刷题插件 leetcode-cheatsheet 作者'
        },
        {
          title: '宝石叔叔',
          description: '我也不知道，代码都是百度抄来的，复制过来怎么会有错误',
          homepage: 'https://github.com/unclegem',
          avatar:
            'https://tva1.sinaimg.cn/large/008i3skNly1gpy65g2jf2j316g0u0dz2.jpg'
        },
        {
          title: '表哥',
          homepage: 'https://feiker.xyz',
          avatar:
            'https://tva1.sinaimg.cn/large/008i3skNly1gpy68il2fmj30rw0ru0t8.jpg'
          // description: '建站中'
        },
        {
          title: '漾哥',
          avatar:
            'https://tva1.sinaimg.cn/large/008i3skNly1gpy7a1u5rtj30cs0csglt.jpg',
          homepage: 'https://github.com/suukii'
        },
        {
          title: '三天',
          description: '这只窑鸡太懒了，什么也没写',
          avatar:
            'https://tva1.sinaimg.cn/large/008i3skNly1gpy7afqfzmj30qn0qnt98.jpg',
          homepage: 'https://github.com/threedayAAAAA'
        }
      ],
      activeTab: 'teachers',
      started: new Date().getTime() >= time.getTime(),
      time: time.getTime(),
      errorMessage: '很抱歉，当前页面部分内容需要付费且登录后才能访问~',
      // logined: false, // 是否登录
      pay: false, // 是否为付费用户
      loginUrl: `
            https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=https://leetcode-solution.cn/91`
    }
  },
  methods: {
    handlLogoutClick() {
      logout().then(() => {
        window.location.reload()
      })
    }
  },
  async mounted() {
    const { pay, message, name, avatar_url: avatar } = await request({
      url: `/api/v1/user?code=${this.$route.query.code || '-'}`,
      withCredentials: true
    })

    if (message === 'Bad credentials') {
      this.errorMessage = '登录已过期，请重新登录~'
    }
    this.avatar = avatar
    this.pay = pay
    this.name = name

    if (pay) {
      this.activeTab = 'jy1'
      getBasicLecture().then(data => {
        this.basicLecturs = data.map(q => ({
          ...q,
          viewUrl: `/solutionDetail?type=2&id=${q.id}`,
          external: false
        }))
      })
    }

    // this.activeTab = 'jy1'
    // getBasicLecture().then(res => {
    //   this.basicLecturs = res.data.map(q => ({
    //     ...q,
    //     viewUrl: `/solutionDetail?type=2&id=${q.id}`,
    //     external: false
    //   }))
    // })
  }
}
</script>

<style scoped>
.homepage {
  width: 120px;
}
.time {
  font-size: 24px;
  color: #00a6dd;
}
.teachers {
  margin: 20px auto;
}
.hello {
  margin: 20px auto;
}
</style>
