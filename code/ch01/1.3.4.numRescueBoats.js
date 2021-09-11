function binarySearch(nums, target) {
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2)
    if (nums[mid] == target) return mid
    if (nums[mid] < target)
      // 搜索区间变为 [mid+1, right]
      left = mid + 1
    if (nums[mid] > target)
      // 搜索区间变为 [left, mid - 1]
      right = mid - 1
  }
  return -1
}
