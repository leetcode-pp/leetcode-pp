class Solution:
    def kthSmallest(self, matrix: List[List[int]], k: int) -> int:
        n = len(matrix)
        lo = matrix[0][0]
        hi = matrix[n - 1][n - 1]

        def countNotGreater(target: int) -> int:
            i, j = 0, n - 1
            cnt = 0
            while i < n and j >= 0:
                if matrix[i][j] <= target:
                    cnt += j + 1
                    i += 1
                else:
                    j -= 1
            return cnt

        while lo < hi:
            mid = (lo + hi) // 2
            cnt = countNotGreater(mid)

            if cnt < k:
                lo = mid + 1
            else:
                hi = mid
        return lo
