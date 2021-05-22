<template>
  <div>
    <!-- <div v-if="!started">
      <div>
        我们
        <span class="time">{{
          new Date(startTime).toLocaleDateString('en-CA')
        }}</span>
        见~
      </div>

      <counter :time="time" />
    </div> -->

    <div v-if="!pay">
      <a-alert :message="errorMessage" type="error" />
      <a-button v-if="!name" type="link" :href="loginUrl">Github 登录</a-button>
      <a-button type="link" href="https://lucifer.ren/blog/2021/05/02/91algo-4/"
        >活动介绍及报名方式</a-button
      >
    </div>

    <div class="hello" v-if="name">
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

      <a-tabs :activeKey="activeTab" @change="handleActiveTabChange">
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
              <div class="more">
                <a-tag
                  :color="item.color"
                  :key="item.name"
                  v-for="item in item.modules"
                >
                  {{ item.name }}
                </a-tag>
                <a-button
                  type="link"
                  v-if="item.homepage"
                  :href="item.homepage"
                  target="_blank"
                  >关注 ta</a-button
                >
              </div>
            </a-list-item>
          </a-list>
        </a-tab-pane>
        <a-tab-pane key="agenda" tab="时间表">
          <div class="timeline">
            <a-timeline mode="alternate">
              <a-timeline-item color="green">
                <h3>先导篇（2021-05-10 前）</h3>
                <p v-for="lecture in introLectures" :key="lecture.id">
                  {{ lecture.title }}
                </p>

                <p />
              </a-timeline-item>
              <a-timeline-item :color="basicActive() ? 'green' : 'gray'">
                <h3>基础篇 （2021-05-10 - 2021-06-07）</h3>
                <p v-for="lecture in basicLectures" :key="lecture.id">
                  {{ lecture.title }}
                </p>
              </a-timeline-item>

              <a-timeline-item :color="topicActive() ? 'green' : 'gray'">
                <h3>专题篇 （2021-06-08 - 待定）</h3>
                <p v-for="lecture in topicLectures" :key="lecture.id">
                  {{ lecture.title }}
                </p>
              </a-timeline-item>
              <a-timeline-item :color="advanceActive() ? 'green' : 'gray'">
                <h3>进阶篇 （待定）</h3>
                <p v-for="lecture in advanceLectures" :key="lecture.id">
                  {{ lecture.title }}
                </p>
              </a-timeline-item>
            </a-timeline>
          </div>
        </a-tab-pane>
        <a-tab-pane key="sign" tab="打卡" :disabled="!pay">
          <!-- 后期考虑使用 https://microsoft.github.io/monaco-editor/index.html 来进行本地打卡 -->
          <div v-if="dailyProblem.issue_number">
            本期暂时不支持在此打卡，还请大家去
            <a-button
              type="link"
              :href="
                'https://github.com/leetcode-pp/91alg-4/issues/' +
                  dailyProblem.issue_number
              "
              target="_blank"
              >仓库</a-button
            >
            找到当天的题目进行打卡~ (如果出现 404 请参考
            <a @click="$router.push({ query: { tab: 'faq' } })"
              >FAQ 的解决方案</a
            >)
          </div>
          <div v-else>
            仓库暂时没有更新今天的题目，会有大约一个小时以内的延迟，大家耐心等待下哦~
          </div>
          <div>
            <a-button
              type="link"
              v-if="dailyProblem.day"
              :href="
                '/solutionDetail?type=3&id=' +
                  dailyProblem.day +
                  '&max_id=' +
                  2 || getDay()
              "
              >查看官方题解</a-button
            >

            <a-button type="primary" size="small" @click="showHistory = true">
              历史每日一题
            </a-button>
          </div>
          <a-drawer
            width="400"
            title="历史每日一题"
            placement="right"
            :closable="true"
            @close="showHistory = false"
            :visible="showHistory"
          >
            <a-calendar
              :disabledDate="disabledDate"
              :fullscreen="false"
              @change="onDateChanged"
            />
          </a-drawer>
          <div class="daily-problem">
            <div class="daily-problem-title">{{ dailyProblem.title }}</div>

            <a-button
              type="link"
              class="daily-problem-link"
              :href="dailyProblem.link"
              >{{ dailyProblem.link }}</a-button
            >

            <pre class="daily-problem-desc" v-if="dailyProblem.description">{{
              dailyProblem.description
            }}</pre>

            <div
              class="daily-problem-pres"
              v-if="dailyProblem.pres && dailyProblem.pres.length > 0"
            >
              前置知识：<a-tag
                :color="hashColor(pre)"
                :key="pre"
                v-for="pre in dailyProblem.pres"
              >
                {{ pre }}
              </a-tag>
            </div>
            <div
              class="daily-problem-tags"
              v-if="dailyProblem.tags && dailyProblem.tags.length > 0"
            >
              标签：<a-tag
                :color="hashColor(tag)"
                :key="tag"
                v-for="tag in dailyProblem.tags"
              >
                {{ tag }}
              </a-tag>
            </div>

            <div
              class="daily-problem-whys"
              v-if="dailyProblem.whys && dailyProblem.whys.length > 0"
            >
              入选理由：
              <div
                v-for="why in dailyProblem.whys"
                :key="why"
                class="daily-problem-whys-item"
              >
                {{ why }}
              </div>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="jy0" tab="讲义（先导篇）">
          <card :cards="introLectures" />
        </a-tab-pane>
        <a-tab-pane key="jy1" tab="讲义（基础篇）">
          <card :cards="basicLectures" />
        </a-tab-pane>

        <a-tab-pane key="jy2" tab="讲义（专题篇）" disabled>
          尚未开启
        </a-tab-pane>
        <a-tab-pane key="jy3" tab="讲义（进阶篇）" disabled>
          尚未开启
        </a-tab-pane>

        <!-- <a-tab-pane key="ebook" tab="电子书" disabled>
          尚未开启
        </a-tab-pane> -->

        <a-tab-pane key="top-students" tab="上榜墙">
          <a-radio-group
            v-model="currentStudentTab"
            @change="e => (currentStudentTab = e.target.value)"
          >
            <a-radio-button value="ranking">
              打卡排行榜
            </a-radio-button>
            <a-radio-button value="interview">
              往期优秀学员专访
            </a-radio-button>
          </a-radio-group>

          <div v-if="currentStudentTab === 'ranking'">
            <ranking :doneList="doneList" :rankings="rankings" />
          </div>
          <div v-else>
            <a-list
              item-layout="horizontal"
              :data-source="students"
              class="students"
            >
              <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta
                  :description="
                    item.description || '这个人太懒了，什么也没有写'
                  "
                >
                  <a slot="title" :href="item.homepage">{{ item.title }}</a>
                  <a-avatar slot="avatar" :src="item.avatar" />
                </a-list-item-meta>
                <div class="more">
                  <a-tag
                    :color="hashColor(item)"
                    :key="item"
                    v-for="item in item.tags"
                  >
                    {{ item }}
                  </a-tag>
                  <a-button
                    type="link"
                    :href="
                      `/solutionDetail?type=4&id=${item.id}&max_id=${Math.max(
                        ...students.map(q => q.id)
                      )}`
                    "
                    target="_blank"
                    >听听 ta 的故事</a-button
                  >
                </div>
              </a-list-item>
            </a-list>
          </div>
        </a-tab-pane>

        <a-tab-pane key="my" tab="我的" :disabled="!pay">
          <div style="margin: 10px 0;">
            这里的打卡记录
            <b>不是实时的</b
            >，而是每整点更新一次，也就是说打完卡需要至少下一个整点才能更新记录。如果你刚打完卡，这里没有看到是正常的。
          </div>
          <div v-if="mySolutions.length === 0">暂无打卡记录~</div>

          <a-radio-group
            v-else
            v-model="selectedTag"
            @change="onSelectedTagChange"
          >
            <a-radio-button v-for="tag in allTags" :value="tag" :key="tag">
              {{ tag }}
            </a-radio-button>
          </a-radio-group>

          <div
            :key="i"
            v-for="(solution, i) in mySolutions.filter(
              s => selectedTag === '全部' || s.tags.includes(selectedTag)
            )"
            class="my-solution"
          >
            <div v-if="solution">
              {{
                solution.tags.length > 0
                  ? '【' + solution.tags.join('，') + '】'
                  : ''
              }}

              <span :class="getDifficultyClass(solution.difficulty)">
                {{ getDifficulty(solution.difficulty) }}
              </span>
              <a-button
                type="link"
                :href="
                  solution.url ||
                    'https://github.com/leetcode-pp/91alg-4/issues/' +
                      solution.issue_number
                "
              >
                {{ solution.title }}
              </a-button>
              <div class="icon">
                <a-icon
                  style="color: green"
                  v-if="solution.body"
                  type="check"
                />
                <a-tooltip v-else-if="getDay() === i + 1">
                  <template slot="title">
                    未打卡或者正在更新打卡状态（打卡后一般一个小时之内会更新）
                  </template>
                  <a-icon type="clock-circle" />
                </a-tooltip>

                <a-icon style="color: red" v-else type="close" />
              </div>
            </div>
          </div>
        </a-tab-pane>

        <a-tab-pane key="faq" tab="FAQ"> <faq /> </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
