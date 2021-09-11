public class Solution {
  public void setZeroes(int[][] matrix) {
    int none = -0x7fffffff;
    int rows = matrix.length, cols = matrix[0].length;
    for (int r = 0; r < rows; r++)
      for (int c = 0; c < cols; c++)
        if (matrix[r][c] != none && matrix[r][c] == 0) {
          for (int i = 0; i < rows; i++)
            matrix[i][c] = ((matrix[i][c] != 0) ? none: 0);
          for (int j = 0; j < cols; j++)
            matrix[r][j] = ((matrix[r][j] != 0) ? none: 0);
        }
    for (int r = 0; r < rows; r++)
      for (int c = 0; c < cols; c++)
        if (matrix[r][c] == none)
          matrix[r][c] = 0;
  }
}
