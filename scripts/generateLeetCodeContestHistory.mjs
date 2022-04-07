import * as A from '../src/views/91/contest.js'
import axios from 'axios'
import fs from 'fs'

const { getAllContext } = A

async function getByPageNo(id, pageNo) {
    console.log('first page', id, pageNo)
    // if (pageNo === 2) return []
    const url = `https://leetcode.com/contest/api/ranking/weekly-contest-${id}/?pagination=${pageNo}`
    return await axios.get(url).then(res => res.data).then(async (res) => {
        if (!res.total_rank || res.total_rank.length == 0) {
            return []
        }
        return res.total_rank.concat(await getByPageNo(id, pageNo + 1))
    })
}

async function start() {
    const { contests } = getAllContext(new Date('2022-04-03T10:30:00.000+08:00').getTime(), 287, new Date('2022-06-30T10:30:00.000+08:00').getTime())
    const ans = JSON.parse(fs.readFileSync("src/views/91/db/contest.json", { encoding: 'utf8' }))
    for (const contest of contests) {
        if (contest.passed == false) {
            fs.writeFileSync("src/views/91/db/upcommingContest.json", JSON.stringify(contest))
            break
        }
        const ranks = await getByPageNo(contest.id, 100)
        for (const rank of ranks) {
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
