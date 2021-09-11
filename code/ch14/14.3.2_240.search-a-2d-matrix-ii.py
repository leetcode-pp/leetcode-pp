from typing import List
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        """
        :type matrix: List[List[int]]
        :type target: int
        :rtype: bool
        """

        def binarySearch(arr: List[List[int]], target: int) -> bool:
            lo = 0
            hi = len(arr) - 1
            while lo <= hi:
                mid = lo + (hi - lo) // 2
                if arr[mid] == target:
                    return True
                elif arr[mid] < target:
                    lo = mid + 1
                else:
                    hi = mid - 1

            return False

        if not matrix or not matrix[0]:
            return False

        m = len(matrix)

        for i in range(m):
            if binarySearch(matrix[i], target):
                return True

        return False
