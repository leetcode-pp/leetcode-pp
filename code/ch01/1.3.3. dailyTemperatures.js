/**
 * @param {number[]} T
 * @return {number[]}
 */
const dailyTemperatures = function(T) {
  const stack = []
  const ans = []

  for (let i = 0; i < T.length; i++) {
    ans[i] = 0
    while (stack.length !== 0 && T[i] > T[stack[stack.length - 1]]) {
      const peek = stack.pop()
      ans[peek] = i - peek
    }
    stack.push(i)
  }

  return ans
}
