#include <vector>
using namespace std;

class Solution {
public:
  int cntLiveCell(int i, int j,
      const vector<vector<int> >& board) {
    int cnt = 0, directions[8][2] = {
      {0, 1},
      {0, -1},
      {-1, 0},
      {1, 0},
      {1, 1},
      {1, -1},
      {-1, 1},
      {-1, -1}
    };
    int m = board.size(), n = board[0].size();
    for (int p = 0; p < 8; p++) {
      int dx = directions[p][0], dy = directions[p][1];
      if (i + dx >= 0 && i + dx < m && j + dy >= 0 && \
          j + dy < n)
        cnt += board[i + dx][j + dy] & 1;
    }
    return cnt;
  }
  void gameOfLife(vector<vector<int> >& board) {
    int m = board.size();
    if (m <= 0) return;
    int n = board[0].size();
    if (n <= 0) return;
    for (int i = 0; i < m; i++)
      for (int j = 0; j < n; j++) {
        int cnt = cntLiveCell(i, j, board);
        board[i][j] |= cnt << 1;
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
};
