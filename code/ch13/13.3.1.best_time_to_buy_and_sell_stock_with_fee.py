from typing import List


class Solution:
    def maxProfit(self, prices: List[int], fee: int) -> int:
        if len(prices) <= 1:
            return 0
        # buy = [0 for i in range(len(prices))]
        # sell = [0 for i in range(len(prices))]
        buy, sell = [0] * len(prices), [0] * len(prices)
        buy[0] = -prices[0]
        for i in range(1, len(prices)):
            buy[i] = max(buy[i - 1], sell[i - 1] - prices[i])
            sell[i] = max(buy[i - 1] + prices[i] - fee, sell[i - 1])
        return sell[-1]
