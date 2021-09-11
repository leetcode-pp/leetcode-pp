class Solution:
    def findKthNumber(self, m: int, n: int, k: int) -> int:
        lo = 1
        hi = m * n

        def countNotGreater(mid: int, m: int, n: int) -> int:
            cnt = 0
            for i in range(1, m + 1):
                cnt += min(mid // i, n)
            return cnt

        while lo < hi:
            mid = (lo + hi) // 2
            if countNotGreater(mid, m, n) < k:
                lo = mid + 1
            else:
                hi = mid
        return lo
