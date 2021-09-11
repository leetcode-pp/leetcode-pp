from typing import List


class Solution:
    row_state = [[False for i in range(10)] for _ in range(9)]
    column_state = [[False for i in range(10)] for _ in range(9)]
    box_state = [[False for i in range(10)] for _ in range(9)]
    board = []

    def solveSudoku(self, board: List[List[str]]) -> None:
        # leetcode 判定时会重复调用函数，因此需要反复初始化状态表
        self.row_state = [[False for i in range(10)] for _ in range(9)]
        self.column_state = [[False for i in range(10)] for _ in range(9)]
        self.box_state = [[False for i in range(10)] for _ in range(9)]
        self.board = board
        for i in range(9):
            for j in range(9):
                if self.board[i][j] != ".":
                    num = int(self.board[i][j])
                    self.row_state[i][num] = True
                    self.column_state[j][num] = True
                    self.box_state[(i // 3) * 3 + j // 3][num] = True

        def recursive_place_number(self, row: int, column: int,) -> bool:
            if column == 9:
                row += 1
                column = 0
                if row == 9:
                    return True

            if self.board[row][column] != ".":
                return recursive_place_number(self, row, column + 1)
            else:
                for i in range(1, 10):
                    if (
                        self.row_state[row][i]
                        or self.column_state[column][i]
                        or self.box_state[(row // 3) * 3 + column // 3][i]
                    ):
                        continue
                    else:
                        self.place_number(row, column, i)
                        if recursive_place_number(self, row, column + 1,):
                            return True
                        self.undo_number_placement(row, column, i)
            return False

        recursive_place_number(self, 0, 0)

    def place_number(self, row: int, column: int, i: int,) -> bool:
        self.row_state[row][i] = True
        self.column_state[column][i] = True
        self.box_state[(row // 3) * 3 + column // 3][i] = True
        self.board[row][column] = str(i)

    def undo_number_placement(self, row: int, column: int, i: int,) -> bool:
        self.row_state[row][i] = False
        self.column_state[column][i] = False
        self.box_state[(row // 3) * 3 + column // 3][i] = False
        self.board[row][column] = "."
