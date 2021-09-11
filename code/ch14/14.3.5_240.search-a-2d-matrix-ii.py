from typing import List
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        if not matrix:
            return False

        # 也就是找到第一个大于target的位置
        def binarySearch(matrix: List[List[int]], up: int, down: int, col: int, target: int) -> List:
            lo = up
            hi = down + 1
            while lo < hi:
                mid = lo + (hi - lo) // 2
                if matrix[mid][col] == target:
                    return [True, mid]
                elif matrix[mid][col] < target:
                    lo = mid + 1
                else:
                    hi = mid

            return [False, lo]

        def search_rec(left: int, up: int, right: int, down: int) -> bool:
            # 空矩阵
            if left > right or up > down:
                return False
            # 目标值大于矩阵右下角元素或者小于左上角元素
            elif target < matrix[up][left] or target > matrix[down][right]:
                return False

            mid = left + (right - left) // 2

            # 定位 row，来使 matrix[row-1][mid] < target < matrix[row][mid]
            find, row = binarySearch(matrix, up, down, mid, target)

            return (
                find
                or search_rec(left, row, mid - 1, down)
                or search_rec(mid + 1, up, right, row - 1)
            )

        return search_rec(0, 0, len(matrix[0]) - 1, len(matrix) - 1)
