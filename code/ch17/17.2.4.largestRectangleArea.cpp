#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
  int largestRectangleArea(vector<int>& heights) {
    int n = heights.size(), ans = 0;
    vector<int> st;
    heights.push_back(0);
    for (int i = heights.size(); i > 0; i--)
      swap(heights[i], heights[i - 1]);
    heights.push_back(0);
    for (int i = 0; i < n + 2; i++) {
      while (st.size() && heights[st.back()] > heights[i]) {
        int buf = st.back();
        st.pop_back();
        ans = max(ans, heights[buf] * (i - st.back() - 1));
      }
      st.push_back(i);
    }
    return ans;
  }
};
