import request from './request'
// const host = 'https://a91algo.herokuapp.com'
const host = 'http://localhost:3000'
export function getBasicLecture() {
  return request(`${host}/api/v1/lectures/basic`).then(res => res.data)
}

export function getBasicLectureDetails(id) {
  return request(`${host}/api/v1/lectures/basic/${id}`).then(res => res.data)
}
