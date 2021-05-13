<template>
  <div class="container">
    <div class="info">
      使用方法：输入 Github 的 URL 地址，点击前往阅读即可。<b
        >需要注意的是地址需要是使用 MD 格式编写的哦 ~</b
      >

      <div>
        比如：
        <span>
          https://github.com/azl397985856/leetcode/blob/master/thinkings/binary-search-1.md
        </span>
        或者
        <span>
          https://github.com/azl397985856/leetcode
        </span>
      </div>
    </div>
    <a-input
      style="width: auto; flex: 1;"
      :value="keyword"
      @input="handleInputChange"
      type="text"
      placeholder="请输入 Markdown 的 Github 地址"
    />

    <a-button
      v-show="dest"
      type="link"
      :href="`/solutionDetail?type=1&url=${dest}`"
      target="_blank"
      >前往阅读</a-button
    >

    <div class="footer">
      大家可以根据自己的喜好挑选自己的主题，目前内置了几种，后续考虑增加更多主题~
    </div>
  </div>
</template>

<script>
const getURL = ({ owner, repo, path }) =>
  `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
function getOwnerAndRepo(url) {
  if (!url) return {}
  const parts = url.split('/')
  if (!parts || parts[2] !== 'github.com')
    throw new Error('NO_GITHUB', '目前仅支持 github 地址')
  if (!parts[3] || !parts[4])
    throw new Error(
      'URL_INVALID',
      '链接非法，合法的链接示例：https://github.com/azl397985856/leetcode/blob/master/thinkings/binary-search-1.md'
    )
  return {
    owner: parts[3],
    repo: parts[4],
    path: parts[7] ? parts.slice(7).join('/') : '/README.md'
  }
}
export default {
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    handleInputChange(e) {
      this.keyword = e.target.value
    }
  },
  computed: {
    dest() {
      const { owner, repo, path } = getOwnerAndRepo(this.keyword)
      return getURL({ owner, repo, path })
    }
  }
}
</script>

<style lang="less" scoped>
.info {
  margin: 0 0 50px 0;
}
.footer {
  margin: 50px 0;
}
</style>
