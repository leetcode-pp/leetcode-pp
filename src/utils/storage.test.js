import { useDatabase } from './storage.js'
import fetch from 'node-fetch'

const users = useDatabase('91algo4-users', {
  fetch
})

// users
//   .create({
//     name: 'lucky',
//     blog: 'https://lucifer.ren/blog',
//     createTime: new Date().getTime()
//   })
//   .then(console.log)

users.read().then(console.log)
