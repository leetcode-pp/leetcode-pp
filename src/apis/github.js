import request from './request'

export function getGithubContent(url, config = {}) {
  return request({
    url: '/api/v1/github/content',
    params: {
      url,
      ...config.params
    }
  })
}

export function getCommentApp() {
  return request({
    url: '/api/v1/github/comment-app'
  })
}
