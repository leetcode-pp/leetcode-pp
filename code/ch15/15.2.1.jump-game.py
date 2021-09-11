class Solution:
    def canJump(self, nums: List[int]) -> bool:
        dp = [False] * len(nums)
        dp[0] = True
        for i in range(1, len(nums)):
            for j in range(0, i):
                if j + nums[j] >= i:
                    dp[i] = dp[i] | dp[j]
        return dp[len(nums) - 1]
