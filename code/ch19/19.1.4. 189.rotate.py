class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        n = len(nums)
        offset = k % n
        nums = nums + nums.copy()
        return nums[n - offset : n * 2 - offset]
