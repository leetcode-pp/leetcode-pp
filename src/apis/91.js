import request from './request'

export function getIntroLecture() {
  return request({
    url: '/api/v1/lectures/intro'
  })
}

export function getDailyProblem(timestamp) {
  return request({
    url: `/api/v1/daily-problem?date=${timestamp || ''}`
  })
}

export function getDailyProblemSolution(day) {
  return request({
    url: `/api/v1/daily-problem/solution?day=${day}`
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

export function getMySolutions() {
  return request({
    url: '/api/v1/my/solutions'
  })
}
