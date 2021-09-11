#include <algorithm>
#include <vector>
using namespace std;

class Solution {
public:
  int maxSubArray(const vector<int>& nums) {
    int n = nums.size();
    int maxSum = nums[0], minSum = 0, sum = 0;
    for (int i = 0; i < n; i++) {
      sum += nums[i];
      maxSum = max(maxSum, sum - minSum);
      minSum = min(minSum, sum);
    }
    return maxSum;
  }
};
