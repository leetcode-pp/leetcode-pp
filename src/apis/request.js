import { message } from 'ant-design-vue'
import axios from 'axios'
import { hostname } from '@/config/index'

const host =
  process.env.NODE_ENV === 'production'
    ? `https://${hostname}`
    : 'http://localhost:3000'
const promisePool = {}
export default function(options = {}) {
  const url = `${host}${options.url}`
  const can = !options.method || options.method.toUpperCase() === 'GET'
  let k = ''
  if (can) {
    k = `${url}-${JSON.stringify(options.params)}`
    if (k in promisePool) {
      return promisePool[k]
    }
  }
  const originalHeaders = options.headers || {}

  const p = axios({
    ...options,
    headers: {
      ...originalHeaders,
      token: window.sessionStorage.getItem('token')
    },
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
  if (can) {
    promisePool[k] = p
  }

  return p
}
