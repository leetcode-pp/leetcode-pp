from typing import List


class Solution:
    def PredictTheWinner(self, nums: List[int]) -> bool:
        sum = 0
        for i in nums:
            sum += i
        mem = []
        for i in range(len(nums)):
            mem.append([0] * len(nums))

        return 2 * self.find_max(0, len(nums) - 1, nums, mem) >= sum

    def find_max(
        self, left: int, right: int, nums: List[int], mem: List[List[int]]
    ) -> int:
        if left < 0 or right < 0 or left > right:
            return 0
        if mem[left][right] != 0:
            return mem[left][right]
        if left == right:
            mem[left][right] = nums[left]
            return nums[left]
        max_num = max(
            nums[left]
            + min(
                self.find_max(left + 2, right, nums, mem),
                self.find_max(left + 1, right - 1, nums, mem),
            ),
            nums[right]
            + min(
                self.find_max(left + 1, right - 1, nums, mem),
                self.find_max(left, right - 2, nums, mem),
            ),  # black formatter added trailing comma
        )
        mem[left][right] = max_num
        return max_num
