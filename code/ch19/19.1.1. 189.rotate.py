class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        copy = nums.copy()
        n = len(nums)

        for i in range(n):
            nums[(k + i) % n] = copy[i]
