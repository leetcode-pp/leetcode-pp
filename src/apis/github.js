import request from './request'

export function getGithubContent(url) {
  return request({
    url: '/api/v1/github/content',
    params: {
      url
    }
  })
}
