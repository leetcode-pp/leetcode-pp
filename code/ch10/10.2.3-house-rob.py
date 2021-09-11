from typing import List


class Solution:
    def rob(self, nums: List[int]) -> int:
        if not nums:
            return 0
        memo = [0 for x in range(len(nums) + 1)]
        memo[-2] = nums[-1]

        for i in range(len(nums) - 2, -1, -1):
            memo[i] = max(memo[i + 1], memo[i + 2] + nums[i])

        return memo[0]