// import counter from '@/components/Counter'
import request from '@/apis/request'
import Card from '@/components/Card'
import Rank from './ranking'
import Faq from './faq'
import {
  getBasicLecture,
  getIntroLecture,
  getTopicLecture,
  getAdvanceLecture,
  getDailyProblem,
  getMySolutions,
  getRankings
} from '@/apis/91'
import { logout } from '@/apis/user'
import {
  basicLectures,
  introLectures,
  advanceLectures,
  topicLectures,
  teachers
} from './91.db.json'
import students from './students-talk'
import {
  clientId,
  originalHostname,
  hostname,
  startTime
} from '../../config/index'

const MS_PER_DAY = 24 * 60 * 60 * 1000
function getDay(date = new Date().getTime()) {
  return ((date - startTime + MS_PER_DAY - 1) / MS_PER_DAY) >> 0
}

// console.log(time.getTime())

export default {
  components: {
    // counter,
    faq: Faq,
    ranking: Rank,
    card: Card
  },
  data() {
    return {
      selectedTag: '全部',
      allTags: ['全部'],
      currentStudentTab: 'ranking',
      doneList: [
        {
          name: 'lucifer',
          login: 'azl397985856',
          avatar: 'https://avatars.githubusercontent.com/u/12479470?v=4',
          count: 35
        }
      ], // 全勤列表
      rankings: [], // 打卡排行。未来可能增加其他排行，比如点赞精选排行
      mySolutions: [],
      showHistory: false,
      colors: ['#f50', '#2db7f5', '#87d068', '#108ee9'],
      name: '', // 当前登录人
      avatar: '',
      startTime,
      dailyProblem: {
        title: '',
        description: '',
        link: '',
        pres: [],
        tags: [],
        whys: []
      },
      basicLectures,
      introLectures,
      advanceLectures,
      topicLectures,
      teachers,
      students,
      activeTab: 'teachers',
      started: new Date().getTime() >= startTime,
      time: startTime,
      errorMessage: '很抱歉，当前页面部分内容需要付费且登录后才能访问~',
      // logined: false, // 是否登录
      pay: false, // 是否为付费用户
      loginUrl: `
            https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=https://${hostname}/91`
    }
  },

  methods: {
    handleActiveTabChange(v) {
      this.activeTab = v
      const newurl =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        '?tab=' +
        this.activeTab
      window.history.pushState({ path: newurl }, '', newurl)
    },
    getDay,
    getDifficulty(difficulty) {
      if (!difficulty) return ''
      if (difficulty.includes('简单')) return '简单'
      if (difficulty.includes('中等')) return '中等'
      if (difficulty.includes('困难')) return '困难'
      return ''
    },
    getDifficultyClass(difficulty) {
      if (!difficulty) return ''
      if (difficulty.includes('简单')) return 'easy'
      if (difficulty.includes('中等')) return 'medium'
      if (difficulty.includes('困难')) return 'hard'
      return ''
    },
    onSelectedTagChange(e) {
      this.selectedTag = e.target.value
    },
    basicActive() {
      return new Date().getTime() >= startTime
    },
    topicActive() {
      return new Date().getTime() >= new Date('2021-06-07 16:00:00 GMT')
    },
    advanceActive() {
      return false
    },
    getDailyProblem(day) {
      getDailyProblem(day).then(dailyProblem => {
        this.dailyProblem = dailyProblem
      })
    },
    getMySolutions() {
      getMySolutions().then(data => {
        this.mySolutions = data.filter((_, i) => getDay() >= i + 1)
        this.allTags = data
          .map(q => q.tags)
          .reduce((acc, tags) => {
            tags.forEach(tag => acc.add(tag))
            return acc
          }, new Set(['全部']))
      })
    },
    disabledDate(moment) {
      const d = getDay(moment.valueOf())
      // 活动开始去除下面注释
      if (moment.valueOf() > new Date().getTime()) return true
      return d < 1 || d > 91
    },
    hashColor(text) {
      if (!text) return ''
      let acc = 0
      for (const i in text) {
        acc = (acc + text.charCodeAt(i)) % this.colors.length
      }
      return this.colors[acc]
    },
    onDateChanged(v) {
      this.getDailyProblem(v.valueOf())
    },
    handlLogoutClick() {
      logout().then(() => {
        window.location.href = `https://${hostname}/91`
      })
    }
  },
  async mounted() {
    if (window.location.hostname === originalHostname) {
      window.location.href = `https://${hostname}/91`
      return
    }
    const urlTab = new URLSearchParams(
      new URL(window.location.href).search
    ).get('tab')
    getRankings().then(rankings => (this.rankings = rankings))
    const { pay, message, name, login, avatar_url: avatar } =
      (await request({
        url: `/api/v1/user?code=${this.$route.query.code || ''}`
      })) || {}

    if (message === 'Bad credentials') {
      this.errorMessage = '登录已过期，请重新登录~'
    }
    this.avatar = avatar
    this.pay = pay
    this.name = name || login

    if (pay) {
      this.activeTab = urlTab || 'sign'

      this.getDailyProblem()
      this.getMySolutions()
      ;[
        getIntroLecture(),
        getBasicLecture(),
        getTopicLecture(),
        getAdvanceLecture()
      ].forEach((p, i) => {
        p.then(data => {
          this[
            [
              'introLectures',
              'basicLectures',
              'topicLectures',
              'advanceLectures'
            ][i]
          ] = data.map(q => ({
            ...q,
            viewUrl: q.external
              ? q.externalLink
              : `/solutionDetail?type=2&id=${q.id}&max_id=${Math.max(
                  ...data.map(q => q.id)
                )}`,
            external: !!q.external
          }))
        })
      })
    } else if (urlTab) {
      this.activeTab = urlTab
    }
  }
}
</script>

<style lang="less" scoped>
.easy {
  color: green;
}
.medium {
  color: orange;
}
.hard {
  color: red;
}
.my-solution {
  text-align: right;
  margin: 10px 0;
}
.timeline {
  margin: 0 auto;
  // width: 400px;
}

.more {
  display: flex;
  justify-content: flex-end;
  width: 200px;
  span {
    height: 24px;
    line-height: 24px;
  }
}
.time {
  font-size: 24px;
  color: #00a6dd;
}
.icon {
  display: inline-block;
  margin: 0 10px;
}
.teachers,
.students {
  margin: 20px auto;
}
.hello {
  margin: 20px auto;
}
.daily-problem-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}
.daily-problem-link {
  text-align: left;
}
.daily-problem-desc {
  text-align: left;
  min-height: 150px;
  line-height: 26px;
  font-size: 14px;
  color: #abb2bf;
  padding: 15px;
  background: #282c34;
  border-radius: 5px;
}
.daily-problem-pres,
.daily-problem-whys,
.daily-problem-tags {
  font-size: 14px;
  text-align: left;
  margin: 10px auto;
}

.daily-problem-whys-item {
  font-size: 14px;
  color: #666;
  line-height: 30px;
  font-weight: bold;
}
</style>
