from typing import List


class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        from collections import deque

        if not grid or not grid[0]:
            return 0

        m = len(grid)
        n = len(grid[0])
        ans = 0
        queue = deque()

        for i in range(m):
            for j in range(n):
                if grid[i][j] == "1":
                    ans += 1
                    grid[i][j] = "0"
                    queue.append((i, j))
                    while len(queue) > 0:
                        top = queue.popleft()
                        r = top[0]
                        c = top[1]
                        if r - 1 >= 0 and grid[r - 1][c] == "1":
                            grid[r - 1][c] = "0"
                            queue.append((r - 1, c))
                        if r + 1 < m and grid[r + 1][c] == "1":
                            grid[r + 1][c] = "0"
                            queue.append((r + 1, c))
                        if c - 1 >= 0 and grid[r][c - 1] == "1":
                            grid[r][c - 1] = "0"
                            queue.append((r, c - 1))
                        if c + 1 < n and grid[r][c + 1] == "1":
                            grid[r][c + 1] = "0"
                            queue.append((r, c + 1))

        return ans
