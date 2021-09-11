#include <string>
#include <cstdlib>
#include <algorithm>
using namespace std;

class Solution {
public:
  int minDistance(string word1, string word2) {
    int m = word1.length(), n = word2.length();
    int *pre = (int *)malloc((n + 1) * sizeof(int));
    int *cur = (int *)malloc((n + 1) * sizeof(int));
    for (int i = 0; i <= n; i++) pre[i] = cur[i] = 0;
    for (int i = 1; i <= n; i++) pre[i] = i;
    for (int i = 1; i <= m; i++) {
      cur[0] = i;
      for (int j = 1; j <= n; j++) {
        if (word1[i - 1] == word2[j - 1])
          cur[j] = pre[j - 1];
        else
          cur[j] = min(min(pre[j], pre[j - 1]),
              cur[j - 1]) + 1;
      }
      for (int k = 0; k <= n; k++) pre[k] = cur[k];
    }
    int ans = pre[n];
    free(pre);
    free(cur);
    return ans;
  }
};
