<template>
  <div class="wrapper">
    <ul v-show="!isShowVideo" class="tag-list">
      <li
        v-for="item in tagList"
        :key="item.tid"
        :class="[{ active: item.tid == currentTagId }, 'tag-item']"
        @click="handleTag(item.tid)"
      >
        <span>{{ item.name }}</span>
        <span class="tag-num">{{ item.count }}</span>
      </li>
      <li class="tag-item search">
        <a-input-search
          @input="handleInputChange"
          @search="onSearch"
          type="text"
          placeholder="搜索关键字"
        />
      </li>
    </ul>
    <ul v-show="!isShowVideo" class="video-list">
      <a-spin v-show="searchLoading" class="loading" size="large" />
      <li
        v-for="item in getFilteredVideos"
        :key="item.aid"
        @click="handleVideo(item.aid)"
        class="video-item"
      >
        <img class="video-item-cover" :src="item.cover" />
        <article class="video-item-descript">
          <p class="video-item-p video-item-title">{{ item.title }}</p>
          <p class="video-item-p video-item-detail">
            <a-button
              v-if="item.link"
              type="link"
              size="small"
              class="video-item-detail-play"
              @click="e => openLink(e, item.link)"
            >
              文字版
            </a-button>
            <span v-else class="video-item-detail-play"> lucifer</span>

            <span class="video-item-detail-time">
              <a-icon type="clock-circle" />
              {{ item.created | getTime }}
            </span>
          </p>
        </article>
      </li>
      <li class="video-item empty-video-item" />
    </ul>
    <a-spin v-show="videoLoading" class="loading" size="large" />
    <a-pagination
      v-show="!isShowVideo"
      v-model="currentPage"
      :total="getFilteredVideos.length"
      :pageSize="pageSize"
      @change="pageChange"
      size="normal"
      class="pagination"
      :show-total="total => `当前共 ${total} 项`"
    />
    <a-icon
      v-show="isShowVideo"
      @click="handleClose"
      type="close"
      class="close"
    />
    <iframe
      v-show="isShowVideo"
      :src="videoSrc"
      class="ifram"
      scrolling="no"
      border="0"
      frameborder="no"
      framespacing="0"
      allowfullscreen="true"
      @load="videoOnLoad"
    />
  </div>
</template>

<script>
import axios from 'axios'

// 需要采集视频的b站账号id
const USERID = 519510412
// 每页数据的长度
const PAGESIZE = 30
// b站访问成功时的code
const REQUEST_CODE = 200

