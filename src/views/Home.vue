<template>
  <div class="container">
    <div class="banner-wrapper">
      <div class="banner-title-wrapper">
        <div class="title-line-wrapper">
          <div class="title-line"></div>
        </div>
        <h1>
          力扣加加
        </h1>
        <p>
          <span>努力做西湖区最好的算法题解</span>
        </p>
        <div class="button-wrapper">
          <a href="https://lucifer.ren/blog/"
            ><a-button type="primary" style="margin: 0px 16px 0 0;">
              博客
            </a-button></a
          >
          <a href="https://github.com/azl397985856/leetcode"
            ><a-button style="margin: 0px 16px;">
              点个star
            </a-button></a
          >
        </div>
      </div>
      <div class="banner-image-wrapper">
        <a-carousel :autoplay="true" :dots="false">
          <div>
            <img
              src="http://ww1.sinaimg.cn/large/0085d5ZVly1gdrfvhxmzfj318x0lcdgq.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              src="http://ww1.sinaimg.cn/large/0085d5ZVgy1gdrfxn8o0kj31890irq4z.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              src="http://ww1.sinaimg.cn/large/0085d5ZVgy1gdrfxyngmtj31570n8gxv.jpg"
              alt=""
            />
          </div>
        </a-carousel>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.banner-wrapper {
  height: 526px;
  width: 100%;
  max-width: 1500px;
  margin: auto;
  position: relative;
  .banner-title-wrapper {
    width: 40%;
    max-width: 480px;
    height: 245px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 8%;
    margin: auto;
    z-index: 1;
    text-align: left;
    h1 {
      font-family: Futura, Helvetica Neue For Number, -apple-system,
        BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC, Hiragino Sans GB,
        Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
      font-size: 54px;
      margin: 12px 0;
    }
    p {
      font-size: 20px;
    }
    .button-wrapper {
      margin-top: 64px;
      line-height: 40px;
      align-items: center;
      display: flex;
      a {
        transition: color 0.3s ease;
        .ant-btn {
          min-width: 110px;
          height: 40px;
          line-height: 40px;
          border-radius: 20px;
          font-size: 16px;
        }
      }
    }
  }
  .banner-image-wrapper {
    width: 45%;
    max-width: 598px;
    height: 324px;
    position: absolute;
    right: 8%;
    margin: auto;
    top: 0;
    bottom: 0;
    img {
      height: 324px;
    }
  }
}
</style>
