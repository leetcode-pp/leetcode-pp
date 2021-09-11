from typing import List


class Solution:
    def rob(self, nums: List[int]) -> int:
        if len(nums) <= 0:
            return 0
        return max(self.rob(nums[1:]), nums[0] + self.rob(nums[2:]))
