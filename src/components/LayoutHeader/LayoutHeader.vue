<template>
  <div class="header w-1280">
    <a-row class="nav-row" type="flex" justify="space-between" align="middle">
      <a-col :span="4">
        <div class="logo-area">
          <!-- <router-link to="/">
            <img src="../../assets/logo.png" alt="力扣加加" />
          </router-link> -->
        </div>
      </a-col>
      <a-col :span="20">
        <a-menu key="solution" v-model="current" mode="horizontal">
          <a-menu-item key="home">
            <router-link to="/" class="nav-font">首页</router-link>
          </a-menu-item>
          <a-menu-item key="solution">
            <router-link to="/solution" class="nav-font">专题</router-link>
          </a-menu-item>
          <a-menu-item key="everyday">
            <router-link to="/everyday" class="nav-font">每日一题</router-link>
          </a-menu-item>
          <a-menu-item key="download">
            <router-link to="/download" class="nav-font">下载专区</router-link>
          </a-menu-item>
          <a-menu-item key="video">
            <router-link to="/video" class="nav-font">视频专区</router-link>
          </a-menu-item>
          <a-menu-item key="91">
            <router-link to="/91" class="nav-font icon-new"
              >91算法(第五期)</router-link
            >
          </a-menu-item>
          <a-menu-item key="github">
            <router-link to="/github" class="nav-font">
              Github Reader</router-link
            >
          </a-menu-item>
          <a-menu-item key="solution-code">
            <router-link to="/solution-code" class="nav-font"
              >题解配套代码</router-link
            >
          </a-menu-item>
        </a-menu>
      </a-col>
    </a-row>
    <!-- <dark-mode-toggle /> -->
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      current: []
    }
  },
  created() {
    if (this.$route.path === '/' || this.$route.path === '') {
      this.current = ['home']
    } else {
      const key = this.$route.path.replace('/', '')
      this.current = [key]
    }
  },
  computed: {},
  methods: {}
}
</script>
<style lang="less" scoped>
.w-1280 {
  width: 1280px;
}
.header {
  height: 100%;
  .logo-area {
    width: 46px;
    height: 46px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .icon-new::after {
    content: 'new';
    position: absolute;
    top: -16px;
    right: -8px;
    font-size: 14px;
    font-weight: bold;
    color: red;
  }
  /deep/ .ant-switch {
    position: absolute;
    right: 100px;
    z-index: 999;
  }
}
</style>
