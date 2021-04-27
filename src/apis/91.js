import request from './request'

export function getIntroLecture() {
  return request({
    url: '/api/v1/lectures/intro'
  })
}

export function getBasicLecture() {
  return request({
    url: '/api/v1/lectures/basic'
  })
}

export function getBasicLectureDetails(id) {
  return request({
    url: `/api/v1/lectures/${id}`
  })
}
