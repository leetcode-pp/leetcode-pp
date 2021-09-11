/* eslint-disable */
import fs from 'fs'
import path from 'path'

const DIRECTORY = './code'
const dirs = fs
  .readdirSync(path.resolve(process.cwd(), DIRECTORY))
  .filter(d => d.startsWith('ch'))
const nameMapper = {
  '01': '一',
  '02': '二',
  '03': '三',
  '04': '四',
  '05': '五',
  '06': '六',
  '07': '七',
  '08': '八',
  '09': '九',
  '10': '十',
  '11': '十一',
  '12': '十二',
  '13': '十三',
  '14': '十四',
  '15': '十五',
  '16': '十六',
  '17': '十七',
  '18': '十八',
  '19': '十九',
  '20': '二十'
}

const chs = []

for (const dir of dirs) {
  const id = dir.slice(2)
  const name = `第${nameMapper[id]}章`
  const files = fs.readdirSync(
    path.resolve(process.cwd(), `${DIRECTORY}/${dir}`)
  )
  // fs.mkdirSync(`./code/${dir}`, { recursive: true })

  // files.forEach(file => {
  //   fs.writeFileSync(
  //     `./code/${dir}/${file}`,
  //     fs
  //       .readFileSync(
  //         path.resolve(process.cwd(), `${DIRECTORY}/${dir}/${file}`)
  //       )
  //       .toString()
  //   )
  // })
  chs.push({
    id,
    name,
    list: []
  })
  const codesMapper = {}
  for (const filename of files) {
    if (filename === '.DS_Store') continue
    const fullpath = path.resolve(
      process.cwd(),
      `${DIRECTORY}/${dir}/${filename}`
    )
    let parts = filename.split('.')
    let no = '代码'
    let language = ''
    if (filename.includes('_')) {
      // 有可能他的规范是  7.1.1_haming_weight.java
      parts = filename.split('_')
      if (parts.length === 1) {
        // 有可能他是 5.1.4-path-sum-II，我们改成 5.1.4_path-sum-II
        parts = filename.replace(/-/, '_').split('_')
      }

      no += parts[0]
      language = parts[parts.length - 1].split('.')[
        parts[parts.length - 1].split('.').length - 1
      ]
      // 首字母大写
      language = language[0].toUpperCase() + language.slice(1)
    } else {
      if (parts.length < 5) {
        // 有可能他是 5.1.4-path-sum-II，我们改成 5.1.4.path-sum-II
        parts = filename.replace(/-/, '.').split('.')
      }
      no += [parts[0], parts[1], parts[2]].join('.')
      language = parts[parts.length - 1]
      // 首字母大写
      language = language[0].toUpperCase() + language.slice(1)
    }

    const content = `${fs.readFileSync(fullpath)}`
    // const content = ``
    if (!content) continue

    codesMapper[no] = (codesMapper[no] || []).concat({
      language,
      content: content + '\n' // 防止文件里面没换行
    })
  }
  Object.keys(codesMapper).forEach(key => {
    chs[chs.length - 1].list.push({
      title: key,
      codes: codesMapper[key]
    })
  })

  // 重新排序
  chs[chs.length - 1].list.sort((a, b) => {
    const [, a2, a3] = a.title.split('.')
    const [, b2, b3] = b.title.split('.')
    return Number(a2) * 100 + Number(a3) - Number(b2) * 100 - Number(b3)
  })
}

function writeToDisk() {
  const content = `/* eslint-disable */
export default [${chs.map(ch => JSON.stringify(ch))}]
`

  const outputPath = './src/views/Book.js'
  fs.writeFileSync(path.resolve(process.cwd(), outputPath), content)
}

writeToDisk()
