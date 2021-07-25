const startTime = new Date('2021-05-10T00:00:00.000+08:00')
const hostnamePool = [
  // 'algo91-4.herokuapp.com', 这个月用完了，暂时移除，防止自动路由到之后报错。2021-07-25
  'algo91.herokuapp.com',
  'a91algo.herokuapp.com'
  // 'localhost'
]
function getHostNamebyDate() {
  return hostnamePool[new Date().getDate() % hostnamePool.length]
}
module.exports = {
  startTime: startTime.getTime(),
  clientId: 'c16b80e7b58a5a007157',
  originalHostname: 'leetcode-solution.cn',
  hostname: getHostNamebyDate(),
  hostnamePool,
  leetcodeConfig: {
    _91UsernameLsName: 'login', // 在91网站中存lc用户名的 localStorage 的键名
    _91PwdLsName: 'password', // 在91网站中存lc密码的 localStorage 的键名
    lcSeesionCookieName: 'LEETCODE_SESSION', // lc存seesionid的 cookie键名
    lcCsrftokenCookieName: 'csrftoken' // lc存csrf的 cookie键名
  }
}
