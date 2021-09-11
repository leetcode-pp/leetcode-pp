import sys


class Solution:
    def getMoneyAmount(self, n: int) -> int:
        def cost(low: int, high: int) -> int:
            if low >= high:
                return 0
            res = sys.maxsize
            for i in range(low, high + 1):
                tmp = i + max(
                    cost(low, i - 1), cost(i + 1, high)
                )
                res = min(res, tmp)
            return res

        return cost(1, n)
