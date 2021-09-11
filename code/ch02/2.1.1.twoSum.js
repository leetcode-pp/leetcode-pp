/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  const n = nums.length;
  nums.sort((a, b) => a - b);
  let l = 0;
  let r = n - 1;
  while (l < r) {
    if (nums[l] + nums[r] < target) {
      l += 1;
    } else if (nums[l] + nums[r] > target) {
      r -= 1;
    } else {
      return [l, r];
    }
  }
  return [];
};
