class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        n = len(nums)
        maxSum = float("-inf")
        total = 0
        for i in range(n):
            total = 0
            for j in range(i, n):
                total += nums[j]
                maxSum = max(maxSum, total)

        return maxSum
