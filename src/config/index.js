const startTime = new Date('2021-05-10T00:00:00.000+08:00')
module.exports = {
  startTime: startTime.getTime(),
  clientId: 'c16b80e7b58a5a007157',
  originalHostname: 'leetcode-solution.cn',
  // hostname: 'algo91.herokuapp.com',
  hostname: 'algo91-4.herokuapp.com',
  // hostname: 'a91algo.herokuapp.com',
  leetcodeConfig: {
    _91UsernameLsName: 'login', // 在91网站中存lc用户名的 localStorage 的键名
    _91PwdLsName: 'password', // 在91网站中存lc密码的 localStorage 的键名
    lcSeesionCookieName: 'LEETCODE_SESSION', // lc存seesionid的 cookie键名
    lcCsrftokenCookieName: 'csrftoken' // lc存csrf的 cookie键名
  }
}
