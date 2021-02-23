<template>
  <div class="footer-container">
    <div class="footer-upper">
      <div class="icon-wrapper">
        <a
          href="https://www.zhihu.com/people/lu-xiao-13-70"
          target="_blank"
          rel="noreferrer"
        >
          <img src="../../assets/zhihu.png" alt="zhihu" />
        </a>
      </div>
      <div class="icon-wrapper">
        <a
          href="https://github.com/azl397985856"
          target="_blank"
          rel="noreferrer"
        >
          <img src="../../assets/github.png" alt="github" />
        </a>
      </div>
      <div class="icon-wrapper">
        <a @click="showModal" data-id="wechat">
          <img src="../../assets/wechat.png" alt="wechat" />
        </a>
      </div>
      <div class="icon-wrapper">
        <a @click="showModal" data-id="officialAccount">
          <img src="../../assets/official_account.png" alt="official account" />
        </a>
      </div>
    </div>
    <div class="footer-lower">
      © 2020 lucifer. 保留所有权利
    </div>
    <a-modal
      :width="400"
      :title="modalInfo ? modalInfo.title : ''"
      :visible="visible"
      @cancel="closeModal"
      :footer="null"
    >
      <div class="code-container">
        <img
          :src="modalInfo ? modalInfo.image : ''"
          :alt="modalInfo ? modalInfo.title : ''"
        />
      </div>
    </a-modal>
  </div>
</template>

<script>
const modalData = {
  wechat: {
    title: '微信号',
    image: require('../../assets/wechat_QR_code.jpg')
  },
  officialAccount: {
    title: '公众号',
    image: require('../../assets/official_account_QR_code.jpg')
  }
}
export default {
  components: {},
  props: {},
  data() {
    return {
      visible: false,
      modalInfo: null
    }
  },
  watch: {},
  computed: {},
  methods: {
    closeModal() {
      this.visible = false
      this.modalInfo = null
    },
    showModal(e) {
      const modalId = e.currentTarget.dataset.id
      this.modalInfo = modalData[modalId]
      this.visible = true
    }
  }
}
</script>

<style lang="less" scoped>
img {
  width: 100%;
}
.footer-container {
  .footer-upper {
    max-width: 240px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .icon-wrapper {
      width: 16px;
    }
  }
  .footer-lower {
    font-size: 12px;
    margin-top: 7px;
    color: #999;
    font-family: Arial, Helvetica, sans-serif;
  }
}
.code-container {
  max-width: 240px;
  margin: 0 auto;
}
</style>
