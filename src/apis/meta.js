import request from './request'

export function getMeta() {
  return request({ url: '/api/v1/meta' })
}
