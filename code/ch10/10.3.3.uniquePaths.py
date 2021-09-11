class Solution:
    visited = dict()

    def uniquePaths(self, m: int, n: int) -> int:
        if (m, n) in self.visited:
            return self.visited[(m, n)]
        if m == 1 or n == 1:
            return 1
        cnt = self.uniquePaths(m - 1, n) + self.uniquePaths(m, n - 1)
        self.visited[(m, n)] = cnt
        return cnt
