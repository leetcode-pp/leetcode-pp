from typing import List


class Solution:
    def rob(self, nums: List[int]) -> int:
        memo = [-1 for x in range(len(nums) + 1)]
        memo[-1] = 0

        return self.helper(0, nums, memo)

    def helper(self, n: int, nums: List[int], memo: List[int]) -> int:
        if n >= len(nums):
            return 0
        if memo[n] != -1:
            return memo[n]

        memo[n] = max(
            self.helper(n + 1, nums, memo), self.helper(n + 2, nums, memo) + nums[n],
        )
        return memo[n]
