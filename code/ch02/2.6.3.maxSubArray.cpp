#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
  int maxSubArray(const vector<int>& nums) {
    int n = nums.size();
    int max_sum_ending_curr_idx = nums[0];
    int max_sum = nums[0];
    for (int i = 1; i < n; i++) {
      max_sum_ending_curr_idx = max(
          max_sum_ending_curr_idx + nums[i],
          nums[i]
          );
      max_sum = max(
          max_sum_ending_curr_idx,
          max_sum
          );
    }
    return max_sum;
  }
};
