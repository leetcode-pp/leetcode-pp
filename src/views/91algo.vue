<template>
  <div>
    <div v-if="!started">
      <div>我们 <span class="time">2021-06-01</span> 见~</div>

      <counter :time="time" />
    </div>

    <div v-if="!pay">
      <a-alert :message="errorMessage" type="error" />
      <a-button type="link" :href="loginUrl">Github 登录</a-button>
      <a-button type="link" href="/91-intro">活动介绍及报名方式</a-button>
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
              <a-list-item-meta :description="item.description">
                <a slot="title" href="https://www.antdv.com/">{{
                  item.title
                }}</a>
                <a-avatar slot="avatar" :src="item.avatar" />
              </a-list-item-meta>
              <a-button type="link" :href="item.homepage" target="_blank"
                >关注ta</a-button
              >
            </a-list-item>
          </a-list>
        </a-tab-pane>
        <a-tab-pane key="jy1" tab="讲义（基础篇）" :disabled="!pay">
          基础篇讲义列表
        </a-tab-pane>
        <a-tab-pane key="jy2" tab="讲义（专题篇）" disabled>
          尚未开启
        </a-tab-pane>
        <a-tab-pane key="jy3" tab="讲义（进阶篇）" disabled>
          尚未开启
        </a-tab-pane>

        <a-tab-pane key="sign" tab="打卡" :disabled="!pay">
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

const clientId = 'c16b80e7b58a5a007157'
const host = 'https://a91algo.herokuapp.com'
// const host = 'http://localhost:3000'
const time = new Date()

time.setMonth(5)
time.setDate(1)
time.setHours(0)
time.setMinutes(0)
time.setSeconds(0)

console.log(time.getTime())

export default {
  components: {
    counter
  },
  data() {
    return {
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
          title: '宝石叔叔'
        },
        {
          title: '表哥'
        },
        {
          title: '漾哥'
        },
        {
          title: '三天'
        }
      ],
      activeTab: 'teachers',
      started: new Date().getTime() >= time.getTime(),
      time: time.getTime(),
      errorMessage: '很抱歉，当前页面部分内容需要付费且登录后才能访问~',
      logined: false, // 是否登录
      pay: true, // 是否为付费用户
      loginUrl: `
            https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=https://leetcode-solution.cn/91`
    }
  },
  async mounted() {
    if (this.$route.query.code) {
      const { pay, message } = await fetch(
        `${host}/api/v1/user?code=${this.$route.query.code}`,
        {
          credentials: 'include'
        }
      ).then(res => res.json())

      if (message === 'Bad credentials') {
        this.errorMessage = '登录已过期，请重新登录~'
      }
      this.pay = pay
    }
  }
}
</script>

<style scoped>
.time {
  font-size: 24px;
  color: #00a6dd;
}
.teachers {
  margin: 20px auto;
}
</style>
