class UnionFind {
public:
    // 每个节点的父节点
    int* parent;
    // 以该节点为根的树权值（树高度）
    int* rank;
    // 连通区域数量
    int cnt;

    UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        cnt = n;
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            rank[i] = 0;
        }
    }

    int find(int p) {
        while (p != parent[p]) {
            p = parent[p];
        }
        return p;
    }

    void merge(int p, int q) {
        int root_p = find(p), root_q = find(q);
        if (root_p == root_q) {
            return;
        }
        if (rank[root_p] > rank[root_q]) {
            parent[root_q] = root_p;
        } else if (rank[root_p] < rank[root_q]) {
            parent[root_p] = root_q;
        } else {
            parent[root_p] = root_q;
            rank[root_q] += 1;
        }
        cnt -= 1;
    }
};