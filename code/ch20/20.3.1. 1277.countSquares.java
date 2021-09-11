import java.lang.Math;

public class Solution {
  public int countSquares(int[][] matrix) {
    int res = 0, m = matrix.length,
        n = matrix[0].length;
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 0; i <= m; i++)
      for (int j = 0; j <= n; j++) dp[i][j] = 0;
    for (int i = 1; i <= m; i++)
      for (int j = 1; j <= n; j++) {
        if (matrix[i - 1][j - 1] == 1)
          dp[i][j] = Math.min(Math.min(dp[i - 1][j],
              dp[i][j - 1]), dp[i - 1][j - 1]) + 1;
        res += dp[i][j];
      }
    return res;
  }
}
