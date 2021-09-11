class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        copy = nums.copy()
        n = len(nums)
        if k % n == 0:
            return

        for i in range(n):
            nums[(k + i) % n] = copy[i]
