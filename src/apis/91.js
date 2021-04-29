import request from './request'

export function getIntroLecture() {
  return request({
    url: '/api/v1/lectures/intro'
  })
}

export function getDailyProblem() {
  return request({
    url: '/api/v1/daily-problem'
  })
}

export function getDailyProblemSolution() {
  return request({
    url: '/api/v1/daily-problem/solution'
  })
}

export function getBasicLecture() {
  return request({
    url: '/api/v1/lectures/basic'
  })
}

export function getTopicLecture() {
  return request({
    url: '/api/v1/lectures/topic'
  })
}

export function getAdvanceLecture() {
  return request({
    url: '/api/v1/lectures/advance'
  })
}

export function getLectureDetails(id) {
  return request({
    url: `/api/v1/lectures/${id}`
  })
}
