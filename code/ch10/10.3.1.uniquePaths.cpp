#include <cstdlib>

class Solution {
public:
  int uniquePaths(int m, int n) {
    int **d = (int **)malloc(m * sizeof(int *));
    for (int i = 0; i < m; i++) {
      d[i] = (int *)malloc(n * sizeof(int));
      for (int j = 0; j < n; j++) d[i][j] = 1;
    }
    for (int col = 1; col < m; col++)
      for (int row = 1; row < n; row++)
        d[col][row] = d[col - 1][row] + d[col][row - 1];
    int ans = d[m - 1][n - 1];
    for (int i = 0; i < m; i++) free(d[i]);
    free(d);
    return ans;
  }
};
