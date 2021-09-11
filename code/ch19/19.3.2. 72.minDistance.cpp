#include <cstdlib>
#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
  int minDistance(string word1, string word2) {
    int m = word1.length(), n = word2.length();
    int **dp = (int **)malloc((m + 1) * sizeof(int *));
    for (int i = 0; i <= m; i++) {
      dp[i] = (int *)malloc((n + 1) * sizeof(int));
      for (int j = 0; j <= n; j++)
        dp[i][j] = 0;
    }
    for (int i = 1; i <= m; i++) dp[i][0] = i;
    for (int j = 1; j <= n; j++) dp[0][j] = j;
    for (int i = 1; i <= m; i++)
      for (int j = 1; j <= n; j++) {
        if (word1[i - 1] == word2[j - 1])
          dp[i][j] = dp[i - 1][j - 1];
        else
          dp[i][j] = min(min(dp[i - 1][j - 1],\
                dp[i][j - 1]), dp[i - 1][j]) + 1;
      }
    int ans = dp[m][n];
    for (int i = 0; i <= m; i++) free(dp[i]);
    free(dp);
    return ans;
  }
};
