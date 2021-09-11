#include <vector>
#include <cstdlib>
#include <algorithm>
using namespace std;

class Solution {
public:
  int countSquares(vector<vector<int> >& matrix) {
    int res = 0, m = matrix.size(), n = matrix[0].size();
    int **dp = (int **)malloc((m + 1) * sizeof(int *));
    for (int i = 0; i <= m; i++) {
      dp[i] = (int *)malloc((n + 1) * sizeof(int));
      for (int j = 0; j <= n; j++) dp[i][j] = 0;
    }
    for (int i = 1; i <= m; i++)
      for (int j = 1; j <= n; j++) {
        if (matrix[i - 1][j - 1] == 1)
          dp[i][j] = min(min(dp[i - 1][j], dp[i][j - 1]),\
              dp[i - 1][j - 1]) + 1;
        res += dp[i][j];
      }
    for (int i = 0; i <= m; i++) free(dp[i]);
    free(dp);
    return res;
  }
};
