/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const n = nums.length
    const mapper = {}
    for(let i = 0;i < n;i++) {
        if (mapper[target - nums[i]] !== void 0) return [mapper[target - nums[i]], i]
        mapper[nums[i]] = i
    }
    return []
};