class UnionFind {
    // 每个节点的父节点
    int[] parent;
    // 以该节点为根的树权值（树高度）
    int[] rank;
    // 连通区域数量
    int cnt;
    
    public UnionFind(int n) {
        this.parent = new int[n];
        this.rank = new int[n];
        this.cnt = n;
        for (int i = 0; i < n; i++) {
            this.parent[i] = i;
            this.rank[i] = 0;
        }
    }

    public int find(int p) {
        while (p != this.parent[p]) {
            p = this.parent[p];
        }
        return p;
    }

    public void union(int p, int q) {
        int root_p = this.find(p), root_q = this.find(q);
        if (root_p == root_q) {
            return;
        }
        if (this.rank[root_p] > this.rank[root_q]) {
            this.parent[root_q] = root_p;
        } else if (this.rank[root_p] < this.rank[root_q]) {
            this.parent[root_p] = root_q;
        } else {
            this.parent[root_p] = root_q;
            this.rank[root_q] += 1;
        }
        this.cnt -= 1;
    }
}