<template>
  <div>
    <div v-if="!started">
      <div>
        我们
        <span class="time">{{
          new Date(startTime).toLocaleDateString('en-CA')
        }}</span>
        见~
      </div>

      <counter :time="time" />
    </div>
    <a-spin :spinning="fetchingUserInfo">
      <div v-if="!pay">
        <a-alert
          :message="
            errorMessage + (noCheck ? '(由于连续七天未打卡，已被移除)' : '')
          "
          type="error"
        />
        <a-button v-if="!name" type="link" :href="loginUrl"
          >Github 登录</a-button
        >
        <a-button
          type="link"
          href="https://lucifer.ren/blog/2021/05/02/91algo-4/"
          >活动介绍及报名方式</a-button
        >
      </div>

      <div class="hello" v-if="name">
        <a-avatar :size="64" :src="avatar" />
        <div>
          欢迎回来，{{ name }} （{{ login }}）~ 今天有没有比昨天进步一点点呢？

          <a-button type="link" @click="handlLogoutClick">退出登录</a-button>
        </div>
      </div>
      <div>
        <b>
          {{
            allCheck
              ? '少年好武功啊！竟然满勤？坚持下去，活动结束的抽奖我看好你哦~'
              : ''
          }}
        </b>
      </div>
    </a-spin>

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
                <h3>先导篇（{{ timeRange.basic[0] }} 前）</h3>
                <p v-for="lecture in introLectures" :key="lecture.id">
                  {{ lecture.title }}
                </p>

                <p />
              </a-timeline-item>
              <a-timeline-item :color="basicActive() ? 'green' : 'gray'">
                <h3>
                  基础篇 （{{ timeRange.basic[0] }} - {{ timeRange.basic[1] }}）
                </h3>
                <p v-for="lecture in basicLectures" :key="lecture.id">
                  {{ lecture.title }}
                </p>
              </a-timeline-item>

              <a-timeline-item :color="topicActive() ? 'green' : 'gray'">
                <h3>
                  专题篇 （{{ timeRange.topic[0] }} - {{ timeRange.topic[1] }}）
                </h3>
                <p v-for="lecture in topicLectures" :key="lecture.id">
                  {{ lecture.title }}
                </p>
              </a-timeline-item>
              <a-timeline-item :color="advanceActive() ? 'green' : 'gray'">
                <h3>
                  进阶篇 （{{ timeRange.advanced[0] }} -
                  {{ timeRange.advanced[1] }}）
                </h3>
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
            <!-- 本期暂时不支持在此打卡，还请大家去
            <a-button
              type="link"
              :href="
                'https://github.com/leetcode-pp/91alg-5/issues/' +
                  dailyProblem.issue_number
              "
              target="_blank"
              >仓库</a-button
            >
            找到当天的题目进行打卡~ (如果出现 404 请参考
            <a @click="$router.push({ query: { tab: 'faq' } })"
              >FAQ 的解决方案</a
            >) -->
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
            >
              <template slot="dateFullCellRender" slot-scope="value">{{
                renderDay(value)
              }}</template>
            </a-calendar>
          </a-drawer>
          <a-spin :spinning="fetchingDailyProblem">
            <Q :dailyProblem="dailyProblem" />
          </a-spin>

          <div>
            <!-- <a-form
              v-show="lcAccountFormShow"
              :form="form"
              @submit="handleLcAccountLogin"
            >
              <a-form-item
                label="用户名"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
              >
                <a-input v-decorator="['login']" />
              </a-form-item>
              <a-form-item
                label="密码"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
              >
                <a-input type="password" v-decorator="['password']" />
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-button type="primary" html-type="submit"
                  >登录 LeetCode</a-button
                >
              </a-form-item>
            </a-form>

            <div class="code-btns">
              <a-select
                :disabled="lcAccountFormShow"
                :default-value="codeLanguage"
                style="width: 120px"
                v-model="codeLanguage"
              >
                <a-select-option
                  v-for="item in supportLanguage"
                  :value="item"
                  :key="item"
                >
                  {{ item }}
                </a-select-option>
              </a-select>
              <a-button
                :disabled="lcAccountFormShow"
                @click="submitCode"
                type="primary"
              >
                提交代码
              </a-button>
            </div>

            <code-editor
              :theme="codeTheme"
              :language="codeLanguage"
              ref="codeEditor"
              class="code-panel"
            ></code-editor> -->

            <div id="gitalk-container" style="text-align: left"></div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="jy0" tab="讲义（先导篇）">
          <div style="margin: 10px 0">
            最近更新时间： {{ new Date(meta.lectures.intro.lastUpdateTime) }}
          </div>
          <card :cards="introLectures" :loading="fetchingLectures" />
        </a-tab-pane>
        <a-tab-pane key="jy1" tab="讲义（基础篇）" :disabled="disableBasic">
          <div style="margin: 10px 0">
            最近更新时间： {{ new Date(meta.lectures.basic.lastUpdateTime) }}
          </div>
          <card :cards="basicLectures" :loading="fetchingLectures" />
        </a-tab-pane>

        <a-tab-pane key="jy2" tab="讲义（专题篇）" :disabled="disableTopic">
          <div style="margin: 10px 0">
            最近更新时间： {{ new Date(meta.lectures.topic.lastUpdateTime) }}
          </div>
          <card :cards="topicLectures" :loading="fetchingLectures" />
        </a-tab-pane>
        <a-tab-pane key="jy3" tab="讲义（进阶篇）" :disabled="disableAdvanced">
          <div style="margin: 10px 0">
            最近更新时间： {{ new Date(meta.lectures.advance.lastUpdateTime) }}
          </div>
          <card :cards="advanceLectures" :loading="fetchingLectures" />
        </a-tab-pane>

        <!-- <a-tab-pane key="ebook" tab="电子书" disabled>
          尚未开启
        </a-tab-pane> -->

        <a-tab-pane key="top-students" tab="上榜墙">
          <a-radio-group
            v-model="currentStudentTab"
            @change="e => (currentStudentTab = e.target.value)"
          >
            <a-radio-button value="ranking"> 打卡排行榜 </a-radio-button>
            <a-radio-button value="interview">
              往期优秀学员专访
            </a-radio-button>
          </a-radio-group>

          <div v-if="currentStudentTab === 'ranking'">
            <a-spin :spinning="fetchingRank">
              <div style="margin: 10px 0">
                最近更新时间： {{ new Date(meta.checkIn.lastUpdateTime) }}
              </div>
              <ranking :rankings="rankings" />
            </a-spin>
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
          <a-radio-group
            v-model="currentMyTab"
            @change="e => (currentMyTab = e.target.value)"
          >
            <a-radio-button value="history"> 打卡记录 </a-radio-button>
            <a-radio-button value="homework">
              作业（内测）
            </a-radio-button>
          </a-radio-group>

          <div v-if="currentMyTab === 'history'">
            <div style="margin: 10px 0">
              最近更新时间： {{ new Date(meta.dailyCheck.lastUpdateTime) }}
            </div>
            <div style="margin: 10px 0">
              上次全量更新时间：
              {{ new Date(meta.dailyCheck.lastFulllyUpdateTime) }}
            </div>

            <div style="margin: 10px 0">
              这里的打卡记录
              <b>不是实时的</b
              >，如果你刚打完卡，这里没有看到是正常的，大家可以根据最近更新时间来辅助判断。
            </div>

            <div v-if="!fetchingPersonalProgress && mySolutions.length === 0">
              活动尚未开始~
            </div>
            <a-spin v-else :spinning="fetchingPersonalProgress">
              <a-radio-group
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
                        'https://github.com/' +
                          DAILY_CHECK_OWNER +
                          '/' +
                          DAILY_CHECK_REPO +
                          '/issues/' +
                          solution.issue_number
                    "
                  >
                    【Day {{ solution.day }}】{{ solution.title }}
                  </a-button>
                  <div class="icon">
                    <a-tooltip v-if="solution.onTime === true">
                      <template slot="title"> 打卡成功 </template>
                      <a-icon style="color: green" type="check" />
                    </a-tooltip>

                    <a-tooltip v-else-if="solution.onTime === false">
                      <template slot="title"> 补卡成功 </template>
                      <a-icon style="color: orange" type="issues-close" />
                    </a-tooltip>

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
            </a-spin>
          </div>
          <div v-else>
            <ul class="align-l">
              <!-- <div v-if="!leetcodeUsername" class="align-c m-top-bottom-sm">
                抱歉，你还没有关联 LeetCode
                账号。并且由于目前功能未开放，需要等到功能开启后联系 lucifer
                告知你的 github 和 leetcode 账号进行关联。

                <counter
                  :time="upcommingContest.time"
                  :prefix="'下次周赛 Weekly ' + upcommingContest.id"
                />
              </div> -->

              <!-- <ol>
                完成 3 次<a
                  href="https://leetcode-cn.com/contest/"
                  target="_blank"
                  >竞赛</a
                >
                ({{
                  contestRankings.length
                }}/3)
              </ol> -->

              <ol>
                <a-button
                  type="link"
                  href="/solutionDetail?type=2&id=2007&max_id=2008"
                  >作业一：《模拟，枚举与递推》</a-button
                >
                <div>
                  题目描述： 求 1 到 n 中所有整数 x 的 f(x) ，并以数组返回。其中
                  f(x) 指的是 x 的 2 的因子个数。 比如 f(6) = 1 ，因为 6 = 2 *
                  3，只有一个因子 2 。 f(4) = 2 ，因为 4 = 2 * 2，有两个因子 2
                  。
                </div>

                <a-button
                  type="link"
                  href="/solutionDetail?type=2&id=3001&max_id=3008"
                  >作业二：《二分查找》</a-button
                >
                <div>
                  题目地址：
                  <a-button
                    type="link"
                    href="https://leetcode-cn.com/problems/escape-the-spreading-fire/"
                    >2258. 逃离火灾</a-button
                  >
                </div>

                <a-button
                  type="link"
                  href="/solutionDetail?type=2&id=3003&max_id=3008"
                  >作业三：《搜索》</a-button
                >
                <div>
                  题目地址：
                  <a-button
                    type="link"
                    href="https://binarysearch.com/problems/Cheapest-Bus-Route"
                  >
                    最便宜的公交路线
                  </a-button>
                </div>
              </ol>
            </ul>
          </div>
        </a-tab-pane>

        <a-tab-pane key="faq" tab="FAQ"> <faq /> </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import counter from '@/components/Counter'
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk/dist/gitalk'
// import request from '@/apis/request'
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
import { getCommentApp } from '@/apis/github'
import { logout, getUserInfo } from '@/apis/user'
import Q from './QuestionDecription.vue'
import contests from './db/contest.json'
import baseContest from './db/baseContest.json'
import {
  basicLectures,
  introLectures,
  advanceLectures,
  topicLectures,
  teachers,
  timeRange
} from './91.db.json'
import students from './students-talk'
import {
  clientId,
  originalHostname,
  // hostname,
  startTime,
  DAILY_CHECK_REPO,
  DAILY_CHECK_OWNER
  // leetcodeConfig
} from '../../config/index'
import { getMeta } from '@/apis/meta'
// const {
//   _91UsernameLsName,
//   _91PwdLsName,
//   lcSeesionCookieName,
//   lcCsrftokenCookieName
// } = leetcodeConfig
// const lcDataKeys = [
//   _91UsernameLsName,
//   _91PwdLsName,
//   lcSeesionCookieName,
//   lcCsrftokenCookieName
// ]
// import CodeEditor from '../../components/Code'
// import { message } from 'ant-design-vue'

