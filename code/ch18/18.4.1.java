int[][] grid = new int[5][5];
// n * m 大小的矩阵
int n = grid.length, m = grid[0].length;
// 扩展方向
int[][] direction = new int[][]{{0, 1}, {1, 0}, {-1, 0}, {0, -1}};
// 记录节点是否被访问
boolean[][] visited = new boolean[n][m];
Queue<int[]> queue = new LinkedList<>();
// 深度
int level = 0;
// 加入初始节点
queue.offer(new int[]{0, 0});
visited[0][0] = true;
while (queue.size() > 0) {
    int cnt = queue.size();
    System.out.println("---------------");
    for (int i = 0; i < cnt; i++) {
        int[] top = queue.poll();
        int x = top[0], y = top[1];
        System.out.println(x + ":" + y);
        // 扩展节点
        for (int[] d : direction) {
            int next_x = x + d[0];
            int next_y = y + d[1];
            // 判断相邻节点是否有效
            if (next_x < 0 || next_x >= n || next_y < 0 || next_y >= m || visited[next_x][next_y]) {
                continue;
            }
            queue.offer(new int[]{next_x, next_y});
            visited[next_x][next_y] = true;
        } 
    }
    // 深度增加
    level += 1;
}