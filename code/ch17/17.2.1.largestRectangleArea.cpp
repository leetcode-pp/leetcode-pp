#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
  int largestRectangleArea(vector<int>& heights) {
    int n = heights.size(), ans = 0;
    if (n != 0) ans = heights[0];
    for (int i = 0; i < n; i++) {
      int height = heights[i];
      for (int j = i; j < n; j++) {
        height = min(height, heights[j]);
        ans = max(ans, (j - i + 1) * height);
      }
    }
    return ans;
  }
};
