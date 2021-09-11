#include <vector>
using namespace std;

class Solution {
public:
  vector<int> rotate(vector<int>& nums, int k) {
    int n = nums.size(), offset = k % n;
    for (int i = 0; i < n; i++) nums.push_back(nums[i]);
    vector<int> ans;
    for (int i = n - offset; i < n * 2 - offset; i++)
      ans.push_back(nums[i]);
    return ans;
  }
};
