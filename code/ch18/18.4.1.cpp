vector<vector<int>> grid(5, vector<int>(5, 0));
// n * m 大小的矩阵
int n = grid.size(), m = grid[0].size();
// 扩展方向
int direction[4][2] = {{0, 1}, {1, 0}, {-1, 0}, {0, -1}};
// 记录节点是否被访问
bool visited[n][m];
for (int i = 0; i < n; i++) {
    memset(visited[i], false, m);
}
queue<pair<int, int>> que;
// 深度
int level = 0;
// 加入初始节点
que.push(pair(0, 0));
visited[0][0] = true;
while (que.size() > 0) {
    int cnt = que.size();
    for (int i = 0; i < cnt; i++) {
        pair<int, int> top = que.front();
        que.pop();
        int x = top.first, y = top.second;
        // 扩展节点
        for (int i = 0; i < 4; i++) {
            int next_x = x + direction[i][0];
            int next_y = y + direction[i][1];
            // 判断相邻节点是否有效
            if (next_x < 0 || next_x >= n || next_y < 0 || next_y >= m || visited[next_x][next_y]) {
                continue;
            }
            que.push(pair(next_x, next_y));
            visited[next_x][next_y] = true;
        }
    }
    // 深度增加
    level += 1;
}