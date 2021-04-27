import request from './request'

export function getBasicLecture() {
  return request({
    url: '/api/v1/lectures/basic'
  }).then(res => res.data)
}

export function getBasicLectureDetails(id) {
  return request({
    url: '/api/v1/lectures/basic/${id}'
  }).then(res => res.data)
}
