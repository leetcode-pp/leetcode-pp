#include <algorithm>
#include <vector>
using namespace std;

class Solution {
public:
  int maxSubArray(const vector<int>& nums) {
    int n = nums.size();
    int maxSum = -0x7fffffff, total = 0;
    for (int i = 0; i < n; i++) {
      total = 0;
      for (int j = i; j < n; j++) {
        total += nums[j];
        maxSum = max(maxSum, total);
      }
    }
    return maxSum;
  }
};
