class Solution {
  public void setRowZeros(int[][] matrix, int i) {
    for (int j = 0; j < matrix[i].length; j++)
      matrix[i][j] = 0;
  }
  public void setColZeors(int[][] matrix, int j) {
    for (int i = 0; i < matrix.length; i++)
      matrix[i][j] = 0;
  }
  public void setZeroes(int[][] matrix) {
    boolean isCol = false;
    int R = matrix.length, C = matrix[0].length;
    for (int i = 0; i < R; i++) {
      if (matrix[i][0] == 0) isCol = true;
      for (int j = 1; j < C; j++)
        if (matrix[i][j] == 0) {
          matrix[i][0] = 0;
          matrix[0][j] = 0;
        }
    }
    for (int j = 1; j < C; j++)
      if (matrix[0][j] == 0)
        setColZeors(matrix, j);
    for (int i = 0; i < R; i++)
      if (matrix[i][0] == 0)
        setRowZeros(matrix, i);
    if (isCol) setColZeors(matrix, 0);
  }
}
