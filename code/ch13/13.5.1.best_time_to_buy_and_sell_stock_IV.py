from typing import List


class Solution:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        if len(prices) <= 1:
            return 0
        if k > len(prices) / 2 + 1:
            max_profit = 0
            for i in range(1, len(prices)):
                if prices[i] - prices[i - 1] > 0:
                    max_profit += prices[i] - prices[i - 1]
            return max_profit
        dp = []
        for i in range(0, k + 1):
            dp.append([0] * len(prices))
        for i in range(1, k + 1):
            min_price = prices[0]
            for j in range(1, len(prices)):
                min_price = min(min_price, prices[j] - dp[i - 1][j - 1])
                dp[i][j] = max(dp[i][j - 1], prices[j] - min_price)
        return dp[-1][-1]
