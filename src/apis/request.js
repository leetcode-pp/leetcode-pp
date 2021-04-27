import { message } from 'ant-design-vue'
import axios from 'axios'
const host =
  process.env.NODE_ENV === 'production'
    ? 'https://a91algo.herokuapp.com'
    : 'http://localhost:3000'
export default function(options) {
  return axios({ ...options, url: `${host}${options.url}` })
    .then(res => {
      if (res.success) return res.data
      throw res
    })
    .catch(err => {
      message.error(err.message || '系统开小差~')
    })
}
