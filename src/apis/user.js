import request from './request'
export function logout() {
  return request({
    url: '/api/v1/user/logout'
  })
}

export function getUserInfo(code) {
  return request({
    url: `/api/v1/user?code=${code || ''}`
  }).then(r => {
    window.sessionStorage.setItem('token', r.token)
    return r
  })
}
