class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        n = len(nums)
        t = None
        offset = n - k % n  # 右移变左移
        if offset == 0:
            return
        while offset:
            t = nums[0]
            offset -= 1
            for i in range(n - 1):
                nums[i] = nums[i + 1]
            nums[n - 1] = t
