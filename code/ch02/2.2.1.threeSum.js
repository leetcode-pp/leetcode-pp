/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function(nums) {
  const n = nums.length
  nums.sort((a, b) => a - b)
  const res = []

  for (let i = 0; i < n - 2; i++) {
    if (i > 0 && nums[i] == nums[i - 1]) continue
    let l = i + 1
    let r = n - 1
    while (l < r) {
      if (nums[i] + nums[l] + nums[r] < 0) {
        l += 1
      } else if (nums[i] + nums[l] + nums[r] > 0) {
        r -= 1
      } else {
        res.push([nums[i], nums[l], nums[r]])
        while (l < r && nums[l] == nums[l + 1]) {
          l += 1
        }
        while (l < r && nums[r] == nums[r - 1]) {
          r -= 1
        }
        l += 1
        r -= 1
      }
    }
  }
  return res
}
