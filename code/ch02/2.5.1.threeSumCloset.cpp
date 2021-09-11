#include <vector>
#include <cmath>
#include <cstdlib>
#include <algorithm>
using namespace std;

class Solution {
public:
  int threeSumClosest(vector<int>& nums, int target) {
    int n = nums.size();
    //if (n < 3) return;
    sort(nums.begin(), nums.end());
    int res = nums[0] + nums[1] + nums[2];
    for (int i = 0; i < n - 2; i++) {
      if (i && nums[i] == nums[i - 1]) continue;
      int l = i + 1, r = n - 1;
      while (l < r) {
        int s = nums[i] + nums[l] + nums[r];
        if (s == target) return s;
        if (abs(s - target) < abs(res - target))
          res = s;
        if (s < target) l += 1;
        else if (s > target) r -= 1;
      }
    }
    return res;
  }
};
