from typing import List
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int):
        if len(matrix) == 0 or len(matrix[0]) == 0:
            return False

        m = len(matrix)
        n = len(matrix[0])

        row = m - 1
        col = 0

        while col < n and row >= 0:
            if matrix[row][col] > target:
                row -= 1
            elif matrix[row][col] < target:
                col += 1
            else:
                return True

        return False
