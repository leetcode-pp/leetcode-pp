public class Solution {
  public int countNotGreater(int[][] matrix, int target) {
    int n = matrix.length;
    int i = 0, j = n - 1, cnt = 0;
    while (i < n && j >= 0) {
      if (matrix[i][j] <= target) {
        cnt += j + 1;
        i += 1;
      }
      else j -= 1;
    }
    return cnt;
  }
  int kthSmallest(int[][] matrix, int k) {
    int n = matrix.length;
    int lo = matrix[0][0], hi = matrix[n - 1][n - 1];
    while (lo < hi) {
      int mid = (lo + hi) / 2;
      int cnt = countNotGreater(matrix, mid);
      if (cnt < k) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }
}
