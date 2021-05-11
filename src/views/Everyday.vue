<template>
  <div>
    <div class="max-width-600-center">
      <a-alert
        v-if="hasError"
        message="很抱歉，目前请求无法执行，请稍候再试。"
        type="error"
      />
    </div>
    <div>
      <!-- Search for keywords -->
      <form
        @submit="searchAndUpdate"
        style="max-width:600px;margin:20px auto;display:flex;"
      >
        <a-input
          style="width: auto; flex: 1;"
          :value="keyword"
          @input="handleInputChange"
          type="text"
          placeholder="搜索关键字"
        />
        <div class="drown-wrapper">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" href="#">
              {{ label || '标签' }} <a-icon type="caret-down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleClearTagSelect"> 清除 </a>
              </a-menu-item>
              <a-menu-item v-for="(label, index) in tags" :key="index">
                <a @click="handleTagSelect">{{ label.name }}</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
        <div class="submit-container" style="width: 60px;margin-left: 10px;">
          <a-button @click="searchAndUpdate">
            搜索
          </a-button>
        </div>
      </form>
      <!-- Problem List -->
      <div v-for="a in tags" :key="a.id"></div>
      <a-table
        style="max-width:1280px;margin:0 auto;box-sizing:content-box;"
        :columns="columns"
        :rowKey="record => record.id"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template slot="name" slot-scope="titleAndUrl">
          <router-link :to="'/everyday/' + titleAndUrl.number">
            {{ titleAndUrl.title }}
          </router-link>
        </template>
        <template slot="tags" slot-scope="tags">
          <a-tag
            v-for="tag in tags"
            :key="tag.id"
            :color="assignTagColor(tag.name)"
            @click="handleTagClick"
          >
            {{ tag.name }}
          </a-tag>
        </template>
        <template slot="locked" slot-scope="lock">
          {{ lock ? '🔒' : '' }}
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { getGithubContent } from '../apis/github'

// const - Column names for the table header
const COLUMNS = [
  {
    title: '题名',
    dataIndex: 'titleAndUrl',
    width: '40%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '标签',
    dataIndex: 'labels',
    scopedSlots: { customRender: 'tags' },
    width: '40%'
  },
  {
    title: '🔒',
    dataIndex: 'locked',
    scopedSlots: { customRender: 'locked' }
  }
]
const DEFAULT_PAGE_SIZE = 20
export default {
  components: {},
  computed: {},
  data() {
    return {
      hasError: false,
      keyword: '',
      problems: [],
      data: [],
      pagination: {
        defaultPageSize: DEFAULT_PAGE_SIZE,
        total: 0
      },
      loading: false,
      columns: COLUMNS,
      tags: [],
      label: ''
    }
  },
  methods: {
    handleClearTagSelect() {
      this.label = ''
    },
    async getAllLabels() {
      try {
        const tags = await getGithubContent(
          'https://api.github.com/repos/azl397985856/leetcode/labels'
        )
        this.tags = tags
      } catch (error) {
        console.log(error)
        this.showError()
      }
    },
    showError() {
      this.hasError = true
      setTimeout(() => {
        this.hasError = false
      }, 5000)
    },
    assignTagColor: function(str) {
      switch (str) {
        case 'Daily Question':
          return 'volcano'
        case 'Easy':
          return 'green'
        case 'LeetCode':
          return 'purple'
        case 'Medium':
          return 'cyan'
        case 'Hard':
          return 'brown'
        default:
          return '#bbb'
      }
    },
    handleInputChange(e) {
      this.keyword = e.target.value
    },
    handleTagSelect(e) {
      const {
        target: { innerText }
      } = e
      this.label = innerText
    },
    handleTagClick(e) {
      const {
        target: { innerText }
      } = e
      this.label = innerText
      this.loadData(0, this.label)
    },
    async searchAndUpdate(e) {
      e.preventDefault()
      this.loadData(0, this.label)
    },
    getProblems: async (pageNumber, keyword, label) => {
      const config = {
        params: {
          state: 'all',
          page: pageNumber,
          // eslint-disable-next-line @typescript-eslint/camelcase
          per_page: DEFAULT_PAGE_SIZE
        }
      }
      keyword = keyword ? `+"${keyword}"` : ''
      const url = encodeURI(
        `https://api.github.com/search/issues?q=【每日一题】 ${keyword}${label ||
          ''}+repo:azl397985856/leetcode`
      )
      const result = await getGithubContent(url, config)
      console.log(result)
      const items = result.items
      const totalCount = result.total_count

      return {
        data: items.map(item => {
          return {
            ...item,
            locked: item.title.includes('🔒'),
            titleAndUrl: {
              title: item.title.replace('【每日一题】- ', ''),
              url: item.html_url,
              number: item.number
            }
          }
        }),
        totalCount
      }
    },
    async loadData(current, label) {
      this.loading = true
      try {
        const { data, totalCount } = await this.getProblems(
          current || 0,
          this.keyword,
          label ? `+label:"${label}"` : ''
        )
        this.data = data.map(item => {
          return {
            ...item,
            title: item.title.replace('【每日一题】- ', '')
          }
        })
        this.pagination.total = totalCount
        this.pagination.showTotal = total => `共 ${total} 条`
        this.loading = false
      } catch (error) {
        this.showError()
        // console.error(error.message)

        this.loading = false
      }
    },
    async handleTableChange(pagination) {
      const { current } = pagination
      this.loadData(current, this.label ? this.label : '')
    }
  },
  mounted: async function() {
    // initialize our data
    this.loadData(0, this.label)
    this.getAllLabels()
  }
}
</script>

<style lang="less" scoped>
.ant-tag {
  margin-bottom: 8px;
}
td,
th > div {
  text-align: center;
}
.drown-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  min-width: 240px;
  margin-left: 10px;

  background-color: #e6f7ff;
  border: 1px solid #87e8de;
  border-radius: 4px;
  a {
    font-size: 14px;
    color: #1890ff;
  }
}
.ant-dropdown-link {
  width: 100%;
  color: #fff;
  text-align: center;
  font-weight: 600;
  position: relative;
  i {
    position: absolute;
    right: 10px;
    top: 2px;
  }
}
.ant-dropdown-menu {
  max-height: 300px;
  overflow: auto;
}
i > svg {
  vertical-align: inherit;
}

.max-width-600-center {
  margin: 10px auto;
  max-width: 600px;
}
</style>
