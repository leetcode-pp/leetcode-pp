#include <vector>
using namespace std;

class Solution {
public:
  int cntLiveCell(int i, int j, \
      const vector<vector<int> >& old) {
    int cnt = 0, m = old.size(), n = old[0].size();
    int directions[8][2] = {
      {0, 1},
      {0, -1},
      {-1, 0},
      {1, 0},
      {1, 1},
      {1, -1},
      {-1, 1},
      {-1, -1}
    };
    for (int p = 0; p < 8; p++) {
      int dx = directions[p][0], dy = directions[p][1];
      if (i + dx >= 0 && i + dx < m && j + dy >= 0 && \
          j + dy < n)
        cnt += old[i + dx][j + dy];
    }
    return cnt;
  }
  void gameOfLife(vector<vector<int> >& board) {
    int m = board.size();
    if (m <= 0) return;
    int n = board[0].size();
    if (n <= 0) return;
    vector<vector<int> > old = board;
    for (int i = 0; i < m; i++)
      for (int j = 0; j < n; j++) {
        int cnt = cntLiveCell(i, j, old);
        if (old[i][j] == 0 && cnt == 3)
          board[i][j] = 1;
        if (old[i][j] == 1 && (cnt > 3 || cnt < 2))
          board[i][j] = 0;
      }
  }
};
