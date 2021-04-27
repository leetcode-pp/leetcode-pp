import { message } from 'ant-design-vue'
import axios from 'axios'
// const host = 'https://a91algo.herokuapp.com'
const host = 'http://localhost:3000'
export default function(url, options) {
  return axios(`${host}${url}`, options)
    .then(res => {
      if (res.success) return res.data
      throw res
    })
    .catch(err => {
      message.error(err.message || '系统开小差~')
    })
}
