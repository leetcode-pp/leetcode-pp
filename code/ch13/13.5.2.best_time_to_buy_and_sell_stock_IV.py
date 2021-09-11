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
        min_price, dp = [prices[0]] * (k + 1), [0] * (k + 1)
        for i in range(1, len(prices)):
            for j in range(1, k + 1):
                min_price[j] = min(min_price[j], prices[i] - dp[j - 1])
                dp[j] = max(dp[j], prices[i] - min_price[j])
        return dp[k]
