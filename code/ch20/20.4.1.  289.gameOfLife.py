import copy


class Solution:
    def gameOfLife(self, board: List[List[int]]) -> None:
        m = len(board)
        n = len(board[0])
        if m <= 0 or n <= 0:
            return []
        old = copy.deepcopy(board)

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
                    cnt += old[i + dx][j + dy]

            return cnt

        for i in range(m):
            for j in range(n):
                # 八个方向有几个活细胞
                cnt = cntLiveCell(i, j)
                if old[i][j] == 0 and cnt == 3:
                    board[i][j] = 1
                if old[i][j] == 1 and (cnt > 3 or cnt < 2):
                    board[i][j] = 0
