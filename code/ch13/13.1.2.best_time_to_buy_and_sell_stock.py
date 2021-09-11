from typing import List
import sys


class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        max_diff = 0
        min_price = sys.maxsize
        for i in range(len(prices)):
            if min_price > prices[i]:
                min_price = prices[i]
            max_diff = max(max_diff, prices[i] - min_price)
        return max_diff
