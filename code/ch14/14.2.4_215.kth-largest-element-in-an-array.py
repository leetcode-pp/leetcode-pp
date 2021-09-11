from typing import List
import random


class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        return self.select(nums, 0, len(nums) - 1, len(nums) - k)

    def select(self, nums: List[int], left: int, right: int, k_smallest: int) -> int:
        if left == right:
            # 如果只有一个元素，则最左边的元素即是答案
            return nums[left]
        # 随机获取一个 [left, right] 范围的整数
        pivot_index = random.randint(left, right)
        # 根据 pivot = nums[pivot_index] 进行划分，得到新的 pivot_index，此时 pivot_index 左边的都小于等于 pivot，右边的都大于等于 pivot
        pivot_index = self.partition(nums, left, right, pivot_index)
        if k_smallest == pivot_index:
            # 如果此时 N - K == pivot_index，表示我们已经找到第 N-K+1 小元素，即第 K 大元素。这也就是我们前面所说的可以直接解决的子问题
            return nums[k_smallest]
        elif k_smallest < pivot_index:
            return self.select(nums, left, pivot_index - 1, k_smallest)
        else:
            return self.select(nums, pivot_index + 1, right, k_smallest)

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
