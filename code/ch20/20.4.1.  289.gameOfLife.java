public class Solution {
  public int cntLiveCell(int i, int j,
      int[][] old) {
    int cnt = 0, m = old.length, n = old[0].length;
    int[][] directions = {
      {0,1},
      {0,-1},
      {-1,0},
      {1,0},
      {1,1},
      {1,-1},
      {-1,1},
      {-1,-1}
    };
    for (int p = 0; p < 8; p++) {
      int dx = directions[p][0], dy = directions[p][1];
      if (i + dx >= 0 && i + dx < m && j + dy >= 0 &&
          j + dy < n)
        cnt += old[i + dx][j + dy];
    }
    return cnt;
  }
  void gameOfLife(int[][] board) {
    int m = board.length;
    if (m <= 0) return;
    int n = board[0].length;
    if (n <= 0) return;
    int[][] old = new int[m][n];
    for (int i = 0; i < m; i++)
      for (int j = 0; j < n; j++) old[i][j] = board[i][j];
    for (int i = 0; i < m; i++)
      for (int j = 0; j < n; j++) {
        int cnt = cntLiveCell(i, j, old);
        if (old[i][j] == 0 && cnt == 3)
          board[i][j] = 1;
        if (old[i][j] == 1 && (cnt > 3 || cnt < 2))
          board[i][j] = 0;
      }
  }
}
