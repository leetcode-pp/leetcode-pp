import copy


class Solution:
    def gameOfLife(self, board: List[List[int]]) -> None:
        m = len(board)
        n = len(board[0])
        if m <= 0 or n <= 0:
            return []

        def cntLiveCell(i: int, j: int) -> int:
            cnt = 0
            directions = [
                (0, 1),
                (0, -1),
                (-1, 0),
                (1, 0),
                (1, 1),
                (1, -1),
                (-1, 1),
                (-1, -1),
            ]
            for (dx, dy) in directions:
                if i + dx >= 0 and i + dx < m and j + dy >= 0 and j + dy < n:
                    cnt += board[i + dx][j + dy] & 1
            return cnt

        for i in range(m):
            for j in range(n):
                # 八个方向有几个活细胞
                cnt = cntLiveCell(i, j)
                board[i][j] |= cnt << 1
        for i in range(m):
            for j in range(n):
                # 变化之前当前cell的值
                cell = board[i][j] & 1
                cnt = board[i][j] >> 1
                if cell == 0 and cnt == 3:
                    board[i][j] = 1
                elif cell == 1 and (cnt > 3 or cnt < 2):
                    board[i][j] = 0
                else:
                    board[i][j] = cell
