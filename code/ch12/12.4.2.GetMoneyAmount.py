import sys
from typing import List


class Solution:
    def getMoneyAmount(self, n: int) -> int:
        def cost(low: int, high: int, mem: List[List[int]]) -> int:

            if low >= high:
                return 0
            if mem[low][high] != 0:
                return mem[low][high]

            res = sys.maxsize
            for i in range((low + high) // 2, high + 1):
                tmp = i + max(
                    cost(low, i - 1, mem),
                    cost(i + 1, high, mem),
                )
                res = min(res, tmp)
            mem[low][high] = res
            return res

        if n == 1:
            return 0
        mem = [[0] * (n + 1) for _ in range(n + 1)]

        return cost(1, n, mem)
