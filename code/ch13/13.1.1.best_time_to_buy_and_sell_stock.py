from typing import List


class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        max_diff = 0
        for i in range(1, len(prices)):
            for j in range(0, i):
                if prices[i] - prices[j] > max_diff:
                    max_diff = prices[i] - prices[j]
        return max_diff
