class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        """
        这题要解决的问题是，必须有个地方记录判断结果，但又不能影响下一步的判断条件；
        直接改为 0 的话，会影响下一步的判断条件；
        因此，有一种思路是先改为 None，最后再将 None 改为 0；
        从条件上看，如果可以将第一行、第二行作为记录空间，那么，用 None 应该也不算违背题目条件；
        """
        rows = len(matrix)
        cols = len(matrix[0])
        # 遍历矩阵，用 None 记录要改的地方，注意如果是 0 则要保留，否则会影响下一步判断
        for r in range(rows):
            for c in range(cols):
                if matrix[r][c] is not None and matrix[r][c] == 0:
                    # 改值
                    for i in range(rows):
                        matrix[i][c] = None if matrix[i][c] != 0 else 0
                    for j in range(cols):
                        matrix[r][j] = None if matrix[r][j] != 0 else 0
        # 再次遍历，将 None 改为 0
        for r in range(rows):
            for c in range(cols):
                if matrix[r][c] is None:
                    matrix[r][c] = 0
