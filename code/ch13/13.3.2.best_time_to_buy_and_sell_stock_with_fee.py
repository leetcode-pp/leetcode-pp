from typing import List


class Solution:
    def maxProfit(self, prices: List[int], fee: int) -> int:
        if len(prices) <= 1:
            return 0
        pre_buy = -prices[0]
        pre_sell = 0
        for i in range(1, len(prices)):
            buy = max(pre_buy, pre_sell - prices[i])
            sell = max(pre_buy + prices[i] - fee, pre_sell)
            pre_buy = buy
            pre_sell = sell
        return pre_sell
