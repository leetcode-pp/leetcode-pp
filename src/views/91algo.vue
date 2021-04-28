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
        <a-tab-pane key="agenda" tab="目录">
          <div class="timeline">
            <a-timeline mode="alternate">
              <a-timeline-item color="green">
                <h3>先导篇（2021-06-01 前）</h3>
                <p v-for="lecture in introLectures" :key="lecture.id">
                  {{ lecture.title }}
                </p>

                <p />
              </a-timeline-item>
              <a-timeline-item color="green">
                <h3>基础篇 （2021-06-01 - 2021-06-30）</h3>
                <p v-for="lecture in basicLectures" :key="lecture.id">
                  {{ lecture.title }}
                </p>
              </a-timeline-item>

              <a-timeline-item color="gray">
                <h3>专题篇 （2021-07-01 - 待定）</h3>
                <p v-for="lecture in topicLectures" :key="lecture.id">
                  {{ lecture.title }}
                </p>
              </a-timeline-item>
              <a-timeline-item color="gray">
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
          本期暂时不支持在此打卡，还请大家去
          <a-button
            type="link"
            href="https://github.com/leetcode-pp/91alg-3/issues"
            target="_blank"
            >仓库</a-button
          >
          找到当天的题目进行打卡~
        </a-tab-pane>
        <a-tab-pane key="jy0" tab="讲义（先导篇）" :disabled="!pay">
          <card :cards="introLectures" />
        </a-tab-pane>
        <a-tab-pane key="jy1" tab="讲义（基础篇）" :disabled="!pay">
          <card :cards="basicLectures" />
        </a-tab-pane>
        <a-tab-pane key="jy2" tab="讲义（专题篇）" disabled>
          尚未开启
        </a-tab-pane>
        <a-tab-pane key="jy3" tab="讲义（进阶篇）" disabled>
          尚未开启
        </a-tab-pane>

        <a-tab-pane key="ebbok" tab="电子书" disabled>
          尚未开启
        </a-tab-pane>

        <a-tab-pane key="faq" tab="FAQ">
          <div class="faq">
            Q：零基础人群可以学习吗？<br />
            A：只要掌握一门编程语言就可以学习。<br /><br />
            Q：课程是用什么语言教学的？<br />
            A：Java， Python，JS
            都可能，不过算法涉及到的语言都比较基础，即使不了解，也完全可以学习。另外算法重要的是思想，
            语言不重要，思路理解了比什么都重要。 <br /><br />
            Q：讲义和题解能够观看多久？<br />
            A:为了有效督促学习，如果大家被违反规则被清退（<b>规则包括长时间群里闲聊和连续七天不打卡</b>），则不可以继续观看，否则可以长期观看。<br /><br />
            Q：我该怎么学习？<br />
            A：每一个小节开始之前都会提前把讲义公布到这里，大家可以关注一下，提前预习。每天都会有一道题，第二天会公布前一天的题解，所有<b>打卡和题解</b>都在仓库中查看。另外我还介绍了一些学习方法，
            具体先导篇的视频。<br /><br />
            Q：我该怎么打卡？<br />
            A：打卡只需要在对应讲义新建的 issue
            下留言即可，注意格式要求。格式模板在先导篇哦~ <br /><br />
            Q: 只能当天打卡吗？ 如果一周补打卡算吗？<br />
            A: 是的。必须当天才能打卡，比如第七天的题，
            那么只有那一天打卡才算打卡成功。如果你连续打卡七天可以获取一张补签卡，补签卡是虚拟计算用的（不会实际发放），每月结束我们会统计当月满勤的同学，如果你不满勤，但是使用补签卡后满勤也是可以的。也就是说必须当天打卡，需要补卡的必须有补签卡，补签卡的获得方式是连续打卡七天。<br /><br />
            Q：微信群的作用是什么？<br />
            A：重要信息都在群公告和仓库，大家注意这两个信息渠道即可。微信群用来交流一下简单的，容易回答的问题。一些复杂的问题大家可以提
            issue。 <br /><br />
            Q：虽然你这么说，但是我还是不想错过微信群的重要信息怎么办？<br />
            A：重要信息在仓库和群公告。如果大家还是怕错过重要群信息，可以按如下操作，仅看群主即可。
            首先点击微信群右上角的按钮进入群设置，并翻到最下方。
            点击“查找聊天内容”，然后进入“按群成员查找”。
            找到需要查找聊天记录的人，比如 lucifer。<br /><br />
            Q：Github 收到很多邮件，怎么取消？<br />
            A：参考 https://www.bpteach.com/knowledge-base/1047564/ <br /><br />
            Q：仓库在哪里？怎么进？<br />
            A：仓库地址： https://github.com/leetcode-pp/91alg-4
            进入之前需要进入组织，而进入组织的方式等待活动开始报名后（<b>预计5.1到6.1之间</b>）通知大家，大家保持关注即可。
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import counter from '@/components/Counter'
import request from '@/apis/request'
import Card from '@/components/Card'
import {
  getBasicLecture,
  getIntroLecture,
  getTopicLecture,
  getAdvanceLecture
} from '@/apis/91'
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
      basicLectures: [],
      introLectures: [],
      topicLectures: [],
      advanceLectures: [],
      teachers: [
        {
          title: '西法',
          homepage: 'https://github.com/azl397985856',
          avatar:
            'https://tva1.sinaimg.cn/large/008i3skNly1gpy3e38277j30cs0csjso.jpg',
          description:
            'Github 40K star 的架构师，同时也是刷题插件 leetcode-cheatsheet 作者',
          modules: [
            {
              name: 'Python',
              color: '#87d068'
            }
          ]
        },
        {
          title: '宝石叔叔',
          description: '我也不知道，代码都是百度抄来的，复制过来怎么会有错误',
          homepage: 'https://github.com/unclegem',
          avatar:
            'https://tva1.sinaimg.cn/large/008i3skNly1gpy65g2jf2j316g0u0dz2.jpg',
          modules: [
            {
              name: '哈希表',
              color: '#f50'
            },
            {
              name: 'Java',
              color: 'cyan'
            }
          ]
        },
        {
          title: '表哥',
          homepage: 'https://feiker.xyz',
          avatar:
            'https://tva1.sinaimg.cn/large/008i3skNly1gpy68il2fmj30rw0ru0t8.jpg',
          modules: [
            {
              name: 'JS',
              color: 'orange'
            },
            {
              name: '树',
              color: 'green'
            }
          ]
          // description: '建站中'
        },
        {
          title: '漾哥',
          avatar:
            'https://tva1.sinaimg.cn/large/008i3skNly1gpy7a1u5rtj30cs0csglt.jpg',
          homepage: 'https://github.com/suukii',
          modules: [
            {
              name: '链表',
              color: '#108ee9'
            },
            {
              name: 'JS',
              color: 'orange'
            },
            {
              name: 'Python',
              color: '#87d068'
            }
          ]
        },
        {
          title: '三天',
          description: '这只窑鸡太懒了，什么也没写',
          avatar:
            'https://tva1.sinaimg.cn/large/008i3skNly1gpy7afqfzmj30qn0qnt98.jpg',
          homepage: 'https://github.com/threedayAAAAA',
          modules: [
            {
              name: 'JS',
              color: 'orange'
            }
          ]
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
      url: `/api/v1/user?code=${this.$route.query.code || '-'}`
    })

    if (message === 'Bad credentials') {
      this.errorMessage = '登录已过期，请重新登录~'
    }
    this.avatar = avatar
    this.pay = pay
    this.name = name

    if (pay) {
      this.activeTab = 'jy0'
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
            viewUrl: `/solutionDetail?type=2&id=${q.id}`,
            external: !!q.external
          }))
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.timeline {
  margin: 0 auto;
  // width: 400px;
}
.faq {
  text-align: left;
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
.teachers {
  margin: 20px auto;
}
.hello {
  margin: 20px auto;
}
</style>
