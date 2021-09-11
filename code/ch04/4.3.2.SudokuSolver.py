from typing import List


class Solution:
    row_state = [[False for i in range(10)] for _ in range(9)]
    column_state = [[False for i in range(10)] for _ in range(9)]
    box_state = [[False for i in range(10)] for _ in range(9)]
    board = []

    def solveSudoku(self, board: List[List[str]]) -> None:

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
            if row == -1 and column == -1:
                return True
            if board[row][column] != ".":
                return False

            for i in range(1, 10):
                if (
                    self.row_state[row][i]
                    or self.column_state[column][i]
                    or self.box_state[(row // 3) * 3 + column // 3][i]
                ):
                    continue
                else:
                    self.place_number(row, column, i)
                    x, y = self.get_max_possible_coordinate()
                    if recursive_place_number(self, x, y,):
                        return True
                    self.undo_number_placement(row, column, i)
            return False

        x, y = self.get_max_possible_coordinate()
        recursive_place_number(self, x, y)

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

    def get_max_possible_coordinate(self) -> (int, int):
        x, y, min_count = -1, -1, 9
        for i in range(9):
            for j in range(9):
                if self.board[i][j] != ".":
                    continue
                tmp_count = 9
                for k in range(9):
                    if (
                        self.row_state[i][k]
                        or self.column_state[j][k]
                        or self.box_state[(i // 3) * 3 + j // 3][k]
                    ):
                        tmp_count -= 1
                if tmp_count == 1:
                    return i, j
                if min_count > tmp_count:
                    min_count = tmp_count
                    x = i
                    y = j
        return x, y
