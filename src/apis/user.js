import request from './request'
export function logout() {
  return request({
    url: '/api/v1/user/logout'
  })
}
