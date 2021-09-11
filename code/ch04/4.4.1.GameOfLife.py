from typing import List


class Solution:
    def gameOfLife(self, board: List[List[int]]) -> None:
        def get_neighbor_count(i, j, board):
            top = max(0, i - 1)
            bottom = min(len(board) - 1, i + 1)
            left = max(0, j - 1)
            right = min(len(board[0]) - 1, j + 1)

            count = 0
            for x in range(top, bottom + 1):
                for y in range(left, right + 1):
                    if board[x][y] == 1 or board[x][y] == -1:
                        count += 1
            return count

        for i in range(len(board)):
            for j in range(len(board[0])):
                res = get_neighbor_count(i, j, board)
                if board[i][j] == 1 and res in [3, 4]:
                    board[i][j] = 1
                elif board[i][j] == 1:
                    board[i][j] = -1
                elif board[i][j] == 0 and res == 3:
                    board[i][j] = -2

        for i in range(len(board)):
            for j in range(len(board[0])):
                if board[i][j] == -2:
                    board[i][j] = 1
                elif board[i][j] == -1:
                    board[i][j] = 0