const MS_PER_DAY = 24 * 60 * 60 * 1000
const DAYS_TO_PREPARE = 10 // 提前几天开放讲义
const DAYS_PER_WEEK = 7
function getDay(date = new Date().getTime()) {
  return ((date - startTime + MS_PER_DAY - 1) / MS_PER_DAY) >> 0
}
// 获取即将开始的下一次周赛信息
function getUpcommingContest() {
  let d = 0
  const now = new Date().getTime()
  while (baseContest.time + d * DAYS_PER_WEEK * MS_PER_DAY < now) {
    d += 1
  }
  return {
    id: baseContest.id + d,
    time: baseContest.time + d * DAYS_PER_WEEK * MS_PER_DAY,
    passed: false
  }
}

// 将 id 和 tag 合并为 labels，然后根据 labels 查询仓库下符合条件的 issue，然后将 issue 下的 comments 展示出来。
async function loadComment({
  id,
  tags,
  title = '',
  description = '',
  link = ''
}) {
  const { clientID, clientSecret } = await getCommentApp()

  const gitalk = new Gitalk({
    clientID,
    clientSecret,
    repo: DAILY_CHECK_REPO, // The repository of store comments,
    owner: DAILY_CHECK_OWNER,
    admin: ['azl397985856'],
    body: `
${description}
${link}
`,
    id,
    title,
    perPage: 100,
    labels: tags || [],
    distractionFreeMode: true // Facebook-like distraction free mode
  })
  document.querySelector('#gitalk-container').innerHTML = ''

  gitalk.render('gitalk-container')
}

