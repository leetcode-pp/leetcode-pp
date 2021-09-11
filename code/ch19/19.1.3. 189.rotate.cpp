#include <vector>
using namespace std;

class Solution {
public:
  void rotate(vector<int>& nums, int k) {
    int n = nums.size(), t, offset = n - k % n;
    if (offset == 0) return;
    while (offset) {
      t = nums[0];
      offset -= 1;
      for (int i = 0; i < n - 1; i++)
        nums[i] = nums[i + 1];
      nums[n - 1] = t;
    }
  }
};
