module.exports = {
  getAllContext(startTime, startId, endTime) {
    const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000
    let currentTime = startTime
    const contests = []
    let upcomingContest = null
    let i = 0
    while (currentTime <= endTime + MS_PER_WEEK) {
      contests.push({
        id: startId + i,
        time: currentTime,
        passed: currentTime <= new Date().getTime()
      })
      if (currentTime > new Date().getTime() && !upcomingContest) {
        upcomingContest = contests[contests.length - 1]
      }
      i += 1
      currentTime += MS_PER_WEEK
    }
    return {
      contests,
      upcomingContest
    }
  }
}

// getAllContext(new Date('2022-04-03T10:30:00.000+08:00').getTime(), 287, new Date('2022-06-30T10:30:00.000+08:00').getTime())
