import request from './request'

export function getBasicLecture() {
  return request({
    url: '/api/v1/lectures/basic'
  })
}

export function getBasicLectureDetails(id) {
  return request({
    url: `/api/v1/lectures/basic/${id}`
  })
}
