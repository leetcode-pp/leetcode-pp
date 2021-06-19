import request from './request'
export function logout() {
  return request({
    url: '/api/v1/user/logout'
  })
}
const TOKEN_PEROID = 30 * 24 * 60 * 60 * 1000
export function getUserInfo(code) {
  return request({
    url: `/api/v1/user?code=${code || ''}`
  }).then(r => {
    window.localStorage.setItem(
      'token',
      JSON.stringify({
        expireAt: new Date().getTime() + TOKEN_PEROID,
        value: r.token
      })
    )
    return r
  })
}
