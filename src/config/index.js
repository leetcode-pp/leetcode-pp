const startTime = new Date('2022-04-01T00:00:00.000+08:00')
const hostnamePool = [
  // 'algo91-4.herokuapp.com',
  // 'algo-6.herokuapp.com' // cpv3kbrhw
  // 'algo-5.herokuapp.com' // fe_lucife  @ sina
  // 'algo91.herokuapp.com' // fe-lucifer
  // 'a91algo.herokuapp.com' // azl
  'leetcode-pp.herokuapp.com' // azl
  // 'localhost'
  // 'algo91bak1.herokuapp.com' // fe_lucifer @ firefox
]
const hostname =
  hostnamePool[
    new Date(new Date().toLocaleString('en-US')).getDate() % hostnamePool.length
  ]
const season = '7'
module.exports = {
  startTime: startTime.getTime(),
  clientId: 'c16b80e7b58a5a007157',
  originalHostname: 'leetcode-solution.cn',
  hostname,
  hostnamePool,
  season,
  DAILY_CHECK_REPO: `91alg-${season}-daily-check`, // The repository of store comments,
  DAILY_CHECK_OWNER: 'leetcode-pp'
  // leetcodeConfig: {
  //   _91UsernameLsName: 'login', // 在91网站中存lc用户名的 localStorage 的键名
  //   _91PwdLsName: 'password', // 在91网站中存lc密码的 localStorage 的键名
  //   lcSeesionCookieName: 'LEETCODE_SESSION', // lc存seesionid的 cookie键名
  //   lcCsrftokenCookieName: 'csrftoken' // lc存csrf的 cookie键名
  // }
}
