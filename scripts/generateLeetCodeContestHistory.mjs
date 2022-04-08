import * as A from '../src/views/91/contest.js'
import axios from 'axios'
import fs from 'fs'
const TIMEOUT = 30 * 1000

const { getAllContext } = A

function sleep(ms) {
    return new Promise(r => {
        setTimeout(r, ms)
    })
}

async function getByPageNo(id, pageNo) {
    const url = `https://leetcode.com/contest/api/ranking/weekly-contest-${id}/?pagination=${pageNo}`
    // await sleep(500)
    return axios.get(url).then(res => res.data).then(async (res) => {
        if (!res.total_rank || res.total_rank.length == 0) {
            return []
        }
        console.log(`process pageNo: ${pageNo} with count ${res.total_rank.length}`)
        // return res.total_rank.concat(await getByPageNo(id, pageNo + 1))
        weekly.push(res.total_rank)
        getByPageNo(id, pageNo + 1)
    })
}
let weekly = []
async function start() {
    const { contests } = getAllContext(new Date('2022-04-03T10:30:00.000+08:00').getTime(), 287, new Date('2022-06-30T10:30:00.000+08:00').getTime())
    const ans = JSON.parse(fs.readFileSync("src/views/91/db/contest.json", { encoding: 'utf8' }))
    for (const contest of contests) {
        if (contest.passed == false) {
            fs.writeFileSync("src/views/91/db/upcommingContest.json", JSON.stringify(contest))
            break
        }
        const fp = `src/views/91/db/weekly-${contest.id}.json`
        try {
            weekly = JSON.parse(fs.readFileSync(fp, { encoding: 'utf8' }))
        } catch (e) { }
        // 断点续下载
        const ranks = await Promise.race([getByPageNo(contest.id, Math.floor(weekly.length / 25) + 1), sleep(TIMEOUT)])
        // weekly = weekly.concat(ranks)
        fs.writeFileSync(fp, JSON.stringify(weekly))
        for (const rank of weekly) {
            // 664 是 weekly-287 
            const username = rank.username
            if (!(username in ans)) {
                ans[rank.username] = [
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                ]
            }
            ans[rank.username][rank.contest_id - 377 - contests[0].id] = rank
        }
    }
    return ans

}
const a = await start();
fs.writeFileSync("src/views/91/db/contest.json", JSON.stringify(a))
