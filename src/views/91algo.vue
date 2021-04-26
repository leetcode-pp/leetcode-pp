<template>
  <div>
    <div v-if="!pay">
      <a-alert :message="errorMessage" type="error" />
      <a-button type="link" :href="loginUrl">Github 登录</a-button>
      <a-button type="link" href="/91-intro">活动介绍及报名方式</a-button>
    </div>
    <div v-else>
      <div>我们 <span class="time">2021-06-01</span> 见~</div>

      <counter :time="time" />
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

console.log(time)

export default {
  components: {
    counter
  },
  data() {
    return {
      time: time.getTime(),
      errorMessage: '很抱歉，当前页面需要付费且登录后才能访问~',
      logined: false, // 是否登录
      pay: false, // 是否为付费用户
      loginUrl: `
            https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=http://localhost:8080/91`
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
</style>
