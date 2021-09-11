class UnionFind:
    def __init__(self, n: int):
        # 每个节点的父节点
        self.parent = [i for i in range(n)]
        # 以该节点为根的树权值（树高度）
        self.rank = [0 for i in range(n)]
        # 连通区域数量
        self.cnt = n

    def find(self, p: int) -> int:
        while p != self.parent[p]:
            p = self.parent[p]
        return p

    def union(self, p: int, q: int):
        root_p, root_q = self.find(p), self.find(q)
        if root_p == root_q:
            return
        if self.rank[root_p] > self.rank[root_q]:
            self.parent[root_q] = root_p
        elif self.rank[root_p] < self.rank[root_q]:
            self.parent[root_p] = root_q
        else:
            self.parent[root_q] = root_p
            self.rank[root_p] += 1
        self.cnt -= 1
