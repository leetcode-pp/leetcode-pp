#include <cstdlib>
#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
  int longestPalindromeSubseq(string s) {
    int n = s.length();
    int **dp = (int **)malloc(n * sizeof(int *));
    for (int i = 0; i < n; i++) {
      dp[i] = (int *)malloc(n * sizeof(int));
      for (int j = 0; j < n; j++) dp[i][j] = 0;
    }
    for (int i = n - 1; i >= 0; i--)
      for (int j = i; j < n; j++) {
        if (i == j) dp[i][j] = 1;
        else if (s[i] == s[j])
          dp[i][j] = dp[i + 1][j - 1] + 2;
        else
          dp[i][j] = max(dp[i + 1][j], dp[i][j - 1]);
      }
    int ans = dp[0][n - 1];
    for (int i = 0; i < n; i++) free(dp[i]);
    free(dp);
    return ans;
  }
};
