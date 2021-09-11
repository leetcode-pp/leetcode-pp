from typing import List


class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid or not grid[0]:
            return 0

        m = len(grid)
        n = len(grid[0])
        ans = 0

        def dfs(r, c):
            grid[r][c] = "0"

            if r - 1 >= 0 and grid[r - 1][c] == "1":
                dfs(r - 1, c)
            if r + 1 < m and grid[r + 1][c] == "1":
                dfs(r + 1, c)
            if c - 1 >= 0 and grid[r][c - 1] == "1":
                dfs(r, c - 1)
            if c + 1 < n and grid[r][c + 1] == "1":
                dfs(r, c + 1)

        for i in range(m):
            for j in range(n):
                if grid[i][j] == "1":
                    ans += 1
                    dfs(i, j)

        return ans