export default {
  data() {
    return {
      tagList: [], // 标签列表
      currentTagId: -1, // 当前所在的标签id
      searchWorld: null, // 搜索词
      searchLoading: false, // 作品是否搜索中
      videoList: [], // 视频列表
      videoSrc: '', // 当前正在播放的视频地址
      isShowVideo: false, // 是否播放视频
      currentPage: 1, // 当前页数
      pageSize: PAGESIZE, // 每页数量
      videoLoading: true // 视频是否加载中
    }
  },
  created() {
    // 获取首页的数据
    this.getAllVideos(USERID, this.currentPage, this.pageSize)
  },
  methods: {
    initData() {
      this.videoList = []
      this.tagList = [
        {
          name: '全部',
          tid: -1,
          count: 0
        }
      ]
    },
    /**获取某一用户分页后的视频作品
     * @param{Number} mid 需要采集的b用户id
     * @param{Number} page 第多少页的数据
     * @param{Number} pagesize 每页数据的长度
     * @return{Promise} 获取并处理分页后数据的promise
     */
    getUserPageVideo(mid, page, pagesize) {
      // 开启loading
      this.searchLoading = true
      return axios
        .get(
          'https://5e86f5d3d29490bd12ac9aa5--leetcode-jing.netlify.app/api/getVideoList',
          {
            params: {
              mid,
              page,
              pagesize
            }
          }
        )
        .then(res => {
          const {
            data: { data },
            status
          } = res
          // 判断请求是否成功
          if (status === REQUEST_CODE) {
            this.calculatUserPageData(data)
          }
        })
        .catch(() => {
          // 超时以及错误处理
        })
        .finally(() => {
          // 关闭loading
          this.searchLoading = false
        })
    },
    // 处理用户的某一页视频数据
    calculatUserPageData(data) {
      const { tlist, vlist, count } = data
      this.initData()
      // 调整标签数据的格式
      const tagList = [
        {
          name: '全部',
          tid: -1,
          count
        }
      ]
      Object.keys(tlist).forEach(key => {
        tagList.push(tlist[key])
      })
      // 设置标签列表,视频列表,总页数
      this.tagList = tagList
      this.videoList = vlist
    },
    openLink(e, link) {
      e.stopPropagation()
      window.location.href = link
    },
    handleInputChange(e) {
      this.searchWorld = e.target.value
    },
    handleTag(tid) {
      this.currentTagId = tid
      this.onSearch()
    },
    handleVideo(aid) {
      window.open(`https://www.bilibili.com/video/av${aid}`)
    },
    // 视频加载完毕时
    videoOnLoad() {
      this.videoLoading = false
    },
    // 关闭ifram播放的视频
    handleClose() {
      this.isShowVideo = false
      this.videoSrc = ''
    },
    getAllVideos() {
      return Promise.resolve([
        {
          aid: 417281451,
          bvid: 'BV14V411e7MF',
          tid: 6, // 春招/秋招
          title: '搞定春招之网易篇',
          cover: 'https://p.ipic.vip/1e7ybn.jpg',
          created: 1616907618,
          link:
            'https://mp.weixin.qq.com/s?__biz=MzI4MzUxNjI3OA==&mid=2247488066&idx=1&sn=5e2c82b324c8ca63e0071cd5405c71a8&chksm=eb88de5bdcff574da03bc95fce53f37b2795ba635496cdb2ddfcea34a8305d2401c48d89e414&token=1873896266&lang=zh_CN#rd'
        },
        {
          aid: 971961728,
          bvid: 'BV1bp4y1H7KT',
          tid: 6, // 春招/秋招
          title: '搞定春招之虾皮篇（前端岗）',
          cover: 'https://p.ipic.vip/he23st.jpg',
          created: 1614823665,
          link:
            'https://mp.weixin.qq.com/s?__biz=MzI4MzUxNjI3OA==&mid=2247487632&idx=1&sn=830fe267d835e5acbfc417787f85f1c1&chksm=eb88dc89dcff559f49913c0f2dec77b1d06c2ddbe2c6c299b32b3e49c2efaf8b11ac0aedce8f&token=1676518002&lang=zh_CN#rd'
        },
        {
          aid: 799648825,
          tid: 6,
          title: '搞定春招之腾讯&钉钉篇）',
          bvid: 'BV1Qy4y187Em',
          cover: 'https://p.ipic.vip/p3qxar.jpg',
          created: 1615889895,
          link:
            'https://mp.weixin.qq.com/s?__biz=MzI4MzUxNjI3OA==&mid=2247487829&idx=1&sn=f31b4741853c3f51317c1a980a15b05c&chksm=eb88dd4cdcff545a7a9740d9658883f0aa711df24772cb3cda3701bac3c0c4b67a83d1f005d9&token=1929867466&lang=zh_CN#rd'
        },
        {
          aid: 79269711,
          tid: 1,
          bvid: 'BV1RJ411r7jj',
          title: '【大前端模拟面试】- 2019-12-14',
          cover: 'https://p.ipic.vip/c94vzl.jpg',
          created: 1576332558,
          link: 'https://lucifer.ren/fe-interview/#/mock-interview/2019-12-14'
        },
        {
          aid: 90738781,
          tid: 1,
          title: '【大前端模拟面试】- 2020-02-20',
          cover: 'https://p.ipic.vip/loczol.jpg',
          created: 1582313002,
          link: 'https://lucifer.ren/fe-interview/#/mock-interview/2020-02-20'
        },
        {
          aid: 76756338,
          bvid: 'BV1RJ411d7XT',
          title: 'mac装机（前端工程师）',
          tid: 5,
          cover: 'https://p.ipic.vip/1jmdac.jpg',
          created: 1574511732,
          link: 'https://github.com/azl397985856/mac-setup'
        },
        {
          aid: 417406606,
          bvid: 'BV1qV411n7Qc',
          tid: 4,
          title: 'lucifer的面试之路（一)',
          cover: 'https://p.ipic.vip/p0s3hc.jpg',
          created: 1617453475,
          link: 'https://lucifer.ren/blog/2021/04/03/interview-road/'
        },
        {
          aid: 64313957,
          bvid: 'BV1V4411o7AP',
          tid: 4,
          title: '大前端 每日一题 - 实现一个简单的移动端debug工具',
          cover: 'https://p.ipic.vip/oky0ds.jpg',
          created: 1566132353
        },
        {
          aid: 840090130,
          bvid: 'BV1M54y1d7h2',
          tid: 2,
          title:
            '【贪心~双指针】 881. 求生艇 (\tBoats to Save People  ) LeetCode',
          cover: 'https://p.ipic.vip/ega7np.jpg',
          created: 1585907937
        },
        {
          aid: 95571324,
          bvid: 'BV1rE411L7eH',
          tid: 2,
          title: '【树】 404. 左叶子之和 (Sum of Left Leaves) LeetCode',
          cover: 'https://p.ipic.vip/ykk4nt.jpg',
          created: 1583942986
        },

        {
          aid: 670114626,
          tid: 3,
          bvid: 'BV1pa4y1s7g2',
          title: '【力扣加加】91天学算法 - 基础篇',
          cover: 'https://p.ipic.vip/g5r985.jpg',
          created: 1603901419
        },
        {
          aid: 627510315,
          tid: 3,
          bvid: 'BV17t4y1i71G',
          title: '【力扣加加】91算法先导篇',
          cover: 'https://p.ipic.vip/qltqzt.jpg',
          created: 1603612539
        },
        {
          aid: 886975432,
          tid: 3,
          bvid: 'BV1qK4y1J7DD',
          title: '91 天学算法第三期视频会议',
          cover: 'https://p.ipic.vip/9ok5nq.jpg',
          link:
            'https://mp.weixin.qq.com/s?__biz=MzI4MzUxNjI3OA==&mid=2247487620&idx=1&sn=5f2b73c5b57c6451ca1fe1bcbb036a80&chksm=eb88dc9ddcff558bf74c367b6c71055cb190cd72b60a08664e11c216183f716f689f176cf3b9&token=1676518002&lang=zh_CN#rd'
        },
        {
          tid: 2,
          aid: 797618520,
          bvid: 'BV1fy4y1r7pX',
          title: '【力扣加加】 二分图',
          cover: 'https://p.ipic.vip/maaynq.jpg',
          created: 1603612713
        },
        {
          tid: 2,
          aid: 285933298,
          bvid: 'BV11f4y127Se',
          title: '【哈希表~双指针】 141. 环形链表 142. 环形链表 II  LeetCode',
          cover: 'https://p.ipic.vip/0hnnc3.jpg',
          created: 1591802077
        },
        {
          tid: 5,
          aid: 883465515,
          bvid: 'BV1UK4y1x7zj',
          title: '帮助你高效刷题的插件了解一下？',
          cover: 'https://p.ipic.vip/416v87.jpg',
          created: 1591438281,
          link: 'https://lucifer.ren/blog/2020/08/16/leetcode-cheat/'
        },
        {
          tid: 2,
          bvid: 'BV1GT4y137W9',
          aid: 925519225,
          title:
            '【递归，分治】 236.最近公共祖先 (Lowest Common Ancestor of a Binary Tree) LeetCode',
          cover: 'https://p.ipic.vip/17xf0j.jpg',
          created: 1589107045
        },
        {
          tid: 2,
          aid: 667788596,
          bvid: 'BV1Xa4y1x7st',
          title:
            '【记忆化递归，动态规划】 44.通配符匹配（wildcard-matching） LeetCode',
          cover: 'https://p.ipic.vip/ci9w0o.jpg',
          created: 1587205244
        },
        {
          tid: 2,
          aid: 455316365,
          bvid: 'BV1f5411t7cF',
          title: '【栈，中心扩展】 32.最长有效括号 LeetCode',
          cover: 'https://p.ipic.vip/l8ycti.jpg',
          created: 1586798500
        },
        {
          tid: 2,
          aid: 840186648,
          bvid: 'BV1N54y197Xe',
          title: '【树】 1367.二叉树中的列表  LeetCode',
          cover: 'https://p.ipic.vip/phrja0.jpg',
          created: 1586442654
        },
        {
          tid: 2,
          aid: 752707742,
          bvid: 'BV1Rk4y197AJ',
          title: '【二叉树的搜索】 1379. 找出克隆二叉树中的相同节点 LeetCode',
          cover: 'https://p.ipic.vip/iugorj.jpg',
          created: 1586182368
        }
      ]).then(vlist =>
        this.calculatUserPageData({
          tlist: {
            'mock-interview': {
              name: '模拟面试',
              tid: 1,
              count: vlist.filter(v => v.tid === 1).length
            },
            solution: {
              name: '算法题解',
              tid: 2,
              count: vlist.filter(v => v.tid === 2).length
            },
            '91algo': {
              name: '91算法',
              tid: 3,
              count: vlist.filter(v => v.tid === 3).length
            },
            fe: {
              name: '前端',
              tid: 4,
              count: vlist.filter(v => v.tid === 4).length
            },
            eff: {
              name: '效率',
              tid: 5,
              count: vlist.filter(v => v.tid === 5).length
            },
            school: {
              name: '校招',
              tid: 6,
              count: vlist.filter(v => v.tid === 6).length
            }
          },
          vlist,
          count: vlist.length
        })
      )
    },
    // 根据标题关键字搜索
    onSearch() {
      if (this.searchWorld) {
        this.getAllVideos(USERID, this.currentPage, this.pageSize).then(() => {
          const target = this.searchWorld.toLowerCase()
          this.videoList = this.videoList.filter(item => {
            return item.title.toLowerCase().indexOf(target) >= 0
          })
        })
      } else {
        this.getAllVideos(USERID, this.currentPage, this.pageSize)
      }
    },
    pageChange(currentPage) {
      this.currentPage = currentPage
      // 获取某一页的数据
      this.initData()
      this.getAllVideos(USERID, this.currentPage, this.pageSize)
    }
  },
  filters: {
    getTime(time) {
      const date = new Date(time * 1000)
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    },
    getPlay(play) {
      return play >= 10000 ? `${(play / 10000).toFixed(1)}万` : play
    }
  },
  computed: {
    getFilteredVideos() {
      if (this.currentTagId === -1) return this.videoList
      return this.videoList.filter(v => v.tid === this.currentTagId)
    }
  }
}
</script>

<style lang="less" scoped>
@import './Video.pc.less';
@import './Video.mobile.less';
</style>
