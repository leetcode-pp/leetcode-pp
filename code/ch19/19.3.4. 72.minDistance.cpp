#include <cstdlib>
#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
  int minDistance(string word1, string word2) {
    int m = word1.size(), n = word2.size();
    int *cur = (int *)malloc((n + 1) * sizeof(int));
    cur[0] = 0;
    int pre;
    for (int i = 1; i <= n; i++) cur[i] = i;
    for (int i = 1; i <= m; i++) {
      pre = cur[0];
      cur[0] = i;
      for (int j = 1; j <= n; j++) {
        int temp = cur[j];
        if (word1[i - 1] == word2[j - 1])
          cur[j] = pre;
        else
          cur[j] = min(min(cur[j], cur[j - 1]), pre) + 1;
        pre = temp;
      }
    }
    int ans = cur[n];
    free(cur);
    return ans;
  }
};
