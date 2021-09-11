from typing import List


class Solution:
    def rob(self, nums: List[int]) -> int:
        if len(nums) == 1:
            return nums[0]
        prev = 0
        curr = 0

        for i in range(len(nums) - 1):
            temp = curr
            curr = max(curr, nums[i] + prev)
            prev = temp

        res = curr

        prev = 0
        curr = 0

        for i in range(1, len(nums)):
            temp = curr
            curr = max(curr, nums[i] + prev)
            prev = temp

        return max(res, curr)
