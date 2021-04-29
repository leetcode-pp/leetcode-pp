export function getStorage(k) {
  return new Promise((resolve, reject) => {
    try {
      // eslint-disable-next-line
      if (chrome.storage) {
        // eslint-disable-next-line
        chrome.storage.get([k], resolve)
      } else if (localStorage) {
        resolve({
          result: {
            value: JSON.parse(localStorage.getItem(k))
          }
        })
      } else {
        reject('未知错误')
      }
    } catch (err) {
      reject(err)
    }
  })
}

export function setStorage(k, v) {
  return new Promise((resolve, reject) => {
    try {
      // eslint-disable-next-line
      if (chrome.storage) {
        // eslint-disable-next-line
        chrome.storage.sync.set(
          {
            [k]: v
          },
          resolve
        )
      } else if (localStorage) {
        localStorage.setItem(k, JSON.stringify(v))
        resolve()
      } else {
        reject('您可能禁用了存储功能~')
      }
    } catch (err) {
      console.log(err, k, v)
      reject('当前没有存储权限，或者存储已达到上限~')
    }
  })
}

export function setCloundStorage(content, { token }) {
  // return fetch("https://api.github.com/repos/azl397985856/stash/issues", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `token ${token}`,
  //   },
  //   body: JSON.stringify(content),
  // })
  //   .then((res) => res.json())
  //   .then((res) => {
  //     return {
  //       ...res,
  //       id: res.number,
  //     };
  //   });
  return fetch('https://my-store2.p.rapidapi.com/order/new', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rapidapi-key': '8be902d767mshf5d232d6b781084p166217jsn382abe83434f',
      'x-rapidapi-host': 'my-store2.p.rapidapi.com'
    },
    body: JSON.stringify({
      customer: JSON.stringify({
        body: content
      }),
      address: ''
    })
  }).then(res => res.json())
}

export function getCloundStorage(id, { token }) {
  // return fetch(
  //   `https://api.github.com/repos/azl397985856/stash/issues/${id}`,
  //   {
  //     headers: {
  //       accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: `token ${token}`,
  //     },
  //   }
  // )
  //   .then((res) => res.json())
  //   .then((res) => JSON.parse(res.body));
  return fetch(`https://my-store2.p.rapidapi.com/order/${id}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '7ff25b0080msh1ceb86e07b1e8dap16725fjsn940e2fa29e24',
      'x-rapidapi-host': 'my-store2.p.rapidapi.com'
    }
  })
    .then(res => res.json())
    .then(response => {
      return JSON.parse(response.order.customer).body
    })
}
