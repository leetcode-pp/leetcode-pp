#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
  int largestRectangleArea(vector<int>& heights) {
    int n = heights.size(), ans = 0;
    vector<int> l, r;
    for (int i = 0; i < n; i++) {
      l.push_back(-1);
      r.push_back(n);
    }
    for (int i = 1; i < n; i++) {
      int j = i - 1;
      while (j >= 0 && heights[j] >= heights[i])
        j -= 1;
      l[i] = j;
    }
    for (int i = n - 2; i >= 0; i--) {
      int j = i + 1;
      while (j < n && heights[j] >= heights[i])
        j += 1;
      r[i] = j;
    }
    for (int i = 0; i < n; i++)
      ans = max(ans, heights[i] * (r[i] - l[i] - 1));
    return ans;
  }
};
