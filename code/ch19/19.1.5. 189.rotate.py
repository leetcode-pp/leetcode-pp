class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        # 首尾交换法
        def reverse(list: List[int], start: int, end: int) -> None:
            while start < end:
                t = list[start]
                list[start] = list[end]
                list[end] = t
                start += 1
                end -= 1

        n = len(nums)
        offset = k % n
        if offset == 0:
            return
        reverse(nums, 0, n - offset - 1)
        reverse(nums, n - offset, n - 1)
        reverse(nums, 0, n - 1)
