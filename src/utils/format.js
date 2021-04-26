// 计算出时间戳的具体数据：比如将85400转化为 n天n时n分n秒
export function formateTimeStamp(timeStamp) {
  let day
  let hour
  let min
  let seconds

  day = parseInt(timeStamp / (24 * 60 * 60)) // 计算整数天数
  const afterDay = timeStamp - day * 24 * 60 * 60 // 取得算出天数后剩余的秒数
  hour = parseInt(afterDay / (60 * 60)) // 计算整数小时数
  const afterHour = timeStamp - day * 24 * 60 * 60 - hour * 60 * 60 // 取得算出小时数后剩余的秒数
  min = parseInt(afterHour / 60) // 计算整数分
  seconds = parseInt(timeStamp - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60) // 取得算出分后剩余的秒数

  if (day < 10) {
    day = '0' + day
  }

  if (hour < 10) {
    hour = '0' + hour
  }

  if (min < 10) {
    min = '0' + min
  }

  if (seconds < 10) {
    seconds = '0' + seconds
  }

  const restStamp = {
    day: day,
    hour: hour,
    min: min,
    seconds: seconds
  }
  return restStamp
}
