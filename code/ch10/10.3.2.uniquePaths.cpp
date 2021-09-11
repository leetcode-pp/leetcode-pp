#include <cstdlib>

class Solution {
public:
  int uniquePaths(int m, int n) {
    int *dp = (int *)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) dp[i] = 1;
    for (int i = 1; i < m; i++)
      for (int j = 1; j < n; j++)
        dp[j] += dp[j - 1];
    int ans = dp[n - 1];
    free(dp);
    return ans;
  }
};