export default {
  components: {
    counter,
    faq: Faq,
    ranking: Rank,
    card: Card,
    Q
    // CodeEditor
  },
  data() {
    return {
      noCheck: false,
      allCheck: false,
      DAILY_CHECK_REPO,
      DAILY_CHECK_OWNER,
      fetchingUserInfo: false,
      fetchingDailyProblem: false,
      fetchingLectures: false,
      fetchingRank: false,
      fetchingPersonalProgress: false,
      isTestUse: false,
      form: this.$form.createForm(this),
      selectedTag: '全部',
      allTags: ['全部'],
      currentStudentTab: 'interview',
      currentMyTab: 'history',
      rankings: [], // 打卡排行。未来可能增加其他排行，比如点赞精选排行
      contestRankings: [], // 参加竞赛的答题情况
      contests,
      upcommingContest: getUpcommingContest(),
      leetcodeUsername: '', // leetcode 用户名
      mySolutions: [],
      showHistory: false,
      colors: ['#f50', '#2db7f5', '#87d068', '#108ee9'],
      name: '', // 当前登录人
      avatar: '',
      startTime,
      meta: {
        dailyCheck: new Date().getTime(),
        checkIn: new Date().getTime(),
        lectures: {
          intro: {},
          basic: {},
          topic: {},
          advance: {}
        }
      },
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
      timeRange,
      disableBasic:
        new Date().getTime() <=
        new Date(timeRange.basic[0]).getTime() - DAYS_TO_PREPARE * MS_PER_DAY,
      disableTopic:
        new Date().getTime() <=
        new Date(timeRange.topic[0]).getTime() - DAYS_TO_PREPARE * MS_PER_DAY,
      disableAdvanced:
        new Date().getTime() <=
        new Date(timeRange.advanced[0]).getTime() -
          DAYS_TO_PREPARE * MS_PER_DAY,
      activeTab: 'teachers',
      started: new Date().getTime() >= startTime,
      time: startTime,
      errorMessage: '很抱歉，当前页面部分内容需要付费且登录后才能访问~',
      // logined: false, // 是否登录
      pay: false, // 是否为付费用户
      loginUrl: `
            https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=https://${originalHostname}/91`,
      codeInitValue: '',
      codeReadOnly: false,
      codeLanguage: 'python',
      codeTheme: 'vs-dark',
      lcAccountFormShow: false,
      supportLanguage: [
        'java',
        'c++',
        'c',
        'javascript',
        'php',
        'python',
        'rust'
      ]
    }
  },

  methods: {
    renderDay(time) {
      const day = getDay(time)
      if (day <= 0 || day > getDay()) return ''
      return `Day${day}`
    },
    async handleActiveTabChange(v) {
      this.activeTab = v

      let newurl = ''
      const searches = new URLSearchParams(new URL(window.location.href).search)
      searches.set('tab', this.activeTab)

      newurl =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        '?' +
        searches.toString()

      window.history.pushState({ path: newurl }, '', newurl)
      if (v === 'top-students') {
        try {
          this.fetchingRank = true
          await getRankings().then(rankings => {
            this.rankings = rankings
          })
        } finally {
          this.fetchingRank = false
        }
      }
      if (v === 'sign') {
        await this.getDailyProblem()
        // 加载评论
        loadComment({
          id: String(this.dailyProblem.day),
          ...this.dailyProblem
        })
      }
      if (v === 'my') {
        try {
          this.fetchingPersonalProgress = true
          await this.getMySolutions()
        } finally {
          this.fetchingPersonalProgress = false
        }
      }
      if (v.includes('jy')) {
        this.fetchingLectures = true
        const ps = [
          getIntroLecture(),
          getBasicLecture(),
          getTopicLecture(),
          getAdvanceLecture()
        ].map((p, i) => {
          return p.then(data => {
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
        Promise.allSettled(ps).then(() => (this.fetchingLectures = false))
      }
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
      this.fetchingDailyProblem = true
      return getDailyProblem(day)
        .then(dailyProblem => {
          this.dailyProblem = dailyProblem
          this.fetchingDailyProblem = false
          return dailyProblem
        })
        .catch(err => {
          console.log(err)
          this.fetchingDailyProblem = false
        })
    },
    getMySolutions() {
      return getMySolutions().then(data => {
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
      console.log(d, moment.valueOf() > new Date().getTime())
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
    async onDateChanged(v) {
      await this.getDailyProblem(v.valueOf())

      return loadComment({
        id: String(this.dailyProblem.day),
        ...this.dailyProblem
      })
    },
    handlLogoutClick() {
      logout().then(() => {
        window.location.href = `https://${originalHostname}/91`
      })
    }
    // submitCode() {
    //   const { link, title } = this.dailyProblem
    //   const id = +title.match(/[1-9]+/)[0]
    //   if (!id) {
    //     return message.error('当日讲义格式有误，请联系讲师!')
    //   }
    //   const slug = link
    //     .split('/')
    //     .reverse()
    //     .find(item => item)
    //   let needClearLcStorage = false
    //   request({
    //     method: 'post',
    //     url: '/api/v1/lc/submitCode',
    //     headers: this.getLcRequestHeader(),
    //     data: {
    //       link,
    //       lang: this.codeLanguage,
    //       id,
    //       slug,
    //       code: this.$refs.codeEditor.getEditorValue()
    //     }
    //   })
    //     .then(data => {
    //       const { submission_id: subMissionId } = data
    //       if (subMissionId) {
    //         message.info('题解提交成功')
    //         this.setLcDataInLs(data)
    //         // 数据持久化。将当前用户的打卡信息入库
    //         // TODO: 弹出写题解的弹窗（即使不写题解也算打卡成功）
    //       } else {
    //         throw data
    //       }
    //     })
    //     .catch((data = {}) => {
    //       message.destroy()
    //       // 如果状态码为403,代表需要用户重新输入一遍账号与密码,这时需要清空一波缓存
    //       needClearLcStorage = data.code === 403
    //       message.error(data.message || '题解提交失败')
    //     })
    //     .finally(() => {
    //       // 清空缓存
    //       if (needClearLcStorage) {
    //         this.clearLcDataInLs()
    //       }
    //       this.lcAccountFormShow = !this.hasLcRequstDataInLs()
    //     })
    // }
    // handleLcAccountLogin(e) {
    //   e.preventDefault()
    //   const data = this.form.getFieldsValue()
    //   let needClearLcStorage = false
    //   request({
    //     method: 'post',
    //     url: '/api/v1/lc/submitLcAccount',
    //     headers: this.getLcRequestHeader(),
    //     data
    //   })
    //     .then(data => {
    //       message.info(data.message || '登陆成功')
    //       this.setLcDataInLs(data)
    //     })
    //     .catch((data = {}) => {
    //       message.destroy()
    //       message.error(data.message || '登陆失败')
    //       // 如果状态码为403,代表需要用户重新输入一遍账号与密码,这时需要清空一波cookie
    //       needClearLcStorage = data.code === 403
    //     })
    //     .finally(() => {
    //       // 清空缓存
    //       if (needClearLcStorage) {
    //         this.clearLcDataInLs()
    //       }
    //       this.lcAccountFormShow = !this.hasLcRequstDataInLs()
    //     })
    // },
    // getLcRequestHeader(header = {}) {
    //   const arr = [
    //     _91UsernameLsName,
    //     _91PwdLsName,
    //     lcSeesionCookieName,
    //     lcCsrftokenCookieName
    //   ]
    //   const data = arr.reduce((obj, key) => {
    //     const val = window.localStorage.getItem(key)
    //     if (val) {
    //       obj[key] = val
    //     }
    //     return obj
    //   }, {})
    //   return Object.assign(header, data)
    // },
    // setLcDataInLs(data) {
    //   lcDataKeys.forEach(key => window.localStorage.setItem(key, data[key]))
    // },
    // clearLcDataInLs() {
    //   lcDataKeys.forEach(key => window.localStorage.removeItem(key))
    // },
    // hasLcRequstDataInLs() {
    //   const requestKeys = [_91UsernameLsName, _91PwdLsName]
    //   return requestKeys.every(key => window.localStorage.getItem(key))
    // }
  },
  async mounted() {
    const urlTab = new URLSearchParams(
      new URL(window.location.href).search
    ).get('tab')

    this.handleActiveTabChange(urlTab || 'agenda')

    function fallbackMeta() {
      if (!this.meta.lectures.intro) {
        this.meta.lectures.intro = {
          lastUpdateTime: new Date().getTime() - MS_PER_DAY * 30
        }
      }

      if (!this.meta.lectures.basic) {
        this.meta.lectures.basic = {
          lastUpdateTime: new Date().getTime() - MS_PER_DAY * 30
        }
      }

      if (!this.meta.lectures.topic) {
        this.meta.lectures.topic = {
          lastUpdateTime: new Date().getTime() - MS_PER_DAY * 30
        }
      }

      if (!this.meta.lectures.advance) {
        this.meta.lectures.advance = {
          lastUpdateTime: new Date().getTime() - MS_PER_DAY * 30
        }
      }
    }

    fallbackMeta.call(this)

    getMeta().then(data => {
      this.meta = data
      fallbackMeta.call(this)
    })

    try {
      this.fetchingUserInfo = true
      const {
        pay,
        message,
        name,
        login,
        avatar_url: avatar,
        leetcodeUsername,
        noCheck,
        allCheck
      } = (await getUserInfo(this.$route.query.code)) || {}

      if (message === 'Bad credentials') {
        this.errorMessage = '登录已过期，请重新登录~'
      }
      this.avatar = avatar
      this.pay = pay
      this.name = name || login
      this.login = login
      this.noCheck = noCheck
      this.allCheck = allCheck
      this.leetcodeUsername = leetcodeUsername || ''
      this.contestRankings = (contests[this.leetcodeUsername] || []).filter(
        res => res && res.score > 0
      )
      this.isTestUse = this.$route.query.isTest

      // this.lcAccountFormShow = !this.hasLcRequstDataInLs()
    } finally {
      this.fetchingUserInfo = false
    }
  }
}
</script>

<style lang="less" scoped>
.m-top-bottom-sm {
  margin: 10px 0;
}
.align-r {
  text-align: right;
}
.align-l {
  text-align: left;
}
.align-c {
  text-align: center;
}
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
  margin: 10px auto;
}

.code-btns {
  display: flex;
  justify-content: space-between;
  margin: 10px 0px;
}
.code-panel {
  margin-bottom: 20px;
  border-radius: 6px;
  overflow: hidden;
}
</style>
