const rapidKey =
  process.env.rapidKey || '8be902d767mshf5d232d6b781084p166217jsn382abe83434f'

export function getStorage(k) {
  return new Promise((resolve, reject) => {
    try {
      if (window.chrome && window.chrome.storage) {
        window.chrome.storage.get([k], resolve)
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
      if (window.chrome && window.chrome.storage) {
        window.chrome.storage.sync.set(
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

export function setCloundStorage(content) {
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
      'x-rapidapi-key': rapidKey,
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

export function getCloundStorage(id) {
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
      'x-rapidapi-key': rapidKey,
      'x-rapidapi-host': 'my-store2.p.rapidapi.com'
    }
  })
    .then(res => res.json())
    .then(response => {
      return JSON.parse(response.order.customer).body
    })
}
export function useDatabase(dbName, { fetch }) {
  if (!dbName || typeof dbName !== 'string')
    throw new Error(`dbName should be string, but got ${dbName}`)
  if (!fetch) {
    fetch = window.fetch
  }
  return {
    create(body) {
      return fetch('https://my-store2.p.rapidapi.com/catalog/product', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-key': rapidKey,
          'x-rapidapi-host': 'my-store2.p.rapidapi.com'
        },
        body: JSON.stringify({
          name: '',
          price: 0,
          manufacturer: '',
          category: dbName,
          description: JSON.stringify({ body }),
          tags: ''
        })
      }).then(res => res.json())
    },
    readOne({ id } = {}) {
      if (!id) throw new Error('id must not be empty')
      return fetch(`https://my-store2.p.rapidapi.com/catalog/product/${id}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': rapidKey,
          'x-rapidapi-host': 'my-store2.p.rapidapi.com'
        }
      })
        .then(res => res.json())
        .then(response => {
          return JSON.parse(response.description).body
        })
    },
    read({ skip, limit } = {}) {
      return fetch(
        `https://my-store2.p.rapidapi.com/catalog/category/${dbName}/products?skip=${skip ||
          0}&limit=${limit || 10}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': rapidKey,
            'x-rapidapi-host': 'my-store2.p.rapidapi.com'
          }
        }
      )
        .then(res => res.json())
        .then(res => {
          return Promise.all(res.products.map(this.readOne))
        })
    },
    delete(id) {
      return fetch(`https://my-store2.p.rapidapi.com/catalog/product/${id}`, {
        method: 'DELETE',
        headers: {
          'x-rapidapi-key': rapidKey,
          'x-rapidapi-host': 'my-store2.p.rapidapi.com'
        }
      }).then(res => res.json())
    }
  }
}
