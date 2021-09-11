from typing import List


class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        if len(prices) <= 1:
            return 0
        dp = [0] * (len(prices)+1)
        min_price = prices[0]

        for i in range(1, len(prices)):
            min_price = min(min_price, prices[i] - dp[i - 1])
            dp[i + 1] = max(dp[i], prices[i] - min_price)
        return dp[-1]