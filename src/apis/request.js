import { message } from 'ant-design-vue'
import axios from 'axios'
import { hostname } from '@/config/index'

const host =
  process.env.NODE_ENV === 'production'
    ? `https://${hostname}`
    : 'http://localhost:3000'
const promisePool = {}
export default function(options) {
  const url = `${host}${options.url}`
  if (url in promisePool) {
    return promisePool[url]
  }
  const p = axios({
    ...options,
    withCredentials: true,
    url
  })
    .then(res => res.data)
    .then(res => {
      if (res.success) return res.data
      throw res
    })
    .catch(err => {
      message.error(err.message || '系统开小差~')
      throw err
    })
  promisePool[url] = p

  return p
}
