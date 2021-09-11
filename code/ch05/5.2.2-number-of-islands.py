from typing import List


class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid or not grid[0]:
            return 0

        m = len(grid)
        n = len(grid[0])
        ans = 0

        def dfs(row, col):
            grid[row][col] = "0"
            stack = [[row, col]]
            while stack:
                r, c = stack[-1]
                if r - 1 >= 0 and grid[r - 1][c] == "1":
                    stack.append([r - 1, c])
                    grid[r - 1][c] = "0"
                    continue
                if r + 1 < m and grid[r + 1][c] == "1":
                    stack.append([r + 1, c])
                    grid[r + 1][c] = "0"
                    continue
                if c - 1 >= 0 and grid[r][c - 1] == "1":
                    stack.append([r, c - 1])
                    grid[r][c - 1] = "0"
                    continue
                if c + 1 < n and grid[r][c + 1] == "1":
                    stack.append([r, c + 1])
                    grid[r][c + 1] = "0"
                    continue
                stack.pop()

        for i in range(m):
            for j in range(n):
                if grid[i][j] == "1":
                    ans += 1
                    dfs(i, j)

        return ans
