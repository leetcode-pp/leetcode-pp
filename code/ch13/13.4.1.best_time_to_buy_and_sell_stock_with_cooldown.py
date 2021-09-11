from typing import List


class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        if len(prices) <= 1:
            return 0
        buy, sell = [0] * len(prices), [0] * len(prices)
        buy[0] = -prices[0]
        buy[1] = max((0 - prices[1]), buy[0])
        sell[1] = max((buy[0] + prices[1]), sell[0])
        for i in range(2, len(prices)):
            buy[i] = max((sell[i - 2] - prices[i]), buy[i - 1])
            sell[i] = max((buy[i - 1] + prices[i]), sell[i - 1])
        return sell[-1]
