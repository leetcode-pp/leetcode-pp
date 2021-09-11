from typing import List


class Solution:
    def rob(self, nums: List[int]) -> int:

        prev = 0
        curr = 0

        for i in range(len(nums) - 1, -1, -1):
            temp = curr
            curr = max(curr, nums[i] + prev)
            prev = temp

        return curr
