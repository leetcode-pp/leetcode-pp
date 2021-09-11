from typing import List
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        if not matrix:
            return False

        def search_rec(left, up, right, down):
            # 空矩阵
            if left > right or up > down:
                return False
            # 目标值大于矩阵右下角元素或者小于左上角元素
            elif target < matrix[up][left] or target > matrix[down][right]:
                return False

            mid = left + (right - left) // 2

            # 定位 row，来使 matrix[row-1][mid] < target < matrix[row][mid]
            row = up
            while row <= down and matrix[row][mid] <= target:
                if matrix[row][mid] == target:
                    return True
                row += 1

            return search_rec(left, row, mid - 1, down) or search_rec(
                mid + 1, up, right, row - 1
            )

        return search_rec(0, 0, len(matrix[0]) - 1, len(matrix) - 1)
