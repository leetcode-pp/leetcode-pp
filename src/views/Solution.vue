<template>
  <div class="wrapper">
    <a-table
      class="table"
      :showHeader="false"
      :columns="columns"
      :rowKey="record => record.title"
      :dataSource="staticData"
      :pagination="pagination"
      :loading="loading"
      :customRow="handleClick"
    >
      <template slot="Title" slot-scope="text, record">
        <span :class="['row', { 'icon-new': record.isNew }]">{{
          record.title
        }}</span>
      </template>
    </a-table>
  </div>
</template>
<script>
// const - Column names for the table header
const COLUMNS = [
  {
    title: '标题',
    dataIndex: 'title',
    width: '30%',
    scopedSlots: { customRender: 'Title' }
  }
]

const DEFAULT_PAGE_SIZE = 20

// 仓库地址
const WAREHOURSE_ADDRESS =
  'https://api.github.com/repos/azl397985856/leetcode/contents'

// 仓库内专题的静态数据
import STATIC_DATA from './SolutionStaticData'

export default {
  data() {
    return {
      staticData: STATIC_DATA,
      pagination: {
        defaultPageSize: DEFAULT_PAGE_SIZE,
        total: 0
      },
      loading: false,
      columns: COLUMNS
    }
  },
  methods: {
    handleClick(record) {
      return {
        on: {
          click: () => {
            this.$router.push({
              path: 'solutionDetail',
              query: {
                url: WAREHOURSE_ADDRESS + record.url,
                type: 1
              }
            })
          }
        }
      }
    }
  }
}
</script>

<style scoped>
/deep/ .table {
  width: 90%;
  max-width: 1280px;
  margin: 10px auto;
  box-sizing: content-box;
}

.row {
  color: #1890ff;
}

.icon-new {
  position: relative;
}
.icon-new::after {
  content: 'new';
  position: absolute;
  top: -12px;
  right: -24px;
  font-size: 12px;
  font-weight: bold;
  color: red;
}
</style>
