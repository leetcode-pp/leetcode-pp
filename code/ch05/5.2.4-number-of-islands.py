from typing import List


class Solution:
    class UnionFind:
        def __init__(self, grid):
            self.count = 0
            m = len(grid)
            n = len(grid[0])
            self.parent = [0 for _ in range(m * n)]
            self.rank = [0 for _ in range(m * n)]
            for i in range(m): # 这里我们进行初始化的工作
                for j in range(n):
                    if grid[i][j] == "1":
                        self.parent[i * n + j] = i * n + j
                        self.count += 1

        def find(self, i):
            if self.parent[i] != i:
                self.parent[i] = self.find(self.parent[i])
            return self.parent[i]

        def union(self, x, y):
            rootx = self.find(x)
            rooty = self.find(y)
            if rootx != rooty:
                if self.rank[rootx] > self.rank[rooty]:
                    self.parent[rooty] = rootx
                elif self.rank[rootx] < self.rank[rooty]:
                    self.parent[rootx] = rooty
                else:
                    self.parent[rooty] = rootx
                    self.rank[rootx] += 1

                self.count -= 1

        def getCount(self):
            return self.count

    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid or not grid[0]:
            return 0

        # ans = 0
        nr = len(grid)
        nc = len(grid[0])
        uf = self.UnionFind(grid)

        for i in range(nr):
            for j in range(nc):
                if grid[i][j] == "1":
                    grid[i][j] = "0"
                    if i - 1 >= 0 and grid[i - 1][j] == "1":
                        uf.union(i * nc + j, (i - 1) * nc + j)
                    if i + 1 < nr and grid[i + 1][j] == "1":
                        uf.union(i * nc + j, (i + 1) * nc + j)
                    if j - 1 >= 0 and grid[i][j - 1] == "1":
                        uf.union(i * nc + j, i * nc + j - 1)
                    if j + 1 < nc and grid[i][j + 1] == "1":
                        uf.union(i * nc + j, i * nc + j + 1)
        return uf.getCount()
