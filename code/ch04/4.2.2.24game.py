from typing import List


class Solution:
    def judgePoint24(self, nums: List[int]) -> bool:
        return self.compute([float(i) for i in nums], 4)

    def compute(self, nums: List[int], n: int) -> bool:
        if n == 1:
            return abs(nums[0] - 24) < 0.000001
        new_nums = [0] * 4

        for left in range(n - 1):
            for right in range(left + 1, n):
                index = 0
                for i in range(n):
                    if i != left and i != right:
                        new_nums[index] = nums[i]
                        index += 1

                new_nums[index] = nums[left] + nums[right]
                if self.compute(new_nums, index + 1):
                    return True
                new_nums[index] = nums[left] - nums[right]
                if self.compute(new_nums, index + 1):
                    return True
                new_nums[index] = nums[right] - nums[left]
                if self.compute(new_nums, index + 1):
                    return True
                new_nums[index] = nums[right] * nums[left]
                if self.compute(new_nums, index + 1):
                    return True
                if nums[left] != 0:
                    new_nums[index] = nums[right] / nums[left]
                    if self.compute(new_nums, index + 1):
                        return True
                if nums[right] != 0:
                    new_nums[index] = nums[left] / nums[right]
                    if self.compute(new_nums, index + 1):
                        return True
        return False
