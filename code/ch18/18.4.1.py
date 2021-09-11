from collections import deque

grid = [[0] * 5 for _ in range(5)]
# n * m 大小的矩阵
n, m = len(grid), len(grid[0])
# 扩展方向
direction = [[0, 1], [0, -1], [-1, 0], [1, 0]]
# 记录节点是否被访问
visited = [[False for _ in range(m)] for _ in range(n)]
queue = deque()
# 深度
level = 0
# 加入初始节点
queue.append([0, 0])
visited[0][0] = True
while len(queue) > 0:
    sz = len(queue)
    for _ in range(sz):
        top = queue.popleft()
        x, y = top[0], top[1]
        # 扩展节点
        for d in direction:
            next_x = x + d[0]
            next_y = y + d[1]
            # 判断相邻节点是否有效
            if (
                next_x < 0
                or next_x >= n
                or next_y < 0
                or next_y >= m
                or visited[next_x][next_y]
            ):
                continue
            queue.append([next_x, next_y])
            visited[next_x][next_y] = True
    # 深度增加
    level += 1
