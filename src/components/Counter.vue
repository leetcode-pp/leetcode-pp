<template>
  <p style="line-height: 1.5rem;" v-html="countTxt"></p>
</template>

<script>
import { formateTimeStamp } from '@/utils/format.js'
export default {
  props: {
    time: { type: [Number] }
  },
  data() {
    return {
      times: {},
      countTxt: ''
    }
  },
  methods: {
    // 获得距离活动开始还剩余的时间
    mistiming() {
      let timeStamp = (this.time - new Date().getTime()) / 1000
      this.times = formateTimeStamp(timeStamp)
      const str = `活动将于 <span class="d">${this.times.day}</span>天<span class="h">${this.times.hour}</span>时<span class="m">${this.times.min}</span>分<span class="s">${this.times.seconds}</span>秒后开启`
      this.countTxt = str
      const TimeDown = setInterval(() => {
        if (timeStamp > 0) {
          timeStamp--
          const newTime = formateTimeStamp(timeStamp)
          const str = `活动将于 <span class="d">${newTime.day}</span>天<span class="h">${newTime.hour}</span>时<span class="m">${newTime.min}</span>分<span class="s">${newTime.seconds}</span>秒后开启`
          this.countTxt = str
        } else {
          this.countTxt = '活动已开始'
          clearInterval(TimeDown)
        }
      }, 1000)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.mistiming()
    })
  }
}
</script>

<style>
.d,
.h,
.m,
.s {
  background: #c71c60;
  color: #fff;
  line-height: 49px;
  font-size: 32px;
  font-family: Arial;
  padding: 0 5px;
  margin: 5px;
  border-radius: 5px;
}
</style>
