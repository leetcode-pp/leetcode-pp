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
        <img
          class="video-item-cover"
          :src="item.cover + '@180w_100h_1e_1c.webp'"
        />
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
    // 点击某一作品,打开iframe开始播放视频
    handleVideo(aid) {
      this.videoSrc = `//player.bilibili.com/player.html?aid=${aid}`
      this.isShowVideo = true
      this.videoLoading = true
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
          aid: 971961728,
          tid: 6, // 春招/秋招
          title: '搞定春招之虾皮篇（前端岗）',
          cover:
            'http://i2.hdslb.com/bfs/archive/a167605754245dd311424c2f0c9f3e8d926eb468.jpg',
          created: 1614823665,
          link:
            'https://mp.weixin.qq.com/s?__biz=MzI4MzUxNjI3OA==&mid=2247487632&idx=1&sn=830fe267d835e5acbfc417787f85f1c1&chksm=eb88dc89dcff559f49913c0f2dec77b1d06c2ddbe2c6c299b32b3e49c2efaf8b11ac0aedce8f&token=1676518002&lang=zh_CN#rd'
        },
        {
          aid: 799648825,
          tid: 6,
          title: '搞定春招之腾讯&钉钉篇）',
          cover:
            'http://i1.hdslb.com/bfs/archive/13547a8934c66ec0bf69b4518715b17194485315.jpg',
          created: 1615889895,
          link: 'https://lucifer.ren/blog/2021/03/11/school-02/'
        },
        {
          aid: 79269711,
          tid: 1,
          title: '【大前端模拟面试】- 2019-12-14',
          cover:
            'http://i1.hdslb.com/bfs/archive/6e8b0751dcc43f8f8b06fa31920ba2a002cca13c.jpg',
          created: 1576332558,
          link: 'https://lucifer.ren/fe-interview/#/mock-interview/2019-12-14'
        },
        {
          aid: 90738781,
          tid: 1,
          title: '【大前端模拟面试】- 2020-02-20',
          cover:
            'http://i0.hdslb.com/bfs/archive/7a51a328134118bceef0579e04c068b44f42bd40.jpg',
          created: 1582313002,
          link: 'https://lucifer.ren/fe-interview/#/mock-interview/2020-02-20'
        },
        {
          aid: 76756338,
          title: 'mac装机（前端工程师）',
          tid: 5,
          cover:
            'http://i2.hdslb.com/bfs/archive/63331bbb5340fbf9f01c7e47a0872d2912b42991.jpg',
          created: 1574511732,
          link: 'https://github.com/azl397985856/mac-setup'
        },
        {
          aid: 64313957,
          tid: 4,
          title: '大前端 每日一题 - 实现一个简单的移动端debug工具',
          cover:
            'http://i2.hdslb.com/bfs/archive/2f645a2205c66d20576a03e47d94e87e87faaffb.jpg',
          created: 1566132353
        },
        {
          aid: 840090130,
          tid: 2,
          title:
            '【贪心~双指针】 881. 求生艇 (\tBoats to Save People  ) LeetCode',
          cover:
            'http://i2.hdslb.com/bfs/archive/bfa206c65ddb3dfb8dd4d5d417e17add823560c3.jpg',
          created: 1585907937
        },
        {
          aid: 95571324,
          tid: 2,
          title: '【树】 404. 左叶子之和 (Sum of Left Leaves) LeetCode',
          cover:
            'http://i1.hdslb.com/bfs/archive/e6a7a74406902ae9d50e683cde78b327b0876fb5.jpg',
          created: 1583942986
        },

        {
          aid: 670114626,
          tid: 3,
          title: '【力扣加加】91天学算法 - 基础篇',
          cover:
            'http://i0.hdslb.com/bfs/archive/0a700ea680450ea379928f871d34c26a8cb3d8b0.jpg',
          created: 1603901419
        },
        {
          aid: 627510315,
          tid: 3,
          title: '【力扣加加】91算法先导篇',
          cover:
            'http://i2.hdslb.com/bfs/archive/5e5cc5f6ed4901f9f9ce6ca8b07b71f28917c874.jpg',
          created: 1603612539
        },
        {
          aid: 886975432,
          tid: 3,
          title: '91 天学算法第三期视频会议',
          cover:
            'http://i0.hdslb.com/bfs/archive/e34ebf4c0492ed2171e2d0723b71156f27f036b0.jpg',
          link:
            'https://mp.weixin.qq.com/s?__biz=MzI4MzUxNjI3OA==&mid=2247487620&idx=1&sn=5f2b73c5b57c6451ca1fe1bcbb036a80&chksm=eb88dc9ddcff558bf74c367b6c71055cb190cd72b60a08664e11c216183f716f689f176cf3b9&token=1676518002&lang=zh_CN#rd'
        },
        {
          tid: 2,
          aid: 797618520,
          title: '【力扣加加】 二分图',
          cover:
            'http://i0.hdslb.com/bfs/archive/36d6e1555831615a1187d02a13bf9e028ab2cf3a.jpg',
          created: 1603612713
        },
        {
          tid: 2,
          aid: 285933298,
          title: '【哈希表~双指针】 141. 环形链表 142. 环形链表 II  LeetCode',
          cover:
            'http://i1.hdslb.com/bfs/archive/cbf54f882261167938353e0c77e5e458420e006e.jpg',
          created: 1591802077
        },
        {
          tid: 5,
          aid: 883465515,
          title: '帮助你高效刷题的插件了解一下？',
          cover:
            'http://i1.hdslb.com/bfs/archive/61d32eb509ef1822884c4ee48c644f9b97dfcada.jpg',
          created: 1591438281,
          link: 'https://lucifer.ren/blog/2020/08/16/leetcode-cheat/'
        },
        {
          tid: 2,
          aid: 925519225,
          title:
            '【递归，分治】 236.最近公共祖先 (Lowest Common Ancestor of a Binary Tree) LeetCode',
          cover:
            'http://i0.hdslb.com/bfs/archive/a81f712aa09b26ca48aae4018137899ecd5d2a3e.jpg',
          created: 1589107045
        },
        {
          tid: 2,
          aid: 667788596,
          title:
            '【记忆化递归，动态规划】 44.通配符匹配（wildcard-matching） LeetCode',
          cover:
            'http://i2.hdslb.com/bfs/archive/40c54e786225780b04a2c6905ba891e91cfc39c7.jpg',
          created: 1587205244
        },
        {
          tid: 2,
          aid: 455316365,
          title: '【栈，中心扩展】 32.最长有效括号 LeetCode',
          cover:
            'http://i1.hdslb.com/bfs/archive/3313371f0f1e7d4ba0937ee58c08faa4cf9ae725.jpg',
          created: 1586798500
        },
        {
          tid: 2,
          aid: 840186648,
          title: '【树】 1367.二叉树中的列表  LeetCode',
          cover:
            'http://i1.hdslb.com/bfs/archive/cab8977ce7f830be929c97b2540f56e4961b4fb6.jpg',
          created: 1586442654
        },
        {
          tid: 2,
          aid: 752707742,
          title: '【二叉树的搜索】 1379. 找出克隆二叉树中的相同节点 LeetCode',
          cover:
            'http://i0.hdslb.com/bfs/archive/1ce7bec2be397f6688569e220aa396f89442be78.jpg',
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
