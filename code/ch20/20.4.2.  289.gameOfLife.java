public class Solution {
  public int cntLiveCell(int i, int j,
      int[][] board) {
    int cnt = 0;
    int[][] directions = {
      {0, 1},
      {0, -1},
      {-1, 0},
      {1, 0},
      {1, 1},
      {1, -1},
      {-1, 1},
      {-1, -1}
    };
    int m = board.length, n = board[0].length;
    for (int p = 0; p < 8; p++) {
      int dx = directions[p][0], dy = directions[p][1];
      if (i + dx >= 0 && i + dx < m && j + dy >= 0 &&
          j + dy < n)
        cnt += board[i + dx][j + dy] & 1;
    }
    return cnt;
  }
  public void gameOfLife(int[][] board) {
    int m = board.length;
    if (m <= 0) return;
    int n = board[0].length;
    if (n <= 0) return;
    for (int i = 0; i < m; i++)
      for (int j = 0; j < n; j++) {
        int cnt = cntLiveCell(i, j, board);
        board[i][j] = board[i][j] | (cnt << 1);
      }
    for (int i = 0; i < m; i++)
      for (int j = 0; j < n; j++) {
        int cell = board[i][j] & 1;
        int cnt = board[i][j] >> 1;
        if (cell == 0 && cnt == 3) board[i][j] = 1;
        else if (cell == 1 && (cnt > 3 || cnt < 2))
          board[i][j] = 0;
        else board[i][j] = cell;
      }
  }
}
