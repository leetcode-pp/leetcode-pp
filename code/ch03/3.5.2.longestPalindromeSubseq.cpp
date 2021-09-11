#include <cstdlib>
#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
  int longestPalindromeSubseq(string s) {
    int n = s.length();
    int *pre = (int *)malloc(n * sizeof(int));
    int *cur = (int *)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++)
      pre[i] = cur[i] = 0;
    for (int i = n - 1; i >= 0; i--) {
      for (int j = i; j < n; j++) {
        if (i == j) cur[j] = 1;
        else if (s[i] == s[j])
          cur[j] = pre[j - 1] + 2;
        else
          cur[j] = max(pre[j], cur[j - 1]);
      }
      for (int j = 0; j < n; j++) pre[j] = cur[j];
    }
    int ans = pre[n - 1];
    free(pre);
    free(cur);
    return ans;
  }
};
