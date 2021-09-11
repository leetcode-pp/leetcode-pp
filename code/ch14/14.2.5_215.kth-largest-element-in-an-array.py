from typing import List
import random


class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        return self.select(nums, 0, len(nums) - 1, len(nums) - k)

    def select(self, nums: List[int], left: int, right: int, k_smallest: int) -> int:
        while left < right:
            pivot_index = random.randint(left, right)
            pivot_index = self.partition(nums, left, right, pivot_index)
            if k_smallest == pivot_index:
                return nums[k_smallest]
            elif k_smallest < pivot_index:
                right = pivot_index - 1
            else:
                left = pivot_index + 1

        if left == right:
            return nums[left]

    def partition(self, nums: List[int], left: int, right: int, pivot_index: int):
        i = left
        j = right + 1
        pivot = nums[pivot_index]
        nums[pivot_index], nums[left] = nums[left], nums[pivot_index]

        while True:
            while True:
                i += 1
                if i == right or nums[i] >= pivot:
                    break
            while True:
                j -= 1
                if j == left or nums[j] <= pivot:
                    break
            if i >= j:
                break
            nums[i], nums[j] = nums[j], nums[i]
        nums[left], nums[j] = nums[j], nums[left]
        return j
